import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";
dotenv.config();
import { s3Client } from "@repo/helper";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const fileName = new URL(req.url).searchParams.get("fileName");
    if (!fileName) {
        return new Response(JSON.stringify({ error: "File name is required" }), { status: 400 });
    }

    const mimeType = new URL(req.url).searchParams.get("mimeType");
    if (!mimeType) {
        return new Response(JSON.stringify({ error: "Mime type is required" }), { status: 400 });
    }

    try {
        const command = new PutObjectCommand({
            Bucket: 'deplofybuildfile',
            Key: fileName,
            ContentType: mimeType,
        });

        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

        return new Response(JSON.stringify({ url }), { status: 200 });
    } catch (error) {
        console.error("S3 presigned URL error:", error);
        return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
    }
}
