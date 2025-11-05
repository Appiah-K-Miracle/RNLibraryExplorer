"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import SearchBar from "./search-bar"
import { Button } from "@/components/ui/button"
import { Sparkles, Code2, Rocket } from "lucide-react"

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/libraries?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <div className="relative overflow-hidden border-b border-border/50">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Curated for React Native Developers</span>
          </div>
          
          {/* Main heading with gradient */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent">
              Discover React Native
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Libraries & Packages
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Explore our curated collection of React Native libraries. 
            Find the perfect tools, components, and packages for your next mobile project.
          </p>

          {/* Search section with glassmorphism */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="flex flex-col sm:flex-row gap-3 p-2 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 shadow-xl">
              <div className="flex-1">
                <SearchBar value={searchQuery} onChange={setSearchQuery} />
              </div>
              <Button 
                onClick={handleSearch} 
                size="lg"
                className="gradient-primary hover:shadow-glow transition-all duration-300 font-semibold"
              >
                <Code2 className="w-5 h-5 mr-2" />
                Search Libraries
              </Button>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-300"
              onClick={() => router.push('/libraries')}
            >
              <Rocket className="w-5 h-5 mr-2" />
              Browse All Libraries
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-secondary/30 hover:border-secondary hover:bg-secondary/10 transition-all duration-300"
              onClick={() => router.push('/categories')}
            >
              View Categories
            </Button>
          </div>

          {/* Stats or features */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-border/50">
              <div className="text-3xl font-bold text-primary mb-2">20+</div>
              <div className="text-sm text-muted-foreground">Curated Libraries</div>
            </div>
            <div className="p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-border/50">
              <div className="text-3xl font-bold text-secondary mb-2">10+</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
            <div className="p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-border/50">
              <div className="text-3xl font-bold text-accent mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Developer Focused</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
