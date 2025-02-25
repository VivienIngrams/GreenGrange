import { MapPin } from "lucide-react"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="relative bg-muted py-24 px-6">
      <div className="container mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">The Green Grange</h1>
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <MapPin className="h-5 w-5" />
          <p className="text-lg">4 Rue des Vannes, 10250 Gye sur Seine</p>
        </div>
        <Link
          href="https://maps.app.goo.gl/m4UppiXeNXT41AmN8"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center mt-4 text-primary hover:underline"
        >
          View on Google Maps
        </Link>
      </div>
    </section>
  )
}

