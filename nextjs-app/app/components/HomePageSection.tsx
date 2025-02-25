import Link from "next/link"

interface HomePageSectionProps {
  content: string
  linkText: string
  linkHref: string
  className?: string
}

// Named export
export default function HomePageSection({ content, linkText, linkHref, className }: HomePageSectionProps) {
  return (
    <div className={`p-6 bg-card rounded-lg shadow-sm ${className}`}>
      <p className="text-card-foreground mb-4">{content}</p>
      <Link href={linkHref} className="text-primary hover:underline inline-flex items-center">
        {linkText}
      </Link>
    </div>
  )
}


