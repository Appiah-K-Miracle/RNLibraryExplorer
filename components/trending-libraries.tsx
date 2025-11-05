import LibraryCard from "./library-card"
import { librariesData } from "@/lib/mock-data"

export default function TrendingLibraries() {
  const trending = librariesData
    .sort((a, b) => new Date(b.lastUpdated || 0).getTime() - new Date(a.lastUpdated || 0).getTime())
    .slice(0, 6)

  return (
    <section className="border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-foreground mb-8">Recently Updated</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {trending.map((library) => (
            <LibraryCard key={library.id} library={library} />
          ))}
        </div>
      </div>
    </section>
  )
}
