import { PortableText } from "@portabletext/react"
import { Metadata } from "next"
import { client } from "@/sanity/lib/client"
import { getInfoSectionsQuery } from "@/sanity/lib/queries"

export const metadata: Metadata = {
  title: "Activities | The Green Grange",
  description: "Activities and things to do around The Green Grange"
}

// Define an interface for your section type
interface InfoSection {
  identifier: string;
  content?: any; // Replace 'any' with a more specific type if possible
}

async function getActivitiesContent(): Promise<InfoSection | null> {
  const sections = await client.fetch(getInfoSectionsQuery) as InfoSection[]
  return sections.find((section) => section.identifier === "activities") || null
}

export default async function ActivitiesPage() {
  const content = await getActivitiesContent()
  
  return (
    <div className="container mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tighter mb-8">Local Activities</h1>
      <div className="prose prose-lg dark:prose-invert">
        {content?.content ? (
          <PortableText value={content.content} />
        ) : (
          <p>No activities content available.</p>
        )}
      </div>
    </div>
  )
}