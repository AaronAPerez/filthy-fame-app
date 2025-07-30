import { CldImage } from 'next-cloudinary'

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className
}: OptimizedImageProps) {
  // Check if it's a Cloudinary URL
  if (src.includes('cloudinary.com')) {
    return (
      <CldImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        quality="auto"
        format="auto"
        crop="fill"
        gravity="auto"
      />
    )
  }
  
  // Fallback for other images
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  )
}