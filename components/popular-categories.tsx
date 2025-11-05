import Link from "next/link"
import { categoriesData } from "@/lib/mock-data"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"

export default function PopularCategories() {
  return (
    <section className="border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-foreground mb-8">Categories</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categoriesData.slice(0, 4).map((category) => (
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
