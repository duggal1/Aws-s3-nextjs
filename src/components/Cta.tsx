
"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Star, GitFork, Code, Heart } from "lucide-react";
import { IconBrandGithub } from "@tabler/icons-react";
import { OssLight } from "./blocks/Svg-oss-lights";
import { OssChip } from "./blocks/Svg-component";

export function OpenSourceCta() {
  return (
    <section className="relative py-32 bg-black">
  
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
    
 <div className="text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 backdrop-blur-sm"
            >
              <Heart className="w-4 h-4 text-red-400" />
              <span className="text-sm text-violet-300 font-medium">Open Source & Free Forever</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-white via-violet-200 to-white bg-clip-text text-transparent"
            >
              Built in the Open
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed"
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
            className="flex flex-wrap justify-center gap-6"
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

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="relative"
          >
            <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 opacity-50">
              <OssLight />
            </div>

            <motion.a
              href="https://github.com/your-repo/s3-upload-system"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl text-white font-semibold text-lg hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-300 shadow-2xl hover:shadow-violet-900/50"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <IconBrandGithub className="w-6 h-6" />
              </motion.div>
              <span>View on GitHub</span>
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
                animate={{ x: [-100, 100] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.a>
          </motion.div>

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
                  className="mt-24 size-150 "
                  priority
                />
                <div className="absolute -z-50 top-[150px] left-[-50px] lg:w-[1000px] lg:h-[400px] lg:top-[400px] lg:left-[150px]">
                  <OssChip className="flex" />
                </div>
              </motion.div>
            </div>
      </div>
    </div>
    </section>
  );
};

