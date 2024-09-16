import { CSSProperties } from "react"

type Props = {
  src: string
  alt?: string
  size?: string
}

const CircularImageContainer = ({ src, size, alt }: Props) => {
  const imageStyle: CSSProperties = {
    width: size,
    height: size,
    borderRadius: '50%',
    objectFit: 'cover',
    // aspectRatio: '16:9'
  }

  return (
    <img src={src} alt={alt} style={imageStyle}/>
  )
}

export default CircularImageContainer