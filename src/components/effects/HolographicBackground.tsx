'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from '@/lib/theme-context'

export default function HolographicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Particle system
    interface Particle {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      hue: number
    }

    const particles: Particle[] = []
    const particleCount = 80
    const connectionDistance = 150

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3,
        hue: Math.random() * 60 + 180 // Cyan to blue range
      })
    }

    // Animation loop
    let animationId: number
    const animate = () => {
      // Clear with fade effect
      ctx.fillStyle = theme === 'dark' 
        ? 'rgba(7, 7, 22, 0.05)' 
        : 'rgba(247, 249, 251, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        )
        
        if (theme === 'dark') {
          gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 70%, ${particle.opacity})`)
          gradient.addColorStop(1, `hsla(${particle.hue}, 100%, 50%, 0)`)
        } else {
          gradient.addColorStop(0, `hsla(${particle.hue}, 80%, 50%, ${particle.opacity * 0.6})`)
          gradient.addColorStop(1, `hsla(${particle.hue}, 80%, 40%, 0)`)
        }
        
        ctx.fillStyle = gradient
        ctx.fill()

        // Draw connections
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.3
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            
            if (theme === 'dark') {
              ctx.strokeStyle = `rgba(46, 230, 255, ${opacity})`
            } else {
              ctx.strokeStyle = `rgba(0, 123, 255, ${opacity * 0.5})`
            }
            
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.4 }}
    />
  )
}
