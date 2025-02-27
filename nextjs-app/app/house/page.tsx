import { PortableText } from "@portabletext/react"
import { Metadata } from "next"
import PhotoGallery from "@/app/components/PhotoGallery"
import AmenitiesList from "@/app/components/AmenitiesList"
import { client } from "@/sanity/lib/client"
import { getInfoSectionsQuery } from "@/sanity/lib/queries"

export const metadata: Metadata = {
  title: "The House | The Green Grange",
  description: "Details about The Green Grange house and its amenities"
}

async function getHouseContent() {
  const sections = await client.fetch(getInfoSectionsQuery)
  return sections.find((section: any) => section.identifier === "house")
}

export default async function HousePage() {
  const content = await getHouseContent()

  return (
    <div className="container mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tighter mb-8">The House</h1>
      <div className="prose prose-lg dark:prose-invert mb-12">
        <PortableText value={content?.content} />
      </div>
      <PhotoGallery />
      <AmenitiesList />
    </div>
  )
} 