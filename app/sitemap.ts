import { prisma } from "@/lib/prisma"

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://rn-libraries.example.com"

  // Fetch libraries and categories from database
  const libraries = await prisma.library.findMany({
    select: {
      slug: true,
      lastUpdated: true,
    },
  })

  const categories = await prisma.category.findMany({
    select: {
      slug: true,
    },
  })

  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/libraries`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/admin`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    },
  ]

  // Library detail routes
  const libraryRoutes = libraries.map((library) => ({
    url: `${baseUrl}/libraries/${library.slug}`,
    lastModified: library.lastUpdated || new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  // Category routes
  const categoryRoutes = categories.map((category) => ({
    url: `${baseUrl}/categories/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  return [...staticRoutes, ...libraryRoutes, ...categoryRoutes]
}
