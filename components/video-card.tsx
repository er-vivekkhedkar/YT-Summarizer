"use client"
import Image from 'next/image'
import { Clock } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface VideoCardProps {
  title: string
  image: string
  duration: string
}

export function VideoCard({ title, image, duration }: VideoCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:transform hover:scale-105 dark:bg-gray-900 dark:text-white">
      <div className="relative">
        <Image
          src={image}
          alt={title}
          width={640}
          height={360}
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs flex items-center">
          <Clock className="w-3 h-3 mr-1" />
          {duration}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{title}</h3>
        <Button variant="outline" size="sm" className="w-full text-gray-900 dark:text-black">View Summary</Button>
      </div>
    </div>
  )
}
