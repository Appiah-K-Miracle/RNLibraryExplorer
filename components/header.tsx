"use client"

import Link from "next/link"
import { Menu, X, Sparkles } from "lucide-react"
import { useState } from "react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo with gradient */}
          <Link href="/" className="flex items-center gap-3 font-bold text-xl group">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center text-primary-foreground shadow-glow transition-all duration-300 group-hover:scale-110">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="hidden sm:inline bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              React Native Libraries
            </span>
            <span className="sm:hidden bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              RN Libraries
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="/libraries" 
              className="text-foreground/80 hover:text-primary transition-all duration-300 font-medium hover:scale-105"
            >
              All Libraries
            </Link>
            <Link 
              href="/categories" 
              className="text-foreground/80 hover:text-secondary transition-all duration-300 font-medium hover:scale-105"
            >
              Categories
            </Link>
            <Link 
              href="/about" 
              className="text-foreground/80 hover:text-accent transition-all duration-300 font-medium hover:scale-105"
            >
              About
            </Link>
            <Link 
              href="/admin" 
              className="px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 transition-all duration-300 font-medium hover:shadow-glow"
            >
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors" 
            onClick={() => setIsOpen(!isOpen)} 
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-border/50 mt-2 pt-4">
            <Link 
              href="/libraries" 
              className="block px-4 py-3 rounded-lg text-foreground/80 hover:text-primary hover:bg-primary/10 transition-all duration-300"
            >
              All Libraries
            </Link>
            <Link 
              href="/categories" 
              className="block px-4 py-3 rounded-lg text-foreground/80 hover:text-secondary hover:bg-secondary/10 transition-all duration-300"
            >
              Categories
            </Link>
            <Link 
              href="/about" 
              className="block px-4 py-3 rounded-lg text-foreground/80 hover:text-accent hover:bg-accent/10 transition-all duration-300"
            >
              About
            </Link>
            <Link 
              href="/admin" 
              className="block px-4 py-3 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 transition-all duration-300"
            >
              Admin
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
