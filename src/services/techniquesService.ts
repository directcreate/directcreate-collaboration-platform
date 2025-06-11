
import { API_CONFIG } from '../config/apiConfig';

const DIRECTCREATE_API = API_CONFIG.BASE_URL;

export const techniquesService = {
  // Get techniques from DirectCreate Production Cloud API
  getTechniques: async () => {
    try {
      console.log('🔄 Fetching 136 techniques from DirectCreate Production Cloud API...');
      const response = await fetch(`${DIRECTCREATE_API}/?path=techniques`, {
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
      console.log('✅ DirectCreate Production Cloud techniques loaded:', data);
      
      if (data.success && Array.isArray(data.data)) {
        console.log(`✅ ${data.data.length}/136 techniques loaded from Production Cloud API`);
        return {
          success: true,
          data: data.data,
          message: `${data.data.length} real techniques loaded from DirectCreate Production Cloud API`
        };
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('❌ DirectCreate Production Cloud API Error:', error);
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
      const response = await fetch(`${DIRECTCREATE_API}/?path=compatible-techniques&${params}`, {
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
      console.log('✅ DirectCreate compatible techniques loaded:', data);
      
      if (data.success && Array.isArray(data.data)) {
        return {
          success: true,
          data: data.data,
          message: "Compatible techniques loaded from DirectCreate Production database"
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
