#!/bin/bash

# Output filename pattern
OUTPUT_NAME="transcoded_dhruv"

# Create output directory if not exists
mkdir -p $OUTPUT_DIR

# Check if required variables are set
if [[ -z "$S3_BUCKET" || -z "$INPUT_FILE" ]]; then
    echo "S3_BUCKET or INPUT_FILE is not set. Exiting."
    exit 1
fi

# Unset existing AWS_REGION and set it properly
unset AWS_REGION
export AWS_REGION="eu-north-1"

# Download video file from S3
echo "Downloading video file from S3..."
aws s3 cp "s3://$S3_BUCKET/$INPUT_FILE" "./$INPUT_FILE" || {
    echo "Failed to download input file from S3"
    exit 1
}

echo "Download complete. Current directory contents:"
ls -la

echo "Input file path: $INPUT_FILE"
[ -f "./$INPUT_FILE" ] || {
    echo "Input file not found after download"
    exit 1
}

# FFmpeg command for transcoding to multiple bitrates
echo "Starting FFmpeg conversion..."
ffmpeg -i "./$INPUT_FILE" \
  -map 0:v -c:v libx264 -preset medium -crf 23 -g 60 \
  -b:v:0 5000k -maxrate:v:0 5500k -bufsize:v:0 7000k -s:v:0 1920x1080 -y "$OUTPUT_DIR/${OUTPUT_NAME}_1080p.mp4" \
  -b:v:1 3000k -maxrate:v:1 3300k -bufsize:v:1 4500k -s:v:1 1280x720 -y "$OUTPUT_DIR/${OUTPUT_NAME}_720p.mp4" \
  -b:v:2 1500k -maxrate:v:2 1650k -bufsize:v:2 2250k -s:v:2 854x480 -y "$OUTPUT_DIR/${OUTPUT_NAME}_480p.mp4" \
  -b:v:3 800k -maxrate:v:3 880k -bufsize:v:3 1200k -s:v:3 640x360 -y "$OUTPUT_DIR/${OUTPUT_NAME}_360p.mp4" || {
    echo "FFmpeg conversion failed"
    exit 1
}

echo "FFmpeg conversion complete. Output directory contents:"
ls -la "$OUTPUT_DIR"

# Upload transcoded videos to S3
echo "Uploading transcoded files to S3..."
aws s3 cp "$OUTPUT_DIR" "s3://$S3_BUCKET/output" --recursive || {
    echo "Failed to upload files to S3"
    exit 1
}

echo "✅ Video transcoding complete and uploaded to S3!"
echo "Output available at: s3://$S3_BUCKET/output"

