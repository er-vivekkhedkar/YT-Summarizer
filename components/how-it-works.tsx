"use client";

import React from 'react'
import { motion } from "framer-motion"
import { Brain, LinkIcon, Share2 } from 'lucide-react'

const HowItWorks = () => {
  const steps = [
    {
      title: "Paste Video URL",
      description: "Simply copy and paste your YouTube video URL into our input field.",
      icon: <LinkIcon className="w-8 h-8" />,
      gradient: "from-blue-500/20 via-blue-500/10 to-transparent",
      iconGradient: "bg-gradient-to-br from-blue-500 to-blue-600",
      borderGradient: "from-blue-500/20 via-blue-500/10 to-transparent",
    },
    {
      title: "AI Processing",
      description: "Our advanced AI analyzes the video content and generates a concise summary.",
      icon: <Brain className="w-8 h-8" />,
      gradient: "from-purple-500/20 via-purple-500/10 to-transparent",
      iconGradient: "bg-gradient-to-br from-purple-500 to-purple-600",
      borderGradient: "from-purple-500/20 via-purple-500/10 to-transparent",
    },
    {
      title: "Get Summary",
      description: "Review the generated summary and easily share it with others.",
      icon: <Share2 className="w-8 h-8" />,
      gradient: "from-emerald-500/20 via-emerald-500/10 to-transparent",
      iconGradient: "bg-gradient-to-br from-emerald-500 to-emerald-600",
      borderGradient: "from-emerald-500/20 via-emerald-500/10 to-transparent",
    },
  ]

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background with gradient transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-zinc-900 to-black"></div>
      
      {/* Animated gradient orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Animated Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-300 to-white mb-6">
              How It Works
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-zinc-400 text-lg max-w-2xl mx-auto"
          >
            Transform your video learning experience in three simple steps
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid gap-8 md:grid-cols-3 max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="relative group"
            >
              {/* Card */}
              <div className={`relative h-full bg-gradient-to-b from-zinc-800/50 to-black/50 rounded-2xl backdrop-blur-xl overflow-hidden`}>
                {/* Animated border */}
                <div className={`absolute inset-0 bg-gradient-to-b ${step.borderGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <div className="absolute inset-[1px] bg-gradient-to-b from-zinc-800/50 to-black/50 rounded-2xl"></div>
                
                {/* Content */}
                <div className="relative p-8">
                  {/* Icon */}
                  <div className={`${step.iconGradient} p-4 rounded-xl text-white w-fit mb-6`}>
                    {step.icon}
                  </div>
                  
                  {/* Text */}
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-zinc-400">
                    {step.description}
                  </p>

                  {/* Hover gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${step.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
