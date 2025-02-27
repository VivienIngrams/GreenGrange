import { PortableText } from "@portabletext/react"
import { Metadata } from "next"
import PhotoGallery from "@/app/components/PhotoGallery"
import AmenitiesList from "@/app/components/AmenitiesList"
import { client } from "@/sanity/lib/client"
import { getInfoSectionByIdQuery } from "@/sanity/lib/queries"
import Image from "next/image"


const portableTextComponents = {
  types: {
    image: ({ value }: { value: { alt?: string, caption?: string, asset?: { _ref: string } } }) => {
      return (
        <figure className="my-8">
          <Image
            src={value.asset ? value.asset._ref : "/placeholder.png"} 
            alt={value.alt ?? 'Decorative image'}
            className="rounded-lg w-full"
            width={800}
            height={600}
          />
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
}


export const metadata: Metadata = {
  title: "The House | The Green Grange",
  description: "Details about The Green Grange house and its amenities"
}

async function getHouseContent() {
  const section = await client.fetch(getInfoSectionByIdQuery, { identifier: "house" })
  if (!section) throw new Error("Failed to fetch house content")
  return section
}

export default async function HousePage() {
  const content = await getHouseContent()

  return (
    <div className="container mx-auto max-w-4xl px-6 py-12">
      <article className="prose prose-lg dark:prose-invert mx-auto">
        <h1 className="text-4xl font-bold tracking-tighter mb-8">The House</h1>
        <PortableText 
          value={content.pageContent} 
          components={portableTextComponents}
        />
      </article>
      <div className="mt-16">
        <PhotoGallery />
      </div>
      <div className="mt-16">
        <AmenitiesList />
      </div>
    </div>
  )
} 