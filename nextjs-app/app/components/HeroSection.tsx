import Image from "next/legacy/image";
import { MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import background from "../../public/hero-bg.jpg";

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center">
      {/* Background Image using next/image */}
      <Image
        src={background}
        alt="Hero Background"
        layout="fill"
        objectFit="cover"
        priority
        className="absolute z-5 mb-24"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/15 z-0"></div>
      {/* Content */}
      <div className="h-full w-full absolute inset-0 flex items-center justify-center">
      <div className=" md:mx-auto md:max-w-5xl text-center text-white relative z-10">
        <h1 className="text-[55px] leading-[1] font-kalnia font-normal md:text-8xl tracking-tighter  my-8">
          The Green Grange
        </h1>
        <div className="inline-flex items-center gap-2 backdrop-blur-sm px-1 md:px-4 py-2 rounded-full  hover:bg-black/10 transition-all hover:scale-[1.02] ">
          <Link
            href="https://maps.app.goo.gl/m4UppiXeNXT41AmN8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:text-white/90 transition-colors text-xs md:text-lg font-medium"
          >
            <MapPin className="h-5 w-5" />
            4 rue des Vannes, 10250 Gye sur Seine
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
      </div>
    </section>
  );
}
