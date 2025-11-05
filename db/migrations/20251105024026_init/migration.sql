-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Library" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "githubUrl" TEXT NOT NULL,
    "npmUrl" TEXT NOT NULL,
    "pros" TEXT,
    "cons" TEXT,
    "installNpm" TEXT,
    "installExpo" TEXT,
    "codeExample" TEXT,
    "githubStars" INTEGER,
    "githubForks" INTEGER,
    "githubWatchers" INTEGER,
    "openIssues" INTEGER,
    "lastCommitDate" TIMESTAMP(3),
    "issuesLast30Days" INTEGER,
    "popularityScore" INTEGER,
    "maintenanceScore" INTEGER,
    "categoryId" TEXT NOT NULL,
    "lastUpdated" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Library_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Library_slug_key" ON "Library"("slug");

-- AddForeignKey
ALTER TABLE "Library" ADD CONSTRAINT "Library_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
