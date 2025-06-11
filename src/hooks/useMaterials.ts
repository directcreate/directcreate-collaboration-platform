
import { useState, useEffect } from "react";
import { smartMaterialsService } from "../services/smartMaterialsService";

interface Material {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: string;
  sustainability_rating: number;
}

// Fallback materials data when API is unavailable
const fallbackMaterials: Material[] = [
  {
    id: "1",
    name: "Organic Cotton",
    icon: "🧶",
    description: "Sustainable cotton grown without harmful chemicals",
    category: "Textile",
    sustainability_rating: 9
  },
  {
    id: "2",
    name: "Bamboo",
    icon: "🎋",
    description: "Fast-growing sustainable material",
    category: "Natural",
    sustainability_rating: 8
  },
  {
    id: "3",
    name: "Reclaimed Wood",
    icon: "🌳",
    description: "Recycled wood from old structures",
    category: "Wood",
    sustainability_rating: 9
  }
];

export const useMaterials = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Category icon mapping
  const getCategoryIcon = (category: string) => {
    const iconMap: Record<string, string> = {
      "Wood": "🌳",
      "Metal": "⚒️",
      "Textile": "🧶", 
      "Natural": "🎋",
      "Clay": "🏺",
      "Fabric": "🧶",
      "Leather": "🦎",
      "Cotton": "🧶",
      "Wool": "🐑",
      "Bamboo": "🎋",
      "Hemp": "🌿"
    };
    return iconMap[category] || "📦";
  };

  const loadMaterials = async () => {
    try {
      setLoading(true);
      setError("");
      console.log('🔄 Loading materials from Smart Materials Service...');
      
      const response = await smartMaterialsService.getMaterials();
      
      // Combine recommended and others from Smart service
      const allMaterials = [...response.recommended, ...response.others];
      
      if (allMaterials.length === 0) {
        console.log('⚠️ No materials from API, using fallback data');
        setMaterials(fallbackMaterials);
      } else {
        // Transform to match UI format
        const transformedMaterials = allMaterials.map((material: any) => ({
          id: material.id.toString(),
          name: material.name,
          icon: getCategoryIcon(material.category || material.type),
          description: material.description || `High-quality ${material.name.toLowerCase()}`,
          category: material.category || material.type || "Material",
          sustainability_rating: material.sustainability_rating || material.sustainability || 8
        }));
        
        setMaterials(transformedMaterials);
        console.log(`✅ ${transformedMaterials.length} materials loaded from Smart Materials Service`);
      }
    } catch (error: any) {
      console.error('❌ Error loading materials, using fallback data:', error);
      setMaterials(fallbackMaterials);
      setError("Using offline data - API unavailable");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMaterials();
  }, []);

  return {
    materials,
    loading,
    error,
    retryLoading: loadMaterials
  };
};
