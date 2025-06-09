
// Get a professional fallback image based on craft name/category
export const getFallbackImage = (craftName: string) => {
  const name = craftName.toLowerCase();
  
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

// Get the best available image source with priority logic
export const getImageSource = (craft: { bannerImage?: string; banner: string; name: string }, imageError: boolean) => {
  // Priority 1: Real DirectCreate bannerImage from API (S3 URLs)
  if (!imageError && craft.bannerImage && craft.bannerImage.trim() !== '') {
    console.log(`🎨 Using REAL DirectCreate S3 banner for ${craft.name}:`, craft.bannerImage);
    return craft.bannerImage;
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
  return getFallbackImage(craft.name);
};
