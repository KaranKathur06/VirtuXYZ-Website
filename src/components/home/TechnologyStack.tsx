'use client'

import { motion } from 'framer-motion'
import { Brain, Cpu, Database, Cloud, Lock, Zap } from 'lucide-react'

export default function TechnologyStack() {
  const technologies = [
    { name: 'GPT-4', icon: Brain, description: 'Advanced AI' },
    { name: 'WebGL', icon: Cpu, description: '3D Rendering' },
    { name: 'Blockchain', icon: Database, description: 'Secure Transactions' },
    { name: 'Cloud AI', icon: Cloud, description: 'Scalable Processing' },
    { name: 'Encryption', icon: Lock, description: 'Data Security' },
    { name: 'Real-time', icon: Zap, description: 'Instant Updates' }
  ]

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-primary">Powered by</span>
            <br />
            <span className="text-accent">
              Cutting-Edge Technology
            </span>
          </h2>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Built on the most advanced tech stack for unparalleled performance and security
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass rounded-2xl p-6 text-center hover:scale-105 transition-transform group"
            >
              <tech.icon className="w-12 h-12 text-cyber-blue mx-auto mb-3 group-hover:text-cyber-purple transition-colors" />
              <h3 className="font-bold text-primary mb-1">{tech.name}</h3>
              <p className="text-sm text-secondary">{tech.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
