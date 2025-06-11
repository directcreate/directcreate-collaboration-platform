
import { apiClient } from '../config/apiConfig';

export interface SmartArtisansResult {
  recommended: Array<{
    id: number;
    name: string;
    location: string;
    specialties: string[];
    experience_years: number;
    rating: number;
    cultural_expertise: string[];
    ai_match_score: number;
    match_reason: string;
  }>;
  others: any[];
  matchingCriteria: string;
  aiMessage: string;
}

export class SmartArtisansService {
  async getArtisans(projectRequirements: {
    description?: string;
    materialId?: number;
    craftId?: number;
    techniqueId?: number;
    location?: string;
  }): Promise<SmartArtisansResult> {
    
    const { description, materialId, craftId, techniqueId, location } = projectRequirements;
    
    if (description && (materialId || craftId)) {
      console.log('🤖 AI-First: Getting AI-powered artisan matching');
      return this.getAIMatchedArtisans(projectRequirements);
    }
    
    if (materialId || craftId || techniqueId) {
      console.log('🔗 Compatibility: Getting compatible artisans');
      return this.getCompatibleArtisans(materialId, craftId, techniqueId);
    }
    
    console.log('📋 Fallback: Getting all artisans');
    return this.getAllArtisansAsFallback();
  }
  
  private async getAIMatchedArtisans(requirements: any): Promise<SmartArtisansResult> {
    try {
      // Step 1: Use AI artisan matching endpoint
      const materialIds = requirements.materialId ? [requirements.materialId] : [];
      const craftIds = requirements.craftId ? [requirements.craftId] : [];
      
      const aiMatchResponse = await apiClient.post('aiArtisans', {
        material_ids: materialIds,
        craft_ids: craftIds,
        description: requirements.description || 'Find specialized artisans for this project',
        location_preference: requirements.location
      });
      
      if (aiMatchResponse.ok) {
        const aiMatchData = await aiMatchResponse.json();
        
        if (aiMatchData.success && aiMatchData.data?.length > 0) {
          return this.processAIMatchResults(aiMatchData.data, requirements);
        }
      }
      
      // Fallback to compatibility matching
      console.log('AI matching not available, using compatibility matching...');
      return this.getCompatibleArtisans(requirements.materialId, requirements.craftId, requirements.techniqueId);
      
    } catch (error) {
      console.error('❌ AI artisan matching failed:', error);
      return this.getCompatibleArtisans(requirements.materialId, requirements.craftId, requirements.techniqueId);
    }
  }
  
  private async getCompatibleArtisans(materialId?: number, craftId?: number, techniqueId?: number): Promise<SmartArtisansResult> {
    try {
      const params = new URLSearchParams();
      if (materialId) params.append('material_id', materialId.toString());
      if (craftId) params.append('craft_id', craftId.toString());
      if (techniqueId) params.append('technique_id', techniqueId.toString());
      
      const response = await apiClient.get('compatibleArtisans', params.toString());
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      return {
        recommended: (data.data || []).map((artisan: any) => ({
          ...artisan,
          ai_match_score: 0.7,
          match_reason: 'Compatible with your project requirements'
        })),
        others: [],
        matchingCriteria: this.generateCriteriaMessage(materialId, craftId, techniqueId),
        aiMessage: `${data.data?.length || 0} compatible artisan${(data.data?.length || 0) !== 1 ? 's' : ''} found`
      };
      
    } catch (error) {
      console.error('❌ Compatible artisans loading failed:', error);
      return this.getAllArtisansAsFallback();
    }
  }
  
  private processAIMatchResults(aiMatches: any[], requirements: any): SmartArtisansResult {
    const recommended = aiMatches.map(artisan => ({
      ...artisan,
      ai_match_score: artisan.match_score || 0.9,
      match_reason: artisan.match_reason || this.generateMatchReason(artisan, requirements),
      cultural_expertise: artisan.cultural_expertise || this.extractCulturalExpertise(artisan)
    }));
    
    // Sort by AI match score
    recommended.sort((a, b) => b.ai_match_score - a.ai_match_score);
    
    return {
      recommended,
      others: [],
      matchingCriteria: 'AI-powered cultural expertise and skill matching',
      aiMessage: `${recommended.length} AI-matched specialist${recommended.length !== 1 ? 's' : ''} found`
    };
  }
  
  private generateMatchReason(artisan: any, requirements: any): string {
    const reasons = [];
    
    if (requirements.description) {
      const category = this.detectProjectCategory(requirements.description);
      reasons.push(`Specializes in ${category} projects`);
    }
    
    if (artisan.experience_years > 10) {
      reasons.push('Extensive experience');
    }
    
    if (artisan.rating > 4.5) {
      reasons.push('Highly rated by clients');
    }
    
    if (artisan.cultural_expertise?.length > 0) {
      reasons.push('Strong cultural expertise');
    }
    
    return reasons.length > 0 ? reasons.join(' • ') : 'AI-recommended for your project';
  }
  
  private extractCulturalExpertise(artisan: any): string[] {
    // Extract cultural keywords from artisan data
    const text = `${artisan.specialties || [].join(' ')} ${artisan.bio || ''}`.toLowerCase();
    const culturalKeywords = ['traditional', 'heritage', 'authentic', 'cultural', 'ancestral', 'indigenous'];
    
    return culturalKeywords.filter(keyword => text.includes(keyword));
  }
  
  private detectProjectCategory(description: string): string {
    const lower = description.toLowerCase();
    
    if (lower.includes('textile') || lower.includes('fabric') || lower.includes('cloth')) {
      return 'textile';
    }
    if (lower.includes('pottery') || lower.includes('ceramic') || lower.includes('clay')) {
      return 'pottery';
    }
    if (lower.includes('jewelry') || lower.includes('metal') || lower.includes('ornament')) {
      return 'jewelry';
    }
    
    return 'craft';
  }
  
  private generateCriteriaMessage(materialId?: number, craftId?: number, techniqueId?: number): string {
    const criteria = [];
    if (materialId) criteria.push('material compatibility');
    if (craftId) criteria.push('craft specialization');
    if (techniqueId) criteria.push('technique expertise');
    
    return criteria.length > 0 
      ? `Matched by ${criteria.join(' and ')}`
      : 'General artisan search';
  }
  
  private async getAllArtisansAsFallback(): Promise<SmartArtisansResult> {
    try {
      const response = await apiClient.get('artisans');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      return {
        recommended: [],
        others: data.data || [],
        matchingCriteria: 'Showing all available artisans',
        aiMessage: 'Browse all artisans in our network'
      };
      
    } catch (error) {
      console.error('❌ Fallback artisans loading failed:', error);
      return {
        recommended: [],
        others: [],
        matchingCriteria: 'Unable to load artisans',
        aiMessage: 'Please check API connection'
      };
    }
  }
}

export const smartArtisansService = new SmartArtisansService();
