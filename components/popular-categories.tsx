import Link from "next/link"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

async function getCategories() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  try {
    const res = await fetch(`${baseUrl}/api/categories`, {
      next: { revalidate: 600 }, // Revalidate every 10 minutes
    })
    if (!res.ok) {
      throw new Error('Failed to fetch categories')
    }
    const data = await res.json()
    return data.data || []
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export default async function PopularCategories() {
  const categories = await getCategories()

  return (
    <section className="border-b border-border/50 bg-gradient-to-b from-background to-background/50">
      <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-3">
              Explore by <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Category</span>
            </h2>
            <p className="text-muted-foreground text-lg">Browse libraries organized by their purpose and functionality</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.slice(0, 4).map((category: any) => (
            <Link key={category.id} href={`/categories/${category.slug}`} className="group">
              <Card className="h-full hover:border-primary/50 transition-all duration-300 bg-card/50 backdrop-blur-sm hover:shadow-glow hover:scale-105 cursor-pointer">
                <CardHeader className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">📦</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors duration-300">
                    {category.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    Discover {category.name.toLowerCase()} libraries
                  </p>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
