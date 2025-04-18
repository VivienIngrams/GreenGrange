
// import AvailabilityCalendar from "@/app/components/AvailabilityCalendar";
import HeroSection from "@/app/components/HeroSection";
import HomePageSection from "@/app/components/HomePageSection";
import { PortableTextBlock } from "@portabletext/react";
import { getInfoSectionsQuery } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { LockKeyhole } from "lucide-react"

interface HomePageInfoSectionData {
  title: string;
  identifier: string;
  homepageContent: PortableTextBlock[];
  linkText: string;
  image: {
    src: string;
    alt: string;
  };
}

async function getInfoSections(): Promise<HomePageInfoSectionData[]> {
  const sections = await client.fetch<HomePageInfoSectionData[]>(getInfoSectionsQuery);
  if (!sections) throw new Error("Failed to fetch info sections");
  return sections;
}

export default async function HomePage() {
  const infoSections = await getInfoSections();
  
  return (
    <main className="min-h-screen relative bg-[#edf4ea]">
      <HeroSection />
      
      {infoSections.map((section: HomePageInfoSectionData, index: number) => (
        <div
          key={section.identifier}
          className={`md:min-h-[80vh] flex items-center justify-center ${
            index % 2 === 0 ? 'bg-background' : 'bg-muted'
          }`}
        >
          <div className=" max-w-5xl">
            <HomePageSection data={section} index={index} />
          </div>
        </div>
      ))}
      <div className="">
        <a href="https://green-grange-studio.vercel.app/structure"
        target="_blank" rel="noopener noreferrer" className="z-20 absolute bottom-4 right-6 text-[#d3e6c4] ">
          <LockKeyhole size={24} />
        </a>
      
      </div>
      {/* <div className="min-h-screen flex items-center justify-center bg-background">
        <div className=" max-w-6xl px-6">
          <AvailabilityCalendar />
        </div>
      </div> */}
    </main>
  );
}