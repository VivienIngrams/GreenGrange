import { PortableText } from "@portabletext/react"
import Link from "next/link"
import { PortableTextBlock } from "@portabletext/react"
import { ArrowRight } from "lucide-react"

interface InfoSectionData {
  identifier: string
  homepageContent: PortableTextBlock[]
  pageContent: PortableTextBlock[]
  linkText: string
}

interface InfoSectionProps {
  data: InfoSectionData
  className?: string
}

export default function InfoSection({ data, className }: InfoSectionProps) {
  return (
    <div className={`p-8 md:p-12 bg-card rounded-xl shadow-lg ${className} transform transition-all hover:scale-[1.02]`}>
      <div className="prose prose-lg dark:prose-invert mb-6 max-w-3xl">
        <PortableText value={data.homepageContent} />
      </div>
      <Link 
        href={`/${data.identifier}`} 
        className="group inline-flex items-center gap-2 text-primary text-lg font-medium hover:text-primary/80 transition-colors"
      >
        {data.linkText}
        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  )
}

