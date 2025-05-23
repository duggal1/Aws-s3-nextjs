<div align="center">


# 🚀 AWS S3 Upload System

### **Next.js 15.3 + TypeScript + AWS S3 Integration**

*A modern, ultra-sleek file upload system with real-time previews and S3 cloud storage*

[![Next.js](https://img.shields.io/badge/Next.js-15.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![AWS S3](https://img.shields.io/badge/AWS-S3-orange?style=for-the-badge&logo=amazon-aws)](https://aws.amazon.com/s3/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.7-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer-Motion-pink?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

</div>

---

## ✨ **Features**

🎯 **Lightning-Fast Uploads** - Optimized file upload with real-time progress tracking
🎨 **Modern UI/UX** - 2025-tier sleek design with dark theme and smooth animations
📁 **Multi-Format Support** - Images, Videos, Audio, PDFs up to 50MB
🔒 **Secure S3 Integration** - Direct upload to Amazon S3 with signed URLs
📱 **Responsive Design** - Perfect on desktop, tablet, and mobile
⚡ **Real-time Gallery** - Live file preview with download capabilities

---

## 🛠 **Tech Stack**

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 15.3 | React framework with App Router |
| **TypeScript** | 5.8.3 | Type-safe development |
| **AWS SDK** | 3.816.0 | S3 client and presigner |
| **Tailwind CSS** | 4.1.7 | Utility-first styling |
| **Framer Motion** | 12.12.1 | Smooth animations |
| **React** | 19.1.0 | UI library |

---

## 🚀 **Quick Start**

### 1. **Clone & Install**
```bash
git clone https://github.com/duggal1/Aws-s3-nextjs.git
cd aws-s3-testing-project
npm install
```

### 2. **Environment Setup**
Create `.env.local` in the root directory:
```env
AWS_ACCESS_KEY_ID=your_actual_access_key
AWS_SECRET_ACCESS_KEY=your_actual_secret_key
AWS_REGION=us-east-1
S3_BUCKET_NAME=your-actual-bucket-name
```

### 3. **Run Development Server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the magic! ✨

---

## 📡 **API Routes**

### **🔄 Upload API** - `/api/upload`

**POST** - Upload files to S3
```typescript
// Request: FormData with 'file' field
// Response:
{
  "success": true,
  "url": "https://bucket.s3.region.amazonaws.com/uploads/file.jpg",
  "key": "uploads/timestamp-random.jpg"
}
```

**GET** - Retrieve file by key
```typescript
// Query: ?key=uploads/filename.jpg
// Response: File stream with proper Content-Type
```

**Features:**
- ✅ File type validation (images, videos, audio, PDFs)
- ✅ Size limit enforcement (50MB max)
- ✅ Unique filename generation
- ✅ Metadata preservation

---

### **📂 Files API** - `/api/files`

**GET** - List all uploaded files
```typescript
// Response:
{
  "success": true,
  "files": [
    {
      "key": "uploads/file.jpg",
      "url": "https://signed-url...",
      "size": 1024000,
      "lastModified": "2024-01-01T00:00:00.000Z",
      "type": "image"
    }
  ]
}
```

**DELETE** - Remove file from S3
```typescript
// Query: ?key=uploads/filename.jpg
// Response: { "success": true }
```

**Features:**
- ✅ Signed URL generation (1-hour expiry)
- ✅ File type detection
- ✅ Sorted by upload date
- ✅ Secure deletion

---

### **⬇️ Download API** - `/api/download`

**GET** - Generate download URL
```typescript
// Query: ?key=uploads/filename.jpg
// Response:
{
  "success": true,
  "downloadUrl": "https://signed-download-url..."
}
```

**Features:**
- ✅ Secure signed URLs (5-minute expiry)
- ✅ Force download headers
- ✅ Original filename preservation

## 🔧 **Supported File Types**

| Category | Extensions | MIME Types |
|----------|------------|------------|
| **🖼️ Images** | `jpg`, `jpeg`, `png`, `gif`, `webp`, `bmp`, `tiff`, `svg` | `image/*` |
| **🎵 Audio** | `mp3`, `wav`, `ogg`, `aac`, `flac`, `m4a` | `audio/*` |
| **🎬 Video** | `mp4`, `mpeg`, `mov`, `avi`, `webm`, `mkv` | `video/*` |
| **📄 Documents** | `pdf` | `application/pdf` |

**File Size Limit:** 50MB per file

---

## ⚙️ **AWS S3 Configuration**

### **1. Bucket Policy Setup**

Navigate to your S3 bucket → **Permissions** → **Bucket Policy** and add:

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

> **⚠️ Important:** Replace `YOUR-BUCKET-NAME` with your actual bucket name.

### **2. Block Public Access Settings**

Configure these settings in your S3 bucket:

| Setting | Status |
|---------|--------|
| Block public access to buckets and objects granted through **new** ACLs | ✅ **ON** |
| Block public access to buckets and objects granted through **any** ACLs | ✅ **ON** |
| Block public access to buckets and objects granted through **new** public bucket policies | ❌ **OFF** |
| Block public access to buckets and objects granted through **any** public bucket policies | ❌ **OFF** |

### **3. IAM User Permissions**

Your AWS IAM user needs these permissions:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:DeleteObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::YOUR-BUCKET-NAME",
                "arn:aws:s3:::YOUR-BUCKET-NAME/*"
            ]
        }
    ]
}
```

---

## 🎨 **UI Components**

### **FileUpload Component**
- 🎯 Drag & drop interface
- 📊 Real-time upload progress
- ✅ File validation feedback
- 🎨 Smooth animations

### **FileGallery Component**
- 🖼️ Grid layout with previews
- 🔍 File type detection
- ⬇️ Download functionality
- 🗑️ Delete capabilities

### **Notification System**
- 🎉 Success/error notifications
- ⏰ Auto-dismiss timers
- 🎭 Smooth enter/exit animations

---

## 📱 **Scripts**

```bash
# Development with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

