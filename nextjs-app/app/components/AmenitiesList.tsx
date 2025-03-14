import { Check, Star, Wifi, Car, Bath, Bed } from "lucide-react"
import { getAmenitiesQuery } from "@/sanity/lib/queries"
import { client } from "@/sanity/lib/client"

interface Amenity {
  name: string
  icon: string
}

interface AmenitiesData {
  title: string
  description?: string
  items: Amenity[]
}

const iconMap = {
  check: Check,
  star: Star,
  wifi: Wifi,
  car: Car,
  bath: Bath,
  bed: Bed
} as const

async function getAmenities(): Promise<AmenitiesData | null> {
  return client.fetch(getAmenitiesQuery)
}

export default async function AmenitiesList() {
  const amenities = await getAmenities()

  if (!amenities?.items?.length) return null

  return (
    <section className="my-8">
      <h3 className="text-2xl font-semibold font-kalnia tracking-tight mt-8 mb-4">{amenities.title}</h3>
      {amenities.description && (
        <p className="text-muted-foreground mb-4">{amenities.description}</p>
      )}
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {amenities.items.map((amenity, index) => {
          const Icon = iconMap[amenity.icon as keyof typeof iconMap] || Check
          return (
            <li key={index} className="flex items-center ">
              <Icon className="mr-2 h-5 w-5 text-primary" />
              <span className=" text-yellow-950">{amenity.name}</span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

