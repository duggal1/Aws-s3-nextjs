
"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Github } from "lucide-react";
import { HeroMainboardStuff } from "./Svg-Lights";
import { OssLight } from "./Svg-oss-lights";
import { OssChip } from "./Svg-component";

export function OpenSourceCta  () {
  return (
    <div>
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

          <a href="/docs" className="mt-4">
            <button className="container inline-flex -translate-y-1/4 gap-2 justify-center items-center py-2 px-10 mt-5 text-lg tracking-tighter text-center bg-gradient-to-br rounded-md ring-2 ring-offset-2 transition-all hover:ring-transparent group/button  from-zinc-100 to-zinc-300 font-geist text-md text-zinc-900 dark:ring-zinc-500/80 dark:ring-offset-zinc-950 hover:scale-[1.02] active:scale-[0.98] active:dark:ring-zinc-500/70 ring-black/20">
              <Github className="w-4 h-4" /> Get Started
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 group-hover/button:[animation-delay:.2s] group-hover/button:animate-shineButton rounded-[inherit] bg-[length:200%_100%] bg-[linear-gradient(110deg,transparent,35%,rgba(255,255,255,.7),75%,transparent)]"
              />
            </button>
          </a>
        </div>

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
  );
};

      