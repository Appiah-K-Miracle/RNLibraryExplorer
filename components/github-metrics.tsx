import { Star, GitFork, Eye, AlertCircle, Activity, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { Library } from "@/lib/types"

interface GitHubMetricsProps {
  library: Library
  variant?: "compact" | "detailed"
}

export default function GitHubMetrics({ library, variant = "compact" }: GitHubMetricsProps) {
  const formatNumber = (num?: number) => {
    if (!num) return "0"
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`
    }
    return num.toString()
  }

  const getScoreColor = (score?: number) => {
    if (!score) return "text-muted-foreground"
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    return "text-orange-500"
  }

  const getScoreLabel = (score?: number) => {
    if (!score) return "N/A"
    if (score >= 80) return "Excellent"
    if (score >= 60) return "Good"
    if (score >= 40) return "Fair"
    return "Poor"
  }

  if (variant === "compact") {
    return (
      <div className="flex gap-2 flex-wrap">
        {library.githubStars !== undefined && (
          <Badge variant="secondary" className="gap-1">
            <Star className="w-3 h-3" />
            {formatNumber(library.githubStars)}
          </Badge>
        )}
        {library.githubForks !== undefined && (
          <Badge variant="secondary" className="gap-1">
            <GitFork className="w-3 h-3" />
            {formatNumber(library.githubForks)}
          </Badge>
        )}
        {library.openIssues !== undefined && (
          <Badge variant="secondary" className="gap-1">
            <AlertCircle className="w-3 h-3" />
            {formatNumber(library.openIssues)}
          </Badge>
        )}
      </div>
    )
  }

  // Detailed variant for library detail page
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold mb-4">GitHub Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* Stars */}
          {library.githubStars !== undefined && (
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-yellow-500/10">
                <Star className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{formatNumber(library.githubStars)}</p>
                <p className="text-xs text-muted-foreground">Stars</p>
              </div>
            </div>
          )}

          {/* Forks */}
          {library.githubForks !== undefined && (
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <GitFork className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{formatNumber(library.githubForks)}</p>
                <p className="text-xs text-muted-foreground">Forks</p>
              </div>
            </div>
          )}

          {/* Watchers */}
          {library.githubWatchers !== undefined && (
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Eye className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{formatNumber(library.githubWatchers)}</p>
                <p className="text-xs text-muted-foreground">Watchers</p>
              </div>
            </div>
          )}

          {/* Open Issues */}
          {library.openIssues !== undefined && (
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-orange-500/10">
                <AlertCircle className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{formatNumber(library.openIssues)}</p>
                <p className="text-xs text-muted-foreground">Open Issues</p>
              </div>
            </div>
          )}

          {/* Popularity Score */}
          {library.popularityScore !== undefined && (
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-pink-500/10">
                <TrendingUp className="w-5 h-5 text-pink-500" />
              </div>
              <div>
                <p className={`text-2xl font-bold ${getScoreColor(library.popularityScore)}`}>
                  {library.popularityScore}
                </p>
                <p className="text-xs text-muted-foreground">Popularity</p>
              </div>
            </div>
          )}

          {/* Maintenance Score */}
          {library.maintenanceScore !== undefined && (
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-green-500/10">
                <Activity className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className={`text-2xl font-bold ${getScoreColor(library.maintenanceScore)}`}>
                  {library.maintenanceScore}
                </p>
                <p className="text-xs text-muted-foreground">Maintenance</p>
              </div>
            </div>
          )}
        </div>

        {/* Last Commit Date */}
        {library.lastCommitDate && (
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Last commit: {new Date(library.lastCommitDate).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        )}

        {/* Health Summary */}
        {(library.maintenanceScore !== undefined || library.popularityScore !== undefined) && (
          <div className="mt-4 p-3 rounded-lg bg-muted/50">
            <p className="text-sm font-medium mb-1">Health Summary</p>
            <div className="flex gap-4 text-xs">
              {library.maintenanceScore !== undefined && (
                <span>
                  Maintenance: <span className={`font-semibold ${getScoreColor(library.maintenanceScore)}`}>
                    {getScoreLabel(library.maintenanceScore)}
                  </span>
                </span>
              )}
              {library.popularityScore !== undefined && (
                <span>
                  Popularity: <span className={`font-semibold ${getScoreColor(library.popularityScore)}`}>
                    {getScoreLabel(library.popularityScore)}
                  </span>
                </span>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
