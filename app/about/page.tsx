export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-foreground mb-8">About</h1>
        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-muted-foreground mb-6">
            React Native Libraries Showcase is a curated platform dedicated to helping developers discover the best and
            most actively maintained React Native packages.
          </p>
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Our Mission</h2>
          <p className="text-muted-foreground mb-6">
            We believe in making it easier for React Native developers to find quality libraries, compare alternatives,
            and stay updated with the latest packages in the ecosystem.
          </p>
        </div>
      </div>
    </main>
  )
}
