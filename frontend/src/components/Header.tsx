import React, { useState } from 'react'
import { Search, Bell, User, Menu, X } from 'lucide-react'

interface HeaderProps {
  onSearchClick?: () => void
}

export const Header: React.FC<HeaderProps> = ({ onSearchClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-white">Letvana Homes</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-white hover:text-letvana-primary transition-colors">
              Home
            </a>
            <a href="#" className="text-white hover:text-letvana-primary transition-colors">
              About Us
            </a>
            <a href="#" className="text-white hover:text-letvana-primary transition-colors">
              Contact Us
            </a>
          </nav>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={onSearchClick}
              className="p-2 text-white hover:text-letvana-primary transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            
            <button className="p-2 text-white hover:text-letvana-primary transition-colors" aria-label="Notifications">
              <Bell className="w-5 h-5" />
            </button>
            
            <button className="p-2 text-white hover:text-letvana-primary transition-colors" aria-label="User Profile">
              <User className="w-5 h-5" />
            </button>
            
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Register/Login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white hover:text-letvana-primary transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-sm rounded-lg mt-2 p-4">
            <nav className="flex flex-col space-y-4">
              <a href="#" className="text-white hover:text-letvana-primary transition-colors">
                Home
              </a>
              <a href="#" className="text-white hover:text-letvana-primary transition-colors">
                About Us
              </a>
              <a href="#" className="text-white hover:text-letvana-primary transition-colors">
                Contact Us
              </a>
              <div className="pt-4 border-t border-gray-700">
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors w-full">
                  Register/Login
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
