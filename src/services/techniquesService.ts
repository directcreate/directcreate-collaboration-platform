
import { API_CONFIG, apiClient } from '../config/apiConfig';

export const techniquesService = {
  getTechniques: async () => {
    try {
      console.log('🔄 Fetching techniques from local DirectCreate API...');
      const response = await apiClient.get('techniques');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ DirectCreate local techniques loaded:', data);
      
      if (data.success && Array.isArray(data.data)) {
        console.log(`✅ ${data.data.length} techniques loaded from local API`);
        return {
          success: true,
          data: data.data,
          message: `${data.data.length} techniques loaded from DirectCreate local API`
        };
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('❌ DirectCreate local API Error:', error);
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
          message: "Compatible techniques loaded from local DirectCreate API"
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
