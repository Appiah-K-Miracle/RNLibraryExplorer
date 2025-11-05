"use client"

import { useState } from "react"
import { librariesData, categoriesData } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2, BarChart3 } from "lucide-react"

export default function AdminPage() {
  const [libraries, setLibraries] = useState(librariesData)

  const stats = {
    totalLibraries: libraries.length,
    totalCategories: categoriesData.length,
    avgUpdatedDays: Math.round(
      libraries.reduce((acc, lib) => {
        const days = lib.lastUpdated
          ? Math.floor((Date.now() - new Date(lib.lastUpdated).getTime()) / (1000 * 60 * 60 * 24))
          : 0
        return acc + days
      }, 0) / libraries.length,
    ),
  }

  const getCategoryName = (categoryId: string) => {
    return categoriesData.find((cat) => cat.id === categoryId)?.name || "Unknown"
  }

  const handleDeleteLibrary = (id: string) => {
    if (confirm("Are you sure you want to delete this library?")) {
      setLibraries(libraries.filter((lib) => lib.id !== id))
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">Manage libraries, categories, and view analytics</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Libraries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.totalLibraries}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.totalCategories}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Days Since Update</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.avgUpdatedDays}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="libraries" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="libraries">Libraries</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Libraries Tab */}
          <TabsContent value="libraries" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-foreground">Manage Libraries</h2>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Library
              </Button>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Last Updated</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {libraries.map((library) => (
                        <TableRow key={library.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium text-foreground">{library.name}</p>
                              <p className="text-sm text-muted-foreground line-clamp-1">{library.description}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{getCategoryName(library.categoryId)}</Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {library.lastUpdated ? new Date(library.lastUpdated).toLocaleDateString() : "Never"}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                                <Edit className="w-4 h-4" />
                                Edit
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-1 text-destructive hover:text-destructive bg-transparent"
                                onClick={() => handleDeleteLibrary(library.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-foreground">Manage Categories</h2>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Category
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categoriesData.map((category) => {
                const count = libraries.filter((lib) => lib.categoryId === category.id).length
                return (
                  <Card key={category.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <CardTitle>{category.name}</CardTitle>
                          <CardDescription>{count} libraries</CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground mb-4">Analytics</h2>

            {/* Libraries by Category */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Libraries by Category
                </CardTitle>
                <CardDescription>Distribution of libraries across categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoriesData.map((category) => {
                    const count = libraries.filter((lib) => lib.categoryId === category.id).length
                    const percentage = Math.round((count / libraries.length) * 100)
                    return (
                      <div key={category.id}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-foreground">{category.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {count} ({percentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: `${percentage}%` }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Recently Updated Libraries */}
            <Card>
              <CardHeader>
                <CardTitle>Recently Updated Libraries</CardTitle>
                <CardDescription>Last 5 libraries sorted by update date</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {libraries
                    .sort((a, b) => {
                      const dateA = a.lastUpdated ? new Date(a.lastUpdated).getTime() : 0
                      const dateB = b.lastUpdated ? new Date(b.lastUpdated).getTime() : 0
                      return dateB - dateA
                    })
                    .slice(0, 5)
                    .map((lib) => (
                      <div key={lib.id} className="flex items-center justify-between pb-3 border-b last:border-0">
                        <div>
                          <p className="font-medium text-foreground">{lib.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {lib.lastUpdated ? new Date(lib.lastUpdated).toLocaleDateString() : "Never updated"}
                          </p>
                        </div>
                        <Badge variant="secondary">{getCategoryName(lib.categoryId)}</Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
