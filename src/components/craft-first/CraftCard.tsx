import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CraftCardProps {
  craft: {
    id: string;
    name: string;
    icon: string;
    description: string;
    difficulty: string;
    time_estimate: string;
    banner: string;
    bannerImage?: string; // Real DirectCreate banner from API
    category: string;
  };
  isSelected: boolean;
  onSelect: (craftId: string) => void;
}

const CraftCard = ({ craft, isSelected, onSelect }: CraftCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Clean HTML description and extract plain text
  const cleanDescription = (htmlDescription: string) => {
    if (!htmlDescription) return '';
    
    // Create a temporary div to extract text from HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlDescription;
    const cleanText = tempDiv.textContent || tempDiv.innerText || '';
    
    return cleanText.trim();
  };

  // Truncate text to specified length
  const truncateText = (text: string, maxLength: number = 100) => {
    const cleanText = cleanDescription(text);
    if (cleanText.length <= maxLength) return cleanText;
    return cleanText.substring(0, maxLength).trim() + '...';
  };

  const toggleExpanded = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const openCraftDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Use correct DirectCreate URL structure for craft details
    window.open(`https://directcreate.com/products?craft=${craft.id}`, '_blank');
  };

  // Validate and get the best available image source
  const getImageSource = () => {
    // Priority 1: Real DirectCreate bannerImage from API (CloudFront CDN)
    if (!imageError && craft.bannerImage && craft.bannerImage.trim() !== '') {
      // Validate CloudFront URL
      if (craft.bannerImage.includes('d35l77wxi0xou3.cloudfront.net')) {
        console.log(`🎨 Using real DirectCreate CloudFront banner for ${craft.name}:`, craft.bannerImage);
        return craft.bannerImage;
      }
      // Other DirectCreate URLs
      if (craft.bannerImage.startsWith('http')) {
        console.log(`🎨 Using DirectCreate banner for ${craft.name}:`, craft.bannerImage);
        return craft.bannerImage;
      }
    }
    
    // Priority 2: DirectCreate banner field (if available)
    if (!imageError && craft.banner && craft.banner.trim() !== '') {
      // Check if it's already a full URL
      if (craft.banner.startsWith('http')) {
        return craft.banner;
      }
      // If it's a relative path, make it absolute to DirectCreate
      return `https://directcreate.com/uploads/crafts/${craft.banner}`;
    }
    
    // Priority 3: Categorized fallback images
    return getFallbackImage();
  };

  // Get a professional fallback image based on craft name/category
  const getFallbackImage = () => {
    const name = craft.name.toLowerCase();
    
    // Traditional textile crafts
    if (name.includes('ajrakh') || name.includes('block printing') || name.includes('bagru')) {
      return 'https://images.unsplash.com/photo-1586985289906-406988974504?w=400&h=300&fit=crop&auto=format';
    }
    if (name.includes('bandhani') || name.includes('tie dye')) {
      return 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&auto=format';
    }
    if (name.includes('applique') || name.includes('embroidery')) {
      return 'https://images.unsplash.com/photo-1586985289906-406988974504?w=400&h=300&fit=crop&auto=format';
    }
    if (name.includes('batik')) {
      return 'https://images.unsplash.com/photo-1586985289906-406988974504?w=400&h=300&fit=crop&auto=format';
    }
    
    // Metalwork and jewelry
    if (name.includes('bell metal') || name.includes('metal')) {
      return 'https://images.unsplash.com/photo-1609205807107-171cea41d6cd?w=400&h=300&fit=crop&auto=format';
    }
    if (name.includes('jewelry') || name.includes('jewellery')) {
      return 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop&auto=format';
    }
    
    // Pottery and ceramics
    if (name.includes('pottery') || name.includes('ceramic')) {
      return 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&auto=format';
    }
    
    // Weaving and textiles
    if (name.includes('weaving') || name.includes('textile')) {
      return 'https://images.unsplash.com/photo-1586985289906-406988974504?w=400&h=300&fit=crop&auto=format';
    }
    
    // Wood and carving
    if (name.includes('wood') || name.includes('carving')) {
      return 'https://images.unsplash.com/photo-1609205807107-171cea41d6cd?w=400&h=300&fit=crop&auto=format';
    }
    
    // Default heritage craft fallback
    return 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400&h=300&fit=crop&auto=format';
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    console.log(`🖼️ Image failed for ${craft.name}. Tried:`, target.src);
    
    // If this was a DirectCreate image, try fallback
    if (!imageError) {
      setImageError(true);
      const fallbackUrl = getFallbackImage();
      if (target.src !== fallbackUrl) {
        target.src = fallbackUrl;
        console.log(`🔄 Switching to fallback for ${craft.name}:`, fallbackUrl);
      }
    }
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    setImageLoaded(true);
    
    if (craft.bannerImage && target.src === craft.bannerImage) {
      console.log(`✅ Loaded real DirectCreate banner for ${craft.name}:`, target.src);
    } else {
      console.log(`📷 Loaded fallback image for ${craft.name}:`, target.src);
    }
  };

  const fullDescription = cleanDescription(craft.description);
  const imageSource = getImageSource();

  return (
    <Card
      onClick={() => onSelect(craft.id)}
      className={`cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg overflow-hidden ${
        isSelected
          ? 'ring-2 ring-primary shadow-lg'
          : 'hover:shadow-md'
      }`}
    >
      {/* Craft Banner Image */}
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
        {craft.bannerImage && !imageError && craft.bannerImage.includes('cloudfront') && (
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

      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-foreground line-clamp-1">
            {craft.name}
          </h3>
          <Badge variant="secondary" className="ml-2 text-xs">
            {craft.difficulty}
          </Badge>
        </div>
        
        <div className="mb-3">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {isExpanded ? fullDescription : truncateText(craft.description, 100)}
          </p>
          
          {/* Action buttons row */}
          <div className="flex items-center gap-2 mt-2">
            {fullDescription.length > 100 && (
              <button
                onClick={toggleExpanded}
                className="text-primary text-xs hover:underline flex items-center gap-1"
              >
                {isExpanded ? (
                  <>Show Less <ChevronUp className="w-3 h-3" /></>
                ) : (
                  <>Read More <ChevronDown className="w-3 h-3" /></>
                )}
              </button>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={openCraftDetails}
              className="text-xs h-6 px-2 text-primary hover:text-primary"
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              View Details
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span className="bg-muted px-2 py-1 rounded-full">
            {craft.category}
          </span>
          <span>{craft.time_estimate}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CraftCard;
