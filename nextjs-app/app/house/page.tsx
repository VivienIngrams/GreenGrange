import { PortableText } from "@portabletext/react";
import { Metadata } from "next";
import PhotoGallery from "@/app/components/PhotoGallery";
import AmenitiesList from "@/app/components/AmenitiesList";
import { client } from "@/sanity/lib/client";
import { getInfoSectionByIdQuery } from "@/sanity/lib/queries";
import Image from "next/image";

// Define an interface matching your Sanity schema
interface InfoSection {
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

      return (
        <figure className="my-8">
          <Image
            src={value.asset ? value.asset._ref : "/placeholder.png"}
            alt={value.alt ?? "Decorative image"}
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

    console.log("Fetched house section:", section);

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
      <div className="container mx-auto max-w-4xl px-6 py-12">
        <p className="text-center text-muted-foreground">
          Unable to load house content. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-6 py-12">
      <article className="prose prose-lg dark:prose-invert mx-auto">
        <h1 className="text-4xl font-bold tracking-tighter mb-8">The House</h1>

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
