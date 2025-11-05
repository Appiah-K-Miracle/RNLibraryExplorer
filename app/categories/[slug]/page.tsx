import Link from "next/link"
import { notFound } from "next/navigation"
import LibraryCard from "@/components/library-card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

async function getCategory(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  try {
    const res = await fetch(`${baseUrl}/api/categories/${slug}`, {
      cache: 'no-store',
    })
    if (!res.ok) {
      return null
    }
    const data = await res.json()
    return data.data
  } catch (error) {
    console.error('Error fetching category:', error)
    return null
  }
}

async function getAllCategories() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  try {
    const res = await fetch(`${baseUrl}/api/categories`, {
      cache: 'no-store',
    })
    if (!res.ok) {
      return []
    }
    const data = await res.json()
    return data.data || []
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = await getCategory(slug)

  if (!category) {
    return {
      title: "Category Not Found",
      description: "The category you're looking for doesn't exist.",
    }
  }

  const count = category.libraries?.length || 0

  return {
    title: `${category.name} Libraries | React Native Libraries Showcase`,
    description: `Discover ${count} React Native libraries in the ${category.name} category.`,
    openGraph: {
      title: `${category.name} Libraries`,
      description: `Browse ${count} React Native packages for ${category.name}`,
      type: "website",
    },
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = await getCategory(slug)
  const allCategories = await getAllCategories()

  if (!category) {
    notFound()
  }

  const libraries = category.libraries || []

  return (
    <main className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/categories" className="flex items-center gap-2 text-sm text-primary hover:underline w-fit">
            <ArrowLeft className="w-4 h-4" />
            Back to Categories
          </Link>
        </div>
      </div>

      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">{category.name}</h1>
          <p className="text-lg text-muted-foreground mb-6">
            {libraries.length} {libraries.length === 1 ? "library" : "libraries"} in this category
          </p>

          {/* Quick Navigation to Other Categories */}
          <div className="flex flex-wrap gap-2">
            {allCategories
              .filter((cat: any) => cat.id !== category.id)
              .map((cat: any) => (
                <Link key={cat.id} href={`/categories/${cat.slug}`}>
                  <Button variant="outline" size="sm">
                    {cat.name}
                  </Button>
                </Link>
              ))}
          </div>
        </div>
      </div>

      {/* Libraries Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {libraries.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {libraries.map((library: any) => (
              <LibraryCard key={library.id} library={library} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No libraries found in this category.</p>
          </div>
        )}
      </div>
    </main>
  )
}
