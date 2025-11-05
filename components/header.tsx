"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
              RN
            </div>
            <span className="hidden sm:inline">React Native Libraries</span>
            <span className="sm:hidden">RN Libraries</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/libraries" className="text-foreground hover:text-primary transition-colors">
              All Libraries
            </Link>
            <Link href="/categories" className="text-foreground hover:text-primary transition-colors">
              Categories
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/admin" className="text-foreground hover:text-primary transition-colors">
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/libraries" className="block px-3 py-2 text-foreground hover:text-primary transition-colors">
              All Libraries
            </Link>
            <Link href="/categories" className="block px-3 py-2 text-foreground hover:text-primary transition-colors">
              Categories
            </Link>
            <Link href="/about" className="block px-3 py-2 text-foreground hover:text-primary transition-colors">
              About
            </Link>
            
          </div>
        )}
      </nav>
    </header>
  )
}
