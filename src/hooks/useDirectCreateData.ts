
import { useState, useEffect } from "react";
import { smartMaterialsService } from "../services/smartMaterialsService";
import { smartCraftsService } from "../services/smartCraftsService";
import { smartTechniquesService } from "../services/smartTechniquesService";

// Fallback data for when API is unavailable
const fallbackMaterials = [
  { id: 1, name: "Organic Cotton", category: "Textile", sustainability_rating: 9 },
  { id: 2, name: "Bamboo", category: "Natural", sustainability_rating: 8 },
  { id: 3, name: "Reclaimed Wood", category: "Wood", sustainability_rating: 9 }
];

const fallbackCrafts = [
  { id: 1, name: "Hand Weaving", difficulty: "Medium", time_estimate: "2-4 weeks" },
  { id: 2, name: "Wood Carving", difficulty: "Hard", time_estimate: "3-6 weeks" },
  { id: 3, name: "Pottery", difficulty: "Medium", time_estimate: "2-3 weeks" }
];

const fallbackTechniques = [
  { id: 1, name: "Block Printing", category: "Textile", difficulty: "Easy" },
  { id: 2, name: "Hand Carving", category: "Wood", difficulty: "Medium" },
  { id: 3, name: "Wheel Throwing", category: "Ceramics", difficulty: "Hard" }
];

export const useDirectCreateData = () => {
  const [materials, setMaterials] = useState([]);
  const [crafts, setCrafts] = useState([]);
  const [techniques, setTechniques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      console.log('🔄 Loading all Smart Service data for project form...');
      
      // Use Promise.allSettled to handle partial failures gracefully
      const results = await Promise.allSettled([
        smartMaterialsService.getMaterials(),
        smartCraftsService.getCrafts(),
        smartTechniquesService.getTechniques()
      ]);

      const [materialsResult, craftsResult, techniquesResult] = results;

      // Process materials - combine recommended and others or use fallback
      if (materialsResult.status === 'fulfilled') {
        const allMaterials = [
          ...materialsResult.value.recommended,
          ...materialsResult.value.others
        ];
        setMaterials(allMaterials.length > 0 ? allMaterials : fallbackMaterials);
        console.log('✅ Materials loaded:', allMaterials.length || 'fallback');
      } else {
        console.error('❌ Materials failed, using fallback:', materialsResult);
        setMaterials(fallbackMaterials);
      }

      // Process crafts - combine recommended and others or use fallback
      if (craftsResult.status === 'fulfilled') {
        const allCrafts = [
          ...craftsResult.value.recommended,
          ...craftsResult.value.others
        ];
        setCrafts(allCrafts.length > 0 ? allCrafts : fallbackCrafts);
        console.log('✅ Crafts loaded:', allCrafts.length || 'fallback');
      } else {
        console.error('❌ Crafts failed, using fallback:', craftsResult);
        setCrafts(fallbackCrafts);
      }

      // Process techniques - combine recommended and others or use fallback
      if (techniquesResult.status === 'fulfilled') {
        const allTechniques = [
          ...techniquesResult.value.recommended,
          ...techniquesResult.value.others
        ];
        setTechniques(allTechniques.length > 0 ? allTechniques : fallbackTechniques);
        console.log('✅ Techniques loaded:', allTechniques.length || 'fallback');
      } else {
        console.error('❌ Techniques failed, using fallback:', techniquesResult);
        setTechniques(fallbackTechniques);
      }

      // Show warning if using fallback data
      const allFailed = results.every(result => result.status === 'rejected');
      if (allFailed) {
        setError("API unavailable - using offline data");
      }

      console.log('📊 Smart Services data loading complete');
    } catch (error) {
      console.error('❌ Error loading Smart Services data, using fallback:', error);
      setError("API unavailable - using offline data");
      // Set fallback data
      setMaterials(fallbackMaterials);
      setCrafts(fallbackCrafts);
      setTechniques(fallbackTechniques);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    console.log('🔄 Retrying Smart Services data load...');
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    materials,
    crafts,
    techniques,
    loading,
    error,
    handleRetry
  };
};
