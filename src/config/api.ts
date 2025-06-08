
// Re-export configuration
export { API_CONFIG, buildApiUrl } from './apiConfig';

// Re-export services
export { materialsService } from '../services/materialsService';
export { craftsService } from '../services/craftsService';
export { techniquesService } from '../services/techniquesService';
export { artisansService } from '../services/artisansService';
export { aiService } from '../services/aiService';

// Maintain backward compatibility with existing directCreateAPI interface
export const directCreateAPI = {
  getMaterials: () => import('../services/materialsService').then(m => m.materialsService.getMaterials()),
  getCrafts: () => import('../services/craftsService').then(c => c.craftsService.getCrafts()),
  getTechniques: () => import('../services/techniquesService').then(t => t.techniquesService.getTechniques()),
  getCompatibleCrafts: (materialId: number) => import('../services/craftsService').then(c => c.craftsService.getCompatibleCrafts(materialId)),
  getCompatibleMaterials: (craftId: number) => import('../services/materialsService').then(m => m.materialsService.getCompatibleMaterials(craftId)),
  getCompatibleTechniques: (materialId?: number, craftId?: number) => import('../services/techniquesService').then(t => t.techniquesService.getCompatibleTechniques(materialId, craftId)),
  getCompatibleArtisans: (materialId?: number, craftId?: number, techniqueId?: number) => import('../services/artisansService').then(a => a.artisansService.getCompatibleArtisans(materialId, craftId, techniqueId)),
  analyzeProject: (description: string, imageUrl?: string) => import('../services/aiService').then(ai => ai.aiService.analyzeProject(description, imageUrl)),
  suggestMaterials: (projectType: string, style: string) => import('../services/aiService').then(ai => ai.aiService.suggestMaterials(projectType, style))
};
