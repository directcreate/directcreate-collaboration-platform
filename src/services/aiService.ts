
import { API_CONFIG, buildApiUrl } from '../config/apiConfig';

export const aiService = {
  analyzeProject: async (description: string, imageUrl?: string) => {
    try {
      console.log('🤖 Sending project analysis request to working DirectCreate AI...');
      const response = await fetch('/api-proxy.php?path=ai-project-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description, image_url: imageUrl })
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
      console.log('🤖 Requesting AI material suggestions from working DirectCreate API...');
      const response = await fetch(`/api-proxy.php?path=ai-material-suggestions?project_type=${projectType}&style=${style}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
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
      console.log('🤖 Requesting AI artisan matching from working DirectCreate API...');
      const response = await fetch('/api-proxy.php?path=ai-artisan-matching', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          material_ids: materialIds, 
          craft_ids: craftIds,
          description 
        })
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
