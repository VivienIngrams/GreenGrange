// app/house/page.tsx
import { PortableText } from "@portabletext/react";
import { Metadata } from "next";
import PhotoGallery from "@/app/components/PhotoGallery";
import AmenitiesList from "@/app/components/AmenitiesList";
import { client } from "@/sanity/lib/client";
import { getInfoSectionByIdQuery } from "@/sanity/lib/queries";
import Image from "next/legacy/image";
import { urlForImage } from "@/sanity/lib/utils";

// Define an interface matching your Sanity schema
interface InfoSection {
  title: string;
  identifier: string;
  pageContent: any[]; // This matches the array of blocks and images in your schema
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

      // Get image URL using Sanity's urlForImage utility
      const imageUrl = urlForImage(value)?.url() || "";
      
      return (
        <figure className="my-8">
          <div className="relative w-full aspect-[4/3]">
            <Image
              src={imageUrl}
              alt={value.alt ?? "Decorative image"}
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
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
        <h1 className="text-4xl font-bold font-kalnia tracking-tighter mb-8">{content.title}</h1>

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