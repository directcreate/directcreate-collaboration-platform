
import { useState } from "react";
import { getImageSource, getFallbackImage } from "./utils/imageUtils";

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

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    console.log(`❌ FAILED: DirectCreate banner failed for ${craft.name}. URL:`, target.src);
    
    // Only use fallback if the real DirectCreate URL fails
    if (!imageError) {
      setImageError(true);
      const fallbackUrl = getFallbackImage(craft.name);
      target.src = fallbackUrl;
      console.log(`🔄 Switching to fallback for ${craft.name}:`, fallbackUrl);
    }
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    setImageLoaded(true);
    
    if (craft.bannerImage && target.src === craft.bannerImage) {
      console.log(`✅ SUCCESS: Loaded REAL DirectCreate banner for ${craft.name}:`, target.src);
    } else {
      console.log(`📷 Loaded fallback image for ${craft.name}:`, target.src);
    }
  };

  const imageSource = getImageSource(craft, imageError);

  return (
    <div className="relative h-48 overflow-hidden bg-muted">
      <img
        src={imageSource}
        alt={craft.name}
        className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
        onError={handleImageError}
        onLoad={handleImageLoad}
        crossOrigin="anonymous"
      />
      {/* Overlay badge for real DirectCreate images */}
      {craft.bannerImage && !imageError && (
        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
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
