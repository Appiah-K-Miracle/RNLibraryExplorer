import Link from "next/link"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"

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
    <section className="border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-foreground mb-8">Categories</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.slice(0, 4).map((category: any) => (
            <Link key={category.id} href={`/categories/${category.slug}`}>
              <Card className="hover:border-primary transition-colors cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
