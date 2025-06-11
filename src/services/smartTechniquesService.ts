
import { apiClient } from '../config/apiConfig';

export interface SmartTechniquesResult {
  recommended: Array<{
    id: number;
    name: string;
    description: string;
    category: string;
    difficulty: string;
    time_required: string;
    reason: string;
    authenticity_score: number;
  }>;
  others: any[];
  contextMessage: string;
  confidence: number;
}

export class SmartTechniquesService {
  async getTechniques(
    projectDescription?: string, 
    materialId?: number, 
    craftId?: number
  ): Promise<SmartTechniquesResult> {
    
    if (projectDescription && materialId && craftId) {
      console.log('🤖 AI-First: Context-aware technique suggestions');
      return this.getContextAwareTechniques(projectDescription, materialId, craftId);
    }
    
    if (materialId || craftId) {
      console.log('🔗 Compatibility: Getting compatible techniques');
      return this.getCompatibleTechniques(materialId, craftId);
    }
    
    console.log('📋 Fallback: Getting all techniques');
    return this.getAllTechniquesAsFallback();
  }
  
  private async getContextAwareTechniques(
    description: string, 
    materialId: number, 
    craftId: number
  ): Promise<SmartTechniquesResult> {
    try {
      // Step 1: Get AI project analysis
      const aiAnalysisResponse = await apiClient.post('aiAnalysis', { description });
      
      if (!aiAnalysisResponse.ok) {
        throw new Error('AI analysis failed');
      }
      
      const aiAnalysis = await aiAnalysisResponse.json();
      
      // Step 2: Get compatible techniques for material + craft combination
      const compatibleResponse = await apiClient.get('compatibleTechniques', 
        `material_id=${materialId}&craft_id=${craftId}`);
      
      if (!compatibleResponse.ok) {
        throw new Error('Compatible techniques unavailable');
      }
      
      const compatibleData = await compatibleResponse.json();
      
      // Step 3: Get all techniques for context
      const allTechniquesResponse = await apiClient.get('techniques');
      let allTechniques = [];
      
      if (allTechniquesResponse.ok) {
        const allTechniquesData = await allTechniquesResponse.json();
        allTechniques = allTechniquesData.data || [];
      }
      
      return this.processContextAwareResults(
        aiAnalysis.data, 
        compatibleData.data, 
        allTechniques, 
        description
      );
      
    } catch (error) {
      console.error('❌ Context-aware techniques failed:', error);
      return this.getCompatibleTechniques(materialId, craftId);
    }
  }
  
  private async getCompatibleTechniques(materialId?: number, craftId?: number): Promise<SmartTechniquesResult> {
    try {
      const params = new URLSearchParams();
      if (materialId) params.append('material_id', materialId.toString());
      if (craftId) params.append('craft_id', craftId.toString());
      
      const response = await apiClient.get('compatibleTechniques', params.toString());
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Handle both ID arrays and full objects
      let techniques = [];
      if (Array.isArray(data.data)) {
        if (data.data.length > 0 && typeof data.data[0] === 'object') {
          // Full technique objects
          techniques = data.data;
        } else {
          // Just IDs - create mock objects for now
          techniques = data.data.map((id: number) => ({
            id,
            name: `Technique ${id}`,
            description: 'Compatible technique for this material and craft combination',
            category: 'Traditional Methods',
            difficulty: 'Intermediate',
            time_required: '2-4 weeks'
          }));
        }
      }
      
      return {
        recommended: techniques.map(technique => ({
          ...technique,
          reason: 'Compatible with your material and craft selection',
          authenticity_score: 0.8
        })),
        others: [],
        contextMessage: `${techniques.length} compatible technique${techniques.length !== 1 ? 's' : ''} found`,
        confidence: 0.7
      };
      
    } catch (error) {
      console.error('❌ Compatible techniques loading failed:', error);
      return this.getAllTechniquesAsFallback();
    }
  }
  
