"use client"

import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import LibraryCard from "@/components/library-card"
import SearchBar from "@/components/search-bar"
import { librariesData, categoriesData } from "@/lib/mock-data"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export default function LibrariesClientPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""

  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("name")

  const filteredLibraries = useMemo(() => {
    let results = librariesData

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      results = results.filter(
        (lib) => lib.name.toLowerCase().includes(query) || lib.description.toLowerCase().includes(query),
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      results = results.filter((lib) => lib.categoryId === selectedCategory)
    }

    // Sort
    switch (sortBy) {
      case "name":
        results.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "recent":
        results.sort((a, b) => {
          const dateA = a.lastUpdated ? new Date(a.lastUpdated).getTime() : 0
          const dateB = b.lastUpdated ? new Date(b.lastUpdated).getTime() : 0
          return dateB - dateA
        })
        break
      case "oldest":
        results.sort((a, b) => {
          const dateA = a.lastUpdated ? new Date(a.lastUpdated).getTime() : 0
          const dateB = b.lastUpdated ? new Date(b.lastUpdated).getTime() : 0
          return dateA - dateB
        })
        break
    }

    return results
  }, [searchQuery, selectedCategory, sortBy])

  const hasActiveFilters = searchQuery.trim() || selectedCategory !== "all"

  const handleClearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">React Native Libraries</h1>
          <p className="text-lg text-muted-foreground">
            Browse {librariesData.length} carefully curated packages for React Native development
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="border-b border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 items-end">
            {/* Search */}
            <div className="md:col-span-2 lg:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">Search Libraries</label>
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categoriesData.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Sort By</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                  <SelectItem value="recent">Recently Updated</SelectItem>
                  <SelectItem value="oldest">Oldest Updated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <div className="mt-4">
              <Button variant="outline" size="sm" onClick={handleClearFilters} className="gap-2 bg-transparent">
                <X className="w-4 h-4" />
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {filteredLibraries.length > 0 ? (
          <>
            <div className="mb-6 text-sm text-muted-foreground">
              Showing {filteredLibraries.length} of {librariesData.length} libraries
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredLibraries.map((library) => (
                <LibraryCard key={library.id} library={library} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">No libraries found matching your criteria.</p>
            <Button variant="outline" onClick={handleClearFilters}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}
