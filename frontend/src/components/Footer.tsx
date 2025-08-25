import React, { useState } from 'react'
import { Home, Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react'

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Subscribe email:', email)
    setEmail('')
  }

  return (
    <footer className="bg-letvana-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <div>
            {/* Logo */}
            <h3 className="text-2xl font-bold mb-6">Letvana Homes</h3>
            
            {/* Newsletter */}
            <div className="mb-8">
              <h4 className="text-xl font-semibold mb-3">Join Our Community</h4>
              <p className="text-gray-300 mb-4">
                Stay updated with the latest property listings and exclusive offers.
              </p>
              
              <form onSubmit={handleSubscribe} className="flex gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-letvana-primary focus:border-transparent"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-letvana-primary hover:bg-letvana-primary/90 text-white font-semibold px-6 py-3 rounded-lg transition-colors whitespace-nowrap"
                >
                  Subscribe Now
                </button>
              </form>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:text-right">
            {/* Social Media */}
            <div className="mb-8">
              <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
              <div className="flex lg:justify-end gap-4">
                <a
                  href="#"
                  className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-letvana-primary transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-letvana-primary transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-letvana-primary transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-letvana-primary transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Links */}
            <div className="space-y-2">
              <a
                href="#"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                About Us
              </a>
              <a
                href="#"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Terms and Condition
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center mb-4 sm:mb-0">
              <Home className="w-5 h-5 text-letvana-primary mr-2" />
              <span className="text-gray-300">
                Letvana Homes, All Rights Reserved. Copyright © 2025
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
