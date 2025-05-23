/* eslint-disable @next/next/no-img-element */


'use client';

import { useState, useEffect} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IconTrash,
  IconDownload,
  IconEye,
  IconRefresh,
  IconPhoto,
  IconVideo,
  IconMusic,
  IconFileText,
  IconFile,
  IconX,
  IconPlayerPlay,
} from '@tabler/icons-react';
import clsx from 'clsx';

interface FileItem {
  key: string;
  url: string;
  size: number;
  lastModified: Date;
  type: string;
}

interface FileGalleryProps {
  refreshTrigger: number;
}

const FileGallery: React.FC<FileGalleryProps> = ({ refreshTrigger }) => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [deleting, setDeleting] = useState<string>('');



  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  const fetchFiles = async (): Promise<void> => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch('/api/files');
      const result = await response.json();

      if (result.success) {
        setFiles(result.files || []);
        console.log('✅ Files fetched successfully:', result.files?.length || 0, 'files');
        console.log('📁 Files data:', result.files);
      } else {
        setError(result.error || 'Failed to fetch files');
        console.error('❌ Fetch files error:', result.error);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Network error';
      setError(errorMessage);
      console.error('❌ Fetch files error:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteFile = async (key: string): Promise<void> => {
    try {
      setDeleting(key);

      const response = await fetch(`/api/files?key=${encodeURIComponent(key)}`, {
        method: 'DELETE'
      });

      const result = await response.json();

      if (result.success) {
        setFiles(prev => prev.filter(file => file.key !== key));
        setSelectedFile(null);
        console.log('✅ File deleted successfully:', key);
      } else {
        setError(result.error || 'Failed to delete file');
        console.error('❌ Delete file error:', result.error);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Delete failed';
      setError(errorMessage);
      console.error('❌ Delete file error:', err);
    } finally {
      setDeleting('');
    }
  };

  const downloadFile = async (file: FileItem): Promise<void> => {
    try {
      // Get download URL from our API
      const response = await fetch(`/api/download?key=${encodeURIComponent(file.key)}`);
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Download failed');
      }

      // Open the signed download URL in a new tab
      window.open(data.downloadUrl, '_blank');
      console.log('✅ File download initiated:', file.key);
    } catch (err) {
      console.error('❌ Download failed:', err);
      setError('Download failed. Please try again.');
    }
  };

  const previewFile = (file: FileItem): void => {
    setSelectedFile(file);
    console.log('👁️ Preview opened:', file.key);
  };

  useEffect(() => {
    fetchFiles();
  }, [refreshTrigger]);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center p-12 space-y-4"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12"
        >
          <IconRefresh className="w-full h-full text-violet-400" />
        </motion.div>
        <motion.p
          className="text-zinc-400"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading your files...
        </motion.p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center p-12 space-y-4"
      >
        <div className="w-16 h-16 mx-auto bg-red-500/20 rounded-full flex items-center justify-center">
          <IconX className="w-8 h-8 text-red-400" />
        </div>
        <div>
          <p className="text-lg text-red-400 font-semibold">Error loading files</p>
          <p className="text-sm text-zinc-400 mt-2">{error}</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={fetchFiles}
          className="px-6 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors border border-red-500/30"
        >
          Try Again
        </motion.button>
      </motion.div>
    );
  }

  if (files.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center p-12 space-y-6"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-20 h-20 mx-auto bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl flex items-center justify-center"
        >
          <IconFile className="w-10 h-10 text-zinc-400" />
        </motion.div>
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">No files yet</h3>
          <p className="text-zinc-400">Upload your first file to get started</p>
        </div>
        <div className="flex justify-center gap-2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-violet-400 rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Uploaded Files ({files.length})</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={fetchFiles}
          className="p-3 bg-gradient-to-br from-zinc-800 to-zinc-900 text-zinc-400 rounded-xl hover:text-violet-400 transition-all duration-300 border border-zinc-700/50 hover:border-violet-500/50"
          title="Refresh files"
        >
          <IconRefresh className="w-5 h-5" />
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {files.map((file, index) => (
          <motion.div
            key={file.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={clsx(
              "group relative overflow-hidden rounded-2xl border transition-all duration-500 cursor-pointer",
              "bg-gradient-to-br from-zinc-900/50 via-black to-zinc-900/50",
              "backdrop-blur-xl border-zinc-800/50 hover:border-zinc-700/50",
              "hover:shadow-2xl hover:shadow-black/20 hover:scale-[1.02]"
            )}
            onClick={() => previewFile(file)}
          >
            {/* File Preview */}
            <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900">
              {file.type === 'image' ? (
                <img
                  src={file.url}
                  alt={file.key.split('/').pop() || 'Image'}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    console.error('❌ Image failed to load:', file.url);
                    console.error('❌ Image error:', e);
                  }}
                  onLoad={() => {
                    console.log('✅ Image loaded successfully:', file.key);
                  }}
                />
              ) : file.type === 'video' ? (
                <div className="relative w-full h-full bg-gradient-to-br from-blue-900/20 to-indigo-900/20 flex items-center justify-center">
                  <video
                    src={file.url}
                    className="w-full h-full object-cover"
                    muted
                    preload="metadata"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                    >
                      <IconPlayerPlay className="w-8 h-8 text-white ml-1" />
                    </motion.div>
                  </div>
                </div>
              ) : file.type === 'audio' ? (
                <div className="w-full h-full bg-gradient-to-br from-purple-900/20 to-violet-900/20 flex flex-col items-center justify-center p-6">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-20 h-20 bg-gradient-to-br from-violet-600 to-purple-600 rounded-full flex items-center justify-center mb-4"
                  >
                    <IconMusic className="w-10 h-10 text-white" />
                  </motion.div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1 bg-violet-400 rounded-full"
                        animate={{ height: [8, 24, 8] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                      />
                    ))}
                  </div>
                </div>
              ) : file.type === 'pdf' ? (
                <div className="w-full h-full bg-gradient-to-br from-red-900/20 to-orange-900/20 flex items-center justify-center p-6">
                  <div className="text-center">
                    <div className="w-20 h-24 bg-gradient-to-br from-red-600 to-orange-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                      <IconFileText className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-xs text-zinc-400">PDF Document</p>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                  <IconFile className="w-16 h-16 text-zinc-400" />
                </div>
              )}

              
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      previewFile(file);
                    }}
                    className="p-3 bg-blue-500/20 backdrop-blur-sm text-blue-400 rounded-full hover:bg-blue-500/30 transition-colors border border-blue-500/30"
                    title="Preview"
                  >
                    <IconEye className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadFile(file);
                    }}
                    className="p-3 bg-emerald-500/20 backdrop-blur-sm text-emerald-400 rounded-full hover:bg-emerald-500/30 transition-colors border border-emerald-500/30"
                    title="Download"
                  >
                    <IconDownload className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteFile(file.key);
                    }}
                    disabled={deleting === file.key}
                    className="p-3 bg-red-500/20 backdrop-blur-sm text-red-400 rounded-full hover:bg-red-500/30 transition-colors border border-red-500/30 disabled:opacity-50"
                    title="Delete"
                  >
                    {deleting === file.key ? (
                      <IconRefresh className="w-5 h-5 animate-spin" />
                    ) : (
                      <IconTrash className="w-5 h-5" />
                    )}
                  </motion.button>
                </div>
              </div>

              {/* File type badge */}
              <div className="absolute top-3 left-3">
                <div className={clsx(
                  "px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm",
                  file.type === 'image' && "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
                  file.type === 'video' && "bg-blue-500/20 text-blue-400 border border-blue-500/30",
                  file.type === 'audio' && "bg-purple-500/20 text-purple-400 border border-purple-500/30",
                  file.type === 'pdf' && "bg-red-500/20 text-red-400 border border-red-500/30",
                  !['image', 'video', 'audio', 'pdf'].includes(file.type) && "bg-zinc-500/20 text-zinc-400 border border-zinc-500/30"
                )}>
                  {file.type.toUpperCase()}
                </div>
              </div>
            </div>

            {/* File info */}
            <div className="p-4 space-y-2">
              <h3 className="text-white font-semibold text-sm truncate" title={file.key.split('/').pop()}>
                {file.key.split('/').pop()}
              </h3>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">{formatFileSize(file.size)}</span>
                <span className="text-zinc-500">{formatDate(file.lastModified)}</span>
              </div>
            </div>

            {/* Hover glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 via-transparent to-fuchsia-600/5" />
            </div>
          </motion.div>
        ))}
      </div>


      <AnimatePresence>
        {selectedFile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedFile(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-zinc-700/50 rounded-3xl max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-zinc-700/50 bg-zinc-900/50 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <div className={clsx(
                    "w-12 h-12 rounded-xl flex items-center justify-center",
                    selectedFile.type === 'image' && "bg-emerald-500/20 text-emerald-400",
                    selectedFile.type === 'video' && "bg-blue-500/20 text-blue-400",
                    selectedFile.type === 'audio' && "bg-purple-500/20 text-purple-400",
                    selectedFile.type === 'pdf' && "bg-red-500/20 text-red-400",
                    !['image', 'video', 'audio', 'pdf'].includes(selectedFile.type) && "bg-zinc-500/20 text-zinc-400"
                  )}>
                    {selectedFile.type === 'image' && <IconPhoto className="w-6 h-6" />}
                    {selectedFile.type === 'video' && <IconVideo className="w-6 h-6" />}
                    {selectedFile.type === 'audio' && <IconMusic className="w-6 h-6" />}
                    {selectedFile.type === 'pdf' && <IconFileText className="w-6 h-6" />}
                    {!['image', 'video', 'audio', 'pdf'].includes(selectedFile.type) && <IconFile className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white truncate max-w-md">
                      {selectedFile.key.split('/').pop()}
                    </h3>
                    <p className="text-sm text-zinc-400">
                      {formatFileSize(selectedFile.size)} • {selectedFile.type.toUpperCase()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => downloadFile(selectedFile)}
                    className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl hover:bg-emerald-500/30 transition-colors border border-emerald-500/30"
                    title="Download"
                  >
                    <IconDownload className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedFile(null)}
                    className="p-3 bg-zinc-700/50 text-zinc-400 rounded-xl hover:bg-zinc-600/50 hover:text-white transition-colors"
                    title="Close"
                  >
                    <IconX className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>


              <div className="p-6 max-h-[calc(90vh-120px)] overflow-auto">
                {selectedFile.type === 'image' && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex justify-center"
                  >
                    <img
                      src={selectedFile.url}
                      alt={selectedFile.key.split('/').pop() || 'Image'}
                      className="max-w-full h-auto rounded-2xl shadow-2xl"
                      style={{ objectFit: 'contain' }}
                    />
                  </motion.div>
                )}

                {selectedFile.type === 'video' && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex justify-center"
                  >
                    <video
                      src={selectedFile.url}
                      controls
                      className="max-w-full h-auto rounded-2xl shadow-2xl"
                      style={{ maxHeight: '70vh' }}
                    />
                  </motion.div>
                )}

                {selectedFile.type === 'audio' && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex flex-col items-center justify-center py-12 space-y-8"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-32 h-32 bg-gradient-to-br from-violet-600 to-purple-600 rounded-full flex items-center justify-center"
                    >
                      <IconMusic className="w-16 h-16 text-white" />
                    </motion.div>

                    <div className="flex gap-2">
                      {[...Array(7)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-2 bg-violet-400 rounded-full"
                          animate={{ height: [16, 48, 16] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                        />
                      ))}
                    </div>

                    <audio
                      src={selectedFile.url}
                      controls
                      className="w-full max-w-md"
                      style={{
                        filter: 'hue-rotate(270deg) saturate(2) brightness(1.2)',
                      }}
                    />
                  </motion.div>
                )}

                {selectedFile.type === 'pdf' && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-full"
                  >
                    <iframe
                      src={selectedFile.url}
                      className="w-full h-[70vh] rounded-2xl border border-zinc-700/50"
                      title="PDF Preview"
                    />
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FileGallery;