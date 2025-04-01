import {
  SQSClient,
  ReceiveMessageCommand,
  DeleteMessageCommand,
} from "@aws-sdk/client-sqs";
import { ECSClient, RunTaskCommand } from "@aws-sdk/client-ecs";
import dotenv from "dotenv";
dotenv.config();
// Define type for configuration
interface ECSConfig {
  CLUSTER: string;
  TASK: string;
}

// Define SQS Message Body structure based on your event
interface S3EventRecord {
  eventSource: string;
  eventName: string;
  s3: {
    bucket: {
      name: string;
    };
    object: {
      key: string;
    };
  };
}

interface SQSMessageBody {
  Records: S3EventRecord[];
}

const queueUrl = process.env.AQS_SQS_QUEUE_URL;
const awsRegion = process.env.AWS_REGION;
const awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID;
const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const cluster = process.env.AWS_CLUSTER;
const task = process.env.AWS_TASK;

console.log(queueUrl);
console.log(awsRegion);
console.log(awsAccessKeyId);
console.log(awsSecretAccessKey);
console.log(cluster);
console.log(task);

if (
  !queueUrl ||
  !awsRegion ||
  !awsAccessKeyId ||
  !awsSecretAccessKey ||
  !cluster ||
  !task
) {
  throw new Error("Missing one or more required environment variables");
}

const ecsClient = new ECSClient({
  region: awsRegion,
  credentials: {
    accessKeyId: awsAccessKeyId,
    secretAccessKey: awsSecretAccessKey,
  },
});

const sqsClient = new SQSClient({
  credentials: {
    accessKeyId: awsAccessKeyId,
    secretAccessKey: awsSecretAccessKey,
  },
  endpoint: process.env.AWS_SQS_ENDPOINT as string,
  region: awsRegion,
  apiVersion: "2012-11-05",
});

// Properly typing the command
function getCommandToSpinEcsTask(
  config: ECSConfig,
  inputVideo: string,
  bucketName: string,
  output: string,
): RunTaskCommand {
  return new RunTaskCommand({
    cluster: config.CLUSTER,
    taskDefinition: config.TASK,
    launchType: "FARGATE",
    count: 1,
    networkConfiguration: {
      awsvpcConfiguration: {
        assignPublicIp: "ENABLED",
        subnets: [
          "subnet-0205b286fb41b157e",
          "subnet-0dbd13a98c05e8bfb",
          "subnet-0f8ff5337ea731b1e",
        ],
        securityGroups: ["sg-0c9c943c3a052fc79"],
      },
    },
    overrides: {
      containerOverrides: [
        {
          name: "transcode-video",
          environment: [
            { name: "INPUT_FILE", value: inputVideo },
            { name: "S3_BUCKET", value: bucketName },
            { name: "OUTPUT_DIR", value: output },
            { name: "AWS_ACCESS_KEY_ID", value: awsAccessKeyId },
            { name: "AWS_SECRET_ACCESS_KEY", value: awsSecretAccessKey },
            { name: "AWS_REGION", value: awsRegion },
          ],
        },
      ],
    },
  });
}

// Polling function, properly typed
async function pollMessages() {
  try {
    const params = {
      QueueUrl: queueUrl,
      MaxNumberOfMessages: 10,
      WaitTimeSeconds: 20,
      VisibilityTimeout: 30,
    };

    const command = new ReceiveMessageCommand(params);
    const response = await sqsClient.send(command);

    if (response.Messages && response.Messages.length > 0) {
      for (const message of response.Messages) {
        try {
          const body: SQSMessageBody | undefined = message?.Body
            ? JSON.parse(message.Body)
            : undefined;
          if (body) {
            console.log("Received message:", body);
            if (body.Records) {
              for (const record of body.Records) {
                console.log("Event Source:", record.eventSource);
                console.log("Event Name:", record.eventName);
                console.log("S3 Bucket Name:", record.s3.bucket.name);
                console.log("S3 Object Key:", record.s3.object.key);

                if (record.eventName === "ObjectCreated:Put") {
                  const inputVideo = record.s3.object.key;
                  const s3Bucket = record.s3.bucket.name;
                  console.log("Processing video:", record.s3.object.key);
                  const command = getCommandToSpinEcsTask(
                    {
                      CLUSTER:
                        "arn:aws:ecs:eu-north-1:982081060540:cluster/build-video",
                      TASK: "arn:aws:ecs:eu-north-1:982081060540:task-definition/transcode-video:1",
                    },
                    inputVideo,
                    s3Bucket,
                    "output",
                  );
                  await ecsClient.send(command);
                } else {
                  console.log("Ignoring event:", record.eventName);
                }
              }
            }
          }
        } catch (jsonError) {
          console.error("Error parsing message body:", jsonError);
        }

        // Delete message after processing
        const deleteParams = {
          QueueUrl: queueUrl,
          ReceiptHandle: message.ReceiptHandle,
        };
        await sqsClient.send(new DeleteMessageCommand(deleteParams));
      }
    } else {
      console.log("No messages available.");
    }
  } catch (err) {
    console.error("Error receiving messages:", err);
  }
}

setInterval(pollMessages, 200); // Poll every 200ms
