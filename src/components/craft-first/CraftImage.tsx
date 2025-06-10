import { useState } from "react";
import { getFallbackImage } from "./utils/imageUtils";

interface Craft {
  id: string;
  name: string;
  banner: string;
  bannerImage?: string;
}

interface CraftImageProps {
  craft: Craft;
}

// Proxy function to handle DirectCreate URLs
const getProxiedImageUrl = (imageUrl: string) => {
  // If it's already a proxied URL, return as-is
  if (imageUrl.includes('trycloudflare.com')) {
    return imageUrl;
  }
  
  // If it's a DirectCreate relative path, make it absolute first
  let fullUrl = imageUrl;
  if (imageUrl.startsWith('/images/')) {
    fullUrl = `https://directcreate.com${imageUrl}`;
  }
  
  // Proxy DirectCreate URLs to bypass CORS
  if (fullUrl.includes('directcreate.com') || fullUrl.includes('directcreateecomdev.s3.ap-south-1.amazonaws.com')) {
    return `https://healthcare-basket-thu-labour.trycloudflare.com/api-proxy.php?path=image-proxy&url=${encodeURIComponent(fullUrl)}`;
  }
  
  // Otherwise use the URL directly (for Unsplash fallbacks, etc.)
  return imageUrl;
};

const CraftImage = ({ craft }: CraftImageProps) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    console.log(`❌ FAILED: Image failed for ${craft.name}. URL:`, target.src);
    
    // Only use fallback if the current attempt fails
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
    
    if (craft.bannerImage && !imageError) {
      console.log(`✅ SUCCESS: DirectCreate banner loaded for ${craft.name}`);
    } else {
      console.log(`📷 Loaded fallback image for ${craft.name}:`, target.src);
    }
  };

  // Get the best image source with DirectCreate support
  const getImageSource = () => {
    // Priority 1: Real DirectCreate bannerImage from API
    if (!imageError && craft.bannerImage && craft.bannerImage.trim() !== '') {
      const proxiedUrl = getProxiedImageUrl(craft.bannerImage);
      console.log(`🎨 Using DirectCreate banner for ${craft.name}:`, proxiedUrl);
      return proxiedUrl;
    }
    
    // Priority 2: DirectCreate banner field (legacy support)
    if (!imageError && craft.banner && craft.banner.trim() !== '') {
      const proxiedUrl = getProxiedImageUrl(craft.banner);
      console.log(`🎨 Using DirectCreate legacy banner for ${craft.name}:`, proxiedUrl);
      return proxiedUrl;
    }
    
    // Priority 3: Categorized fallback images
    return getFallbackImage(craft.name);
  };

  const imageSource = getImageSource();

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
