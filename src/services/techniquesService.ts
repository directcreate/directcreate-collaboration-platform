
import { apiClient } from '../config/apiConfig';

export const techniquesService = {
  getTechniques: async () => {
    console.log('⚠️  DEPRECATED: Use smartTechniquesService.getTechniques() instead');
    
    try {
      console.log('🔄 Fetching techniques from DirectCreate API...');
      const response = await apiClient.get('techniques');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ DirectCreate techniques loaded:', data);
      
      if (data.success && Array.isArray(data.data)) {
        console.log(`✅ ${data.data.length} techniques loaded from DirectCreate API`);
        return {
          success: true,
          data: data.data,
          message: `${data.data.length} techniques loaded from DirectCreate API`
        };
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('❌ DirectCreate API Error:', error);
      return {
        success: false,
        data: [],
        message: `API Error: ${error.message}`,
        error: error.message
      };
    }
  },

  getCompatibleTechniques: async (materialId?: number, craftId?: number) => {
    const params = new URLSearchParams();
    if (materialId) params.append('material_id', materialId.toString());
    if (craftId) params.append('craft_id', craftId.toString());
    
    try {
      console.log(`🔄 Fetching compatible techniques for material: ${materialId}, craft: ${craftId}...`);
      const response = await apiClient.get('compatibleTechniques', params.toString());
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ Compatible techniques loaded:', data);
      
      if (data.success && Array.isArray(data.data)) {
        return {
          success: true,
          data: data.data,
          message: "Compatible techniques loaded from DirectCreate API"
        };
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('❌ Compatible Techniques API Error:', error);
      return {
        success: false,
        data: [],
        message: `API Error: ${error.message}`,
        error: error.message
      };
    }
  }
};
