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
        <div className="inline-flex items-center gap-2 backdrop-blur-sm bg-black/30 px-4 py-2 rounded-full text-white">
          <MapPin className="h-5 w-5" />
          
        
        <Link
          href="https://maps.app.goo.gl/m4UppiXeNXT41AmN8"
          target="_blank"
          rel="noopener noreferrer"
          className=" inline-flex items-center gap-2  hover:text-white/90 transition-colors text-lg font-medium"
        >
          4 Rue des Vannes, 10250 Gye sur Seine
          <ArrowRight className="w-5 h-5" />
        </Link>
        </div>
      </div>
    </section>
  )
}

