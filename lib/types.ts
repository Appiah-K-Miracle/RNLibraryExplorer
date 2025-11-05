export interface Category {
  id: string
  name: string
  slug: string
  createdAt?: Date | string
  updatedAt?: Date | string
  _count?: {
    libraries: number
  }
}

export interface Library {
  id: string
  name: string
  slug: string
  description: string
  categoryId: string
  githubUrl: string
  npmUrl: string
  pros?: string | null
  cons?: string | null
  installNpm?: string | null
  installExpo?: string | null
  codeExample?: string | null
  
  // GitHub Metrics
  githubStars?: number | null
  githubForks?: number | null
  githubWatchers?: number | null
  openIssues?: number | null
  lastCommitDate?: Date | string | null
  issuesLast30Days?: number | null
  
  // Popularity/Health Scoring
  popularityScore?: number | null
  maintenanceScore?: number | null
  
  lastUpdated?: Date | string | null
  createdAt?: Date | string
  updatedAt?: Date | string
  
  // Relationships
  category?: Category
  alternatives?: string[]
}
