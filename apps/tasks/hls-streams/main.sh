
#!/bin/bash

# Output filename pattern
OUTPUT_NAME="stream_video_dhruv"

# Create output directory if not exists
mkdir $OUTPUT_DIR

ls -la

printenv

# Unset existing AWS_REGION and set it properly
unset AWS_REGION
export AWS_REGION="eu-north-1"

aws sts get-caller-identity

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

# FFmpeg command for HLS conversion with multiple resolutions
echo "Starting FFmpeg conversion..."
ffmpeg -i "./$INPUT_FILE" \
  -filter_complex \
  "[0:v]split=4[v1][v2][v3][v4]; \
   [v1]scale=w=1920:h=1080:force_original_aspect_ratio=decrease[v1out]; \
   [v2]scale=w=1280:h=720:force_original_aspect_ratio=decrease[v2out]; \
   [v3]scale=w=854:h=480:force_original_aspect_ratio=decrease[v3out]; \
   [v4]scale=w=640:h=360:force_original_aspect_ratio=decrease[v4out]" \
  -map "[v1out]" -c:v:0 libx264 -b:v:0 5000k -maxrate:v:0 5500k -bufsize:v:0 7000k \
  -map "[v2out]" -c:v:1 libx264 -b:v:1 3000k -maxrate:v:1 3300k -bufsize:v:1 4500k \
  -map "[v3out]" -c:v:2 libx264 -b:v:2 1500k -maxrate:v:2 1650k -bufsize:v:2 2250k \
  -map "[v4out]" -c:v:3 libx264 -b:v:3 800k -maxrate:v:3 880k -bufsize:v:3 1200k \
  -map a:0 -c:a aac -b:a:0 192k -ac 2 \
  -map a:0 -c:a aac -b:a:1 128k -ac 2 \
  -map a:0 -c:a aac -b:a:2 96k -ac 2 \
  -map a:0 -c:a aac -b:a:3 64k -ac 2 \
  -var_stream_map "v:0,a:0 v:1,a:1 v:2,a:2 v:3,a:3" \
  -preset medium -crf 23 -g 60 -sc_threshold 0 \
  -keyint_min 60 -hls_time 6 -hls_playlist_type vod \
  -hls_segment_filename "$OUTPUT_DIR/${OUTPUT_NAME}_%v_%03d.ts" \
  -master_pl_name "master.m3u8" \
  "$OUTPUT_DIR/${OUTPUT_NAME}_%v.m3u8" || {
    echo "FFmpeg conversion failed"
    exit 1
}

echo "FFmpeg conversion complete. Output directory contents:"
ls -la "$OUTPUT_DIR"

# Upload HLS files to S3
echo "Uploading HLS files to S3..."
aws s3 cp "$OUTPUT_DIR" "s3://$S3_BUCKET/output" --recursive || {
    echo "Failed to upload files to S3"
    exit 1
}

echo "✅ HLS conversion complete and uploaded to S3!"
echo "Output available at: s3://$S3_BUCKET/output"

# Uncomment this for debugging in container environments
# echo "Sleeping for 1 hour to inspect container file system"
# sleep 3600
