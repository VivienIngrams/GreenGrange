import { MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[url('/hero-bg.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/40" />
      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-8">
          The Green Grange
        </h1>
        <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full text-gray-900">
          <MapPin className="h-5 w-5" />
          <p className="text-lg">4 Rue des Vannes, 10250 Gye sur Seine</p>
        </div>
        <Link
          href="https://maps.app.goo.gl/m4UppiXeNXT41AmN8"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-white hover:text-white/90 transition-colors text-lg font-medium"
        >
          View on Google Maps
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  )
}

