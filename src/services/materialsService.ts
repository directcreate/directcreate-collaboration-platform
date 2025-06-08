
import { API_CONFIG } from '../config/apiConfig';

const DIRECTCREATE_API = API_CONFIG.BASE_URL;

export const materialsService = {
  // Get materials from real DirectCreate database
  getMaterials: async () => {
    try {
      console.log('🔄 Fetching materials from DirectCreate database...');
      const response = await fetch(`${DIRECTCREATE_API}?path=materials`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ DirectCreate materials loaded:', data);
      
      // Handle DirectCreate API response format
      if (data.success && Array.isArray(data.data)) {
        return {
          success: true,
          data: data.data,
          message: "Real materials loaded from DirectCreate database"
        };
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('❌ DirectCreate API Error:', error);
      // Return empty array as fallback with error indication
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
