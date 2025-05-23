"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, Star, GitFork, Code, } from "lucide-react";
import { OssLight } from "./blocks/Svg-oss-lights";
import { HeroMainboardStuff } from "./blocks/Svg-Lights";
import { OssChip } from "./blocks/Svg-component";
import Link from "next/link";


const GitHubSvg = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    fill="none" 
    viewBox="0 0 48 48" 
    className={className}
  >
    <rect width="48" height="48" fill="currentColor" rx="24"></rect>
    <path 
      fill="white" 
      fillRule="evenodd" 
      d="M31.4225 46.8287C29.0849 47.589 26.5901 48 24 48C21.4081 48 18.9118 47.5884 16.5728 46.8272C17.6533 46.9567 18.0525 46.2532 18.0525 45.6458C18.0525 45.3814 18.048 44.915 18.0419 44.2911C18.035 43.5692 18.0259 42.6364 18.0195 41.5615C11.343 43.0129 9.9345 38.3418 9.9345 38.3418C8.844 35.568 7.2705 34.8294 7.2705 34.8294C5.091 33.3388 7.4355 33.369 7.4355 33.369C9.843 33.5387 11.1105 35.8442 11.1105 35.8442C13.2525 39.5144 16.728 38.4547 18.096 37.8391C18.3135 36.2871 18.9345 35.2286 19.62 34.6283C14.2905 34.022 8.688 31.9625 8.688 22.7597C8.688 20.1373 9.6225 17.994 11.1585 16.3142C10.911 15.7065 10.0875 13.2657 11.3925 9.95888C11.3925 9.95888 13.4085 9.31336 17.9925 12.4206C19.908 11.8876 21.96 11.6222 24.0015 11.6114C26.04 11.6218 28.0935 11.8876 30.0105 12.4206C34.5915 9.31336 36.603 9.95888 36.603 9.95888C37.9125 13.2657 37.089 15.7065 36.8415 16.3142C38.3805 17.994 39.309 20.1373 39.309 22.7597C39.309 31.9849 33.6975 34.0161 28.3515 34.6104C29.2125 35.3519 29.9805 36.8168 29.9805 39.058C29.9805 41.2049 29.9671 43.0739 29.9582 44.3125C29.9538 44.9261 29.9505 45.385 29.9505 45.6462C29.9505 46.2564 30.3401 46.9613 31.4225 46.8287Z" 
      clipRule="evenodd"
    />
  </svg>
);

export function OpenSourceCta() {
  return (
    <div className="md:mt-14 mx-auto text-gray-400 md:px-8 relative py-20 flex flex-col justify-center items-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="space-y-6 flex flex-col items-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="inline-flex   items-center justify-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 backdrop-blur-sm"
        >
          <Heart className="w-4 h-4 text-red-400" />
          <span className="text-sm text-violet-300 font-medium ">Open Source & Free Forever</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-white via-violet-200 to-white bg-clip-text text-transparent text-center"
        >
          Built in the Open
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed text-center"
        >
          This entire S3 upload system is open source. Fork it, customize it,
          contribute to it. Built with Next.js 15, TypeScript, and modern AWS practices.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="flex flex-wrap justify-center gap-6 mt-8"
      >
        {[
          { icon: Star, label: "Stars", value: "2.1k", color: "from-yellow-600 to-orange-600" },
          { icon: GitFork, label: "Forks", value: "340", color: "from-blue-600 to-indigo-600" },
          { icon: Code, label: "Commits", value: "150+", color: "from-emerald-600 to-teal-600" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-br from-zinc-900/50 via-black to-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 hover:border-zinc-700/50 transition-all duration-300"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} p-2.5 shadow-lg`}>
              <stat.icon className="w-full h-full text-white" />
            </div>
            <div className="text-left">
              <div className="text-lg font-bold text-white">{stat.value}</div>
              <div className="text-xs text-zinc-400">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="relative flex flex-col justify-center gap-6 items-center mt-8">

        <HeroMainboardStuff className="absolute top-[-100px] invert brightness-50 block dark:hidden" />
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2">
          <OssLight />
        </div>

      <Link 
      href="https://github.com/duggal1/Aws-s3-nextjs/fork" 
      className="inline-block"
    >
      <motion.div
        initial={{ 
          y: 0, 
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          scale: 1
        }}
        whileHover={{
          y: -6,
          scale: 1.03,
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
        }}
        whileTap={{
          y: -2,
          scale: 0.98,
          boxShadow: "0 8px 16px rgba(0,0,0,0.12)",
        }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 25,
          mass: 0.8
        }}
        className="
          inline-flex items-center gap-3 py-3 px-8 
          text-lg font-geist font-medium tracking-tight 
          text-zinc-900 dark:text-zinc-100
          bg-gradient-to-br from-zinc-100 via-zinc-200 to-zinc-300
          dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800
          rounded-xl 
          ring-2 ring-zinc-200/50 dark:ring-zinc-600/50
          hover:ring-zinc-300/70 dark:hover:ring-zinc-500/70
          cursor-pointer select-none
          backdrop-blur-sm
          transition-all duration-300 ease-out
        "
      >
        <motion.div
          whileHover={{ rotate: 15, scale: 1.1 }}
          whileTap={{ rotate: -5, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 600, damping: 15 }}
        >
          <GitHubSvg className="text-zinc-900 dark:text-zinc-100" />
        </motion.div>
        <span>Fork it on GitHub</span>
      </motion.div>
    </Link>
   

      <div className="relative flex justify-center items-center md:mt-[-40px]">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <Image
            alt="Github logo"
            src="/new-githubs.svg"
            height={100}
            width={100}
            className="mt-24 size-150"
            priority
          />
          <div className="absolute -z-50 top-[150px] left-[-50px] lg:w-[1000px] lg:h-[400px] lg:top-[400px] lg:left-[150px]">
            <OssChip className="flex" />
          </div>
        </motion.div>
      </div>
    </div>
       </div>
  );
};