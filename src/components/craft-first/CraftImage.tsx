
import { useState } from "react";
import { getProductionImageSource, handleImageError } from "./utils/imageUtils";

interface Craft {
  id: string;
  name: string;
  banner: string;
  bannerImage?: string;
}

interface CraftImageProps {
  craft: Craft;
}

const CraftImage = ({ craft }: CraftImageProps) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageErrorEvent = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    
    if (!imageError) {
      setImageError(true);
      const fallbackUrl = handleImageError(craft);
      target.src = fallbackUrl;
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`🔄 Using fallback for ${craft.name}:`, fallbackUrl);
      }
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    
    if (process.env.NODE_ENV === 'development' && craft.bannerImage && !imageError) {
      console.log(`✅ DirectCreate image loaded for ${craft.name}`);
    }
  };

  // Get production image source
  const imageSource = getProductionImageSource(craft);

  return (
    <div className="relative h-48 overflow-hidden bg-muted">
      <img
        src={imageSource}
        alt={craft.name}
        className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
        onError={handleImageErrorEvent}
        onLoad={handleImageLoad}
        crossOrigin="anonymous"
      />
      
      {/* DirectCreate badge for authentic images */}
      {craft.bannerImage && !imageError && craft.bannerImage.includes('directcreate') && (
        <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
          DirectCreate
        </div>
      )}
      
      {/* Loading indicator */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
          <span className="text-muted-foreground text-sm">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default CraftImage;
