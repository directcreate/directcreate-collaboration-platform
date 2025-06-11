
import { apiClient } from '../config/apiConfig';

export const craftsService = {
  getCrafts: async () => {
    console.log('⚠️  DEPRECATED: Use smartCraftsService.getCrafts() instead');
    
    try {
      console.log('🔄 Fetching crafts from DirectCreate API...');
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
        
        console.log(`✅ ${transformedCrafts.length} crafts loaded from DirectCreate API`);
        
        return {
          success: true,
          data: transformedCrafts,
          message: `${transformedCrafts.length} crafts loaded from DirectCreate API`
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
          message: "Compatible crafts loaded from DirectCreate API"
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
