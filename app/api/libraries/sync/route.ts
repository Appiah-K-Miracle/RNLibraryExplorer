import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { fetchLibraryMetrics } from '@/lib/github-api'

/**
 * POST /api/libraries/sync
 * Sync GitHub metrics for all libraries or a specific library
 * Query params: ?libraryId=<id> (optional)
 */
export async function POST(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const libraryId = searchParams.get('libraryId')

    let libraries
    
    if (libraryId) {
      // Sync single library
      const library = await prisma.library.findUnique({
        where: { id: libraryId }
      })
      
      if (!library) {
        return NextResponse.json(
          { success: false, error: 'Library not found' },
          { status: 404 }
        )
      }
      
      libraries = [library]
    } else {
      // Sync all libraries
      libraries = await prisma.library.findMany()
    }

    const results = []
    let successCount = 0
    let failCount = 0

    for (const library of libraries) {
      try {
        const metrics = await fetchLibraryMetrics(library.githubUrl)
        
        if (metrics) {
          await prisma.library.update({
            where: { id: library.id },
            data: {
              githubStars: metrics.githubStars,
              githubForks: metrics.githubForks,
              githubWatchers: metrics.githubWatchers,
              openIssues: metrics.openIssues,
              lastCommitDate: metrics.lastCommitDate,
              popularityScore: metrics.popularityScore,
              maintenanceScore: metrics.maintenanceScore,
              lastUpdated: new Date()
            }
          })
          
          successCount++
          results.push({
            id: library.id,
            name: library.name,
            success: true,
            metrics
          })
        } else {
          failCount++
          results.push({
            id: library.id,
            name: library.name,
            success: false,
            error: 'Failed to fetch GitHub metrics'
          })
        }
      } catch (error) {
        failCount++
        results.push({
          id: library.id,
          name: library.name,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        })
      }
    }

    return NextResponse.json({
      success: true,
      message: `Synced ${successCount} libraries successfully, ${failCount} failed`,
      data: {
        successCount,
        failCount,
        results
      }
    })
  } catch (error) {
    console.error('Error syncing GitHub metrics:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to sync GitHub metrics',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
