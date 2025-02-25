
'use client'
import { useState } from "react"
import Image from "next/image"

const photos = [
  "/placeholder.svg?height=400&width=600",
  "/placeholder.svg?height=400&width=600",
  "/placeholder.svg?height=400&width=600",

  "/placeholder.svg?height=400&width=600",
]

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)

  return (
    <section className="my-8">
      <h2 className="text-2xl font-semibold mb-4">Photo Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {photos.map((photo, index) => (
          <div key={index} className="cursor-pointer" onClick={() => setSelectedPhoto(photo)}>
            <Image
              src={photo || "/placeholder.svg"}
              alt={`House photo ${index + 1}`}
              width={300}
              height={200}
              className="rounded-lg object-cover w-full h-48"
            />
          </div>
        ))}
      </div>
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setSelectedPhoto(null)}
        >
          <Image
            src={selectedPhoto || "/placeholder.svg"}
            alt="Selected photo"
            width={800}
            height={600}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </section>
  )
}

