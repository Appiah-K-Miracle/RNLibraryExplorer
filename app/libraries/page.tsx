import LibrariesClientPage from "./libraries-client"

export const metadata = {
  title: "All React Native Libraries | Browse Packages",
  description:
    "Browse our complete collection of React Native libraries. Search and filter by category to find the perfect packages for your project.",
}

async function getLibraries() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  try {
    const res = await fetch(`${baseUrl}/api/libraries`, {
      cache: 'no-store',
    })
    if (!res.ok) {
      throw new Error('Failed to fetch libraries')
    }
    const data = await res.json()
    return data.data || []
  } catch (error) {
    console.error('Error fetching libraries:', error)
    return []
  }
}

async function getCategories() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  try {
    const res = await fetch(`${baseUrl}/api/categories`, {
      cache: 'no-store',
    })
    if (!res.ok) {
      throw new Error('Failed to fetch categories')
    }
    const data = await res.json()
    return data.data || []
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export default async function LibrariesPage() {
  const libraries = await getLibraries()
  const categories = await getCategories()

  return <LibrariesClientPage libraries={libraries} categories={categories} />
}
