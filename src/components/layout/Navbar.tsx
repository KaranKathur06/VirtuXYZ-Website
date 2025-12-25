'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Home, Search, BarChart3, Building2, User, Users, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from './ThemeToggle'
import { useTheme } from '@/lib/theme-context'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme } = useTheme()
  const isLight = theme === 'light'

  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL

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
    { name: 'Team', href: '/team', icon: Users },
  ]

  const overlayMode = isLight && !scrolled

  const navBackgroundClass = scrolled
    ? isLight
      ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-black/10'
      : 'glass shadow-lg shadow-cyber-blue/10'
    : 'bg-transparent'

  const navLinkClass = `${overlayMode
    ? 'text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.75)] hover:bg-white/10'
    : isLight
      ? 'text-neutral-700 hover:text-neutral-900 hover:bg-white/60'
      : 'text-secondary hover:text-primary hover:bg-white/5'
  } px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors duration-300`

  const authLinkClass = overlayMode
    ? 'flex items-center space-x-2 px-4 py-2 text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.6)] hover:bg-white/10 rounded-lg transition-colors text-sm font-medium'
    : isLight
      ? 'flex items-center space-x-2 px-4 py-2 text-neutral-700 hover:text-neutral-900 transition-colors text-sm font-medium'
      : 'flex items-center space-x-2 px-4 py-2 text-secondary hover:text-primary transition-colors text-sm font-medium'

  return (
    <motion.nav
      role="navigation"
      aria-label="Main"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBackgroundClass}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20">
          {/* Logo - Far Left */}
          <Link href="/" className="flex items-center flex-shrink-0">
              <Image 
              src="/full logo.png"
              alt="VirtuXYZ"
              width={180}
              height={48}
              priority
              className="h-10 w-auto object-contain drop-shadow-lg"
            />
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
                  className={`${navLinkClass} cursor-pointer`}
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={navLinkClass}
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>

          {/* CTA Buttons - Far Right */}
          <div className="hidden lg:flex items-center space-x-3 flex-shrink-0 ml-auto">
            <ThemeToggle />
            {bookingUrl ? (
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-cyber text-sm px-5 py-2.5 min-h-[44px] inline-flex items-center justify-center"
              >
                Book a Demo
              </a>
            ) : (
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="btn-outline-cyber text-sm px-5 py-2.5 min-h-[44px] inline-flex items-center justify-center opacity-50 cursor-not-allowed"
              >
                Book a Demo
              </button>
            )}
            <Link href="/login" className={authLinkClass}>
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
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg glass-hover"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-main-menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-main-menu"
            role="menu"
            aria-label="Mobile main navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden border-t ${
              isLight
                ? 'bg-white shadow-lg border-neutral-200'
                : 'glass border-cyber-blue/20'
            }`}
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
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all cursor-pointer ${
                      isLight ? 'text-neutral-800 hover:bg-neutral-100' : 'hover:bg-white/5'
                    }`}
                  >
                    <item.icon className="w-5 h-5 text-cyber-blue" />
                    <span>{item.name}</span>
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                      isLight ? 'text-neutral-800 hover:bg-neutral-100' : 'hover:bg-white/5'
                    }`}
                  >
                    <item.icon className="w-5 h-5 text-cyber-blue" />
                    <span>{item.name}</span>
                  </Link>
                )
              ))}
              <div className="pt-4 space-y-2 border-t border-cyber-blue/20">
                <div className="flex items-center justify-between px-4 py-3">
                  <span className={`text-sm ${isLight ? 'text-neutral-500' : 'text-gray-400'}`}>Theme</span>
                  <ThemeToggle />
                </div>
                {bookingUrl ? (
                  <a
                    href={bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="block btn-outline-cyber text-center min-h-[44px] inline-flex items-center justify-center"
                  >
                    Book a Demo
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    aria-disabled="true"
                    className="block w-full btn-outline-cyber text-center min-h-[44px] inline-flex items-center justify-center opacity-50 cursor-not-allowed"
                  >
                    Book a Demo
                  </button>
                )}
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-lg transition-all ${
                    isLight ? 'text-neutral-800 hover:bg-neutral-100' : 'hover:bg-white/5'
                  }`}
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
