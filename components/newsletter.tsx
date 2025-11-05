"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function Newsletter() {
  const [email, setEmail] = useState("")

  return (
    <section className="border-b border-border py-16">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">Stay Updated</h2>
        <p className="text-muted-foreground mb-8">Get notified about new libraries and updates</p>
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg border border-border bg-card text-foreground"
          />
          <Button>Subscribe</Button>
        </div>
      </div>
    </section>
  )
}
