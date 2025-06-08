
import { useState, useEffect } from "react";
import { directCreateAPI } from "../config/api";

export const useCompatibleArtisans = (selectedMaterial: string, selectedCraft: string, selectedTechnique: string) => {
  const [compatibleArtisans, setCompatibleArtisans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const loadCompatibleArtisans = async (materialId?: string, craftId?: string, techniqueId?: string) => {
    if (!materialId && !craftId) {
      setCompatibleArtisans([]);
      setMessage("");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      console.log('🔄 Loading compatible artisans for selection...');
      
      const response = await directCreateAPI.getCompatibleArtisans(
        materialId ? parseInt(materialId) : undefined,
        craftId ? parseInt(craftId) : undefined,
        techniqueId ? parseInt(techniqueId) : undefined
      );
      
      if (response.success && Array.isArray(response.data)) {
        setCompatibleArtisans(response.data);
        if (response.data.length === 0) {
          setMessage("No specialized artisans found for this combination");
        } else {
          setMessage(`${response.data.length} specialized artisan${response.data.length !== 1 ? 's' : ''} found`);
        }
        console.log('✅ Compatible artisans loaded:', response.data.length);
      } else {
        console.error('Compatible artisans API error:', response.message);
        setCompatibleArtisans([]);
        setMessage("Unable to load artisan matches");
      }
    } catch (error) {
      console.error('❌ Error loading compatible artisans:', error);
      setCompatibleArtisans([]);
      setMessage("Error loading artisan matches");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedMaterial || selectedCraft) {
      loadCompatibleArtisans(selectedMaterial, selectedCraft, selectedTechnique);
    } else {
      setCompatibleArtisans([]);
      setMessage("");
    }
  }, [selectedMaterial, selectedCraft, selectedTechnique]);

  return {
    compatibleArtisans,
    loading,
    message
  };
};
