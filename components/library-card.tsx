import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Library } from "@/lib/types"

interface LibraryCardProps {
  library: Library
}

export default function LibraryCard({ library }: LibraryCardProps) {
  return (
    <Link href={`/libraries/${library.slug}`}>
      <Card className="hover:border-primary transition-colors cursor-pointer h-full">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <CardTitle className="text-lg">{library.name}</CardTitle>
            </div>
            {library.category && <Badge variant="secondary">{library.category.name}</Badge>}
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
