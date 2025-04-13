import { PortableText } from "@portabletext/react";
import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import {
  getInfoSectionByIdQuery,
  getNextInfoSectionQuery,
  getFirstInfoSectionQuery,
  getPhotosQuery,
} from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/utils";
import Image from "next/image";
import { Typography } from "../components/Typography";
import PhotoGallery from "@/app/components/PhotoGallery";
import AmenitiesList from "@/app/components/AmenitiesList";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface InfoSection {
  title: string;
  identifier: string;
  homepageContent: any[];
  pageContent: any[];
  linkText: string;
  order: number;
}

interface Photos {
  images: string[];
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
        <figure className="my-2 relative overflow-hidden rounded-sm ">
          <Image
            src={imageUrl}
            alt={value.alt ?? "Decorative image"}
            className="w-full h-auto md:w-auto md:h-[50vh] rounded-sm"
            width={800}
            height={500}
            priority
            sizes="(max-width: 768px) 90vw, 40vw"
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
  marks: {
    link: ({
      children,
      value,
    }: {
      children: React.ReactNode;
      value?: { href?: string };
    }) => {
      if (!value?.href) return <>{children}</>;
      return <Typography.Link href={value.href}>{children}</Typography.Link>;
    },
  },
};

async function getContentBySlug(slug: string): Promise<InfoSection | null> {
  try {
    const section = await client.fetch(getInfoSectionByIdQuery, {
      identifier: slug,
    });
    return section || null;
  } catch (error) {
    console.error("Error fetching content:", error);
    return null;
  }
}

async function getNextInfoSection(order: number): Promise<InfoSection | null> {
  try {
    const nextSection = await client.fetch(getNextInfoSectionQuery, { order });
    return nextSection || null;
  } catch (error) {
    console.error("Error fetching next section:", error);
    return null;
  }
}

async function getFirstInfoSection(): Promise<InfoSection | null> {
  try {
    const firstSection = await client.fetch(getFirstInfoSectionQuery);
    return firstSection || null;
  } catch (error) {
    console.error("Error fetching first section:", error);
    return null;
  }
}

async function getPhotosBySlug(slug: string): Promise<Photos | null> {
  try {
    const photos = await client.fetch(getPhotosQuery, { slug });
    return photos || null;
  } catch (error) {
    console.error("Error fetching photos:", error);
    return null;
  }
}

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export async function generateMetadata(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const slug = params.slug;
  const query = searchParams.query;
  const content = await getContentBySlug(slug);

  if (!content) {
    return {
      title: "Page Not Found",
      description: "The page you are looking for does not exist.",
    };
  }

  const description = content.homepageContent
    .map((block) => {
      if (block._type === "block" && block.children) {
        return block.children
          .map((child: { text: string }) => child.text)
          .join(" ");
      }
      return "";
    })
    .join(" ");

  return {
    title: content.title,
    description: description || "No description available.",
  };
}

export default async function DynamicPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const slug = params.slug;
  const query = searchParams.query;

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

  const nextSection = await getNextInfoSection(content.order);
  const firstSection = await getFirstInfoSection();
  const photos = await getPhotosBySlug(slug);

  return (
    <div className="font-jost mx-auto min-h-screen max-w-3xl py-2 bg-[#edf4ea]">
      <article className="mx-auto -mt-12 md:mt-4">
        <Typography.H1>{content.title}</Typography.H1>
        {content.pageContent ? (
          <PortableText
            value={content.pageContent}
            components={portableTextComponents}
          />
        ) : (
          <p>No content available.</p>
        )}
      </article>
      {photos && photos.images.length > 0 && (
        <div className="mt-16">
          <PhotoGallery images={photos.images} />
        </div>
      )}
      {slug === "house" && (
        <div className="mt-16">
          <AmenitiesList />
        </div>
      )}
      {slug === "renovation" && (
        <div className="mt-16">
          <div
            style={{
              position: "relative",
              width: "100%",
              height: 0,
              paddingTop: "56.25%",
              paddingBottom: 0,
              boxShadow: "0 2px 8px 0 rgba(63,69,81,0.16)",
              marginTop: "1.6em",
              marginBottom: "0.9em",
              overflow: "hidden",
              borderRadius: "8px",
              willChange: "transform",
            }}
          >
            <iframe
              loading="lazy"
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                border: "none",
                padding: 0,
                margin: 0,
              }}
              src="https://www.canva.com/design/DAGS_pidyFE/eZiN8i_YZqnV4wl-aNT4uA/watch?embed"
              allow="fullscreen"
              title="The Green Grange Story"
            ></iframe>
          </div>
        </div>
      )}
      {nextSection ? (
        <div className="mt-16 text-center">
          <Link
            href={`/${nextSection.identifier}`}
            className="group inline-flex items-center gap-2 text-lg font-semibold hover:text-green-700 transition-colors"
          >
            {nextSection.linkText}
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      ) : (
        firstSection && (
          <div className="mt-16 text-center">
            <Link
              href={`/${firstSection.identifier}`}
              className="group inline-flex items-center gap-2 text-lg font-semibold hover:text-green-700 transition-colors"
            >
              {firstSection.linkText}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        )
      )}
    </div>
  );
}
