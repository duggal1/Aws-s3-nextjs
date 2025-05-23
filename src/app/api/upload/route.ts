import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { Readable } from 'stream';

const s3 = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME!;

interface UploadResponse {
  success: boolean;
  url?: string;
  key?: string;
  error?: string;
}

async function streamToBuffer(stream: Readable): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of stream) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export async function POST(request: NextRequest): Promise<NextResponse<UploadResponse>> {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    const allowedTypes = [
      // Images
      'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/bmp', 'image/tiff', 'image/svg+xml',
      // PDF
      'application/pdf',
      // Video
      'video/mp4', 'video/mpeg', 'video/quicktime', 'video/webm', 'video/avi', 'video/mov',
      // Audio
      'audio/mp3', 'audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/aac', 'audio/flac', 'audio/m4a'
    ];


    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    const allowedExtensions = [
      // Images
      'jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'tiff', 'svg',
      // PDF
      'pdf',
      // Video
      'mp4', 'mpeg', 'mov', 'avi', 'webm', 'mkv',
      // Audio
      'mp3', 'wav', 'ogg', 'aac', 'flac', 'm4a'
    ];

    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension || '')) {
      return NextResponse.json(
        { success: false, error: `Unsupported file type: ${file.type} (.${fileExtension})` },
        { status: 400 }
      );
    }

    // Validate file size (50MB max)
    const maxSize = 50 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: 'File size exceeds 50MB limit' },
        { status: 400 }
      );
    }
    
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const extension = file.name.split('.').pop();
    const key = `uploads/${timestamp}-${randomString}.${extension}`;

    // File → Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to S3 🔥

    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: file.type,
      Metadata: {
        originalName: file.name,
        uploadedAt: new Date().toISOString(),
      },
    });
    await s3.send(command);


    const url = `https://${BUCKET_NAME}.s3.${s3.config.region}/${encodeURIComponent(key)}`;

    console.log('✅ File uploaded successfully:', { key, url, size: file.size, type: file.type });

    return NextResponse.json({ success: true, url, key });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error('❌ Upload error:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Upload failed' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');
    if (!key) {
      return NextResponse.json({ error: 'No key provided' }, { status: 400 });
    }

    const command = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: key });
    const { Body, ContentType, ContentLength } = await s3.send(command);

    if (!Body) {
      throw new Error('No body returned from S3');
    }
    const buffer = await streamToBuffer(Body as Readable);

    console.log('✅ File retrieved successfully:', { key, contentType: ContentType, size: ContentLength });

    return new NextResponse(buffer as BodyInit, {
      headers: {
        'Content-Type': ContentType || 'application/octet-stream',
        'Content-Length': ContentLength?.toString() || '0',
      },
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error('❌ Retrieve error:', err);
    return NextResponse.json(
      { error: err.message || 'Retrieve failed' },
      { status: 500 }
    );
  }
}
