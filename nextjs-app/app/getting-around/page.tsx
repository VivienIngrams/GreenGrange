import { PortableText } from "@portabletext/react"
import { Metadata } from "next"
import { client } from "@/sanity/lib/client"
import { getInfoSectionByIdQuery } from "@/sanity/lib/queries"
import Image from "next/legacy/image"


// Define an interface matching your Sanity schema
interface InfoSection {
  title: string;
  identifier: string;
  pageContent: any[]; // This matches the array of blocks and images in your schema
  linkText: string;
}

const portableTextComponents = {
  types: {
    image: ({ value }: { value: { alt?: string, caption?: string, asset?: { _ref: string } } }) => {
      if (!value.asset) return null;

      return (
        <figure className="my-8">
          <Image
            src={value.asset ? value.asset._ref : "/placeholder.png"} 
            alt={value.alt ?? 'Decorative image'}
            className="rounded-lg w-full object-cover"
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

async function getGettingAroundContent(): Promise<InfoSection | null> {
  try {
    const section = await client.fetch(getInfoSectionByIdQuery, { 
      identifier: "getting-around" 
    });
    

    return section || null;
  } catch (error) {
    return null;
  }
}

export default async function GettingAroundPage() {
  const content = await getGettingAroundContent()

  return (
    <div className="container mx-auto min-h-screen max-w-3xl px-6 py-12">
      <article className=" mx-auto">
        <h1 className="text-4xl font-bold tracking-tighter mb-8">{content?.title}</h1>
        
        {content?.pageContent ? (
          <PortableText 
            value={content.pageContent} 
            components={portableTextComponents}
          />
        ) : (
          <p>No content available for Getting Around.</p>
        )}
      </article>
    </div>
  )
}