---

## 🔒 **Security Features**

- 🛡️ **File Type Validation** - Both MIME type and extension checking
- 📏 **Size Limits** - 50MB maximum file size
- 🔐 **Signed URLs** - Temporary access with expiration
- 🚫 **Input Sanitization** - Secure filename generation
- 🔒 **Environment Variables** - Sensitive data protection

---

## 🚀 **Performance Optimizations**

- ⚡ **Next.js 15.3** - Latest performance improvements
- 🎯 **Turbopack** - Ultra-fast development builds
- 📦 **Code Splitting** - Optimized bundle sizes
- 🖼️ **Image Optimization** - Automatic format conversion
- 💾 **Caching** - Efficient S3 request handling

---

## 🎯 **Project Structure**

```
aws-s3-testing-project/
├── 📁 src/
│   ├── 📁 app/
│   │   ├── 📁 api/
│   │   │   ├── 📁 upload/
│   │   │   │   └── 📄 route.ts      # Upload & retrieve files
│   │   │   ├── 📁 files/
│   │   │   │   └── 📄 route.ts      # List & delete files
│   │   │   └── 📁 download/
│   │   │       └── 📄 route.ts      # Generate download URLs
│   │   ├── 📄 page.tsx              # Main application page
│   │   ├── 📄 layout.tsx            # Root layout
│   │   └── 📄 globals.css           # Global styles
│   ├── 📁 components/
│   │   ├── 📄 FileUpload.tsx        # Upload component
│   │   ├── 📄 FileGallery.tsx       # Gallery component
│   │   └── 📄 ...                   # Other UI components
│   └── 📁 lib/
│       └── 📄 utils.ts              # Utility functions
├── 📄 package.json                  # Dependencies
├── 📄 tailwind.config.ts            # Tailwind configuration
├── 📄 tsconfig.json                 # TypeScript configuration
└── 📄 .env.local                    # Environment variables
```

---

## 🐛 **Troubleshooting**

### **Common Issues**

**❌ AccessControlListNotSupported Error**
- ✅ **Solution:** Remove ACL parameters, use bucket policy instead

**❌ Upload fails with 403 Forbidden**
- ✅ **Solution:** Check IAM permissions and bucket policy

**❌ Files not accessible after upload**
- ✅ **Solution:** Verify bucket policy allows public read access

**❌ Environment variables not loading**
- ✅ **Solution:** Ensure `.env.local` is in root directory and restart dev server

### **Debug Mode**

Enable detailed logging by checking the browser console and server logs for:
- ✅ Upload progress events
- ✅ S3 response details
- ✅ Error stack traces

---

## 🤝 **Contributing**

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

---

## 📄 **License**

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 **Acknowledgments**

- 🚀 **Next.js Team** - For the incredible framework
- ☁️ **AWS** - For reliable S3 cloud storage
- 🎨 **Tailwind CSS** - For beautiful utility-first styling
- ⚡ **Framer Motion** - For smooth animations
- 💎 **TypeScript** - For type safety and developer experience

---

<div align="center">

### **Built with ❤️ using Next.js 15.3 + TypeScript + AWS S3**

*Ready to upload? Let's make it happen! 🚀*

</div>
