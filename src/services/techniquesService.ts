
import { API_CONFIG } from '../config/apiConfig';

const DIRECTCREATE_API = API_CONFIG.BASE_URL;

export const techniquesService = {
  // Get techniques from real DirectCreate Enhanced ML API
  getTechniques: async () => {
    try {
      console.log('🔄 Fetching techniques from DirectCreate Enhanced ML API...');
      const response = await fetch(`${DIRECTCREATE_API}?path=techniques`, {
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
      console.log('✅ DirectCreate Enhanced ML techniques loaded:', data);
      
      if (data.success && Array.isArray(data.data)) {
        return {
          success: true,
          data: data.data,
          message: "Real techniques loaded from DirectCreate Enhanced ML API"
        };
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('❌ DirectCreate Enhanced ML API Error:', error);
      return {
        success: false,
        data: [],
        message: `API Error: ${error.message}`,
        error: error.message
      };
    }
  },

  // Get compatible techniques for specific material and/or craft
  getCompatibleTechniques: async (materialId?: number, craftId?: number) => {
    const params = new URLSearchParams();
    if (materialId) params.append('material_id', materialId.toString());
    if (craftId) params.append('craft_id', craftId.toString());
    
    try {
      console.log(`🔄 Fetching compatible techniques for material: ${materialId}, craft: ${craftId}...`);
      const response = await fetch(`${DIRECTCREATE_API}?path=compatible-techniques&${params}`, {
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
      console.log('✅ DirectCreate compatible techniques loaded:', data);
      
      if (data.success && Array.isArray(data.data)) {
        return {
          success: true,
          data: data.data,
          message: "Compatible techniques loaded from DirectCreate database"
        };
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('❌ DirectCreate Compatible Techniques API Error:', error);
      return {
        success: false,
        data: [],
        message: `API Error: ${error.message}`,
        error: error.message
      };
    }
  }
};
