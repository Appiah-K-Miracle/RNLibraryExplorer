"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash2, BarChart3, RefreshCw, Loader2 } from "lucide-react"
import { toast } from "sonner"
import type { Library, Category } from "@/lib/types"

export default function AdminPage() {
  const [libraries, setLibraries] = useState<Library[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [isLibraryDialogOpen, setIsLibraryDialogOpen] = useState(false)
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false)
  const [editingLibrary, setEditingLibrary] = useState<Library | null>(null)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  // Form states
  const [libraryForm, setLibraryForm] = useState({
    name: "",
    slug: "",
    description: "",
    categoryId: "",
    githubUrl: "",
    npmUrl: "",
    pros: "",
    cons: "",
    installNpm: "",
    installExpo: "",
    codeExample: ""
  })

  const [categoryForm, setCategoryForm] = useState({
    name: "",
    slug: ""
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [libsRes, catsRes] = await Promise.all([
        fetch('/api/libraries'),
        fetch('/api/categories')
      ])

      const libsData = await libsRes.json()
      const catsData = await catsRes.json()

      if (libsData.success) setLibraries(libsData.data)
      if (catsData.success) setCategories(catsData.data)
    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const syncGitHubMetrics = async () => {
    setSyncing(true)
    try {
      const res = await fetch('/api/libraries/sync', { method: 'POST' })
      const data = await res.json()

      if (data.success) {
        toast.success(data.message)
        await fetchData()
      } else {
        toast.error(data.error || 'Failed to sync GitHub metrics')
      }
    } catch (error) {
      console.error('Error syncing GitHub metrics:', error)
      toast.error('Failed to sync GitHub metrics')
    } finally {
      setSyncing(false)
    }
  }

  const handleLibrarySubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const url = editingLibrary 
        ? `/api/libraries/${editingLibrary.slug}`
        : '/api/libraries'
      
      const method = editingLibrary ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(libraryForm)
      })

      const data = await res.json()

      if (data.success) {
        toast.success(data.message)
        setIsLibraryDialogOpen(false)
        resetLibraryForm()
        await fetchData()
      } else {
        toast.error(data.error || 'Operation failed')
      }
    } catch (error) {
      console.error('Error saving library:', error)
      toast.error('Failed to save library')
    }
  }

  const handleDeleteLibrary = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this library?")) return

    try {
      const res = await fetch(`/api/libraries/${slug}`, { method: 'DELETE' })
      const data = await res.json()

      if (data.success) {
        toast.success(data.message)
        await fetchData()
      } else {
        toast.error(data.error || 'Failed to delete library')
      }
    } catch (error) {
      console.error('Error deleting library:', error)
      toast.error('Failed to delete library')
    }
  }

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const url = editingCategory 
        ? `/api/categories/${editingCategory.slug}`
        : '/api/categories'
      
      const method = editingCategory ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryForm)
      })

      const data = await res.json()

      if (data.success) {
        toast.success(data.message)
        setIsCategoryDialogOpen(false)
        resetCategoryForm()
        await fetchData()
      } else {
        toast.error(data.error || 'Operation failed')
      }
    } catch (error) {
      console.error('Error saving category:', error)
      toast.error('Failed to save category')
    }
  }

  const handleDeleteCategory = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return

    try {
      const res = await fetch(`/api/categories/${slug}`, { method: 'DELETE' })
      const data = await res.json()

      if (data.success) {
        toast.success(data.message)
        await fetchData()
      } else {
        toast.error(data.error || 'Failed to delete category')
      }
    } catch (error) {
      console.error('Error deleting category:', error)
      toast.error('Failed to delete category')
    }
  }

  const openEditLibrary = (library: Library) => {
    setEditingLibrary(library)
    setLibraryForm({
      name: library.name,
      slug: library.slug,
      description: library.description,
      categoryId: library.categoryId,
      githubUrl: library.githubUrl,
      npmUrl: library.npmUrl,
      pros: library.pros || "",
      cons: library.cons || "",
      installNpm: library.installNpm || "",
      installExpo: library.installExpo || "",
      codeExample: library.codeExample || ""
    })
    setIsLibraryDialogOpen(true)
  }

  const openEditCategory = (category: Category) => {
    setEditingCategory(category)
    setCategoryForm({
      name: category.name,
      slug: category.slug
    })
    setIsCategoryDialogOpen(true)
  }

  const resetLibraryForm = () => {
    setEditingLibrary(null)
    setLibraryForm({
      name: "",
      slug: "",
      description: "",
      categoryId: "",
      githubUrl: "",
      npmUrl: "",
      pros: "",
      cons: "",
      installNpm: "",
      installExpo: "",
      codeExample: ""
    })
  }

  const resetCategoryForm = () => {
    setEditingCategory(null)
    setCategoryForm({
      name: "",
      slug: ""
    })
  }

  const getCategoryName = (categoryId: string) => {
    return categories.find((cat) => cat.id === categoryId)?.name || "Unknown"
  }

  const stats = {
    totalLibraries: libraries.length,
    totalCategories: categories.length,
    avgUpdatedDays: libraries.length > 0 ? Math.round(
      libraries.reduce((acc, lib) => {
        const days = lib.lastUpdated
          ? Math.floor((Date.now() - new Date(lib.lastUpdated).getTime()) / (1000 * 60 * 60 * 24))
          : 0
        return acc + days
      }, 0) / libraries.length
    ) : 0,
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Admin Panel</h1>
              <p className="text-muted-foreground">Manage libraries, categories, and sync GitHub metrics</p>
            </div>
            <Button onClick={syncGitHubMetrics} disabled={syncing} className="gap-2">
              {syncing ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              Sync GitHub Data
            </Button>
          </div>
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
              <Button onClick={() => {
                resetLibraryForm()
                setIsLibraryDialogOpen(true)
              }} className="gap-2">
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
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="gap-1 bg-transparent"
                                onClick={() => openEditLibrary(library)}
                              >
                                <Edit className="w-4 h-4" />
                                Edit
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-1 text-destructive hover:text-destructive bg-transparent"
                                onClick={() => handleDeleteLibrary(library.slug)}
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
              <Button onClick={() => {
                resetCategoryForm()
                setIsCategoryDialogOpen(true)
              }} className="gap-2">
                <Plus className="w-4 h-4" />
                Add Category
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map((category) => {
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
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => openEditCategory(category)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteCategory(category.slug)}
                          >
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
                  {categories.map((category) => {
                    const count = libraries.filter((lib) => lib.categoryId === category.id).length
                    const percentage = libraries.length > 0 ? Math.round((count / libraries.length) * 100) : 0
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

      {/* Library Dialog */}
      <Dialog open={isLibraryDialogOpen} onOpenChange={setIsLibraryDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingLibrary ? 'Edit Library' : 'Add New Library'}</DialogTitle>
            <DialogDescription>
              {editingLibrary ? 'Update library information' : 'Fill in the details to add a new library'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleLibrarySubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Name *</label>
                <Input
                  value={libraryForm.name}
                  onChange={(e) => setLibraryForm({...libraryForm, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Slug *</label>
                <Input
                  value={libraryForm.slug}
                  onChange={(e) => setLibraryForm({...libraryForm, slug: e.target.value})}
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Description *</label>
              <Textarea
                value={libraryForm.description}
                onChange={(e) => setLibraryForm({...libraryForm, description: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Category *</label>
              <Select value={libraryForm.categoryId} onValueChange={(value) => setLibraryForm({...libraryForm, categoryId: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">GitHub URL *</label>
                <Input
                  value={libraryForm.githubUrl}
                  onChange={(e) => setLibraryForm({...libraryForm, githubUrl: e.target.value})}
                  placeholder="https://github.com/owner/repo"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">NPM URL *</label>
                <Input
                  value={libraryForm.npmUrl}
                  onChange={(e) => setLibraryForm({...libraryForm, npmUrl: e.target.value})}
                  placeholder="https://www.npmjs.com/package/name"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Pros (one per line)</label>
                <Textarea
                  value={libraryForm.pros}
                  onChange={(e) => setLibraryForm({...libraryForm, pros: e.target.value})}
                  rows={3}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Cons (one per line)</label>
                <Textarea
                  value={libraryForm.cons}
                  onChange={(e) => setLibraryForm({...libraryForm, cons: e.target.value})}
                  rows={3}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">NPM Install Command</label>
              <Input
                value={libraryForm.installNpm}
                onChange={(e) => setLibraryForm({...libraryForm, installNpm: e.target.value})}
                placeholder="npm install package-name"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Expo Install Command</label>
              <Input
                value={libraryForm.installExpo}
                onChange={(e) => setLibraryForm({...libraryForm, installExpo: e.target.value})}
                placeholder="expo install package-name"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Code Example</label>
              <Textarea
                value={libraryForm.codeExample}
                onChange={(e) => setLibraryForm({...libraryForm, codeExample: e.target.value})}
                rows={4}
                placeholder="import { Component } from 'package';"
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsLibraryDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingLibrary ? 'Update' : 'Create'} Library
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Category Dialog */}
      <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCategory ? 'Edit Category' : 'Add New Category'}</DialogTitle>
            <DialogDescription>
              {editingCategory ? 'Update category information' : 'Fill in the details to add a new category'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCategorySubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name *</label>
              <Input
                value={categoryForm.name}
                onChange={(e) => setCategoryForm({...categoryForm, name: e.target.value})}
                required
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Slug *</label>
              <Input
                value={categoryForm.slug}
                onChange={(e) => setCategoryForm({...categoryForm, slug: e.target.value})}
                required
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsCategoryDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingCategory ? 'Update' : 'Create'} Category
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  )
}
