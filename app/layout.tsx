import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "React Native Libraries Showcase | Discover Curated Packages",
    template: "%s | React Native Libraries Showcase",
  },
  description:
    "Discover curated and categorized React Native libraries with installation instructions, examples, and alternatives. Find the perfect packages for your React Native project.",
  keywords: ["React Native", "libraries", "packages", "npm", "development tools", "mobile development"],
  authors: [{ name: "React Native Libraries" }],
  creator: "React Native Libraries Team",
  publisher: "React Native Libraries",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://rn-libraries.example.com",
    siteName: "React Native Libraries Showcase",
    title: "React Native Libraries Showcase",
    description: "Discover curated and categorized React Native libraries with installation instructions and examples.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://rn-libraries.example.com"}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "React Native Libraries Showcase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "React Native Libraries Showcase",
    description: "Discover curated React Native libraries for your projects",
    creator: "@rnlibraries",
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL || "https://rn-libraries.example.com",
  },

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href={process.env.NEXT_PUBLIC_BASE_URL || "https://rn-libraries.example.com"} />
        {/* Schema markup for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "React Native Libraries Showcase",
              description: "Discover curated and categorized React Native libraries",
              url: process.env.NEXT_PUBLIC_BASE_URL || "https://rn-libraries.example.com",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${process.env.NEXT_PUBLIC_BASE_URL || "https://rn-libraries.example.com"}/libraries?q={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className={`font-sans antialiased flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
