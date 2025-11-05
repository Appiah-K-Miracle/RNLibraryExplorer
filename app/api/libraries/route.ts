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

// POST /api/libraries - Create a new library
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      slug,
      description,
      categoryId,
      githubUrl,
      npmUrl,
      pros,
      cons,
      installNpm,
      installExpo,
      codeExample
    } = body

    // Validate required fields
    if (!name || !slug || !description || !categoryId || !githubUrl || !npmUrl) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Missing required fields: name, slug, description, categoryId, githubUrl, npmUrl'
        },
        { status: 400 }
      )
    }

    // Check if slug already exists
    const existing = await prisma.library.findUnique({
      where: { slug }
    })

    if (existing) {
      return NextResponse.json(
        { 
          success: false,
          error: 'A library with this slug already exists'
        },
        { status: 409 }
      )
    }

    // Create the library
    const library = await prisma.library.create({
      data: {
        name,
        slug,
        description,
        categoryId,
        githubUrl,
        npmUrl,
        pros,
        cons,
        installNpm,
        installExpo,
        codeExample
      },
      include: {
        category: true
      }
    })

    return NextResponse.json({
      success: true,
      data: library,
      message: 'Library created successfully'
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating library:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to create library',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
