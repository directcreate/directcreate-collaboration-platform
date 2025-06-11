
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
    } catch (error: any) {
      console.error('❌ Error loading Smart Materials:', error);
      setError(`Smart Materials Service error: ${error.message}`);
      setMaterials([]);
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
