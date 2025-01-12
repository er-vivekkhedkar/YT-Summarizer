import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { Clock } from 'lucide-react'

interface VideoCardProps {
  title: string
  image: string
  duration: string
}

const getYouTubeThumbnail = (videoId: string) => {
  const thumbnails = [
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/default.jpg`,
  ];
  
  return thumbnails[1]; // Using hqdefault as it's more reliable
};

export function VideoCard({ title, image, duration }: VideoCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:transform hover:scale-105">
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
        <Button variant="outline" size="sm" className="w-full">View Summary</Button>
      </div>
    </div>
  )
}

