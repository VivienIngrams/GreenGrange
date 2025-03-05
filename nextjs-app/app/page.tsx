import AvailabilityCalendar from "@/app/components/AvailabilityCalendar";
import HeroSection from "@/app/components/HeroSection";
import HomePageSection from "@/app/components/HomePageSection";
import { PortableTextBlock } from "@portabletext/react";
import { getInfoSectionsQuery } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";

interface HomePageInfoSectionData {
  identifier: string;
  homepageContent: PortableTextBlock[];
  linkText: string;
}

async function getInfoSections(): Promise<HomePageInfoSectionData[]> {
  const sections = await client.fetch<HomePageInfoSectionData[]>(getInfoSectionsQuery);
  if (!sections) throw new Error("Failed to fetch info sections");
  return sections;
}

export default async function HomePage() {
  const infoSections = await getInfoSections();

  return (
    <main className="min-h-screen">
      <HeroSection />
      
      {infoSections.map((section: HomePageInfoSectionData, index: number) => (
        <div 
          key={section.identifier}
          className={`min-h-screen flex items-center justify-center ${
            index % 2 === 0 ? 'bg-background' : 'bg-muted'
          }`}
        >
          <div className="container max-w-6xl px-6">
            <HomePageSection data={section} />
          </div>
        </div>
      ))}

      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="container max-w-6xl px-6">
          <AvailabilityCalendar />
        </div>
      </div>
    </main>
  );
}
