
import { API_CONFIG, buildApiUrl } from '../config/apiConfig';

export const aiService = {
  analyzeProject: async (description: string, imageUrl?: string) => {
    const params = new URLSearchParams();
    params.append('description', description);
    if (imageUrl) params.append('image_url', imageUrl);
    
    try {
      console.log('🤖 Sending project analysis request to DirectCreate AI...');
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.aiProjectAnalysis + '&' + params.toString()));
      
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
    const params = new URLSearchParams();
    params.append('project_type', projectType);
    params.append('style', style);
    
    try {
      console.log('🤖 Requesting AI material suggestions from DirectCreate...');
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.aiMaterialSuggestions + '&' + params.toString()));
      
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
  }
};
