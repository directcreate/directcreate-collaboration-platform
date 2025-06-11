
import { useState, useEffect } from "react";
import { directCreateAPI } from "../config/api";

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
      console.log('🔄 Loading 197 materials from DirectCreate Production Cloud API...');
      
      const response = await directCreateAPI.getMaterials();
      
      if (response.success && Array.isArray(response.data)) {
        // Transform API response to match UI format
        const transformedMaterials = response.data.map((material: any) => ({
          id: material.id.toString(),
          name: material.name,
          icon: getCategoryIcon(material.category || material.type),
          description: material.description || `High-quality ${material.name.toLowerCase()}`,
          category: material.category || material.type || "Material",
          sustainability_rating: material.sustainability_rating || material.sustainability || 8
        }));
        
        setMaterials(transformedMaterials);
        console.log(`✅ ${transformedMaterials.length}/197 materials loaded from Production Cloud API`);
      } else {
        throw new Error(response.message || 'Failed to load materials');
      }
    } catch (error: any) {
      console.error('❌ Error loading DirectCreate Production materials:', error);
      setError(`Production API connection failed: ${error.message}`);
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
