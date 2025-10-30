'use client'

import Link from 'next/link'
import { Sparkles, Mail, Phone, MapPin, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  const footerLinks = {
    Platform: [
      { name: 'Explore Properties', href: '/explore' },
      { name: 'Virtual Tours', href: '/tours' },
      { name: 'AI Analytics', href: '/analytics' },
      { name: 'Agent Portal', href: '/agent-portal' },
    ],
    Company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Blog', href: '/blog' },
    ],
    Resources: [
      { name: 'Help Center', href: '/help' },
      { name: 'API Documentation', href: '/docs' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Contact', href: '/contact' },
    ],
    Legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'GDPR', href: '/gdpr' },
    ],
  }

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ]

  return (
    <footer className="relative mt-20 glass border-t border-cyber-blue/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4 group">
              <Sparkles className="w-8 h-8 text-cyber-blue" />
              <span className="text-2xl font-bold bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink bg-clip-text text-transparent">
                VirtuXYZ
              </span>
            </Link>
            <p className="text-secondary mb-6 max-w-sm">
              Experience the future of real estate with AI-powered virtual tours, smart analytics, and immersive 3D property exploration.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-secondary">
                <Mail className="w-4 h-4 text-cyber-blue" />
                <span>contact@virtuxyz.com</span>
              </div>
              <div className="flex items-center space-x-3 text-secondary">
                <Phone className="w-4 h-4 text-cyber-blue" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-secondary">
                <MapPin className="w-4 h-4 text-cyber-blue" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-primary font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-secondary hover:text-cyber-blue transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-cyber-blue/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-secondary text-sm">
              © {new Date().getFullYear()} VirtuXYZ. All rights reserved. Powered by AI.
            </p>
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 rounded-lg glass-hover transition-all hover:text-cyber-blue"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
