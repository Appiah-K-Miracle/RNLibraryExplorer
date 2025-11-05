"use client"

import { notFound } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Github, Package } from "lucide-react"
import CodeBlock from "@/components/code-block"
import GitHubMetrics from "@/components/github-metrics"
import type { Library } from "@/lib/types"

interface LibraryDetailClientProps {
  library: Library
  slug: string
}

export default function LibraryDetailClient({ library, slug }: LibraryDetailClientProps) {
  if (!library) {
    notFound()
  }

  const category = library.category

  return (
    <main className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-card/50">
        <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/libraries" className="text-primary hover:underline">
              Libraries
            </Link>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">{library.name}</span>
          </div>
        </div>
      </div>

      {/* Header Section */}
      <div className="border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <h1 className="text-5xl font-bold text-foreground mb-2">{library.name}</h1>
              <p className="text-xl text-muted-foreground mb-4">{library.description}</p>
              <div className="flex items-center gap-2">
                {category && <Badge>{category.name}</Badge>}
                {library.lastUpdated && (
                  <span className="text-sm text-muted-foreground">
                    Updated {new Date(library.lastUpdated).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-6">
            <a href={library.npmUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="default" className="gap-2">
                <Package className="w-4 h-4" />
                View on NPM
              </Button>
            </a>
            <a href={library.githubUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="gap-2 bg-transparent">
                <Github className="w-4 h-4" />
                GitHub
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* GitHub Metrics Section */}
        <div className="mb-8">
          <GitHubMetrics library={library} variant="detailed" />
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="installation">Installation</TabsTrigger>
            <TabsTrigger value="example">Example</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {library.pros && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Pros</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {library.pros.split("\n").map((pro, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <span className="text-green-500 font-bold mt-0.5">✓</span>
                          <span className="text-foreground">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {library.cons && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Cons</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {library.cons.split("\n").map((con, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <span className="text-red-500 font-bold mt-0.5">✕</span>
                          <span className="text-foreground">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Installation Tab */}
          <TabsContent value="installation" className="space-y-6">
            {library.installNpm && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">NPM Installation</CardTitle>
                </CardHeader>
                <CardContent>
                  <CodeBlock code={library.installNpm} language="bash" />
                </CardContent>
              </Card>
            )}

            {library.installExpo && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Expo Installation</CardTitle>
                </CardHeader>
                <CardContent>
                  <CodeBlock code={library.installExpo} language="bash" />
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Example Tab */}
          <TabsContent value="example" className="space-y-6">
            {library.codeExample && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Code Example</CardTitle>
                  <CardDescription>Here's a basic example of how to use {library.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock code={library.codeExample} language="typescript" />
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Related Libraries */}
        {category && (
          <div className="mt-16 pt-8 border-t border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">More in {category.name}</h2>
            <p className="text-muted-foreground mb-4">
              Browse the libraries page to discover more {category.name} packages.
            </p>
            <Link href={`/categories/${category.slug}`}>
              <Button variant="outline">
                View all {category.name} libraries
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}
