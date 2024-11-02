import { CSSProperties, useState } from "react";
import { getLogosAndImages } from "../../functions/logoFunction";
import { Spinner } from "react-bootstrap";

type Props = {
  category: string;
  id: number;
  dimension: string;
  optionalClasses?: string;
  smallLoadingSpinner?: boolean
};

const LogoOrPlayerImage = ({
  category,
  dimension,
  id,
  optionalClasses,
  smallLoadingSpinner = true
}: Props) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  // loading and error handler functions
  const handleImgLoad = () => {
    setImageLoaded(true);
  };

  const handleImgError = () => {
    setImageLoaded(true);
    setImageError(true);
  };

  const imgStyles: CSSProperties = {
    width: dimension,
    height: dimension,
    objectFit: "contain",
    aspectRatio: 1 / 1,
  };

  return (
    <>
      {imageError && <span className="text-red-600">Image failed to load</span>}
      {!imageLoaded && <Spinner className="ratio-1x1" animation="grow" {...(smallLoadingSpinner ? { size: 'sm' } : {})}/>}
      <img
        style={imgStyles}
        src={getLogosAndImages(category, id)}
        onLoad={handleImgLoad}
        onError={handleImgError}
        className={optionalClasses}
      />
    </>
  );
};

export default LogoOrPlayerImage;
