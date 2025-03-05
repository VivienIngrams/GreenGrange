
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PortableTextBlock } from "@portabletext/react";

interface HomePageInfoSectionData {
  title: string;
  identifier: string;
  homepageContent: PortableTextBlock[];
  linkText: string;
}
interface InfoSectionProps {
  data: HomePageInfoSectionData;
  className?: string;
}

export default function InfoSection({ data, className }: InfoSectionProps) {
  return (
    <div className={`p-8 md:p-12 ${className}`}>
      <h1 className="py-6 text-3xl font-bold">{data.title}</h1>
      <div className="text-green-800 mb-6 text-xl font-light">
        <PortableText value={data.homepageContent} />
      </div>
      <Link 
        href={`/${data.identifier}`} 
        className="group inline-flex items-center gap-2 text-primary text-2xl font-medium hover:text-primary/80 transition-colors"
      >
        {data.linkText}
        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}



