import Image from "next/image"

interface VideoThumbnailProps {
  src: string
  alt: string
  title: string
}

export function VideoThumbnail({ src, alt, title }: VideoThumbnailProps) {
  return (
    <div className="overflow-hidden rounded-lg shadow-sm transition-all hover:shadow-md">
      <Image
        src={src}
        alt={alt}
        width={200}
        height={112}
        layout="responsive"
        className="object-cover"
      />
      <div className="p-2">
        <h3 className="text-sm font-medium line-clamp-2">{title}</h3>
      </div>
    </div>
  )
}

