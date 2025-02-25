import AmenitiesList from "@/app/components/AmenitiesList";
import AvailabilityCalendar from "@/app/components/AvailabilityCalendar";
import PhotoGallery from "@/app/components/PhotoGallery";
import HeroSection from "@/app/components/HeroSection";
import  HomePageSection  from "@/app/components/HomePageSection";
import { PortableTextBlock } from "next-sanity";
import { getInfoSectionsQuery } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";

interface InfoSectionData {
  identifier: string
  content: PortableTextBlock[]
  linkText: string
 
}

async function getInfoSections(): Promise<InfoSectionData[]> {
  const sections = await client.fetch<InfoSectionData[]>(getInfoSectionsQuery)
  if (!sections) throw new Error("Failed to fetch info sections")
  return sections
}

export default async function HomePage() {
  const infoSections = await getInfoSections()

  return (
    <main className="min-h-screen">
      <HeroSection />
<PhotoGallery/>
      <div className="container mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 ">
          {infoSections.map((section: InfoSectionData) => (
            <HomePageSection key={section.identifier} data={section} />
          ))}
        </div>
      </div>
      <AmenitiesList/>
<AvailabilityCalendar/>
    </main>
  )
}