
import { apiClient } from '../config/apiConfig';

export const materialsService = {
  getMaterials: async () => {
    console.log('⚠️  DEPRECATED: Use smartMaterialsService.getMaterials() instead');
    
    try {
      console.log('🔄 Fetching materials from DirectCreate API...');
      const response = await apiClient.get('materials');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📦 Materials API response:', data);
      
      // Handle the actual API response - it returns an error for unknown endpoints
      if (data.error === 'Unknown endpoint') {
        console.log('⚠️ Materials endpoint not available, available endpoints:', data.available_endpoints);
        return {
          success: false,
          data: [],
          message: 'Materials endpoint not available on this API version',
          availableEndpoints: data.available_endpoints
        };
      }
      
      // Handle successful response (if the endpoint becomes available)
      if (data.success && Array.isArray(data.data)) {
        const transformedMaterials = data.data.map((material: any) => ({
          id: material.id.toString(),
          name: material.name,
          description: material.description,
          category: material.category,
          sustainability_rating: material.sustainability_rating || 8
        }));
        
        console.log(`✅ ${transformedMaterials.length} materials loaded from DirectCreate API`);
        
        return {
          success: true,
          data: transformedMaterials,
          message: `${transformedMaterials.length} materials loaded from DirectCreate API`
        };
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('❌ DirectCreate Materials API Error:', error);
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
      const response = await apiClient.get('compatibleMaterials', `craft_id=${craftId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('🔗 Compatible materials API response:', data);
      
      // Handle unknown endpoint error
      if (data.error === 'Unknown endpoint') {
        return {
          success: false,
          data: [],
          message: 'Compatible materials endpoint not available',
          availableEndpoints: data.available_endpoints
        };
      }
      
      if (data.success && Array.isArray(data.data)) {
        return {
          success: true,
          data: data.data,
          message: "Compatible materials loaded from DirectCreate API"
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
