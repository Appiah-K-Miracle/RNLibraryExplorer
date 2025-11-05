import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { categoriesData } from "@/lib/mock-data"

interface LibraryCardProps {
  library: {
    id: string
    name: string
    slug: string
    description: string
    categoryId: string
    lastUpdated?: Date
  }
}

export default function LibraryCard({ library }: LibraryCardProps) {
  const category = categoriesData.find((cat) => cat.id === library.categoryId)

  return (
    <Link href={`/libraries/${library.slug}`}>
      <Card className="hover:border-primary transition-colors cursor-pointer h-full">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <CardTitle className="text-lg">{library.name}</CardTitle>
            </div>
            {category && <Badge variant="secondary">{category.name}</Badge>}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2">{library.description}</p>
          {library.lastUpdated && (
            <p className="text-xs text-muted-foreground mt-4">
              Updated {new Date(library.lastUpdated).toLocaleDateString()}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
