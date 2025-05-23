
'use client';

import { useState } from 'react';

import { CheckCircle, XCircle, Cloud, Database, Upload, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import FileGallery from '@/components/FileGallary';
import FileUpload from '@/components/FileUplaod';
import { AuroraText } from '@/components/aurora-text';
import { OpenSourceCta } from '@/components/Cta';
import AwsFeatures from '@/components/FeaturesNew';

interface UploadedFile {
  url: string;
  key: string;
  name: string;
  size: number;
  type: string;
}

interface NotificationProps {
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ type, message, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.8 }}
      className={`
        fixed top-4 right-4 z-50 p-6 rounded-2xl border backdrop-blur-xl max-w-md shadow-2xl
        ${type === 'success'
          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
          : 'bg-red-500/10 border-red-500/30 text-red-400'
        }
      `}
    >
      <div className="flex items-start gap-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
          className={`p-2 rounded-full ${type === 'success' ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}
        >
          {type === 'success' ? (
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
          ) : (
            <XCircle className="w-5 h-5 flex-shrink-0" />
          )}
        </motion.div>
        <div className="flex-1">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-semibold mb-1"
          >
            {type === 'success' ? 'Upload Successful! 🎉' : 'Upload Failed ❌'}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm opacity-90"
          >
            {message}
          </motion.p>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="text-current opacity-60 hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-white/10"
        >
          <XCircle className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
};

const HomePage: React.FC = () => {
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
  const [stats, setStats] = useState<{
    totalUploads: number;
    totalSize: string;
  }>({ totalUploads: 0, totalSize: '0 MB' });

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleUploadSuccess = (file: UploadedFile): void => {
    setNotification({
      type: 'success',
      message: `${file.name} (${formatFileSize(file.size)}) uploaded successfully to S3!`
    });
    setRefreshTrigger(prev => prev + 1);

    // Update stats
    setStats(prev => ({
      totalUploads: prev.totalUploads + 1,
      totalSize: formatFileSize(
        (parseFloat(prev.totalSize.split(' ')[0]) * 1024 * 1024) + file.size
      )
    }));

    // Auto-hide notification after 5 seconds
    setTimeout(() => setNotification(null), 5000);
  };

  const handleUploadError = (error: string): void => {
    setNotification({
      type: 'error',
      message: error
    });

    // Auto-hide notification after 7 seconds
    setTimeout(() => setNotification(null), 7000);
  };

  const closeNotification = (): void => {
    setNotification(null);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
   
      <div className="relative z-10">
        {/* Ultra-Modern Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-b border-zinc-800/50 backdrop-blur-xl bg-black/20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-6"
              >
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  className="p-4 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-teal-600 rounded-2xl shadow-2xl"
                >
                  <Cloud className="w-10 h-10 text-white" />
                </motion.div>
                <div>
                  <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                    <AuroraText>S3 Upload System</AuroraText>
                  </h1>
                  <p className="text-zinc-400 text-lg mt-2">
                    Next.js 15.3 + TypeScript + AWS S3 Integration
                  </p>
                </div>
              </motion.div>

              {/* Ultra-Modern Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="hidden md:flex gap-8"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-4 rounded-2xl bg-gradient-to-br from-emerald-600/20 to-teal-600/20 border border-emerald-500/30 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-center gap-2 text-3xl font-bold text-white mb-1">
                    <Upload className="w-8 h-8 text-emerald-400" />
                    {stats.totalUploads}
                  </div>
                  <p className="text-sm text-emerald-300">Files Uploaded</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-4 rounded-2xl bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-500/30 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-center gap-2 text-3xl font-bold text-white mb-1">
                    <Database className="w-8 h-8 text-blue-400" />
                    {stats.totalSize}
                  </div>
                  <p className="text-sm text-blue-300">Total Size</p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.header>

        {/* Ultra-Modern Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-12">
            {/* Hero Features Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {[
                { icon: Zap, title: "Lightning Fast", desc: "Optimized upload with real-time progress", gradient: "from-yellow-600 to-orange-600" },
                { icon: Database, title: "S3 Integration", desc: "Direct upload to Amazon S3 bucket", gradient: "from-blue-600 to-indigo-600" },
                { icon: Upload, title: "Multi-Format", desc: "Images, Videos, Audio, PDFs supported", gradient: "from-emerald-600 to-teal-600" }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative overflow-hidden rounded-2xl border border-zinc-800/50 bg-gradient-to-br from-zinc-900/50 via-black to-zinc-900/50 backdrop-blur-xl p-8 text-center transition-all duration-500 hover:border-zinc-700/50 hover:shadow-2xl hover:shadow-black/20"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-5`} />
                  </div>
                  <div className="relative z-10">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 shadow-lg`}>
                      <feature.icon className="w-full h-full text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-zinc-400">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Ultra-Modern Upload Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="relative overflow-hidden rounded-3xl border border-zinc-800/50 bg-gradient-to-br from-zinc-900/50 via-black to-zinc-900/50 backdrop-blur-xl p-8 md:p-12"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 via-transparent to-fuchsia-600/5" />
              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mb-8 text-center"
                >
                  <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-white via-violet-200 to-white bg-clip-text text-transparent mb-4">
                    Upload Your Files
                  </h2>
                  <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                    Drag & drop or click to upload files to your S3 bucket. Supports images, videos, audio, and PDFs up to 50MB.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <FileUpload
                    onUploadSuccess={handleUploadSuccess}
                    onUploadError={handleUploadError}
                  />
                </motion.div>
              </div>
            </motion.section>

            {/* Ultra-Modern Gallery Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="relative overflow-hidden rounded-3xl border border-zinc-800/50 bg-gradient-to-br from-zinc-900/50 via-black to-zinc-900/50 backdrop-blur-xl p-8 md:p-12"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-600/5 via-transparent to-emerald-600/5" />
              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="mb-8 text-center"
                >
                  <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-white via-teal-200 to-white bg-clip-text text-transparent mb-4">
                    Your Files
                  </h2>
                  <p className="text-xl text-zinc-400">
                    Browse, preview, and manage your uploaded files with style.
                  </p>
                </motion.div>

                <FileGallery refreshTrigger={refreshTrigger} />
              </div>
            </motion.section>
          </div>
        </main>

        {/* Ultra-Modern Footer */}
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="border-t border-zinc-800/50 mt-20 bg-black/20 backdrop-blur-xl"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-600/20 to-teal-600/20 border border-emerald-500/30"
                >
                  <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-sm text-emerald-300 font-medium">S3 Connection Active</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-blue-500/30"
                >
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
                  <span className="text-sm text-blue-300 font-medium">Next.js 15.3 + React 19</span>
                </motion.div>
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30"
              >
                <span className="text-sm text-violet-300 font-medium">
                  Built with TypeScript + Tailwind CSS
                </span>
              </motion.div>
            </div>
          </div>
        </motion.footer>
      <OpenSourceCta/>
      <AwsFeatures/>
      </div>


      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={closeNotification}
        />
      )}
    </div>

  );
};

export default HomePage;