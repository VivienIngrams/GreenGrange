import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PortableTextBlock } from "@portabletext/react";
import Image from "next/legacy/image";

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
    <div className="py-16 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
       

        {/* Content Section */}
        <div className="w-full text-green-800">
          <h2 className="text-2xl md:text-4xl font-bold mb-6">{data.title}</h2>
          <div className=" text-green-900 mb-8">
            <PortableText value={data.homepageContent} />
          </div>
          <Link
            href={`/${data.identifier}`}
            className="group inline-flex items-center gap-2 text-primary text-lg font-normal hover:text-primary/80 transition-colors"
          >
            {data.linkText}
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

         {/* Image Section */}
         <div className={`w-full ${imageOnLeft ? 'md:order-first' : 'md:order-last'}`}>
          {data.image && (
            <div className="relative w-full max-w-lg mx-auto">
              <div className="relative aspect-[4/3] w-full rounded-sm overflow-hidden shadow-lg">
                <Image 
                  src={data.image.src} 
                  alt={data.image.alt}
                  layout="fill"
                  objectFit="cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="rounded-sm"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
