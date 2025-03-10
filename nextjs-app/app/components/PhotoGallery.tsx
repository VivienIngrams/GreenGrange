
import { getPhotosQuery } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { PhotoGrid } from "./PhotoGrid";

interface Photos {
  images: string[];
}

async function getPhotos(): Promise<Photos> {
  const photos = await client.fetch<Photos>(getPhotosQuery);
  if (!photos || !photos.images) throw new Error("Failed to fetch photos");
  return photos; // Ensures it returns { images: [...] }
}
export default async function PhotoGallery() {
  const photos = await getPhotos()
 
 
  return (
    <section className="my-8">
      <PhotoGrid images={photos.images} />
    </section>
  )
} 