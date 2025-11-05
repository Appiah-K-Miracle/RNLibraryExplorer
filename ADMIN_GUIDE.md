# Admin Panel & GitHub API Integration

## Setup

### 1. Configure GitHub Token

Create a `.env` file in the project root (copy from `.env.example`):

```bash
cp .env.example .env
```

Then add your GitHub token to the `.env` file:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/rnlibrary?schema=public"
GITHUB_TOKEN="ghp_YourActualTokenHere"
```

**Important:**
- Use a GitHub Personal Access Token (starts with `ghp_`)
- Get your token from: https://github.com/settings/tokens
- Required scopes: `public_repo` (or `repo` for private repos)
- Never commit your `.env` file to version control!

### 2. Start the Application

```bash
npm run dev
```

### 3. Access the Admin Panel

Navigate to: `http://localhost:3000/admin`

## Features

### GitHub Data Synchronization

#### Automatic Sync
The admin panel includes a "Sync GitHub Data" button that:
- Fetches real-time metrics from GitHub API
- Updates stars, forks, watchers, open issues
- Calculates popularity score (0-100)
- Calculates maintenance score (0-100)
- Records last commit date

#### Manual API Usage

**Sync all libraries:**
```bash
curl -X POST http://localhost:3000/api/libraries/sync
```

**Sync specific library:**
```bash
curl -X POST "http://localhost:3000/api/libraries/sync?libraryId=<library-id>"
```

### Library Management

#### Create Library
1. Click "Add Library" button in admin panel
2. Fill in required fields:
   - Name (e.g., "React Navigation")
   - Slug (e.g., "react-navigation")
   - Description
   - Category
   - GitHub URL (e.g., "https://github.com/react-navigation/react-navigation")
   - NPM URL
3. Optional fields:
   - Pros/Cons (one per line)
   - Install commands
   - Code example
4. Click "Create Library"

#### Edit Library
1. Find library in table
2. Click "Edit" button
3. Modify fields as needed
4. Click "Update Library"

#### Delete Library
1. Find library in table
2. Click "Delete" button
3. Confirm deletion

#### API Endpoints

**Get all libraries:**
```bash
GET /api/libraries
```

**Get library by slug:**
```bash
GET /api/libraries/[slug]
```

**Create library:**
```bash
POST /api/libraries
Content-Type: application/json

{
  "name": "React Navigation",
  "slug": "react-navigation",
  "description": "Routing and navigation for React Native apps",
  "categoryId": "<category-id>",
  "githubUrl": "https://github.com/react-navigation/react-navigation",
  "npmUrl": "https://www.npmjs.com/package/@react-navigation/native",
  "pros": "Flexible\nWidely adopted",
  "cons": "Complex API for deep linking",
  "installNpm": "npm install @react-navigation/native",
  "installExpo": "expo install react-native-screens",
  "codeExample": "import { NavigationContainer } from '@react-navigation/native';"
}
```

**Update library:**
```bash
PUT /api/libraries/[slug]
Content-Type: application/json

{
  "name": "Updated Name",
  "description": "Updated description"
}
```

**Delete library:**
```bash
DELETE /api/libraries/[slug]
```

### Category Management

#### Create Category
1. Click "Add Category" button
2. Enter name and slug
3. Click "Create Category"

#### Edit Category
1. Find category card
2. Click edit icon
3. Modify fields
4. Click "Update Category"

#### Delete Category
1. Find category card
2. Click delete icon
3. Confirm deletion

**Note:** Categories with associated libraries cannot be deleted.

#### API Endpoints

**Get all categories:**
```bash
GET /api/categories
```

**Get category by slug:**
```bash
GET /api/categories/[slug]
```

**Create category:**
```bash
POST /api/categories
Content-Type: application/json

{
  "name": "UI Components",
  "slug": "ui-components"
}
```

**Update category:**
```bash
PUT /api/categories/[slug]
Content-Type: application/json

{
  "name": "Updated Name"
}
```

