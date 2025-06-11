
import { API_CONFIG, apiClient } from '../config/apiConfig';

export const craftsService = {
  getCrafts: async () => {
    try {
      console.log('🔄 Fetching crafts from local DirectCreate API...');
      const response = await apiClient.get('crafts');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success && Array.isArray(data.data)) {
        const transformedCrafts = data.data.map((craft: any) => ({
          id: craft.id.toString(),
          name: craft.name,
          description: craft.description,
          difficulty: craft.difficulty,
          time_estimate: craft.time_estimate,
          banner: craft.banner,
          bannerImage: craft.bannerImage,
          detailUrl: craft.detailUrl,
          category: craft.category || 'Traditional Craft'
        }));
        
        console.log(`✅ ${transformedCrafts.length} crafts loaded from local API`);
        
        return {
          success: true,
          data: transformedCrafts,
          message: `${transformedCrafts.length} crafts loaded from DirectCreate local API`
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

  getCompatibleCrafts: async (materialId: number) => {
    try {
      const response = await apiClient.get('compatibleCrafts', `material_id=${materialId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success && Array.isArray(data.data)) {
        return {
          success: true,
          data: data.data,
          message: "Compatible crafts loaded from local API"
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
