'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Home, Search, BarChart3, Building2, User, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'What We Do', href: '#what-we-do', icon: Sparkles },
    { name: 'How It Works', href: '#how-it-works', icon: BarChart3 },
    { name: 'Live Demos', href: '#live-demos', icon: Search },
    { name: 'Solutions', href: '#solutions', icon: Building2 },
    { name: 'Properties', href: '/explore', icon: Building2 },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-lg shadow-cyber-blue/10' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20">
          {/* Logo - Far Left */}
          <Link href="/" className="flex items-center space-x-3 group flex-shrink-0">
            <div className="relative">
              <Image 
                src="/image0 (1).png" 
                alt="VirtuXYZ Logo" 
                width={40} 
                height={40}
                className="relative z-10"
              />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink bg-clip-text text-transparent">
              VirtuXYZ
            </span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
            {navItems.map((item) => (
              item.href.startsWith('#') ? (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    const element = document.querySelector(item.href)
                    element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                  className="px-3 py-2 rounded-lg text-secondary hover:text-primary hover:bg-white/5 transition-all duration-300 cursor-pointer text-sm font-medium whitespace-nowrap"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-3 py-2 rounded-lg text-secondary hover:text-primary hover:bg-white/5 transition-all duration-300 text-sm font-medium whitespace-nowrap"
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>

          {/* CTA Buttons - Far Right */}
          <div className="hidden lg:flex items-center space-x-3 flex-shrink-0 ml-auto">
            <ThemeToggle />
            <Link
              href="/login"
              className="flex items-center space-x-2 px-4 py-2 text-secondary hover:text-primary transition-colors text-sm font-medium"
            >
              <User className="w-4 h-4" />
              <span>Sign In</span>
            </Link>
            <Link
              href="/agent-portal"
              className="btn-cyber text-sm px-5 py-2.5"
            >
              Agent Portal
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg glass-hover"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-cyber-blue/20"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navItems.map((item) => (
                item.href.startsWith('#') ? (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      setIsOpen(false)
                      const element = document.querySelector(item.href)
                      element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/5 dark:hover:bg-white/5 light:hover:bg-black/5 transition-all cursor-pointer"
                  >
                    <item.icon className="w-5 h-5 text-cyber-blue" />
                    <span>{item.name}</span>
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/5 dark:hover:bg-white/5 light:hover:bg-black/5 transition-all"
                  >
                    <item.icon className="w-5 h-5 text-cyber-blue" />
                    <span>{item.name}</span>
                  </Link>
                )
              ))}
              <div className="pt-4 space-y-2 border-t border-cyber-blue/20">
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-gray-400">Theme</span>
                  <ThemeToggle />
                </div>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 rounded-lg hover:bg-white/5 transition-all"
                >
                  Sign In
                </Link>
                <Link
                  href="/agent-portal"
                  onClick={() => setIsOpen(false)}
                  className="block btn-cyber text-center"
                >
                  Agent Portal
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
