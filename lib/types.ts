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
  pros?: string
  cons?: string
  installNpm?: string
  installExpo?: string
  codeExample?: string
  
  // GitHub Metrics
  githubStars?: number
  githubForks?: number
  githubWatchers?: number
  openIssues?: number
  lastCommitDate?: Date | string
  issuesLast30Days?: number
  
  // Popularity/Health Scoring
  popularityScore?: number
  maintenanceScore?: number
  
  lastUpdated?: Date | string
  createdAt?: Date | string
  updatedAt?: Date | string
  
  // Relationships
  category?: Category
  alternatives?: string[]
}
