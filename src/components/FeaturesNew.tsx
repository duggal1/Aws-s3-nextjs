'use client';

import React from "react";
import { motion } from "framer-motion";
import {
  IconBolt,
  IconShield,
  IconCloud,
  IconChartBar,
  IconStack,
  IconRocket
} from "@tabler/icons-react";

export default function AwsFeatures() {
  const features = [
    {
      icon: IconBolt,
      title: "Lightning Fast",
      desc: "Upload files at blazing speeds with optimized AWS S3 integration and smart compression algorithms.",
      gradient: "from-yellow-600 to-orange-600"
    },
    {
      icon: IconCloud,
      title: "Cloud Storage",
      desc: "Secure, scalable cloud storage powered by Amazon S3 with 99.999999999% durability guarantee.",
      gradient: "from-blue-600 to-indigo-600"
    },
    {
      icon: IconShield,
      title: "Enterprise Security",
      desc: "Bank-grade encryption, access controls, and compliance with SOC 2, GDPR, and HIPAA standards.",
      gradient: "from-emerald-600 to-teal-600"
    },
    {
      icon: IconChartBar,
      title: "Real-time Analytics",
      desc: "Track upload performance, storage usage, and user engagement with detailed analytics dashboard.",
      gradient: "from-purple-600 to-violet-600"
    },
    {
      icon: IconStack,
      title: "Multi-format Support",
      desc: "Handle images, videos, audio files, PDFs, and documents with intelligent preview generation.",
      gradient: "from-pink-600 to-rose-600"
    },
    {
      icon: IconRocket,
      title: "Developer First",
      desc: "RESTful APIs, webhooks, and SDKs for seamless integration into your existing applications.",
      gradient: "from-cyan-600 to-blue-600"
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-black">

    
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-bold text-gray-50 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Built for the Future 🔥🔥🔥
          </motion.h2>
          <motion.p 
            className="text-xl text-zinc-400 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Enterprise-grade file storage and management with cutting-edge technology 
            that scales with your business needs.
          </motion.p>
        </motion.div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl border border-zinc-800/50 bg-gradient-to-br from-zinc-900/50 via-black to-zinc-900/50 backdrop-blur-xl p-8 h-full transition-all duration-500 hover:border-zinc-700/50 hover:shadow-2xl hover:shadow-black/20">
              
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-5`} />
                </div>
                
    
                <div className="relative z-10 mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 shadow-lg`}>
                    <feature.icon className="w-full h-full text-white" />
                  </div>
                </div>
                

                <div className="relative z-10 space-y-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-white transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 via-transparent to-fuchsia-600/5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>


        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4  font-sans bg-gradient-to-bl from-blue-600  to-violet-600 rounded-xl text-white font-semibold hover:from-blue-800 hover:to-volet-800 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
          
            Get Started Today
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
