
import { apiClient } from '../config/apiConfig';

export const artisansService = {
  getCompatibleArtisans: async (materialId?: number, craftId?: number, techniqueId?: number) => {
    console.log('⚠️  DEPRECATED: Use smartArtisansService.getArtisans() instead');
    
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
      console.log('👥 Compatible artisans API response:', data);
      
      // Handle the actual API response - it returns an error for unknown endpoints
      if (data.error === 'Unknown endpoint') {
        console.log('⚠️ Compatible artisans endpoint not available, available endpoints:', data.available_endpoints);
        return {
          success: false,
          data: [],
          message: 'Compatible artisans endpoint not available on this API version',
          availableEndpoints: data.available_endpoints
        };
      }
      
      if (data.success && Array.isArray(data.data)) {
        return {
          success: true,
          data: data.data,
          message: "Compatible artisans loaded from DirectCreate API"
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
