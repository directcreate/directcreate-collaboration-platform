
import { apiClient } from '../config/apiConfig';

export interface SmartCraftsResult {
  recommended: Array<{
    id: string;
    name: string;
    description: string;
    difficulty: string;
    time_estimate: string;
    category: string;
    reason: string;
    cultural_authenticity: number;
  }>;
  others: any[];
  projectCategory: string;
  confidence: number;
  aiMessage: string;
}

export class SmartCraftsService {
  async getCrafts(projectDescription?: string, materialId?: number): Promise<SmartCraftsResult> {
    if (projectDescription) {
      console.log('🤖 AI-First: Getting smart craft recommendations for:', projectDescription);
      return this.getAIFilteredCrafts(projectDescription, materialId);
    }
    
    if (materialId) {
      console.log('🔗 Compatibility: Getting crafts compatible with material:', materialId);
      return this.getCompatibleCrafts(materialId);
    }
    
    console.log('📋 Fallback: Getting all crafts');
    return this.getAllCraftsAsFallback();
  }
  
  private async getAIFilteredCrafts(description: string, materialId?: number): Promise<SmartCraftsResult> {
    try {
      // Get AI analysis for project category
      const aiAnalysisResponse = await apiClient.post('aiAnalysis', { description });
      
      if (!aiAnalysisResponse.ok) {
        throw new Error('AI analysis failed');
      }
      
      const aiAnalysis = await aiAnalysisResponse.json();
      const projectCategory = aiAnalysis.data?.project_category || 'general';
      
      // Get all crafts or compatible crafts
      let craftsResponse;
      if (materialId) {
        craftsResponse = await apiClient.get('compatibleCrafts', `material_id=${materialId}`);
      } else {
        craftsResponse = await apiClient.get('crafts');
      }
      
      if (!craftsResponse.ok) {
        throw new Error('Crafts data unavailable');
      }
      
      const craftsData = await craftsResponse.json();
      
      return this.processAICraftResults(aiAnalysis.data, craftsData.data, description, materialId);
      
    } catch (error) {
      console.error('❌ AI craft filtering failed:', error);
      return materialId ? this.getCompatibleCrafts(materialId) : this.getAllCraftsAsFallback();
    }
  }
  
  private async getCompatibleCrafts(materialId: number): Promise<SmartCraftsResult> {
    try {
      const response = await apiClient.get('compatibleCrafts', `material_id=${materialId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      return {
        recommended: [],
        others: data.data || [],
        projectCategory: 'compatible',
        confidence: 0.7,
        aiMessage: `Crafts compatible with selected material`
      };
      
    } catch (error) {
      console.error('❌ Compatible crafts loading failed:', error);
      return this.getAllCraftsAsFallback();
    }
  }
  
  private processAICraftResults(aiAnalysis: any, craftsData: any[], description: string, materialId?: number): SmartCraftsResult {
    const projectCategory = aiAnalysis?.project_category || 'general';
    const confidence = aiAnalysis?.confidence_score || 0.5;
    
    // Get AI-recommended craft IDs
    const aiRecommendedIds = new Set(
      (aiAnalysis?.suggested_crafts || []).map((c: any) => c.id)
    );
    
    const recommended = craftsData
      .filter(craft => aiRecommendedIds.has(parseInt(craft.id)))
      .map(craft => ({
        ...craft,
        reason: this.generateCraftReason(craft, projectCategory, description),
        cultural_authenticity: this.calculateCulturalAuthenticity(craft, projectCategory)
      }))
      .sort((a, b) => b.cultural_authenticity - a.cultural_authenticity);
    
    const others = craftsData.filter(craft => !aiRecommendedIds.has(parseInt(craft.id)));
    
    return {
      recommended,
      others,
      projectCategory,
      confidence,
      aiMessage: this.generateCraftAIMessage(projectCategory, recommended.length, materialId)
    };
  }
  
  private generateCraftReason(craft: any, category: string, description: string): string {
    const reasons = {
      textile: `Traditional textile craft perfect for "${description}"`,
      pottery: `Authentic ceramic technique with cultural heritage`,
      jewelry: `Artisanal metalworking for ornamental pieces`,
      general: `Recommended craft based on project analysis`
    };
    
    return reasons[category] || reasons.general;
  }
  
  private calculateCulturalAuthenticity(craft: any, category: string): number {
    // Simple scoring based on craft category and cultural indicators
    const culturalKeywords = ['traditional', 'heritage', 'authentic', 'artisan', 'handmade'];
    const description = (craft.description || '').toLowerCase();
    
    let score = 0.5;
    culturalKeywords.forEach(keyword => {
      if (description.includes(keyword)) score += 0.1;
    });
    
    return Math.min(score, 1.0);
  }
  
  private generateCraftAIMessage(category: string, recommendedCount: number, materialId?: number): string {
    if (recommendedCount === 0) {
      return materialId ? "Compatible crafts for your material selection" : "All available crafts";
    }
    
    const categoryMessages = {
      textile: `Culturally authentic textile crafts`,
      pottery: `Traditional ceramic and clay techniques`,
      jewelry: `Artisanal metalworking and jewelry crafts`,
      general: `AI-recommended crafts for your project`
    };
    
    return categoryMessages[category] || categoryMessages.general;
  }
  
  private async getAllCraftsAsFallback(): Promise<SmartCraftsResult> {
    try {
      const response = await apiClient.get('crafts');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      return {
        recommended: [],
        others: data.data || [],
        projectCategory: 'general',
        confidence: 0,
        aiMessage: 'Showing all available crafts'
      };
      
    } catch (error) {
      console.error('❌ Fallback crafts loading failed:', error);
      return {
        recommended: [],
        others: [],
        projectCategory: 'general',
        confidence: 0,
        aiMessage: 'Unable to load crafts - please check API connection'
      };
    }
  }
}

export const smartCraftsService = new SmartCraftsService();
