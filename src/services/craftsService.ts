
import { API_CONFIG } from '../config/apiConfig';

const DIRECTCREATE_API = API_CONFIG.BASE_URL;

export const craftsService = {
  // Get crafts from real DirectCreate database  
  getCrafts: async () => {
    try {
      console.log('🔄 Fetching crafts from DirectCreate database...');
      const response = await fetch(`${DIRECTCREATE_API}?path=crafts`, {
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
      console.log('✅ DirectCreate crafts loaded:', data);
      
      if (data.success && Array.isArray(data.data)) {
        return {
          success: true,
          data: data.data,
          message: "Real crafts loaded from DirectCreate database"
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

  // Get compatible crafts for a specific material
  getCompatibleCrafts: async (materialId: number) => {
    try {
      console.log(`🔄 Fetching compatible crafts for material ID: ${materialId}...`);
      const response = await fetch(`${DIRECTCREATE_API}?path=compatible-crafts&material_id=${materialId}`, {
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
      console.log('✅ DirectCreate compatible crafts loaded:', data);
      
      if (data.success && Array.isArray(data.data)) {
        return {
          success: true,
          data: data.data,
          message: "Compatible crafts loaded from DirectCreate database"
        };
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('❌ DirectCreate Compatible Crafts API Error:', error);
      return {
        success: false,
        data: [],
        message: `API Error: ${error.message}`,
        error: error.message
      };
    }
  }
};
