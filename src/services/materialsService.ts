
import { API_CONFIG, logApiCall, logApiResponse } from '../config/apiConfig';

const DIRECTCREATE_API = API_CONFIG.BASE_URL;

export const materialsService = {
  getMaterials: async () => {
    const endpoint = '?path=materials';
    logApiCall(endpoint);
    
    try {
      console.log('🔄 Fetching materials from DirectCreate Enhanced ML API...');
      const response = await fetch(`${DIRECTCREATE_API}${endpoint}`, {
        method: 'GET',
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      console.log(`📊 HTTP Status: ${response.status} ${response.statusText}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      logApiResponse(endpoint, data, data.success);
      
      if (data.success && Array.isArray(data.data)) {
        return {
          success: true,
          data: data.data,
          message: "Real materials loaded from DirectCreate Enhanced ML API"
        };
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('❌ DirectCreate Enhanced ML API Error:', error);
      logApiResponse(endpoint, null, false);
      return {
        success: false,
        data: [],
        message: `API Error: ${error.message}`,
        error: error.message
      };
    }
  },

  // Get compatible materials for a specific craft
  getCompatibleMaterials: async (craftId: number) => {
    try {
      console.log(`🔄 Fetching compatible materials for craft ID: ${craftId}...`);
      const response = await fetch(`${DIRECTCREATE_API}?path=compatible-materials&craft_id=${craftId}`, {
        method: 'GET',
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ DirectCreate compatible materials loaded:', data);
      
      if (data.success && Array.isArray(data.data)) {
        return {
          success: true,
          data: data.data,
          message: "Compatible materials loaded from DirectCreate database"
        };
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('❌ DirectCreate Compatible Materials API Error:', error);
      return {
        success: false,
        data: [],
        message: `API Error: ${error.message}`,
        error: error.message
      };
    }
  }
};
