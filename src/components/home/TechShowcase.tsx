'use client'

import { motion } from 'framer-motion'
import { Bot, Building2, Eye, TrendingUp, MapPin, Sparkles } from 'lucide-react'

export default function TechShowcase() {
  const features = [
    {
      icon: Bot,
      title: 'AI Chat & Assistant',
      description: 'Natural language property search with intelligent recommendations',
      color: 'from-cyber-blue to-cyan-400',
      glow: 'shadow-cyber-blue/50'
    },
    {
      icon: Building2,
      title: 'Real-time UAE Listings',
      description: 'Live property data from ZylaLabs API across all Emirates',
      color: 'from-cyber-purple to-purple-400',
      glow: 'shadow-cyber-purple/50'
    },
    {
      icon: Eye,
      title: 'Virtual 3D Tours',
      description: 'Immersive property exploration with interactive hotspots',
      color: 'from-pink-500 to-rose-400',
      glow: 'shadow-pink-500/50'
    },
    {
      icon: TrendingUp,
      title: 'Smart Analytics',
      description: 'AI-powered market insights and investment predictions',
      color: 'from-green-500 to-emerald-400',
      glow: 'shadow-green-500/50'
    },
    {
      icon: MapPin,
      title: 'Location Intelligence',
      description: 'Interactive maps with nearby amenities and heatmaps',
      color: 'from-orange-500 to-amber-400',
      glow: 'shadow-orange-500/50'
    },
    {
      icon: Sparkles,
      title: 'AR Preview (Beta)',
      description: 'View properties in your space using augmented reality',
      color: 'from-indigo-500 to-blue-400',
      glow: 'shadow-indigo-500/50'
    },
  ]

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-purple/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass mb-6"
          >
            <Sparkles className="w-5 h-5 text-cyber-blue animate-pulse" />
            <span className="text-sm font-medium">Powered by Advanced Technology</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-cyber-blue to-cyber-purple bg-clip-text text-transparent">
              Tech Behind VirtuXYZ
            </span>
          </h2>
          
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Experience the future of real estate with cutting-edge AI, 3D visualization, and real-time data integration
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <div className="glass rounded-2xl p-8 h-full relative overflow-hidden">
                {/* Hover glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="relative mb-6"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity`} />
                  <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center ${feature.glow} shadow-lg group-hover:shadow-2xl transition-shadow`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                </motion.div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3 group-hover:text-cyber-blue transition-colors">
                  {feature.title}
                </h3>
                <p className="text-secondary leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyber-blue/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-secondary mb-6">
            Ready to experience the future of real estate?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-cyber inline-flex items-center space-x-2 px-8 py-4 text-lg"
          >
            <Sparkles className="w-5 h-5" />
            <span>Start Exploring</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
