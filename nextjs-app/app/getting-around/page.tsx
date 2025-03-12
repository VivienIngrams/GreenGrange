import { PortableText } from "@portabletext/react"
import { Typography } from "../components/Typography"
import { Metadata } from "next"
import { client } from "@/sanity/lib/client"
import { getInfoSectionByIdQuery } from "@/sanity/lib/queries"
import Image from "next/legacy/image"
import { urlForImage } from "@/sanity/lib/utils"

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
      
      const imageUrl = urlForImage(value)?.url();
      if (!imageUrl) return null;

      return (
        <figure className="my-2 h-1/2 w-1/2">
          <Image
            src={imageUrl}
            alt={value.alt ?? "Decorative image"}
            className=" w-full object-contain"
            width={400}
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
  block: {
    h1: ({ children }: { children?: React.ReactNode }) => <Typography.H1>{children}</Typography.H1>,
    h2: ({ children }: { children?: React.ReactNode }) => <Typography.H2>{children}</Typography.H2>,
    h3: ({ children }: { children?: React.ReactNode }) => <Typography.H3>{children}</Typography.H3>,
    blockquote: ({ children }: { children?: React.ReactNode }) => <Typography.Blockquote>{children}</Typography.Blockquote>,
    normal: ({ children }: { children?: React.ReactNode }) => <Typography.Paragraph>{children}</Typography.Paragraph>,
  },
};


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
    <div className="font-jost mx-auto min-h-screen max-w-3xl px-6 py-12 md:py-24">
      <article className=" mx-auto">
        <h1 className="text-4xl font-semibold font-kalnia tracking-tighter mb-4">{content?.title}</h1>
        
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