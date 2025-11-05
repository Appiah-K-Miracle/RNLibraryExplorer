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

// PUT /api/libraries/[slug] - Update a library
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const body = await request.json()

    // Check if library exists
    const existing = await prisma.library.findUnique({
      where: { slug }
    })

    if (!existing) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Library not found' 
        },
        { status: 404 }
      )
    }

    // If slug is being changed, check it doesn't conflict
    if (body.slug && body.slug !== slug) {
      const slugExists = await prisma.library.findUnique({
        where: { slug: body.slug }
      })

      if (slugExists) {
        return NextResponse.json(
          { 
            success: false,
            error: 'A library with this slug already exists'
          },
          { status: 409 }
        )
      }
    }

    // Update the library
    const library = await prisma.library.update({
      where: { slug },
      data: {
        ...(body.name && { name: body.name }),
        ...(body.slug && { slug: body.slug }),
        ...(body.description && { description: body.description }),
        ...(body.categoryId && { categoryId: body.categoryId }),
        ...(body.githubUrl && { githubUrl: body.githubUrl }),
        ...(body.npmUrl && { npmUrl: body.npmUrl }),
        ...(body.pros !== undefined && { pros: body.pros }),
        ...(body.cons !== undefined && { cons: body.cons }),
        ...(body.installNpm !== undefined && { installNpm: body.installNpm }),
        ...(body.installExpo !== undefined && { installExpo: body.installExpo }),
        ...(body.codeExample !== undefined && { codeExample: body.codeExample }),
        updatedAt: new Date()
      },
      include: {
        category: true
      }
    })

    return NextResponse.json({
      success: true,
      data: library,
      message: 'Library updated successfully'
    })
  } catch (error) {
    console.error('Error updating library:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to update library',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// DELETE /api/libraries/[slug] - Delete a library
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    // Check if library exists
    const existing = await prisma.library.findUnique({
      where: { slug }
    })

    if (!existing) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Library not found' 
        },
        { status: 404 }
      )
    }

    // Delete the library
    await prisma.library.delete({
      where: { slug }
    })

    return NextResponse.json({
      success: true,
      message: 'Library deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting library:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to delete library',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
