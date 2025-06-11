
// Re-export configuration
export { API_CONFIG, apiClient, buildApiUrl, checkApiHealth } from './apiConfig';

// Re-export smart services (AI-first approach)
export { smartMaterialsService, SmartMaterialsService } from '../services/smartMaterialsService';
export { smartCraftsService, SmartCraftsService } from '../services/smartCraftsService';
export { smartTechniquesService, SmartTechniquesService } from '../services/smartTechniquesService';
export { smartArtisansService, SmartArtisansService } from '../services/smartArtisansService';

// Legacy services for backward compatibility (will be phased out)
export { materialsService } from '../services/materialsService';
export { craftsService } from '../services/craftsService';
export { techniquesService } from '../services/techniquesService';
export { artisansService } from '../services/artisansService';
export { aiService } from '../services/aiService';

// Consolidated DirectCreate API interface with AI-first approach
export const directCreateAPI = {
  // Smart AI-powered methods (preferred)
  getMaterials: async (projectDescription?: string) => {
    const { smartMaterialsService } = await import('../services/smartMaterialsService');
    return smartMaterialsService.getMaterials(projectDescription);
  },
  
  getCrafts: async (projectDescription?: string, materialId?: number) => {
    const { smartCraftsService } = await import('../services/smartCraftsService');
    return smartCraftsService.getCrafts(projectDescription, materialId);
  },
  
  getTechniques: async (projectDescription?: string, materialId?: number, craftId?: number) => {
    const { smartTechniquesService } = await import('../services/smartTechniquesService');
    return smartTechniquesService.getTechniques(projectDescription, materialId, craftId);
  },
  
  getArtisans: async (projectRequirements: any) => {
    const { smartArtisansService } = await import('../services/smartArtisansService');
    return smartArtisansService.getArtisans(projectRequirements);
  },

  // Legacy methods (for backward compatibility)
  getCompatibleCrafts: async (materialId: number) => {
    const { craftsService } = await import('../services/craftsService');
    return craftsService.getCompatibleCrafts(materialId);
  },
  
  getCompatibleMaterials: async (craftId: number) => {
    const { materialsService } = await import('../services/materialsService');
    return materialsService.getCompatibleMaterials(craftId);
  },
  
  getCompatibleTechniques: async (materialId?: number, craftId?: number) => {
    const { techniquesService } = await import('../services/techniquesService');
    return techniquesService.getCompatibleTechniques(materialId, craftId);
  },
  
  getCompatibleArtisans: async (materialId?: number, craftId?: number, techniqueId?: number) => {
    const { artisansService } = await import('../services/artisansService');
    return artisansService.getCompatibleArtisans(materialId, craftId, techniqueId);
  },

  // AI analysis methods
  analyzeProject: async (description: string, imageUrl?: string) => {
    const { aiService } = await import('../services/aiService');
    return aiService.analyzeProject(description, imageUrl);
  },
  
  suggestMaterials: async (projectType: string, style: string) => {
    const { aiService } = await import('../services/aiService');
    return aiService.suggestMaterials(projectType, style);
  }
};
