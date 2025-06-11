
import { useState, useEffect } from "react";
import { smartMaterialsService } from "../services/smartMaterialsService";
import { smartCraftsService } from "../services/smartCraftsService";
import { smartTechniquesService } from "../services/smartTechniquesService";

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

      // Process materials - combine recommended and others
      if (materialsResult.status === 'fulfilled') {
        const allMaterials = [
          ...materialsResult.value.recommended,
          ...materialsResult.value.others
        ];
        setMaterials(allMaterials || []);
        console.log('✅ Materials loaded:', allMaterials.length);
      } else {
        console.error('❌ Materials failed to load:', materialsResult);
        setMaterials([]);
      }

      // Process crafts - combine recommended and others
      if (craftsResult.status === 'fulfilled') {
        const allCrafts = [
          ...craftsResult.value.recommended,
          ...craftsResult.value.others
        ];
        setCrafts(allCrafts || []);
        console.log('✅ Crafts loaded:', allCrafts.length);
      } else {
        console.error('❌ Crafts failed to load:', craftsResult);
        setCrafts([]);
      }

      // Process techniques - combine recommended and others
      if (techniquesResult.status === 'fulfilled') {
        const allTechniques = [
          ...techniquesResult.value.recommended,
          ...techniquesResult.value.others
        ];
        setTechniques(allTechniques || []);
        console.log('✅ Techniques loaded:', allTechniques.length);
      } else {
        console.error('❌ Techniques failed to load:', techniquesResult);
        setTechniques([]);
      }

      // Check if all requests failed
      const allFailed = results.every(result => result.status === 'rejected');

      if (allFailed) {
        setError("Smart Services unavailable. Please ensure the API is running on localhost:8081");
      } else {
        // Check for partial failures
        const failedAPIs = [];
        if (materialsResult.status === 'rejected') {
          failedAPIs.push('materials');
        }
        if (craftsResult.status === 'rejected') {
          failedAPIs.push('crafts');
        }
        if (techniquesResult.status === 'rejected') {
          failedAPIs.push('techniques');
        }

        if (failedAPIs.length > 0) {
          setError(`Some Smart Services failed: ${failedAPIs.join(', ')}. Check API server status.`);
        }
      }

      console.log('📊 Smart Services data loading complete');
    } catch (error) {
      console.error('❌ Error loading Smart Services data:', error);
      setError(`Smart Services connection failed: ${error.message}`);
      // Set empty arrays as fallback
      setMaterials([]);
      setCrafts([]);
      setTechniques([]);
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
