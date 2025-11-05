import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { categoriesData, librariesData } from "@/lib/mock-data"
import { ArrowRight } from "lucide-react"

export const metadata = {
  title: "Categories | React Native Libraries Showcase",
  description: "Browse React Native libraries by category. Find the right tools for your project.",
}

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Browse by Category</h1>
          <p className="text-lg text-muted-foreground">Explore React Native libraries organized by type and use case</p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoriesData.map((category) => {
            const count = librariesData.filter((lib) => lib.categoryId === category.id).length

            return (
              <Link key={category.id} href={`/categories/${category.slug}`}>
                <Card className="hover:border-primary transition-colors cursor-pointer h-full flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <CardTitle className="text-2xl">{category.name}</CardTitle>
                      </div>
                      <div className="text-2xl font-bold text-primary">{count}</div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex items-end">
                    <div className="flex items-center gap-2 text-primary">
                      <span className="text-sm font-medium">View Libraries</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </main>
  )
}
