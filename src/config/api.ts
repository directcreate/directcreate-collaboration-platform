
// Re-export configuration
export { API_CONFIG, buildApiUrl } from './apiConfig';

// Re-export services
export { materialsService } from '../services/materialsService';
export { craftsService } from '../services/craftsService';
export { techniquesService } from '../services/techniquesService';
export { artisansService } from '../services/artisansService';
export { aiService } from '../services/aiService';

// Simplified directCreateAPI interface with proper async handling
export const directCreateAPI = {
  getMaterials: async () => {
    const { materialsService } = await import('../services/materialsService');
    return materialsService.getMaterials();
  },
  getCrafts: async () => {
    const { craftsService } = await import('../services/craftsService');
    return craftsService.getCrafts();
  },
  getTechniques: async () => {
    const { techniquesService } = await import('../services/techniquesService');
    return techniquesService.getTechniques();
  },
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
  analyzeProject: async (description: string, imageUrl?: string) => {
    const { aiService } = await import('../services/aiService');
    return aiService.analyzeProject(description, imageUrl);
  },
  suggestMaterials: async (projectType: string, style: string) => {
    const { aiService } = await import('../services/aiService');
    return aiService.suggestMaterials(projectType, style);
  }
};
