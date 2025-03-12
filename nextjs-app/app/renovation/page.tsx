import { PortableText } from "@portabletext/react";
import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { getInfoSectionByIdQuery } from "@/sanity/lib/queries";
import Image from "next/legacy/image";
import { urlForImage } from "@/sanity/lib/utils";
import { Typography } from "../components/Typography";

interface InfoSection {
  title: string;
  identifier: string;
  pageContent: any[];
  linkText: string;
}

const portableTextComponents = {
  types: {
    image: ({
      value,
    }: {
      value: { alt?: string; caption?: string; asset?: { _ref: string } };
    }) => {
      if (!value.asset) return null;

      const imageUrl = urlForImage(value)?.url();
      if (!imageUrl) return null;

      return (
        <figure className="my-2 relative aspect-square w-1/2 overflow-hidden ">
                 <Image
                   src={imageUrl}
                   alt={value.alt ?? "Decorative image"}
                   className=" w-full object-contain aspect-square"
                   layout="fill"
                         objectFit="cover"
                         sizes="(max-width: 768px) 100vw, 20vw"
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
    h1: ({ children }: { children?: React.ReactNode }) => (
      <Typography.H1>{children}</Typography.H1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <Typography.H2>{children}</Typography.H2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <Typography.H3>{children}</Typography.H3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <Typography.Blockquote>{children}</Typography.Blockquote>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <Typography.Paragraph>{children}</Typography.Paragraph>
    ),
  },
};

export const metadata: Metadata = {
  title: "Renovation Story | The Green Grange",
  description: "The story of how The Green Grange was renovated",
};

async function getRenovationContent(): Promise<InfoSection | null> {
  try {
    const section = await client.fetch(getInfoSectionByIdQuery, {
      identifier: "renovation",
    });

    return section || null;
  } catch (error) {
    console.error("Error fetching renovation content:", error);
    return null;
  }
}

export default async function RenovationPage() {
  const content = await getRenovationContent();

  if (!content) {
    return (
      <div className=" mx-auto min-h-screen max-w-3xl px-6 py-12">
        <p className="text-center text-muted-foreground">
          Unable to load renovation content. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className=" mx-auto font-jost max-w-3xl px-6 py-12">
      <article className=" mx-auto">
        <h1 className="text-4xl  font-kalnia font-bold tracking-tighter mb-8">
          {content?.title}
        </h1>

        {content.pageContent ? (
          <PortableText
            value={content.pageContent}
            components={portableTextComponents}
          />
        ) : (
          <p>No content available for the renovation.</p>
        )}
      </article>
    </div>
  );
}
