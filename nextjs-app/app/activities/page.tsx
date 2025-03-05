import { PortableText } from "@portabletext/react"
import { Metadata } from "next"
import { client } from "@/sanity/lib/client"
import { getInfoSectionsQuery } from "@/sanity/lib/queries"

export const metadata: Metadata = {
  title: "Activities | The Green Grange",
  description: "Activities and things to do around The Green Grange"
}

async function getActivitiesContent() {
  const sections = await client.fetch(getInfoSectionsQuery)
  return sections.find((section: any) => section.identifier === "activities")
}

export default async function ActivitiesPage() {
  const content = await getActivitiesContent()

  return (
    <div className="container mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tighter mb-8">Local Activities</h1>
      <div className="prose prose-lg dark:prose-invert">
        <PortableText value={content?.content} />
      </div>
    </div>
  )
}