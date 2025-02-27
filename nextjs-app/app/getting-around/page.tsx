import { PortableText } from "@portabletext/react"
import { Metadata } from "next"
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
  title: "Getting Around | The Green Grange",
  description: "Information about transportation and getting around the area"
}

async function getGettingAroundContent() {
  const section = await client.fetch(getInfoSectionByIdQuery, { identifier: "getting-around" })
  if (!section) throw new Error("Failed to fetch getting around content")
  return section
}

export default async function GettingAroundPage() {
  const content = await getGettingAroundContent()

  return (
    <div className="container mx-auto max-w-3xl px-6 py-12">
      <article className="prose prose-lg dark:prose-invert mx-auto">
        <h1 className="text-4xl font-bold tracking-tighter mb-8">Getting Around</h1>
        <PortableText 
          value={content.pageContent}
          components={portableTextComponents}
        />
      </article>
    </div>
  )
} 