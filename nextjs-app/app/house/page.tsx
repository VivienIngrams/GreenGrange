// app/house/page.tsx
import { PortableText } from "@portabletext/react";
import { Metadata } from "next";
import PhotoGallery from "@/app/components/PhotoGallery";
import AmenitiesList from "@/app/components/AmenitiesList";
import { client } from "@/sanity/lib/client";
import { getInfoSectionByIdQuery } from "@/sanity/lib/queries";
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
        <figure className="my-8 h-1/2 w-2/3">
          <Image
            src={imageUrl}
            alt={value.alt ?? "Decorative image"}
            className=" w-full object-contain"
            width={400}
            height={400}
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
  title: "The House | The Green Grange",
  description: "Details about The Green Grange house and its amenities",
};

async function getHouseContent(): Promise<InfoSection | null> {
  try {
    const section = await client.fetch(getInfoSectionByIdQuery, {
      identifier: "house",
    });

    return section || null;
  } catch (error) {
    console.error("Error fetching house content:", error);
    return null;
  }
}

export default async function HousePage() {
  const content = await getHouseContent();

  if (!content) {
    return (
      <div className=" mx-auto max-w-4xl px-6 py-12">
        <p className="text-center text-muted-foreground">
          Unable to load house content. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="font-jost mx-auto min-h-screen max-w-4xl px-6 py-12">
      <article className="mx-auto">
        <h1 className="text-4xl font-semibold font-kalnia tracking-tighter mb-8">{content.title}</h1>

        {content.pageContent ? (
          <PortableText
            value={content.pageContent}
            components={portableTextComponents}
          />
        ) : (
          <p>No content available for the house.</p>
        )}
      </article>

      <div className="mt-16">
        <PhotoGallery />
      </div>

      <div className="mt-16">
        <AmenitiesList />
      </div>
    </div>
  );
}