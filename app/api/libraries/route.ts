import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/libraries - Get all libraries
// Supports optional query params: ?category=slug
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const categorySlug = searchParams.get('category')

    let libraries

    if (categorySlug) {
      // Get libraries filtered by category
      libraries = await prisma.library.findMany({
        where: {
          category: {
            slug: categorySlug
          }
        },
        include: {
          category: true
        },
        orderBy: {
          name: 'asc'
        }
      })
    } else {
      // Get all libraries
      libraries = await prisma.library.findMany({
        include: {
          category: true
        },
        orderBy: {
          name: 'asc'
        }
      })
    }

    return NextResponse.json({
      success: true,
      data: libraries,
      count: libraries.length
    })
  } catch (error) {
    console.error('Error fetching libraries:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch libraries',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
