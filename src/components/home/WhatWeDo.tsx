'use client'

import { motion } from 'framer-motion'
import { Box, FileText, Brain, Link2 } from 'lucide-react'

export default function WhatWeDo() {
  const services = [
    {
      icon: Box,
      title: 'Interactive Web Tours',
      description: 'Immersive 3D property tours accessible from any device. Navigate through spaces with intuitive controls and realistic rendering.',
      gradient: 'from-[#667eea] to-[#764ba2]'
    },
    {
      icon: FileText,
      title: 'Digital Twins & Masterplans',
      description: 'Create accurate digital replicas of properties and developments. Perfect for planning, marketing, and visualization.',
      gradient: 'from-[#06beb6] to-[#48b1bf]'
    },
    {
      icon: Brain,
      title: 'AI Sales Assistant',
      description: 'Intelligent AI guide that answers questions, provides insights, and assists buyers throughout their property journey.',
      gradient: 'from-[#f093fb] to-[#f5576c]'
    },
    {
      icon: Link2,
      title: 'Tokenization & Analytics',
      description: 'Blockchain-based property tokenization and advanced analytics dashboard for data-driven decision making.',
      gradient: 'from-[#4facfe] to-[#00f2fe]'
    }
  ]

  return (
    <section id="what-we-do" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-primary">What We </span>
            <span className="text-accent">
              Do
            </span>
          </h2>
          <p className="text-lg text-secondary max-w-3xl mx-auto">
            Transforming real estate with cutting-edge technology and AI-powered solutions
          </p>
        </motion.div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative h-full card-cyber">
                {/* Gradient Icon */}
                <div className="mb-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg`}>
                    <service.icon className="w-7 h-7 text-white" strokeWidth={2} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-secondary leading-relaxed text-base md:text-sm">
                  {service.description}
                </p>

                {/* Subtle inner glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#00E5FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Compare All Services Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center"
        >
          <a
            href="#solutions"
            onClick={(e) => {
              e.preventDefault()
              const element = document.querySelector('#solutions')
              element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
            className="btn-primary"
          >
            Compare All Services
          </a>
        </motion.div>
      </div>
    </section>
  )
}
