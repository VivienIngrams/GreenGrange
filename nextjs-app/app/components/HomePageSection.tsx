// components/HomePageSection.tsx
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PortableTextBlock } from "@portabletext/react";
import Image from "next/image";

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

interface HomePageSectionProps {
  data: HomePageInfoSectionData;
  index: number;
}

export default function HomePageSection({ data, index }: HomePageSectionProps) {
  // Determine if image should be on the left or right
  const imageOnLeft = index % 2 === 1;
  
  return (
    <div className="py-12">
      <div className="flex flex-col md:flex-row gap-12 items-center ">
        {/* Image Section */}
        <div className={`w-full mx-auto ${imageOnLeft ? 'md:order-first' : 'md:order-last'}`}>
          {data.image && (
            <div className="relative w-full  flex justify-center">
              <Image 
                src={data.image.src} 
                alt={data.image.alt}
                width={800}
                height={600}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-auto"
                style={{ 
                  objectFit: "contain", 
                  maxHeight: "70vh",
                  maxWidth: "100%" 
                }}
              />
            </div>
          )}
        </div>
        
        {/* Content Section */}
        <div className="w-full text-green-800">
          <h2 className="text-3xl font-bold mb-6">{data.title}</h2>
          <div className="prose prose-lg  mb-8">
            <PortableText value={data.homepageContent} />
          </div>
          <Link
            href={`/${data.identifier}`}
            className="group inline-flex items-center gap-2 text-primary text-xl font-medium hover:text-primary/80 transition-colors"
          >
            {data.linkText}
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}