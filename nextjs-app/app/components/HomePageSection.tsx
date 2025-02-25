import { PortableText } from "@portabletext/react"
import Link from "next/link"
import { PortableTextBlock } from "@portabletext/react"

interface InfoSectionData {
  identifier: string
  content: PortableTextBlock[]
  linkText: string
 
}

interface InfoSectionProps {
  data: InfoSectionData
  className?: string
}

export default function InfoSection({ data, className }: InfoSectionProps) {
  return (
    <div className={`p-6 bg-card rounded-lg shadow-sm ${className}`}>
      <div className="prose prose-sm dark:prose-invert mb-4">
        <PortableText value={data.content} />
      </div>
      <Link href={`/${data.identifier}`} className="text-primary hover:underline inline-flex items-center">
        {data.linkText}
      </Link>
    </div>
  )
}

