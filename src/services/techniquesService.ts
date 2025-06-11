
import { apiClient } from '../config/apiConfig';

export const techniquesService = {
  getTechniques: async () => {
    console.log('⚠️  DEPRECATED: Use smartTechniquesService.getTechniques() instead');
    
    try {
      console.log('🔄 Fetching techniques from DirectCreate API...');
      const response = await apiClient.get('techniques');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('⚙️ Techniques API response:', data);
      
      // Handle the actual API response - it returns an error for unknown endpoints
      if (data.error === 'Unknown endpoint') {
        console.log('⚠️ Techniques endpoint not available, available endpoints:', data.available_endpoints);
        return {
          success: false,
          data: [],
          message: 'Techniques endpoint not available on this API version',
          availableEndpoints: data.available_endpoints
        };
      }
      
      if (data.success && Array.isArray(data.data)) {
        const transformedTechniques = data.data.map((technique: any) => ({
          id: technique.id.toString(),
          name: technique.name,
          description: technique.description,
          category: technique.category,
          difficulty: technique.difficulty,
          time_required: technique.time_required
        }));
        
        console.log(`✅ ${transformedTechniques.length} techniques loaded from DirectCreate API`);
        
        return {
          success: true,
          data: transformedTechniques,
          message: `${transformedTechniques.length} techniques loaded from DirectCreate API`
        };
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('❌ DirectCreate Techniques API Error:', error);
      return {
        success: false,
        data: [],
        message: `API Error: ${error.message}`,
        error: error.message
      };
    }
  },

  getCompatibleTechniques: async (materialId?: number, craftId?: number) => {
    try {
      const params = new URLSearchParams();
      if (materialId) params.append('material_id', materialId.toString());
      if (craftId) params.append('craft_id', craftId.toString());
      
      console.log(`🔄 Fetching compatible techniques for material: ${materialId}, craft: ${craftId}...`);
      const response = await apiClient.get('compatibleTechniques', params.toString());
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('🔗 Compatible techniques API response:', data);
      
      // Handle unknown endpoint error
      if (data.error === 'Unknown endpoint') {
        return {
          success: false,
          data: [],
          message: 'Compatible techniques endpoint not available',
          availableEndpoints: data.available_endpoints
        };
      }
      
      if (data.success && Array.isArray(data.data)) {
        return {
          success: true,
          data: data.data,
          message: "Compatible techniques loaded from DirectCreate API"
        };
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('❌ Compatible Techniques API Error:', error);
      return {
        success: false,
        data: [],
        message: `API Error: ${error.message}`,
        error: error.message
      };
    }
  }
};
