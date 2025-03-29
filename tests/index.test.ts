import { ApplicationProtocol } from "@aws-sdk/client-ecs";
import { expect, test } from "bun:test";
const API_URL = "http://localhost:3000/api";

test("2 + 2", () => {
  expect(2 + 2).toBe(4);
});

// test("GET /videos/pre-signed-url",() => {
// } )

// test("GET /videos/video-status",() => {
// });

// test("POST /videos/video-status", () => {
// });
// test("POST /add-video2record", () => {
// });

// test("test worker for hls-streams", () => {
// });

// test("test worker for transcoding videos", () => {
// });

// test("test worker for transcoding audio", () => {
// });

// test("Check the working of aws sqs by pushing messages", () => {

// });