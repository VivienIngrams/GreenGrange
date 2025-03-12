import { PortableText } from "@portabletext/react";
import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { getInfoSectionByIdQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/utils";
import Image from "next/image";
import { Typography } from "../components/Typography";
import PhotoGallery from "@/app/components/PhotoGallery";
import AmenitiesList from "@/app/components/AmenitiesList";

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
        <figure className="my-2 relative aspect-square md:w-1/2 overflow-hidden ">
          <Image
            src={imageUrl}
            alt={value.alt ?? "Decorative image"}
            className=" w-full object-contain aspect-square"
            layout="fill"
            objectFit="cover"
            sizes="(max-width: 768px) 90vw, 20vw"
          />
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
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
};

export const metadata: Metadata = {
  title: "Dynamic Page | The Green Grange",
  description: "Dynamic content page for The Green Grange",
};

async function getContentBySlug(slug: string): Promise<InfoSection | null> {
  try {
    const section = await client.fetch(getInfoSectionByIdQuery, { identifier: slug });
    return section || null;
  } catch (error) {
    console.error("Error fetching content:", error);
    return null;
  }
}

export default async function DynamicPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const content = await getContentBySlug(slug);

  if (!content) {
    return (
      <div className="mx-auto min-h-screen max-w-3xl px-6 py-12">
        <p className="text-center text-muted-foreground">
          Unable to load content. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="font-jost mx-auto min-h-screen max-w-3xl py-2">
      <article className="mx-auto">
        <Typography.H1>{content.title}</Typography.H1>
        {content.pageContent ? (
          <PortableText value={content.pageContent} components={portableTextComponents} />
        ) : (
          <p>No content available.</p>
        )}
      </article>
      {(slug === 'renovation' || slug === 'house') && (
        <div className="mt-16">
          <PhotoGallery />
        </div>
      )}
      {slug === 'house' && (
        <div className="mt-16">
          <AmenitiesList />
        </div>
      )}
    </div>
  );
}