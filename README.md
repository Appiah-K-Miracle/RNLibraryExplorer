# RNLibraryExplorer

A comprehensive showcase of React Native libraries with categorization, search, and detailed information about each package.

## Features

- 📚 **Browse Libraries**: Explore 20+ curated React Native libraries
- 🏷️ **Categories**: Libraries organized by type (Navigation, UI Components, Animation, etc.)
- 🔍 **Search & Filter**: Find libraries quickly with search and category filters
- 📊 **GitHub Metrics**: View stars, forks, and maintenance scores
- 💻 **Code Examples**: Installation instructions and usage examples
- 🎨 **Modern UI**: Built with Tailwind CSS and Radix UI components

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Styling**: Tailwind CSS, Radix UI
- **Icons**: Lucide React

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Appiah-K-Miracle/RNLibraryExplorer.git
cd RNLibraryExplorer
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your PostgreSQL connection string:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/rnlibrary?schema=public"
```

4. Set up the database:
```bash
# Generate Prisma Client
pnpm db:generate

# Create database tables
pnpm db:push

# Seed with initial data
pnpm db:seed
```

5. Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Backend Setup

For detailed backend setup instructions, see [BACKEND_SETUP.md](./BACKEND_SETUP.md).

### Quick Commands

```bash
pnpm db:generate  # Generate Prisma Client
pnpm db:push      # Sync database schema
pnpm db:seed      # Seed database with data
```

## Project Structure

```
RNLibraryExplorer/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── categories/    # Categories endpoints
│   │   └── libraries/     # Libraries endpoints
│   ├── categories/        # Category pages
│   ├── libraries/         # Library pages
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── ui/               # UI components (Radix)
│   └── ...               # Custom components
├── lib/                   # Utilities and helpers
│   ├── prisma.ts         # Prisma client
│   └── types.ts          # TypeScript types
├── prisma/               # Database schema and migrations
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Seed script
└── public/               # Static assets
```

## API Endpoints

- `GET /api/categories` - Get all categories
- `GET /api/categories/[slug]` - Get category by slug
- `GET /api/libraries` - Get all libraries
- `GET /api/libraries/[slug]` - Get library by slug

## Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm db:generate  # Generate Prisma Client
pnpm db:push      # Push schema to database
pnpm db:seed      # Seed database
```

## Database Schema

The application uses two main models:

- **Category**: Represents library categories (Navigation, UI Components, etc.)
- **Library**: Represents React Native libraries with metadata, GitHub stats, and code examples

See `prisma/schema.prisma` for the full schema definition.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Author

Created by [Appiah-K-Miracle](https://github.com/Appiah-K-Miracle)
