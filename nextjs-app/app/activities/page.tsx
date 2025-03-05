import { PortableText } from "@portabletext/react"
import { Metadata } from "next"
import { client } from "@/sanity/lib/client"
import { getInfoSectionByIdQuery } from "@/sanity/lib/queries"

export const metadata: Metadata = {
  title: "Activities | The Green Grange",
  description: "Activities and things to do around The Green Grange"
}

// Define an interface matching your Sanity schema
interface InfoSection {
  title: string;
  identifier: string;
  pageContent: any[]; // This matches the array of blocks and images in your schema
  linkText: string;
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
    <div className="container mx-auto min-h-screen max-w-3xl px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tighter mb-8">{content?.title}</h1>
      <div className="">
        {content?.pageContent ? (
          <PortableText value={content.pageContent} />
        ) : (
          <p>No activities content available.</p>
        )}
      </div>
    </div>
  )
}