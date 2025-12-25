'use client'

import { motion } from 'framer-motion'
import { Brain, Eye, TrendingUp, MessageSquare, Sparkles, Zap } from 'lucide-react'
import Link from 'next/link'

export default function AIShowcase() {
  const aiFeatures = [
    {
      icon: Brain,
      title: 'AI Virtual Tour Guide',
      description: 'Interactive 3D avatar guides you through properties with real-time insights',
      gradient: 'from-cyan-500 to-blue-500',
      delay: 0.2
    },
    {
      icon: Eye,
      title: 'Smart Recommendations',
      description: 'AI analyzes your preferences to suggest perfect properties',
      gradient: 'from-purple-500 to-pink-500',
      delay: 0.4
    },
    {
      icon: TrendingUp,
      title: 'Predictive Analytics',
      description: 'Market trends and investment forecasts powered by machine learning',
      gradient: 'from-blue-500 to-purple-500',
      delay: 0.6
    },
    {
      icon: MessageSquare,
      title: 'AI Concierge',
      description: 'Instant answers to all your property questions, anytime',
      gradient: 'from-pink-500 to-red-500',
      delay: 0.8
    },
  ]

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass mb-6">
            <Sparkles className="w-4 h-4 text-cyber-blue animate-pulse" />
            <span className="text-sm font-medium">AI-Powered Intelligence</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-accent">
              Experience Real Estate
            </span>
            <br />
            <span className="text-primary">Reimagined by AI</span>
          </h2>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Our advanced AI technology transforms how you discover, explore, and invest in properties
          </p>
        </motion.div>

        {/* AI Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {aiFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: feature.delay }}
              className="card-cyber group hover:scale-105 transition-transform duration-300"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-primary">{feature.title}</h3>
              <p className="text-secondary">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Interactive Demo Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden"
        >
          {/* Animated background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyber-blue via-cyber-purple to-cyber-pink animate-pulse"></div>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Demo Preview */}
            <div className="relative">
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-cyber-blue/20 to-cyber-purple/20 border border-cyber-blue/30 flex items-center justify-center overflow-hidden">
                {/* Simulated AI Interface */}
                <div className="w-full h-full relative">
                  <div className="absolute inset-0 cyber-grid opacity-20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Zap className="w-20 h-20 text-cyber-blue mx-auto mb-4 animate-pulse" />
                      <p className="text-2xl font-bold text-primary mb-2">AI Processing</p>
                      <p className="text-secondary">Analyzing property data...</p>
                    </div>
                  </div>
                  
                  {/* Floating data points */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-8 left-8 px-4 py-2 glass rounded-lg text-sm"
                  >
                    <span className="text-cyber-blue">●</span> Market Insights: —
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
                    className="absolute top-8 right-8 px-4 py-2 glass rounded-lg text-sm"
                  >
                    <span className="text-cyber-purple">●</span> ROI Estimate: —
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, delay: 1, repeat: Infinity }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 px-4 py-2 glass rounded-lg text-sm"
                  >
                    <span className="text-cyber-pink">●</span> Match Score: —
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Right: Description */}
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-primary">
                See AI in Action
              </h3>
              <p className="text-lg text-secondary mb-6">
                Our AI doesn't just show you properties—it understands your needs, predicts market trends, 
                and provides intelligent insights that help you make confident decisions.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Real-time property valuation and market analysis',
                  'Personalized recommendations based on your lifestyle',
                  'Predictive insights for investment potential',
                  'Natural language queries and voice commands'
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Sparkles className="w-5 h-5 text-cyber-blue mt-1 flex-shrink-0" />
                    <span className="text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/ai-guide" className="btn-cyber">
                Try AI Demo
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
