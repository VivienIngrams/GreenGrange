'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface PhotoGridProps {
  images: string[]; // Array of image URLs from Sanity
}

export function PhotoGrid({ images }: PhotoGridProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const openImage = (src: string, index: number) => {
    setSelectedImage(src);
    setCurrentIndex(index);
  };

  const showNextImage = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const showPrevImage = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIndex]);
    setCurrentIndex(prevIndex);
  };

  return (
    <>
      {/* Masonry Grid using CSS Columns */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {images.map((imageUrl, index) => (
          <Link
            href={imageUrl}
            key={imageUrl} // Use URL as unique key
            className="break-inside-avoid cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              openImage(imageUrl, index);
            }}
          >
            <Image
              src={imageUrl}
              alt={`Gallery Image ${index + 1}`}
              width={500}
              height={500} // Placeholder size, maintains aspect ratio
              className="w-full h-auto object-cover mb-4 rounded-sm"
              loading="lazy"
            />
          </Link>
        ))}
      </div>

      {/* Image Viewer Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative max-w-4xl max-h-[90vh] flex items-center justify-center">
            <button
              className="absolute left-4 text-white text-3xl md:text-5xl"
              onClick={showPrevImage}
            >
              &lt;
            </button>

            <Image
              src={selectedImage}
              alt="Selected Image"
              width={1200}
              height={800}
              className="max-w-full max-h-[90vh] object-contain"
            />

            <button
              className="absolute right-4 text-white text-3xl md:text-5xl"
              onClick={showNextImage}
            >
              &gt;
            </button>

            <button
              className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full"
              onClick={() => setSelectedImage(null)}
              aria-label="Close viewer"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
