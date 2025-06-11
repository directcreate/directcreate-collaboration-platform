
import { useState, useEffect } from "react";
import { directCreateAPI } from "../config/api";

export const useCompatibleArtisans = (selectedMaterial: string, selectedCraft: string, selectedTechnique: string) => {
  const [compatibleArtisans, setCompatibleArtisans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const loadCompatibleArtisans = async (materialId?: string, craftId?: string, techniqueId?: string) => {
    // Require at least one selection
    if (!materialId && !craftId) {
      setCompatibleArtisans([]);
      setMessage("");
      return;
    }

    try {
      setLoading(true);
      setMessage("Finding specialized artisans...");
      console.log('🔄 Loading compatible artisans for selection...');
      
      // Convert to integers and validate
      const parsedMaterialId = materialId ? parseInt(materialId) : undefined;
      const parsedCraftId = craftId ? parseInt(craftId) : undefined;
      const parsedTechniqueId = techniqueId ? parseInt(techniqueId) : undefined;

      // Validate parsed values
      if (materialId && isNaN(parsedMaterialId)) {
        throw new Error('Invalid material ID');
      }
      if (craftId && isNaN(parsedCraftId)) {
        throw new Error('Invalid craft ID');
      }
      if (techniqueId && isNaN(parsedTechniqueId)) {
        throw new Error('Invalid technique ID');
      }
      
      const response = await directCreateAPI.getCompatibleArtisans(
        parsedMaterialId,
        parsedCraftId,
        parsedTechniqueId
      );
      
      if (response.success && Array.isArray(response.data)) {
        setCompatibleArtisans(response.data);
        if (response.data.length === 0) {
          setMessage("No specialized artisans found. Try adjusting your selections.");
        } else {
          setMessage(`${response.data.length} specialized artisan${response.data.length !== 1 ? 's' : ''} found`);
        }
        console.log('✅ Compatible artisans loaded:', response.data.length);
      } else {
        console.error('Compatible artisans API error:', response.message);
        setCompatibleArtisans([]);
        setMessage("Unable to load artisan matches at this time");
      }
    } catch (error) {
      console.error('❌ Error loading compatible artisans:', error);
      setCompatibleArtisans([]);
      setMessage("Error loading artisan matches. Please try again.");
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
