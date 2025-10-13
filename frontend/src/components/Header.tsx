import React, { useState } from 'react'
import { Search, Bell, User, HelpCircle } from 'lucide-react'

export const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent w-full">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 px-6">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center justify-between space-x-10">
            <h1 className="text-2xl font-bold text-white">Letvana Homes</h1>
            <ul className="flex items-center justify-center space-x-10 text-white">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Right Side Actions with Search Bar */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="w-64">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Here..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-4 pr-12 bg-white rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Help Icon */}
            <button 
              className="p-2 text-white hover:text-blue-400 transition-colors"
              aria-label="Help"
            >
              <HelpCircle className="w-6 h-6" />
            </button>
            
            {/* Notification Bell */}
            <button 
              className="p-2 text-white hover:text-blue-400 transition-colors" 
              aria-label="Notifications"
            >
              <Bell className="w-6 h-6" />
            </button>
            
            {/* Register/Login Button */}
            <button className="flex items-center space-x-2 bg-blue-400 hover:bg-blue-500 text-gray-800 border-2 border-gray-800 px-4 py-2 rounded-lg font-medium transition-colors">
              <User className="w-5 h-5" />
              <span>Register/Login</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
