import Hero from "@/components/hero"
import PopularCategories from "@/components/popular-categories"
import TrendingLibraries from "@/components/trending-libraries"
import Newsletter from "@/components/newsletter"

export const metadata = {
  title: "React Native Libraries Showcase | Discover Curated Packages",
  description:
    "Discover curated and categorized React Native libraries with installation instructions, examples, and alternatives. Browse 16+ essential packages for your React Native projects.",
  openGraph: {
    title: "React Native Libraries Showcase",
    description: "Discover the best curated React Native packages and tools",
    type: "website",
  },
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <PopularCategories />
      <TrendingLibraries />
      <Newsletter />
    </main>
  )
}
