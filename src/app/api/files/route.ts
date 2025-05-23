import { NextRequest, NextResponse } from 'next/server';

import {
  S3Client,
  ListObjectsV2Command,
  DeleteObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';

import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3 = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME!;

interface FileItem {
  key: string;
  url: string;
  size: number;
  lastModified: Date;
  type: string;
}

interface FilesResponse {
  success: boolean;
  files?: FileItem[];
  error?: string;
}

export async function GET(): Promise<NextResponse<FilesResponse>> {
  try {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: 'uploads/',
      MaxKeys: 100,
    });
    const { Contents } = await s3.send(command);

    if (!Contents || Contents.length === 0) {
      return NextResponse.json({ success: true, files: [] });
    }

    const files: FileItem[] = await Promise.all(
      Contents.filter(c => c.Key && c.Size !== undefined && c.LastModified)
        .map(async obj => {
          const key = obj.Key!;
          const ext = key.split('.').pop()!.toLowerCase();
          let type = 'unknown';
          if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'tiff', 'svg'].includes(ext)) type = 'image';
          else if (ext === 'pdf') type = 'pdf';
          else if (['mp4', 'mpeg', 'mov', 'webm', 'avi', 'mkv'].includes(ext)) type = 'video';
          else if (['mp3', 'wav', 'ogg', 'aac', 'flac', 'm4a'].includes(ext)) type = 'audio';

          // Generate signed URL for accessing the file
          const getObjectCommand = new GetObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key,
          });

          const signedUrl = await getSignedUrl(s3, getObjectCommand, {
            expiresIn: 3600 
          });

          return {
            key,
            url: signedUrl,
            size: obj.Size!,
            lastModified: obj.LastModified!,
            type,
          };
        })
    );

    files.sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime());

    console.log('✅ Files listed successfully:', files.length, 'files found');
    return NextResponse.json({ success: true, files });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error('❌ List files error:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to list files' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');
    if (!key) {
      return NextResponse.json({ error: 'No key provided' }, { status: 400 });
    }

    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });
    await s3.send(command);

    console.log('✅ File deleted successfully:', key);
    return NextResponse.json({ success: true });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error('❌ Delete error:', err);
    return NextResponse.json(
      { error: err.message || 'Delete failed' },
      { status: 500 }
    );
  }
}
