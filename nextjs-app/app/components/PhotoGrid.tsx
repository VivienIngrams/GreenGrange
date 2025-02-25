'use client'

import Image from "next/image"
import { useState } from "react"

interface PhotoGridProps {
  images: string[]
}

export function PhotoGrid({ images }: PhotoGridProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((photo: string, index: number) => (
          <div
            key={index}
            className="cursor-pointer aspect-[4/3] relative"
            onClick={() => setSelectedPhoto(photo)}
            role="button"
            tabIndex={0}
            aria-label={`View house photo ${index + 1}`}
            onKeyDown={(e) => e.key === 'Enter' && setSelectedPhoto(photo)}
          > 
            <Image
              src={photo}
              alt={`House photo ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>        
        ))}
      </div>

      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setSelectedPhoto(null)}
          role="dialog"
          aria-label="Photo viewer"
        >
          <div className="relative w-full h-full max-w-4xl max-h-[90vh] m-4">
            <Image
              src={selectedPhoto}
              alt="Selected photo"
              fill
              className="object-contain"
              sizes="(max-width: 1536px) 100vw, 1536px"
              priority
            />
          </div>
        </div>
      )}
    </>
  )
}