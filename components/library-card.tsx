import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import GitHubMetrics from "@/components/github-metrics"
import type { Library } from "@/lib/types"
import { ExternalLink } from "lucide-react"

interface LibraryCardProps {
  library: Library
}

export default function LibraryCard({ library }: LibraryCardProps) {
  return (
    <Link href={`/libraries/${library.slug}`} className="group">
      <Card className="h-full hover:border-primary/50 transition-all duration-300 bg-card/50 backdrop-blur-sm hover:shadow-glow hover:scale-[1.02] cursor-pointer overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <span className="text-sm">📦</span>
                </div>
                <ExternalLink className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                {library.name}
              </CardTitle>
            </div>
            {library.category && (
              <Badge 
                variant="secondary" 
                className="bg-secondary/20 text-secondary border-secondary/30 hover:bg-secondary/30"
              >
                {library.category.name}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {library.description}
          </p>
          <GitHubMetrics library={library} variant="compact" />
          {library.lastUpdated && (
            <div className="pt-2 border-t border-border/50">
              <p className="text-xs text-muted-foreground">
                Updated {new Date(library.lastUpdated).toLocaleDateString()}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
