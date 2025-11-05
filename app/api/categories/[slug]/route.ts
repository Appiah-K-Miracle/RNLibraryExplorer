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

// PUT /api/categories/[slug] - Update a category
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const body = await request.json()

    // Check if category exists
    const existing = await prisma.category.findUnique({
      where: { slug }
    })

    if (!existing) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Category not found' 
        },
        { status: 404 }
      )
    }

    // If slug is being changed, check it doesn't conflict
    if (body.slug && body.slug !== slug) {
      const slugExists = await prisma.category.findUnique({
        where: { slug: body.slug }
      })

      if (slugExists) {
        return NextResponse.json(
          { 
            success: false,
            error: 'A category with this slug already exists'
          },
          { status: 409 }
        )
      }
    }

    // Update the category
    const category = await prisma.category.update({
      where: { slug },
      data: {
        ...(body.name && { name: body.name }),
        ...(body.slug && { slug: body.slug }),
        updatedAt: new Date()
      }
    })

    return NextResponse.json({
      success: true,
      data: category,
      message: 'Category updated successfully'
    })
  } catch (error) {
    console.error('Error updating category:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to update category',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// DELETE /api/categories/[slug] - Delete a category
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    // Check if category exists
    const existing = await prisma.category.findUnique({
      where: { slug },
      include: {
        _count: {
          select: {
            libraries: true
          }
        }
      }
    })

    if (!existing) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Category not found' 
        },
        { status: 404 }
      )
    }

    // Check if category has libraries
    if (existing._count.libraries > 0) {
      return NextResponse.json(
        { 
          success: false,
          error: `Cannot delete category with ${existing._count.libraries} associated libraries. Please reassign or delete the libraries first.`
        },
        { status: 400 }
      )
    }

    // Delete the category
    await prisma.category.delete({
      where: { slug }
    })

    return NextResponse.json({
      success: true,
      message: 'Category deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting category:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to delete category',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
