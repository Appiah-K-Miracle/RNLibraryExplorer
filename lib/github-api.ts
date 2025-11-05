/**
 * GitHub API Service
 * Fetches real-time data from GitHub repositories
 */

interface GitHubRepoData {
  stargazers_count: number
  forks_count: number
  watchers_count: number
  open_issues_count: number
  pushed_at: string
}

interface GitHubMetrics {
  githubStars: number
  githubForks: number
  githubWatchers: number
  openIssues: number
  lastCommitDate: Date
}

/**
 * Extract owner and repo from GitHub URL
 * Example: https://github.com/owner/repo -> { owner: 'owner', repo: 'repo' }
 */
export function parseGitHubUrl(githubUrl: string): { owner: string; repo: string } | null {
  try {
    const url = new URL(githubUrl)
    const pathParts = url.pathname.split('/').filter(Boolean)
    
    if (pathParts.length >= 2) {
      return {
        owner: pathParts[0],
        repo: pathParts[1]
      }
    }
    
    return null
  } catch (error) {
    console.error('Invalid GitHub URL:', githubUrl, error)
    return null
  }
}

/**
 * Fetch GitHub repository metrics
 */
export async function fetchGitHubMetrics(githubUrl: string): Promise<GitHubMetrics | null> {
  const parsed = parseGitHubUrl(githubUrl)
  
  if (!parsed) {
    console.error('Failed to parse GitHub URL:', githubUrl)
    return null
  }

  const { owner, repo } = parsed
  const token = process.env.GITHUB_TOKEN

  if (!token) {
    console.warn('GITHUB_TOKEN not configured. Using unauthenticated requests (lower rate limit).')
  } else {
    console.log(`Using GitHub token for ${owner}/${repo} (token starts with: ${token.substring(0, 7)}...)`)
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        ...(token && { 'Authorization': `token ${token}` })
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    })

    if (!response.ok) {
      console.error(`GitHub API error for ${owner}/${repo}:`, response.status, response.statusText)
      return null
    }

    const data: GitHubRepoData = await response.json()

    return {
      githubStars: data.stargazers_count,
      githubForks: data.forks_count,
      githubWatchers: data.watchers_count,
      openIssues: data.open_issues_count,
      lastCommitDate: new Date(data.pushed_at)
    }
  } catch (error) {
    console.error(`Error fetching GitHub metrics for ${owner}/${repo}:`, error)
    return null
  }
}

/**
 * Calculate popularity score based on GitHub metrics
 * Score from 0-100 based on stars, forks, and watchers
 */
export function calculatePopularityScore(metrics: GitHubMetrics): number {
  const { githubStars, githubForks, githubWatchers } = metrics
  
  // Weighted scoring: stars (60%), forks (30%), watchers (10%)
  const starScore = Math.min((githubStars / 10000) * 60, 60)
  const forkScore = Math.min((githubForks / 2000) * 30, 30)
  const watcherScore = Math.min((githubWatchers / 1000) * 10, 10)
  
  return Math.round(starScore + forkScore + watcherScore)
}

/**
 * Calculate maintenance score based on last commit date and open issues
 * Score from 0-100 based on recency and issue count
 */
export function calculateMaintenanceScore(metrics: GitHubMetrics): number {
  const { lastCommitDate, openIssues } = metrics
  
  // Days since last commit
  const daysSinceCommit = Math.floor((Date.now() - lastCommitDate.getTime()) / (1000 * 60 * 60 * 24))
  
  // Recency score (50%): 100 for commits in last 7 days, decreasing over time
  let recencyScore = 50
  if (daysSinceCommit <= 7) recencyScore = 50
  else if (daysSinceCommit <= 30) recencyScore = 40
  else if (daysSinceCommit <= 90) recencyScore = 30
  else if (daysSinceCommit <= 180) recencyScore = 20
  else if (daysSinceCommit <= 365) recencyScore = 10
  else recencyScore = 5
  
  // Issue score (50%): Lower is better
  let issueScore = 50
  if (openIssues <= 10) issueScore = 50
  else if (openIssues <= 50) issueScore = 40
  else if (openIssues <= 100) issueScore = 30
  else if (openIssues <= 200) issueScore = 20
  else if (openIssues <= 500) issueScore = 10
  else issueScore = 5
  
  return Math.round(recencyScore + issueScore)
}

/**
 * Fetch and calculate all metrics for a library
 */
export async function fetchLibraryMetrics(githubUrl: string) {
  const metrics = await fetchGitHubMetrics(githubUrl)
  
  if (!metrics) {
    return null
  }

  return {
    ...metrics,
    popularityScore: calculatePopularityScore(metrics),
    maintenanceScore: calculateMaintenanceScore(metrics)
  }
}
