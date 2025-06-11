
import { API_CONFIG, apiClient, logApiCall, logApiResponse } from '../config/apiConfig';

export const materialsService = {
  getMaterials: async () => {
    logApiCall('materials');
    
    try {
      console.log('🔄 Fetching materials from local DirectCreate API...');
      const response = await apiClient.get('materials');
      
      console.log(`📊 HTTP Status: ${response.status} ${response.statusText}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      logApiResponse('materials', data, data.success);
      
      if (data.success && Array.isArray(data.data)) {
        console.log(`✅ ${data.data.length} materials loaded from local API`);
        return {
          success: true,
          data: data.data,
          message: `${data.data.length} materials loaded from DirectCreate local API`
        };
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('❌ DirectCreate local API Error:', error);
      logApiResponse('materials', null, false);
      return {
        success: false,
        data: [],
        message: `API Error: ${error.message}`,
        error: error.message
      };
    }
  },

  getCompatibleMaterials: async (craftId: number) => {
    try {
      console.log(`🔄 Fetching compatible materials for craft ID: ${craftId}...`);
      const response = await apiClient.get('compatibleMaterials', `craft_id=${craftId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ Compatible materials loaded:', data);
      
      if (data.success && Array.isArray(data.data)) {
        return {
          success: true,
          data: data.data,
          message: "Compatible materials loaded from local DirectCreate API"
        };
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('❌ Compatible Materials API Error:', error);
      return {
        success: false,
        data: [],
        message: `API Error: ${error.message}`,
        error: error.message
      };
    }
  }
};
