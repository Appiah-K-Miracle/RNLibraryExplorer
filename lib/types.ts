export interface Category {
  id: string
  name: string
  slug: string
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
  lastUpdated?: Date
  alternatives?: string[]
}
