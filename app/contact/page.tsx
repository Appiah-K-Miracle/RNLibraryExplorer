"use client"

import { Button } from "@/components/ui/button"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-foreground mb-8">Contact Us</h1>
        <div className="p-8 rounded-lg border border-border bg-card">
          <p className="text-muted-foreground mb-6">
            Have suggestions for libraries or feedback about the platform? We'd love to hear from you.
          </p>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Message</label>
              <textarea
                rows={6}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
                placeholder="Your message here..."
              />
            </div>
            <Button className="w-full">Send Message</Button>
          </form>
        </div>
      </div>
    </main>
  )
}
