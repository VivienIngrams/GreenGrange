import { PortableText } from "@portabletext/react"
import { Metadata } from "next"
import { client } from "@/sanity/lib/client"
import { getInfoSectionsQuery } from "@/sanity/lib/queries"

export const metadata: Metadata = {
  title: "Getting Around | The Green Grange",
  description: "Information about transportation and getting around the area"
}

async function getGettingAroundContent() {
  const sections = await client.fetch(getInfoSectionsQuery)
  return sections.find((section: any) => section.identifier === "getting-around")
}

export default async function GettingAroundPage() {
  const content = await getGettingAroundContent()

  return (
    <div className="container mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tighter mb-8">Getting Around</h1>
      <div className="prose prose-lg dark:prose-invert">
        <PortableText value={content?.content} />
      </div>
    </div>
  )
} 