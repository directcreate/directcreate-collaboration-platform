
import { API_CONFIG, buildApiUrl } from '../config/apiConfig';

export const aiService = {
  analyzeProject: async (description: string, imageUrl?: string) => {
    const params = new URLSearchParams();
    params.append('description', description);
    if (imageUrl) params.append('image_url', imageUrl);
    
    try {
      const response = await fetch(buildApiUrl(`?path=ai-project-analysis&${params}`));
      const data = await response.json();
      return data.success ? data : null;
    } catch (error) {
      console.error('AI project analysis error:', error);
      return null;
    }
  },

  suggestMaterials: async (projectType: string, style: string) => {
    const params = new URLSearchParams();
    params.append('project_type', projectType);
    params.append('style', style);
    
    try {
      const response = await fetch(buildApiUrl(`?path=ai-material-suggestions&${params}`));
      const data = await response.json();
      return data.success ? data : null;
    } catch (error) {
      console.error('AI material suggestions error:', error);
      return null;
    }
  }
};
