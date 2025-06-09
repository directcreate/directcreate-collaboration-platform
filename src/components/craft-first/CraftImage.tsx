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

// Proxy function to handle DirectCreate S3 URLs
const getProxiedImageUrl = (bannerImage: string) => {
  // If it's a DirectCreate S3 URL, proxy it to bypass CORS
  if (bannerImage && bannerImage.includes('directcreateecomdev.s3.ap-south-1.amazonaws.com')) {
    return `https://healthcare-basket-thu-labour.trycloudflare.com/api-proxy.php?path=image-proxy&url=${encodeURIComponent(bannerImage)}`;
  }
  // Otherwise use the URL directly (for Unsplash fallbacks, etc.)
  return bannerImage;
};

const CraftImage = ({ craft }: CraftImageProps) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    console.log(`❌ FAILED: Even proxy failed for ${craft.name}. URL:`, target.src);
    
    // Only use fallback if the proxied DirectCreate URL fails
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
      console.log(`✅ SUCCESS: Real DirectCreate banner loaded via proxy for ${craft.name}`);
    } else {
      console.log(`📷 Loaded fallback image for ${craft.name}:`, target.src);
    }
  };

  // Get the best image source with proxy support
  const getImageSource = () => {
    // Priority 1: Real DirectCreate bannerImage from API (S3 URLs with proxy)
    if (!imageError && craft.bannerImage && craft.bannerImage.trim() !== '') {
      const proxiedUrl = getProxiedImageUrl(craft.bannerImage);
      console.log(`🎨 Using PROXIED DirectCreate S3 banner for ${craft.name}:`, proxiedUrl);
      return proxiedUrl;
    }
    
    // Priority 2: DirectCreate banner field (if available)
    if (!imageError && craft.banner && craft.banner.trim() !== '') {
      // Check if it's already a full URL
      if (craft.banner.startsWith('http')) {
        return getProxiedImageUrl(craft.banner);
      }
      // If it's a relative path, make it absolute to DirectCreate and proxy it
      const fullUrl = `https://directcreate.com/uploads/crafts/${craft.banner}`;
      return getProxiedImageUrl(fullUrl);
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
