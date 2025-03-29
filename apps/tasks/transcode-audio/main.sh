#!/bin/bash

# Set variables
OUTPUT_NAME="audio_stream_dhruv"

# Ensure required environment variables are set
if [[ -z "$S3_BUCKET" || -z "$INPUT_FILE" ]]; then
    echo "Error: S3_BUCKET or INPUT_FILE environment variables are not set."
    exit 1
fi

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Display environment variables and directory contents
ls -la
printenv

# Set AWS Region
unset AWS_REGION
export AWS_REGION="$AWS_REGION"

# Download audio file from S3
echo "Downloading audio file from S3..."
aws s3 cp "s3://$S3_BUCKET/$INPUT_FILE" "./$INPUT_FILE" || {
    echo "Failed to download input file from S3"
    exit 1
}

echo "Download complete. Current directory contents:"
ls -la

# Ensure the input file exists
if [[ ! -f "./$INPUT_FILE" ]]; then
    echo "Error: Input file not found after download."
    exit 1
fi

# FFmpeg command for transcoding audio to different bitrates
echo "Starting FFmpeg audio transcoding..."
ffmpeg -i "./$INPUT_FILE" \
  -map 0:a -c:a aac -b:a 320k "$OUTPUT_DIR/${OUTPUT_NAME}_320k.aac" \
  -map 0:a -c:a aac -b:a 256k "$OUTPUT_DIR/${OUTPUT_NAME}_256k.aac" \
  -map 0:a -c:a aac -b:a 192k "$OUTPUT_DIR/${OUTPUT_NAME}_192k.aac" \
  -map 0:a -c:a aac -b:a 128k "$OUTPUT_DIR/${OUTPUT_NAME}_128k.aac" \
  -map 0:a -c:a aac -b:a 64k "$OUTPUT_DIR/${OUTPUT_NAME}_64k.aac" || {
    echo "FFmpeg transcoding failed"
    exit 1
}

echo "FFmpeg transcoding complete. Output directory contents:"
ls -la "$OUTPUT_DIR"

# Upload transcoded audio files to S3
echo "Uploading transcoded audio files to S3..."
aws s3 cp "$OUTPUT_DIR" "s3://$S3_BUCKET/output_audio" --recursive || {
    echo "Failed to upload files to S3"
    exit 1
}

echo "✅ Audio transcoding complete and uploaded to S3!"
echo "Output available at: s3://$S3_BUCKET/output_audio"
