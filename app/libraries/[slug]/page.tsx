import { notFound } from "next/navigation"
import { librariesData, categoriesData } from "@/lib/mock-data"
import type { Metadata } from "next"
import LibraryDetailClient from "./LibraryDetailClient"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const library = librariesData.find((lib) => lib.slug === slug)

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
  const library = librariesData.find((lib) => lib.slug === slug)

  if (!library) {
    notFound()
  }

  const category = categoriesData.find((cat) => cat.id === library.categoryId)
  const alternatives = (library.alternatives
    ?.map((altId) => librariesData.find((lib) => lib.id === altId))
    .filter(Boolean)) || []

  return <LibraryDetailClient library={library} category={category} alternatives={alternatives} slug={slug} />
}