**Delete category:**
```bash
DELETE /api/categories/[slug]
```

## GitHub API Service

The GitHub API service (`lib/github-api.ts`) provides:

### Functions

#### `fetchGitHubMetrics(githubUrl: string)`
Fetches metrics for a repository from GitHub API.

**Returns:**
```typescript
{
  githubStars: number
  githubForks: number
  githubWatchers: number
  openIssues: number
  lastCommitDate: Date
}
```

#### `calculatePopularityScore(metrics)`
Calculates popularity score (0-100) based on:
- Stars (60% weight)
- Forks (30% weight)
- Watchers (10% weight)

#### `calculateMaintenanceScore(metrics)`
Calculates maintenance score (0-100) based on:
- Recency of last commit (50% weight)
- Number of open issues (50% weight)

#### `fetchLibraryMetrics(githubUrl: string)`
Fetches all metrics and calculates scores in one call.

**Returns:**
```typescript
{
  githubStars: number
  githubForks: number
  githubWatchers: number
  openIssues: number
  lastCommitDate: Date
  popularityScore: number
  maintenanceScore: number
}
```

## Score Calculation Details

### Popularity Score (0-100)
- **Stars**: Up to 60 points (10,000+ stars = 60 points)
- **Forks**: Up to 30 points (2,000+ forks = 30 points)
- **Watchers**: Up to 10 points (1,000+ watchers = 10 points)

### Maintenance Score (0-100)
- **Recency**: Up to 50 points
  - ≤7 days: 50 points
  - ≤30 days: 40 points
  - ≤90 days: 30 points
  - ≤180 days: 20 points
  - ≤365 days: 10 points
  - >365 days: 5 points

- **Open Issues**: Up to 50 points
  - ≤10 issues: 50 points
  - ≤50 issues: 40 points
  - ≤100 issues: 30 points
  - ≤200 issues: 20 points
  - ≤500 issues: 10 points
  - >500 issues: 5 points

## Troubleshooting

### GitHub API Rate Limits
Without authentication: 60 requests/hour
With authentication: 5,000 requests/hour

**Solution:** Add GITHUB_TOKEN to `.env` file

### 401 Unauthorized Error from GitHub API

**Symptoms:** Getting "401 Unauthorized" errors when syncing GitHub data

**Common causes:**
1. **Missing .env file**: Make sure you have a `.env` file (not `.env.example`) in the root directory
2. **Token format**: GitHub token should start with `ghp_` for personal access tokens
3. **Environment variable not loaded**: Restart your dev server after adding the token
4. **Invalid token**: Token may have expired or been revoked

**How to fix:**

1. **Create/verify your `.env` file**:
   ```bash
   # In the project root, create .env if it doesn't exist
   cp .env.example .env
   ```

2. **Add your GitHub token** (make sure it starts with `ghp_`):
   ```env
   GITHUB_TOKEN="ghp_YourActualTokenHere"
   ```

3. **Restart the development server**:
   ```bash
   # Stop the server (Ctrl+C)
   # Then restart
   npm run dev
   ```

4. **Verify token in GitHub**:
   - Go to: https://github.com/settings/tokens
   - Check if your token is still active
   - Required scopes: `public_repo` (or `repo` for private repos)
   - If expired, generate a new token

5. **Check server logs**:
   - Look for log message: "Using GitHub token for..."
   - If you see "GITHUB_TOKEN not configured", the token isn't being loaded

**Note:** Environment variables are only read when the server starts. Always restart after changing `.env`.

### Database Connection Issues
Ensure PostgreSQL is running and DATABASE_URL is correct in `.env`

### Missing Libraries in Admin
Run database seed:
```bash
npm run db:seed
```

## Security Notes

1. **Never commit `.env` file** - It contains sensitive credentials
2. **GitHub token** should have read-only access to public repositories
3. **Admin panel** should be protected with authentication in production
4. **API endpoints** should have rate limiting and authentication
