
import { API_CONFIG, apiClient } from '../config/apiConfig';

export const aiService = {
  analyzeProject: async (description: string, imageUrl?: string) => {
    try {
      console.log('🤖 Sending project analysis request to local DirectCreate AI...');
      const response = await apiClient.post('aiAnalysis', { 
        description, 
        image_url: imageUrl 
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ AI project analysis response:', data);
      
      return data.success ? data : { success: false, message: 'AI analysis failed' };
    } catch (error) {
      console.error('❌ AI project analysis error:', error);
      return { success: false, message: `Connection error: ${error.message}` };
    }
  },

  suggestMaterials: async (projectType: string, style: string) => {
    try {
      console.log('🤖 Requesting AI material suggestions from local DirectCreate API...');
      const response = await apiClient.get('aiMaterials', `project_type=${projectType}&style=${style}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ AI material suggestions response:', data);
      
      return data.success ? data : { success: false, message: 'AI suggestions failed' };
    } catch (error) {
      console.error('❌ AI material suggestions error:', error);
      return { success: false, message: `Connection error: ${error.message}` };
    }
  },

  matchArtisans: async (materialIds: number[], craftIds: number[], description: string) => {
    try {
      console.log('🤖 Requesting AI artisan matching from local DirectCreate API...');
      const response = await apiClient.post('aiArtisans', { 
        material_ids: materialIds, 
        craft_ids: craftIds,
        description 
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ AI artisan matching response:', data);
      
      return data.success ? data : { success: false, message: 'AI artisan matching failed' };
    } catch (error) {
      console.error('❌ AI artisan matching error:', error);
      return { success: false, message: `Connection error: ${error.message}` };
    }
  }
};
