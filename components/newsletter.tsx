"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail, Bell } from "lucide-react"

export default function Newsletter() {
  const [email, setEmail] = useState("")

  return (
    <section className="border-b border-border/50 py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      
      <div className="relative max-w-3xl mx-auto px-4 text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 mb-6">
          <Bell className="w-8 h-8 text-primary" />
        </div>
        
        <h2 className="text-4xl font-bold text-foreground mb-3">
          Stay in the <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Loop</span>
        </h2>
        <p className="text-muted-foreground mb-10 text-lg max-w-xl mx-auto">
          Get notified about new libraries, updates, and curated collections delivered to your inbox
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto p-2 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 shadow-xl">
          <div className="flex-1 relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full pl-12 pr-4 py-3 rounded-xl border-0 bg-background/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <Button 
            size="lg"
            className="gradient-primary hover:shadow-glow transition-all duration-300 font-semibold"
          >
            Subscribe
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground mt-4">
          Join 1,000+ developers staying updated. Unsubscribe anytime.
        </p>
      </div>
    </section>
  )
}
