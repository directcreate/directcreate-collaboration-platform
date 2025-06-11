
import { API_CONFIG } from '../../../config/apiConfig';

// High-quality categorized fallback images
const FALLBACK_IMAGES = {
  textile: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop&auto=format',
  printing: 'https://images.unsplash.com/photo-1586985289906-406988974504?w=800&h=400&fit=crop&auto=format',
  jewelry: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=400&fit=crop&auto=format',
  wood: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=400&fit=crop&auto=format',
  metal: 'https://images.unsplash.com/photo-1609205807107-171cea41d6cd?w=800&h=400&fit=crop&auto=format',
  default: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&h=400&fit=crop&auto=format'
};

// Smart categorization for fallback selection
export const getCategorizedFallback = (craftName: string): string => {
  const name = craftName.toLowerCase();
  
  // Traditional textile crafts
  if (name.includes('ajrakh') || name.includes('bagru') || name.includes('printing') || name.includes('block')) {
    return FALLBACK_IMAGES.printing;
  }
  if (name.includes('bandhani') || name.includes('tie dye') || name.includes('textile') || name.includes('applique') || name.includes('embroidery')) {
    return FALLBACK_IMAGES.textile;
  }
  
  // Jewelry and ornamental crafts
  if (name.includes('jewelry') || name.includes('jewellery') || name.includes('afghani') || name.includes('ornament')) {
    return FALLBACK_IMAGES.jewelry;
  }
  
  // Wood and bamboo crafts
  if (name.includes('wood') || name.includes('bamboo') || name.includes('apa') || name.includes('carving')) {
    return FALLBACK_IMAGES.wood;
  }
  
  // Metal work
  if (name.includes('metal') || name.includes('bell') || name.includes('mirror') || name.includes('brass') || name.includes('copper')) {
    return FALLBACK_IMAGES.metal;
  }
  
  return FALLBACK_IMAGES.default;
};

// Image source resolver - S3 images should work directly now with CORS fixed
export const getImageSource = (craft: { bannerImage?: string; banner?: string; name: string }): string => {
  // Priority 1: DirectCreate S3 images (CORS fixed - should load directly)
  if (craft.bannerImage && craft.bannerImage.includes('directcreateecomdev.s3.ap-south-1.amazonaws.com')) {
    console.log(`🖼️ Using S3 image for ${craft.name}:`, craft.bannerImage);
    return craft.bannerImage;
  }
  
  // Priority 2: Any other valid HTTP bannerImage URL
  if (craft.bannerImage && craft.bannerImage.startsWith('http')) {
    return craft.bannerImage;
  }
  
  // Priority 3: Banner field fallback (if it's a full URL)
  if (craft.banner && craft.banner.startsWith('http')) {
    return craft.banner;
  }
  
  // Priority 4: High-quality categorized fallbacks
  return getCategorizedFallback(craft.name);
};

// Error handler with categorized fallbacks
export const handleImageError = (craft: { id: string; name: string; bannerImage?: string }) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`Image failed for ${craft.name}, using fallback`);
  }
  return getCategorizedFallback(craft.name);
};
