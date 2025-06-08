
import { useState, useEffect } from "react";
import { directCreateAPI } from "../config/api";

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
      console.log('🔄 Loading all DirectCreate data for project form...');
      
      // Use Promise.allSettled to handle partial failures gracefully
      const results = await Promise.allSettled([
        directCreateAPI.getMaterials(),
        directCreateAPI.getCrafts(),
        directCreateAPI.getTechniques()
      ]);

      const [materialsResult, craftsResult, techniquesResult] = results;

      // Process materials
      if (materialsResult.status === 'fulfilled' && materialsResult.value.success) {
        setMaterials(materialsResult.value.data);
        console.log('✅ Materials loaded:', materialsResult.value.data.length);
      } else {
        console.error('❌ Materials failed to load:', materialsResult);
        setMaterials([]);
      }

      // Process crafts
      if (craftsResult.status === 'fulfilled' && craftsResult.value.success) {
        setCrafts(craftsResult.value.data);
        console.log('✅ Crafts loaded:', craftsResult.value.data.length);
      } else {
        console.error('❌ Crafts failed to load:', craftsResult);
        setCrafts([]);
      }

      // Process techniques
      if (techniquesResult.status === 'fulfilled' && techniquesResult.value.success) {
        setTechniques(techniquesResult.value.data);
        console.log('✅ Techniques loaded:', techniquesResult.value.data.length);
      } else {
        console.error('❌ Techniques failed to load:', techniquesResult);
        setTechniques([]);
      }

      // Check if all requests failed
      const allFailed = results.every(result => 
        result.status === 'rejected' || 
        (result.status === 'fulfilled' && !result.value.success)
      );

      if (allFailed) {
        setError("Failed to load DirectCreate data. Please check your connection and try again.");
      } else {
        // Check for partial failures
        const failedAPIs = [];
        if (materialsResult.status === 'rejected' || !materialsResult.value?.success) {
          failedAPIs.push('materials');
        }
        if (craftsResult.status === 'rejected' || !craftsResult.value?.success) {
          failedAPIs.push('crafts');
        }
        if (techniquesResult.status === 'rejected' || !techniquesResult.value?.success) {
          failedAPIs.push('techniques');
        }

        if (failedAPIs.length > 0) {
          setError(`Some data failed to load: ${failedAPIs.join(', ')}. You can still use the available data.`);
        }
      }

      console.log('📊 DirectCreate data loading complete');
    } catch (error) {
      console.error('❌ Error loading DirectCreate data:', error);
      setError(`Connection error: ${error.message}. Please verify the DirectCreate API is running.`);
      // Set empty arrays as fallback
      setMaterials([]);
      setCrafts([]);
      setTechniques([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    console.log('🔄 Retrying DirectCreate data load...');
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
