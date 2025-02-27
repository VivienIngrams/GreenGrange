import { PortableText } from "@portabletext/react"
import { Metadata } from "next"
import { client } from "@/sanity/lib/client"
import { getInfoSectionsQuery } from "@/sanity/lib/queries"

export const metadata: Metadata = {
  title: "Renovation Story | The Green Grange",
  description: "The story of how The Green Grange was renovated"
}

async function getRenovationContent() {
  const sections = await client.fetch(getInfoSectionsQuery)
  return sections.find((section: any) => section.identifier === "renovation")
}

export default async function RenovationPage() {
  const content = await getRenovationContent()

  return (
    <div className="container mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tighter mb-8">Our Renovation Story</h1>
      <div className="prose prose-lg dark:prose-invert">
        <PortableText value={content?.content} />
      </div>
    </div>
  )
} 