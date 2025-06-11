
import { useState, useEffect } from "react";
import { smartCraftsService } from "../services/smartCraftsService";

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
        console.log('🔄 Loading crafts from Smart Crafts Service...');
        const response = await smartCraftsService.getCrafts();
        
        // Combine recommended and others from Smart service
        const allCrafts = [...response.recommended, ...response.others];
        
        // Transform to match UI format
        const transformedCrafts = allCrafts.map((craft: any) => ({
          id: craft.id.toString(),
          name: craft.name,
          icon: getCraftIcon(craft.name),
          description: craft.description,
          difficulty: craft.difficulty,
          time_estimate: craft.time_estimate,
          banner: craft.banner || '',
          bannerImage: craft.bannerImage,
          detailUrl: craft.detailUrl,
          category: craft.category || 'Traditional Craft'
        }));
        
        setCrafts(transformedCrafts);
        console.log(`✅ ${transformedCrafts.length} crafts loaded from Smart Crafts Service`);
      } catch (error) {
        console.error('❌ Error loading crafts from Smart Crafts Service:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCrafts();
  }, []);

  return { crafts, loading };
};
