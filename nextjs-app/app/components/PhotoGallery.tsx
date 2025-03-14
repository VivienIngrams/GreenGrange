import { PhotoGrid } from "./PhotoGrid";


interface PhotoGalleryProps {
  images: string[];
}

export default function PhotoGallery({ images }: PhotoGalleryProps) {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <section className="my-8">
      <PhotoGrid images={images} />
    </section>
  );
}