
'use client'

import { motion } from 'framer-motion'
import { Box, Headphones, BarChart2, Camera, Shield, Zap } from 'lucide-react'

export default function FeaturesSection() {
  const features = [
    {
      icon: Box,
      title: '3D Virtual Tours',
      description: 'Immersive property exploration with interactive 3D models and VR support',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      icon: Headphones,
      title: 'AI Voice Guide',
      description: 'Natural conversation with AI that answers all your property questions',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: BarChart2,
      title: 'Smart Analytics',
      description: 'Data-driven insights on pricing, trends, and investment opportunities',
      color: 'from-blue-500 to-purple-500'
    },
    {
      icon: Camera,
      title: 'AR Visualization',
      description: 'Place furniture and visualize renovations using augmented reality',
      color: 'from-pink-500 to-red-500'
    },
    {
      icon: Shield,
      title: 'Verified Listings',
      description: 'AI-verified property details and blockchain-secured transactions',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: Zap,
      title: 'Instant Matching',
      description: 'Get matched with perfect properties in seconds using AI algorithms',
      color: 'from-yellow-500 to-orange-500'
    }
  ]

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-primary">Revolutionary Features</span>
            <br />
            <span className="text-accent">
              Built for the Future
            </span>
          </h2>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Every feature designed to make your property journey seamless, intelligent, and extraordinary
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="card-cyber h-full">
                {/* Icon with gradient background */}
                <div className="relative mb-6">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-20 blur-xl group-hover:opacity-40 transition-opacity rounded-full`}></div>
                  <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3 text-primary group-hover:text-accent transition-colors">
                  {feature.title}
                </h3>
                <p className="text-secondary leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover effect line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-cyber-blue to-cyber-purple group-hover:w-full transition-all duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
