'use client'

import { motion } from 'framer-motion'
import { Search, ShoppingBag, Footprints, BarChart3, Lightbulb } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: 'User Enters Property',
      description: 'Browse our immersive 3D property catalog and select your dream home',
      side: 'left'
    },
    {
      icon: ShoppingBag,
      title: 'AI Guide Welcomes',
      description: 'Meet your personal AI assistant ready to answer all your questions',
      side: 'right'
    },
    {
      icon: Footprints,
      title: '3D Walk Begins',
      description: 'Navigate through photorealistic spaces with complete freedom',
      side: 'left'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'View detailed insights, pricing, and neighborhood information',
      side: 'right'
    },
    {
      icon: Lightbulb,
      title: 'Intelligent Insights',
      description: 'Receive personalized recommendations based on your preferences',
      side: 'left'
    }
  ]

  return (
    <section id="how-it-works" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-primary">How It </span>
            <span className="text-accent">
              Works
            </span>
          </h2>
          <p className="text-lg text-secondary max-w-3xl mx-auto">
            A seamless journey from discovery to decision, powered by AI and immersive technology
          </p>
        </motion.div>

        {/* Vertical Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Center Spine with Gradient */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-b from-[#00E5FF] via-[#00FFAA] to-[#7B61FF] opacity-40"></div>
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-[#00E5FF] via-[#00FFAA] to-transparent"
              animate={{
                y: ['0%', '100%']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-16">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: step.side === 'left' ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative flex items-center ${
                  step.side === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-col`}
              >
                {/* Card */}
                <div className={`w-full md:w-5/12 ${
                  step.side === 'left' ? 'md:pr-12' : 'md:pl-12'
                }`}>
                  <div className="card-cyber">
                    <h3 className="text-xl font-bold text-primary mb-2">
                      {step.title}
                    </h3>
                    <p className="text-secondary text-base md:text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Center Node */}
                <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
                    className="relative"
                  >
                    {/* Outer glow ring */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00E5FF] to-[#00FFAA] blur-md opacity-60"></div>
                    
                    {/* Node circle */}
                    <div className="relative w-16 h-16 rounded-full bg-[#070B17] border-2 border-[#00E5FF] flex items-center justify-center">
                      <step.icon className="w-7 h-7 text-[#00E5FF]" strokeWidth={2} />
                    </div>

                    {/* Small indicator dot */}
                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-br from-[#00FFAA] to-[#00E5FF] shadow-lg"></div>
                  </motion.div>
                </div>

                {/* Mobile Icon */}
                <div className="md:hidden mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#00E5FF] to-[#00FFAA] flex items-center justify-center shadow-lg">
                    <step.icon className="w-7 h-7 text-white" strokeWidth={2} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center mt-16"
        >
          <a
            href="#live-demos"
            onClick={(e) => {
              e.preventDefault()
              const element = document.querySelector('#live-demos')
              element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
            className="btn-primary"
          >
            Experience the Journey
          </a>
        </motion.div>
      </div>
    </section>
  )
}
