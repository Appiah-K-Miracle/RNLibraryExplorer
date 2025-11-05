import LibraryCard from "./library-card"
import { Zap } from "lucide-react"

async function getLibraries() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  try {
    const res = await fetch(`${baseUrl}/api/libraries`, {
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    })
    if (!res.ok) {
      throw new Error('Failed to fetch libraries')
    }
    const data = await res.json()
    return data.data || []
  } catch (error) {
    console.error('Error fetching libraries:', error)
    return []
  }
}

export default async function TrendingLibraries() {
  const libraries = await getLibraries()
  const trending = libraries
    .sort((a: any, b: any) => {
      const dateA = a.lastUpdated ? new Date(a.lastUpdated).getTime() : 0
      const dateB = b.lastUpdated ? new Date(b.lastUpdated).getTime() : 0
      return dateB - dateA
    })
    .slice(0, 6)

  return (
    <section className="border-b border-border/50 bg-gradient-to-b from-background/50 to-background">
      <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-12">
          <div className="p-3 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20">
            <Zap className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-foreground">
              Recently <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Updated</span>
            </h2>
            <p className="text-muted-foreground text-lg mt-1">Stay current with the latest library updates</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {trending.map((library: any) => (
            <LibraryCard key={library.id} library={library} />
          ))}
        </div>
      </div>
    </section>
  )
}
