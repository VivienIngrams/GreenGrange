import { PortableText } from "@portabletext/react"
import { Metadata } from "next"
import { client } from "@/sanity/lib/client"
import { getInfoSectionByIdQuery } from "@/sanity/lib/queries"
import { urlForImage } from "@/sanity/lib/utils"
import Image from "next/image"
import { Typography } from "../components/Typography"

interface InfoSection {
  title: string;
  identifier: string;
  pageContent: any[]; 
  linkText: string;
}

const portableTextComponents = {
  types: {
    image: ({ value }: { value: { alt?: string, caption?: string, asset?: { _ref: string } } }) => {
      if (!value.asset) return null;
      
      const imageUrl = urlForImage(value)?.url();
      if (!imageUrl) return null;

      return (
        <figure className="my-8 h-1/2 w-1/2 ">
          <Image
            src={imageUrl}
            alt={value.alt ?? "Decorative image"}
            className="w-full object-contain"
            width={200}
            height={200}
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
  marks: {
    link: ({ children, value }: { children: React.ReactNode; value?: { href?: string } }) => {
      if (!value?.href) return <>{children}</>;
      return <Typography.Link href={value.href}>{children}</Typography.Link>;
    },
  },
}

export const metadata: Metadata = {
  title: "Activities | The Green Grange",
  description: "Activities and things to do around The Green Grange"
}

async function getActivitiesContent(): Promise<InfoSection | null> {
  try {
    // Fetch the specific info section for activities
    const section = await client.fetch(getInfoSectionByIdQuery, { 
      identifier: "activities" 
    });
    

    return section || null;
  } catch (error) {
  
    return null;
  }
}

export default async function ActivitiesPage() {
  const content = await getActivitiesContent();
  
  return (
    <div className="font-jost mx-auto min-h-screen max-w-3xl px-6 py-12">
      <article className="mx-auto">
        <Typography.H1>{content?.title}</Typography.H1>
        
        {content?.pageContent ? (
          <PortableText 
            value={content.pageContent} 
            components={portableTextComponents}
          />
        ) : (
          <p>No content available for Activities.</p>
        )}
      </article>
    </div>
  )
}