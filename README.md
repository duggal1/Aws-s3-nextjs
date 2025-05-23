# S3 Bucket Setup Instructions

## Issue Fixed
The `AccessControlListNotSupported` error has been resolved by removing the `ACL: 'public-read'` parameter from the upload command.

## Required S3 Bucket Configuration

Since we removed ACLs, you need to configure your S3 bucket with a bucket policy to allow public read access to uploaded files.

### 1. Bucket Policy (for public access)

Go to your S3 bucket → Permissions → Bucket Policy and add this policy:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/uploads/*"
        }
    ]
}
```

**Replace `YOUR-BUCKET-NAME` with your actual bucket name.**

### 2. Block Public Access Settings

Make sure these settings are configured:
- ✅ Block public access to buckets and objects granted through new access control lists (ACLs): **ON**
- ✅ Block public access to buckets and objects granted through any access control lists (ACLs): **ON**  
- ❌ Block public access to buckets and objects granted through new public bucket or access point policies: **OFF**
- ❌ Block public access to buckets and objects granted through any public bucket or access point policies: **OFF**

### 3. Supported File Types

The API now supports:

**Images:** jpg, jpeg, png, gif, webp, bmp, tiff, svg
**Audio:** mp3, wav, ogg, aac, flac, m4a
**Video:** mp4, mpeg, mov, avi, webm, mkv
**Documents:** pdf

### 4. Environment Variables

Make sure your `.env.local` file has:

```
AWS_ACCESS_KEY_ID=your_actual_access_key
AWS_SECRET_ACCESS_KEY=your_actual_secret_key
AWS_REGION=us-east-1
S3_BUCKET_NAME=your-actual-bucket-name
```

### 5. Alternative: Private Files with Signed URLs

If you prefer to keep files private and generate signed URLs on demand, you can install the presigner package:

```bash
npm install @aws-sdk/s3-request-presigner
```

Then modify the upload route to generate signed URLs instead of public URLs.

## Testing

After applying the bucket policy, test the upload functionality. Files should upload successfully and be accessible via the returned URLs.
