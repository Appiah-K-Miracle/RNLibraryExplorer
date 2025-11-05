import { notFound } from "next/navigation"
import type { Metadata } from "next"
import LibraryDetailClient from "./LibraryDetailClient"

async function getLibrary(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  try {
    const res = await fetch(`${baseUrl}/api/libraries/${slug}`, {
      cache: 'no-store',
    })
    if (!res.ok) {
      return null
    }
    const data = await res.json()
    return data.data
  } catch (error) {
    console.error('Error fetching library:', error)
    return null
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const library = await getLibrary(slug)

  if (!library) {
    return {
      title: "Library Not Found",
      description: "The library you're looking for doesn't exist.",
    }
  }

  return {
    title: `${library.name} | React Native Libraries`,
    description: library.description,
    keywords: [library.name, "React Native", "npm package", "library"],
    openGraph: {
      title: library.name,
      description: library.description,
      type: "website",
    },
    alternates: {
      canonical: `/libraries/${library.slug}`,
    },
  }
}

export default async function LibraryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const library = await getLibrary(slug)

  if (!library) {
    notFound()
  }

  return <LibraryDetailClient library={library} slug={slug} />
}
