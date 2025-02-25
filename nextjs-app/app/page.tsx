import AmenitiesList from "@/app/components/AmenitiesList";
import AvailabilityCalendar from "@/app/components/AvailabilityCalendar";
import PhotoGallery from "@/app/components/PhotoGallery";
import HeroSection from "@/app/components/HeroSection";
import  HomePageSection  from "@/app/components/HomePageSection";

export default function Home() {
  return (
    <>
      <HeroSection />

      <div className="container mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 ">
          <HomePageSection
            content="The Green Grange is a rustic eco renovation of an 18th century small classic champagne village barn. Finished in early 2024 it incorporates recycled wood, insulating materials, local ancient and modern building styles, and an enclosed private courtyard. The river is about 100 metres away."
            linkText="More about the Renovation…"
            linkHref="/renovation"
          />

          <HomePageSection
            content="The village of Gye is hugged by the Seine river on all sides. The village and the region are full of great champagne producers who are building a growing international reputation. It is a living village surrounded by vines and forests, wildlife and numerous enchanting villages."
            linkText="What to do nearby…"
            linkHref="/nearby"
          />

          <HomePageSection
            content="The Green Grange ground floor consists of a 32 m2 sitting area, kitchen, wood stove, dining table and toilet with wide double doors leading onto a light filled courtyard. The upstairs has two bedrooms of 11 and 9 m2 for sleeping four people and a bathroom with an electric shower."
            linkText="Info about house…"
            linkHref="/house-info"
          />

          <HomePageSection
            content="Gyé-sur-Seine is about 220 km east of Paris, between Troyes and Châtillon sur Seine, in the beautiful region of the Aube. The train station of Vendeuvre-sur-Barse, 20 minutes from Gyé, is 1 hour and 45 minutes by train from Paris. You can arrange transportation to Gyé from Vendeuvre with a local cab company. Alternatively, you can rent a car in Troyes."
            linkText="Getting around..."
            linkHref="/getting-around"
          />
        </div>
      </div>

      <PhotoGallery />
      <AmenitiesList />
      <AvailabilityCalendar />
    </>
  );
}
