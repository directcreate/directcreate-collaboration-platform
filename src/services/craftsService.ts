
import { API_CONFIG } from '../config/apiConfig';

const DIRECTCREATE_API = API_CONFIG.BASE_URL;

export const craftsService = {
  // Get crafts from DirectCreate Enhanced ML API
  getCrafts: async () => {
    try {
      console.log('🔄 Fetching crafts from DirectCreate API...');
      const response = await fetch(`${DIRECTCREATE_API}${API_CONFIG.ENDPOINTS.crafts}`, {
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
      
      if (data.success && Array.isArray(data.data)) {
        // Transform data ensuring proper bannerImage mapping
        const transformedCrafts = data.data.map((craft: any) => ({
          id: craft.id.toString(),
          name: craft.name,
          description: craft.description,
          difficulty: craft.difficulty,
          time_estimate: craft.time_estimate,
          banner: craft.banner,
          bannerImage: craft.bannerImage, // Direct S3 URL from DirectCreate database
          detailUrl: craft.detailUrl,
          category: craft.category || 'Traditional Craft'
        }));
        
        console.log(`✅ ${transformedCrafts.length} crafts loaded from DirectCreate`);
        
        return {
          success: true,
          data: transformedCrafts,
          message: "Crafts loaded from DirectCreate database"
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
      const response = await fetch(`${DIRECTCREATE_API}${API_CONFIG.ENDPOINTS.compatibleCrafts}&material_id=${materialId}`, {
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
      
      if (data.success && Array.isArray(data.data)) {
        return {
          success: true,
          data: data.data,
          message: "Compatible crafts loaded"
        };
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('❌ Compatible Crafts API Error:', error);
      return {
        success: false,
        data: [],
        message: `API Error: ${error.message}`,
        error: error.message
      };
    }
  }
};
