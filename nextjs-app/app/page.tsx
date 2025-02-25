import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import AmenitiesList from "@/app/components/AmenitiesList"
import AvailabilityCalendar from "@/app/components/AvailabilityCalendar"
import PhotoGallery from "@/app/components/PhotoGallery"

export default function Home() {
  return (
    <>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Mountain Retreat Rental</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-muted-foreground">
            Experience luxury and comfort in our beautiful mountain cabin. Perfect for family getaways 
            or peaceful retreats, featuring stunning views and modern amenities.
          </p>
        </CardContent>
      </Card>

      <PhotoGallery />
      <AmenitiesList />
      <AvailabilityCalendar />
    </>
  )
}
