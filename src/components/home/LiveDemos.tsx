'use client'

import { motion } from 'framer-motion'
import { Play, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default function LiveDemos() {
  const demos = [
    {
      id: 1,
      title: 'Web 3D Tour',
      description: 'Explore a luxury apartment with our interactive 3D viewer',
      thumbnail: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      badge: 'Three.js',
      href: '/demo/web-tour',
      status: 'coming-soon' as const,
    },
    {
      id: 2,
      title: 'Metaverse Walkthrough',
      description: 'Step into a virtual property showroom in the metaverse',
      thumbnail: 'linear-gradient(135deg, #06beb6 0%, #48b1bf 100%)',
      badge: 'Babylon.js',
      href: '/demo/metaverse',
      status: 'coming-soon' as const,
    },
    {
      id: 3,
      title: 'AI Assistant Demo',
      description: 'Chat with our intelligent property guide in real-time',
      thumbnail: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      badge: 'AI + Voice',
      href: '/demo/ai-assistant',
      status: 'coming-soon' as const,
    }
  ]

  return (
    <section id="live-demos" className="py-20 relative">
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
            <span className="text-primary">Live </span>
            <span className="text-accent">
              Demos
            </span>
          </h2>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Experience live virtual property tours and AI-powered interactions
          </p>
        </motion.div>

        {/* Demo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {demos.map((demo, index) => (
            <motion.div
              key={demo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <Link
                href={demo.href}
                aria-label={`${demo.title} demo`}
                className="block"
              >
                <div className="card-cyber h-full overflow-hidden">
                {/* Thumbnail */}
                <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                  <div 
                    className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                    style={{ background: demo.thumbnail }}
                  >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileHover={{ scale: 1, opacity: 1 }}
                        className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-cyber-blue/80 transition-all"
                      >
                        <Play className="w-8 h-8 text-white ml-1" fill="white" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Badge */}
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-cyber-dark/80 backdrop-blur-sm border border-cyber-blue/30 text-xs font-semibold text-cyber-blue">
                    {demo.badge}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-bold mb-2 text-primary group-hover:text-accent transition-colors">
                    {demo.title}
                  </h3>
                  <p className="text-secondary text-base md:text-sm leading-relaxed mb-4">
                    {demo.description}
                  </p>

                  {/* Launch Button */}
                  <div className="flex items-center space-x-2 text-cyber-blue transition-colors group/btn">
                    <span className="text-sm font-semibold">
                      {demo.status === 'coming-soon' ? 'Coming Soon' : 'Launch Demo'}
                    </span>
                    <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Hover effect line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-cyber-blue to-cyber-purple group-hover:w-full transition-all duration-500"></div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
