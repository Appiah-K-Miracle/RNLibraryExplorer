import LibraryCard from "./library-card"

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
    <section className="border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-foreground mb-8">Recently Updated</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {trending.map((library: any) => (
            <LibraryCard key={library.id} library={library} />
          ))}
        </div>
      </div>
    </section>
  )
}
