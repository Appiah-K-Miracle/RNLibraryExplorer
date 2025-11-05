"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import SearchBar from "./search-bar"
import { Button } from "@/components/ui/button"

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/libraries?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <div className="relative overflow-hidden border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Discover React Native
            <br />
            <span className="text-primary">Libraries</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Curated, categorized, and ready to use. Find the perfect package for your React Native project.
          </p>

          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex gap-2">
              <div className="flex-1">
                <SearchBar value={searchQuery} onChange={setSearchQuery} />
              </div>
              <Button onClick={handleSearch} size="lg">
                Search
              </Button>
            </div>
          </div>

          <div className="flex justify-center gap-4 flex-wrap">
            <Button variant="outline">Browse All Libraries</Button>
            <Button variant="outline">View Categories</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
