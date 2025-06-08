
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
      
      const [materialsResponse, craftsResponse, techniquesResponse] = await Promise.all([
        directCreateAPI.getMaterials(),
        directCreateAPI.getCrafts(),
        directCreateAPI.getTechniques()
      ]);

      if (materialsResponse.success) {
        setMaterials(materialsResponse.data);
      } else {
        console.error('Materials API error:', materialsResponse.message);
      }
      
      if (craftsResponse.success) {
        setCrafts(craftsResponse.data);
      } else {
        console.error('Crafts API error:', craftsResponse.message);
      }
      
      if (techniquesResponse.success) {
        setTechniques(techniquesResponse.data);
      } else {
        console.error('Techniques API error:', techniquesResponse.message);
      }

      // Check if any API calls failed
      if (!materialsResponse.success || !craftsResponse.success || !techniquesResponse.success) {
        const failedAPIs = [];
        if (!materialsResponse.success) failedAPIs.push('materials');
        if (!craftsResponse.success) failedAPIs.push('crafts');
        if (!techniquesResponse.success) failedAPIs.push('techniques');
        
        setError(`Failed to load: ${failedAPIs.join(', ')}`);
      }

      console.log('✅ DirectCreate data loaded successfully');
    } catch (error) {
      console.error('❌ Error loading DirectCreate data:', error);
      setError(`Connection error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
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
