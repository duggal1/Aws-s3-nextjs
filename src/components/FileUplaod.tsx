/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import { useState, useRef, DragEvent, ChangeEvent, JSX } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IconFile,
  IconPhoto,
  IconVideo,
  IconMusic,
  IconFileText,
  IconSparkles,
  IconCloudUpload
} from '@tabler/icons-react';
import clsx from 'clsx';

interface FileUploadProps {
  onUploadSuccess: (file: UploadedFile) => void;
  onUploadError: (error: string) => void;
}

interface UploadedFile {
  url: string;
  key: string;
  name: string;
  size: number;
  type: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUploadSuccess, onUploadError }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allowedTypes = [
    'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/bmp', 'image/tiff', 'image/svg+xml',
    'application/pdf',
    'video/mp4', 'video/mpeg', 'video/quicktime', 'video/webm', 'video/avi', 'video/mov',
    'audio/mp3', 'audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/aac', 'audio/flac', 'audio/m4a'
  ];

  const getFileIcon = (type: string): JSX.Element => {
    if (type.startsWith('image/')) return <IconPhoto className="w-8 h-8" />;
    if (type.startsWith('video/')) return <IconVideo className="w-8 h-8" />;
    if (type.startsWith('audio/')) return <IconMusic className="w-8 h-8" />;
    if (type === 'application/pdf') return <IconFileText className="w-8 h-8" />;
    return <IconFile className="w-8 h-8" />;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateFile = (file: File): string | null => {
    if (!allowedTypes.includes(file.type)) {
      return `File type ${file.type} is not supported`;
    }

    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      return 'File size exceeds 50MB limit';
    }

    return null;
  };

  const uploadFile = async (file: File): Promise<void> => {
    const validationError = validateFile(file);
    if (validationError) {
      onUploadError(validationError);
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      const result = await response.json();

      if (result.success) {
        onUploadSuccess({
          url: result.url,
          key: result.key,
          name: file.name,
          size: file.size,
          type: file.type
        });
        console.log('✅ Upload successful:', result);
      } else {
        onUploadError(result.error || 'Upload failed');
        console.error('❌ Upload failed:', result.error);
      }
    } catch (error) {
      onUploadError(error instanceof Error ? error.message : 'Network error');
      console.error('❌ Upload error:', error);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      uploadFile(files[0]);
    }
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (files && files.length > 0) {
      uploadFile(files[0]);
    }
  };

  const handleClick = (): void => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <motion.div
        className={clsx(
          "relative overflow-hidden rounded-2xl border transition-all duration-500 cursor-pointer group",
          "bg-gradient-to-br from-zinc-900/50 via-black to-zinc-900/50",
          "backdrop-blur-xl",
          isDragging
            ? "border-violet-500/50 bg-gradient-to-br from-violet-600/10 via-fuchsia-600/5 to-teal-600/10 shadow-2xl shadow-violet-900/20"
            : "border-zinc-800/50 hover:border-zinc-700/50 hover:shadow-xl hover:shadow-black/20",
          isUploading && "pointer-events-none"
        )}
        whileHover={{ scale: isDragging ? 1.02 : 1.01 }}
        whileTap={{ scale: 0.98 }}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 via-transparent to-fuchsia-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Sparkle effects */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-violet-400 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + i * 10}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={allowedTypes.join(',')}
          onChange={handleFileInput}
          disabled={isUploading}
        />

        <div className="relative z-10 p-8 md:p-12">
          <AnimatePresence mode="wait">
            {isUploading ? (
              <motion.div
                key="uploading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 mx-auto"
                  >
                    <IconCloudUpload className="w-full h-full text-violet-400" />
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 w-16 h-16 mx-auto border-2 border-violet-500/30 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-white via-violet-200 to-white bg-clip-text text-transparent">
                    Uploading to the cloud...
                  </h3>

                  <div className="relative w-full h-2 bg-zinc-800/50 rounded-full overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-teal-400 rounded-full"
                      style={{ width: `${uploadProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                  </div>

                  <motion.p
                    className="text-sm text-zinc-400"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {uploadProgress}% complete
                  </motion.p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6 text-center"
              >
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <IconCloudUpload
                    className={clsx(
                      "w-16 h-16 mx-auto transition-all duration-300",
                      isDragging ? "text-violet-400 scale-110" : "text-zinc-400 group-hover:text-violet-400"
                    )}
                  />
                  {isDragging && (
                    <motion.div
                      className="absolute inset-0 w-16 h-16 mx-auto border-2 border-violet-400 rounded-full"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </motion.div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-white via-violet-200 to-white bg-clip-text text-transparent">
                    {isDragging ? 'Drop it like it\'s hot! 🔥' : 'Upload your files'}
                  </h3>

                  <p className="text-zinc-400 max-w-md mx-auto">
                    {isDragging
                      ? 'Release to upload your file to the cloud'
                      : 'Drag & drop your files here, or click to browse'
                    }
                  </p>

                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {[
                      { label: 'Images', icon: IconPhoto, color: 'from-emerald-600 to-teal-600' },
                      { label: 'Videos', icon: IconVideo, color: 'from-blue-600 to-indigo-600' },
                      { label: 'Audio', icon: IconMusic, color: 'from-purple-600 to-violet-600' },
                      { label: 'PDF', icon: IconFileText, color: 'from-orange-600 to-red-600' },
                    ].map((type, index) => (
                      <motion.div
                        key={type.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={clsx(
                          "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium",
                          "bg-gradient-to-r", type.color,
                          "text-white shadow-lg"
                        )}
                      >
                        <type.icon className="w-3 h-3" />
                        {type.label}
                      </motion.div>
                    ))}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300"
                    >
                      <IconSparkles className="w-3 h-3" />
                      Max 50MB
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default FileUpload;