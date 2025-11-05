import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/categories/[slug] - Get a single category by slug with its libraries
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const category = await prisma.category.findUnique({
      where: {
        slug: slug
      },
      include: {
        libraries: {
          orderBy: {
            name: 'asc'
          }
        },
        _count: {
          select: {
            libraries: true
          }
        }
      }
    })

    if (!category) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Category not found' 
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: category
    })
  } catch (error) {
    console.error('Error fetching category:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch category',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
