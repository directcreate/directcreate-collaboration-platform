
import { API_CONFIG } from '../config/apiConfig';

const DIRECTCREATE_API = API_CONFIG.BASE_URL;

export const craftsService = {
  // Get crafts from DirectCreate Production Cloud API
  getCrafts: async () => {
    try {
      console.log('🔄 Fetching 528 crafts from DirectCreate Production Cloud API...');
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
        // Transform data ensuring proper bannerImage mapping from S3
        const transformedCrafts = data.data.map((craft: any) => ({
          id: craft.id.toString(),
          name: craft.name,
          description: craft.description,
          difficulty: craft.difficulty,
          time_estimate: craft.time_estimate,
          banner: craft.banner,
          bannerImage: craft.bannerImage, // Direct S3 URL: https://directcreateecomdev.s3.ap-south-1.amazonaws.com/
          detailUrl: craft.detailUrl,
          category: craft.category || 'Traditional Craft'
        }));
        
        console.log(`✅ ${transformedCrafts.length}/528 crafts loaded from Production Cloud API with S3 images`);
        
        return {
          success: true,
          data: transformedCrafts,
          message: `${transformedCrafts.length} crafts loaded from DirectCreate Production Cloud database`
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
          message: "Compatible crafts loaded from Production Cloud"
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
