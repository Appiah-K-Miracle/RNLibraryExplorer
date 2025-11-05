# Backend Setup Guide

This document explains how to set up and use the Next.js API backend with Prisma ORM for the RNLibraryExplorer project.

## Overview

The backend is built with:
- **Next.js 16** App Router with API Routes
- **Prisma ORM** for database management
- **PostgreSQL** as the database
- **TypeScript** for type safety

## Prerequisites

Before you begin, ensure you have:
- Node.js 18+ installed
- PostgreSQL database instance (local or cloud)
- pnpm package manager (or npm/yarn)

## Setup Instructions

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Database Connection

Create a `.env` file in the root directory with your database connection string:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/rnlibrary?schema=public"
```

Replace with your actual PostgreSQL credentials:
- `user`: Your database username
- `password`: Your database password
- `localhost:5432`: Your database host and port
- `rnlibrary`: Your database name

For cloud databases (e.g., Supabase, Neon, Railway):
```env
DATABASE_URL="postgresql://user:password@host.region.provider.com:5432/database"
```

### 3. Generate Prisma Client

```bash
pnpm db:generate
```

This generates the Prisma Client based on your schema in `prisma/schema.prisma`.

### 4. Push Database Schema

To create the database tables without migrations:

```bash
pnpm db:push
```

This will create all tables defined in the Prisma schema.

### 5. Seed the Database

Populate the database with initial data:

```bash
pnpm db:seed
```

This will:
- Create 13 categories (Navigation, UI Components, Animation, etc.)
- Create 20+ React Native libraries with metadata
- Include GitHub metrics and descriptions

## API Endpoints

The following REST API endpoints are available:

### Categories

- `GET /api/categories` - Get all categories with library counts
- `GET /api/categories/[slug]` - Get a specific category with its libraries

### Libraries

- `GET /api/libraries` - Get all libraries
- `GET /api/libraries?category=slug` - Get libraries filtered by category
- `GET /api/libraries/[slug]` - Get a specific library

### Response Format

All endpoints return JSON with the following structure:

```json
{
  "success": true,
  "data": { /* result */ },
  "count": 10  // optional, for list endpoints
}
```

Error responses:
```json
{
  "success": false,
  "error": "Error message",
  "message": "Detailed error description"
}
```

## Database Schema

### Category Model

```prisma
model Category {
  id        String    @id @default(cuid())
  name      String
  slug      String    @unique
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  libraries Library[]
}
```

### Library Model

```prisma
model Library {
  id          String    @id @default(cuid())
  name        String
  slug        String    @unique
  description String
  
  githubUrl   String
  npmUrl      String
  
  pros        String?
  cons        String?
  installNpm  String?
  installExpo String?
  codeExample String?
  
  // GitHub Metrics
  githubStars       Int?
  githubForks       Int?
  githubWatchers    Int?
  openIssues        Int?
  lastCommitDate    DateTime?
  issuesLast30Days  Int?
  
  // Popularity/Health Scoring
  popularityScore   Int?
  maintenanceScore  Int?
  
  categoryId  String
  category    Category  @relation(fields: [categoryId], references: [id])
  
  lastUpdated DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```

## Development Workflow

### Running the Development Server

```bash
pnpm dev
```

The server will start at `http://localhost:3000`.

### Testing API Endpoints

You can test the API using curl, Postman, or your browser:

```bash
# Get all categories
curl http://localhost:3000/api/categories

# Get all libraries
curl http://localhost:3000/api/libraries

# Get a specific library
curl http://localhost:3000/api/libraries/react-navigation
```

### Resetting the Database

To reset and reseed the database:

```bash
pnpm db:push --force-reset
pnpm db:seed
```

## Production Deployment

### Environment Variables

Set the following environment variables in your production environment:

```env
DATABASE_URL="your-production-database-url"
NEXT_PUBLIC_BASE_URL="https://your-domain.com"
```

### Build and Deploy

```bash
pnpm build
pnpm start
```

### Database Migrations

For production, use Prisma migrations instead of `db:push`:

```bash
# Create a migration
npx prisma migrate dev --name init

# Apply migrations in production
npx prisma migrate deploy
```

## Prisma Studio

To visually browse and edit your database:

```bash
npx prisma studio
```

This opens a web interface at `http://localhost:5555`.

## Troubleshooting

### Connection Issues

If you get connection errors:
1. Verify your `DATABASE_URL` is correct
2. Ensure PostgreSQL is running
3. Check firewall settings
4. Verify database user permissions

### Prisma Client Not Found

If you get "Cannot find module '@prisma/client'":
```bash
pnpm db:generate
```

### Migration Issues

If migrations fail:
```bash
npx prisma migrate reset
pnpm db:seed
```

## Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review Prisma and Next.js documentation
3. Open an issue on the GitHub repository
