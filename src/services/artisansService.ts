
import { API_CONFIG, apiClient } from '../config/apiConfig';

export const artisansService = {
  getCompatibleArtisans: async (materialId?: number, craftId?: number, techniqueId?: number) => {
    const params = new URLSearchParams();
    if (materialId) params.append('material_id', materialId.toString());
    if (craftId) params.append('craft_id', craftId.toString());
    if (techniqueId) params.append('technique_id', techniqueId.toString());
    
    try {
      console.log(`🔄 Fetching compatible artisans for material: ${materialId}, craft: ${craftId}, technique: ${techniqueId}...`);
      const response = await apiClient.get('compatibleArtisans', params.toString());
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ DirectCreate local compatible artisans loaded:', data);
      
      if (data.success && Array.isArray(data.data)) {
        return {
          success: true,
          data: data.data,
          message: "Compatible artisans loaded from DirectCreate local API"
        };
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('❌ DirectCreate Compatible Artisans API Error:', error);
      return {
        success: false,
        data: [],
        message: `API Error: ${error.message}`,
        error: error.message
      };
    }
  }
};
