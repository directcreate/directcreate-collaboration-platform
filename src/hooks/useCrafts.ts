
import { useState, useEffect } from "react";
import { directCreateAPI } from "../config/api";

interface Craft {
  id: string;
  name: string;
  icon: string;
  description: string;
  difficulty: string;
  time_estimate: string;
  banner: string;
  bannerImage?: string;
  detailUrl?: string;
  category: string;
}

export const useCrafts = () => {
  const [crafts, setCrafts] = useState<Craft[]>([]);
  const [loading, setLoading] = useState(true);

  // Category icon mapping
  const getCraftIcon = (name: string) => {
    const iconMap: Record<string, string> = {
      "Hand Weaving": "🧶",
      "Wood Carving": "🪵", 
      "Pottery": "🏺",
      "Metalworking": "🔨",
      "Jewelry Making": "💍",
      "Glassblowing": "🫧",
      "Leatherwork": "🦴",
      "Basketry": "🧺",
      "Blacksmithing": "⚒️",
      "Ceramics": "🏺",
      "Textiles": "🧶",
      "Stonework": "🗿"
    };
    return iconMap[name] || "🎨";
  };

  useEffect(() => {
    const loadCrafts = async () => {
      try {
        console.log('🔄 Loading crafts from DirectCreate API...');
        const response = await directCreateAPI.getCrafts();
        
        if (response.success) {
          // Transform API response to match UI format with proper bannerImage mapping
          const transformedCrafts = response.data.map((craft: any) => {
            const transformed = {
              id: craft.id.toString(),
              name: craft.name,
              icon: getCraftIcon(craft.name),
              description: craft.description,
              difficulty: craft.difficulty,
              time_estimate: craft.time_estimate,
              banner: craft.banner || '',
              bannerImage: craft.bannerImage, // Direct mapping from API
              detailUrl: craft.detailUrl, // Direct mapping from API
              category: craft.category || 'Traditional Craft'
            };
            
            // Debug: Log craft transformation
            console.log(`🔍 Craft transformation for ${craft.name}:`, {
              id: transformed.id,
              bannerImage: transformed.bannerImage,
              detailUrl: transformed.detailUrl
            });
            
            return transformed;
          });
          
          setCrafts(transformedCrafts);
          console.log('✅ Crafts loaded:', transformedCrafts.length);
        }
      } catch (error) {
        console.error('❌ Error loading crafts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCrafts();
  }, []);

  return { crafts, loading };
};
