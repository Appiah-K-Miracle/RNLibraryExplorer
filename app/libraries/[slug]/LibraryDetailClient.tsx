"use client"

import { notFound } from "next/navigation"
import Link from "next/link"
import { librariesData } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Github, Package } from "lucide-react"
import CodeBlock from "@/components/code-block"
import type { Library, Category } from "@/lib/types"

interface LibraryDetailClientProps {
  library: Library
  category?: Category
  alternatives: (Library | undefined)[]
  slug: string
}

export default function LibraryDetailClient({ library, category, alternatives, slug }: LibraryDetailClientProps) {
  if (!library) {
    notFound()
  }

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
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="installation">Installation</TabsTrigger>
            <TabsTrigger value="example">Example</TabsTrigger>
            <TabsTrigger value="alternatives">Alternatives</TabsTrigger>
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

          {/* Alternatives Tab */}
          <TabsContent value="alternatives" className="space-y-6">
            {alternatives && alternatives.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                <p className="text-muted-foreground">Consider these alternatives to {library.name}:</p>
                {alternatives.map((alt) => (
                  <Link key={alt?.id} href={`/libraries/${alt?.slug}`}>
                    <Card className="hover:border-primary transition-colors cursor-pointer">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <CardTitle className="text-lg">{alt?.name}</CardTitle>
                            <CardDescription>{alt?.description}</CardDescription>
                          </div>
                          <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
                        </div>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground">No alternatives available for this library.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Related Libraries */}
        <div className="mt-16 pt-8 border-t border-border">
          <h2 className="text-2xl font-bold text-foreground mb-6">More in {category?.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {librariesData
              .filter((lib) => lib.categoryId === library.categoryId && lib.id !== library.id)
              .slice(0, 4)
              .map((lib) => (
                <Link key={lib.id} href={`/libraries/${lib.slug}`}>
                  <Card className="hover:border-primary transition-colors cursor-pointer h-full">
                    <CardHeader>
                      <CardTitle className="text-lg">{lib.name}</CardTitle>
                      <CardDescription>{lib.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </main>
  )
}
