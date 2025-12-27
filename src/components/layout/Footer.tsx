'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Mail, Twitter, Linkedin, Facebook, Youtube } from 'lucide-react'

export default function Footer() {
  const bookingUrl = 'https://calendar.app.google/kA9K5gvLXzqJRHD99'

  const footerLinks = {
    Platform: [
      { name: 'Explore Properties', href: '/explore' },
      { name: 'Virtual Tours', href: '/tours' },
      { name: 'AI Analytics', href: '/analytics' },
      { name: 'Agent Portal', href: '/agent-portal' },
    ],
    Company: [
      { name: 'About Us', href: '/about' },
      { name: 'Team', href: '/team' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Blog', href: '/blog' },
    ],
    Resources: [
      { name: 'Help Center', href: '/help-center' },
      { name: 'API Documentation', href: '/api-docs' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Contact', href: '/contact' },
    ],
    Legal: [
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookie-policy' },
      { name: 'GDPR', href: '/gdpr' },
    ],
  }

  const socialLinks = [
    {
      icon: Twitter,
      href: 'https://x.com/virtuxyz',
      label: 'X',
    },
    {
      icon: Facebook,
      href: 'https://www.facebook.com/virtuxyz/',
      label: 'Facebook',
    },
    {
      icon: Youtube,
      href: 'https://www.youtube.com/@virtuxyz',
      label: 'YouTube',
    },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/company/virtuxyz/',
      label: 'LinkedIn',
    },
  ]

  const activeSocialLinks = socialLinks.filter((s) => Boolean(s.href))

  return (
    <footer className="relative mt-20 glass border-t border-cyber-blue/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <Image
                src="/full logo.png"
                alt="VirtuXYZ"
                width={200}
                height={60}
                className="h-12 w-auto object-contain drop-shadow-lg"
              />
            </Link>
            <p className="text-secondary mb-6 max-w-sm">
              Experience the future of real estate with AI-powered virtual tours, smart analytics, and immersive 3D property exploration.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-secondary">
                <Mail className="w-4 h-4 text-cyber-blue" />
                <a
                  href="mailto:admin@virtuxyz.com"
                  className="hover:text-cyber-blue transition-colors"
                >
                  admin@virtuxyz.com
                </a>
              </div>
            </div>

            <div className="mt-6">
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cyber inline-flex items-center justify-center w-full sm:w-auto min-h-[44px]"
              >
                Book a Demo
              </a>
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
              {activeSocialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href as string}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg glass-hover transition-all hover:text-cyber-blue hover:scale-105 hover:shadow-[0_0_12px_rgba(34,231,255,0.25)]"
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
