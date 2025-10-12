"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, HelpCircle, Bell, User, Menu, X } from "lucide-react";
import { useState } from "react";
import Container from "../container";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-[#6B6B6B] py-4">
      <Container>
        <div className="flex items-center justify-between space-x-6 mx-auto">
          {/* Logo */}
          <Link href="/" className="w-full">
            <Image
              src="/assets/Logo.svg"
              alt="Logo"
              width={246}
              height={53}
              className="object-contain"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden w-full md:flex items-start gap-6 ml-4">
            <Link
              href="/"
              className="text-white text- font-medium hover:text-gray-200 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-white text- font-medium hover:text-gray-200 transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-white text- font-medium hover:text-gray-200 transition-colors"
            >
              Contact Us
            </Link>
          </div>

          {/* Desktop Search Bar and Icons */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search Here..."
                className="w-[200px] lg:w-[320px] px-4 py-2 pr-10 rounded-lg bg-transparent text-gray-900 border focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>

            {/* Icon Buttons */}
            <button
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Help"
            >
              <HelpCircle className="w-6 h-6 text-white" />
            </button>
            <button
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-6 h-6 text-white" />
            </button>
            <button
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label="User Account"
            >
              <User className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 border-t border-white/20 pt-4">
            {/* Mobile Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search Here..."
                className="w-full px-4 py-2 pr-10 rounded-lg bg-transparent text-gray-900 border focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>

            {/* Mobile Navigation Links */}
            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                className="text-white text-lg font-medium hover:text-gray-200 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/properties"
                className="text-white text-lg font-medium hover:text-gray-200 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Properties
              </Link>
              <Link
                href="/about"
                className="text-white text-lg font-medium hover:text-gray-200 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>
            </div>

            {/* Mobile Icon Buttons */}
            <div className="flex items-center gap-4 pt-4 border-t border-white/20">
              <button
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Help"
              >
                <HelpCircle className="w-6 h-6 text-white" />
              </button>
              <button
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-6 h-6 text-white" />
              </button>
              <button
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="User Account"
              >
                <User className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
}
