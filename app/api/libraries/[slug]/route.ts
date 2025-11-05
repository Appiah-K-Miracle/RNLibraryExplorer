import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/libraries/[slug] - Get a single library by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const library = await prisma.library.findUnique({
      where: {
        slug: slug
      },
      include: {
        category: true
      }
    })

    if (!library) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Library not found' 
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: library
    })
  } catch (error) {
    console.error('Error fetching library:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch library',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