  private processContextAwareResults(
    aiAnalysis: any, 
    compatibleTechniques: any[], 
    allTechniques: any[], 
    description: string
  ): SmartTechniquesResult {
    
    const projectCategory = aiAnalysis?.project_category || 'general';
    const confidence = aiAnalysis?.confidence_score || 0.5;
    
    // Get AI-suggested technique IDs
    const aiTechniqueIds = new Set(
      (aiAnalysis?.suggested_techniques || []).map((t: any) => t.id)
    );
    
    // Process compatible techniques (could be IDs or objects)
    let compatibleTechniqueObjects = [];
    
    if (Array.isArray(compatibleTechniques)) {
      if (compatibleTechniques.length > 0 && typeof compatibleTechniques[0] === 'object') {
        // Already objects
        compatibleTechniqueObjects = compatibleTechniques;
      } else {
        // Convert IDs to objects using allTechniques
        compatibleTechniqueObjects = compatibleTechniques
          .map(id => allTechniques.find(t => t.id === id))
          .filter(Boolean);
        
        // If no matches found, create mock objects
        if (compatibleTechniqueObjects.length === 0) {
          compatibleTechniqueObjects = compatibleTechniques.map(id => ({
            id,
            name: `Technique ${id}`,
            description: 'Context-aware technique for this project',
            category: 'Traditional Methods',
            difficulty: 'Intermediate',
            time_required: '2-4 weeks'
          }));
        }
      }
    }
    
    // Filter for AI-recommended techniques that are also compatible
    const recommended = compatibleTechniqueObjects
      .filter(technique => aiTechniqueIds.has(technique.id))
      .map(technique => ({
        ...technique,
        reason: this.generateTechniqueReason(technique, projectCategory, description),
        authenticity_score: this.calculateAuthenticityScore(technique, projectCategory)
      }));
    
    // Add remaining compatible techniques as "others"
    const others = compatibleTechniqueObjects.filter(technique => !aiTechniqueIds.has(technique.id));
    
    return {
      recommended,
      others,
      contextMessage: this.generateContextMessage(projectCategory, recommended.length, compatibleTechniqueObjects.length),
      confidence
    };
  }
  
  private generateTechniqueReason(technique: any, category: string, description: string): string {
    const reasons = {
      textile: `Perfect for textile projects - enhances "${description}"`,
      pottery: `Traditional ceramic technique with cultural authenticity`,
      jewelry: `Artisanal metalworking technique for ornamental crafts`,
      general: `AI-recommended for optimal project results`
    };
    
    return reasons[category] || reasons.general;
  }
  
  private calculateAuthenticityScore(technique: any, category: string): number {
    const traditionalKeywords = ['traditional', 'heritage', 'authentic', 'ancient', 'cultural'];
    const description = (technique.description || '').toLowerCase();
    
    let score = 0.6;
    traditionalKeywords.forEach(keyword => {
      if (description.includes(keyword)) score += 0.08;
    });
    
    return Math.min(score, 1.0);
  }
  
  private generateContextMessage(category: string, recommendedCount: number, totalCount: number): string {
    if (recommendedCount === 0) {
      return `${totalCount} compatible technique${totalCount !== 1 ? 's' : ''} available`;
    }
    
    const categoryMessages = {
      textile: `AI-curated textile techniques for authentic results`,
      pottery: `Traditional ceramic methods for cultural authenticity`,
      jewelry: `Artisanal techniques for premium craftsmanship`,
      general: `Context-aware technique recommendations`
    };
    
    return categoryMessages[category] || categoryMessages.general;
  }
  
  private async getAllTechniquesAsFallback(): Promise<SmartTechniquesResult> {
    try {
      const response = await apiClient.get('techniques');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      return {
        recommended: [],
        others: data.data || [],
        contextMessage: 'Showing all available techniques',
        confidence: 0
      };
      
    } catch (error) {
      console.error('❌ Fallback techniques loading failed:', error);
      return {
        recommended: [],
        others: [],
        contextMessage: 'Unable to load techniques - please check API connection',
        confidence: 0
      };
    }
  }
}

export const smartTechniquesService = new SmartTechniquesService();
