
import { apiClient } from '../config/apiConfig';

export interface SmartMaterialsResult {
  recommended: Array<{
    id: number;
    name: string;
    description: string;
    category: string;
    sustainability_rating: number;
    reason: string;
    relevance_score: number;
  }>;
  others: Array<{
    id: number;
    name: string;
    description: string;
    category: string;
    sustainability_rating: number;
  }>;
  projectCategory: string;
  confidence: number;
  aiMessage: string;
}

export class SmartMaterialsService {
  async getMaterials(projectDescription?: string): Promise<SmartMaterialsResult> {
    if (projectDescription) {
      console.log('🤖 AI-First: Getting smart material recommendations for:', projectDescription);
      return this.getAIFilteredMaterials(projectDescription);
    }
    
    console.log('📋 Fallback: Getting all materials (no project description)');
    return this.getAllMaterialsAsFallback();
  }
  
  private async getAIFilteredMaterials(description: string): Promise<SmartMaterialsResult> {
    try {
      // Step 1: Get AI project analysis
      console.log('🔍 Step 1: AI project analysis...');
      const aiAnalysisResponse = await apiClient.post('aiAnalysis', { description });
      
      if (!aiAnalysisResponse.ok) {
        throw new Error('AI analysis failed');
      }
      
      const aiAnalysis = await aiAnalysisResponse.json();
      console.log('✅ AI Analysis complete:', aiAnalysis);
      
      // Step 2: Get AI material suggestions
      console.log('🎯 Step 2: AI material suggestions...');
      const aiMaterialsResponse = await apiClient.get('aiMaterials', `project_type=${aiAnalysis.data?.project_category || 'general'}&style=traditional`);
      
      let aiMaterials = null;
      if (aiMaterialsResponse.ok) {
        aiMaterials = await aiMaterialsResponse.json();
        console.log('✅ AI Materials complete:', aiMaterials);
      }
      
      // Step 3: Get all materials for filtering
      console.log('📦 Step 3: Getting full materials database...');
      const allMaterialsResponse = await apiClient.get('materials');
      
      if (!allMaterialsResponse.ok) {
        throw new Error('Materials database unavailable');
      }
      
      const allMaterials = await allMaterialsResponse.json();
      
      // Step 4: Process and filter results
      return this.processAIResults(aiAnalysis.data, aiMaterials?.data, allMaterials.data, description);
      
    } catch (error) {
      console.error('❌ AI filtering failed, using fallback:', error);
      return this.getAllMaterialsAsFallback();
    }
  }
  
  private processAIResults(aiAnalysis: any, aiMaterials: any, allMaterials: any[], description: string): SmartMaterialsResult {
    const projectCategory = aiAnalysis?.project_category || 'general';
    const confidence = aiAnalysis?.confidence_score || 0.5;
    
    // Get AI-recommended material IDs
    const aiRecommendedIds = new Set(
      (aiAnalysis?.suggested_materials || []).map((m: any) => m.id)
    );
    
    // Enhanced material processing with AI insights
    const recommended = allMaterials
      .filter(material => aiRecommendedIds.has(material.id))
      .map(material => {
        const aiSuggestion = (aiAnalysis?.suggested_materials || []).find((m: any) => m.id === material.id);
        return {
          ...material,
          reason: this.generateMaterialReason(material, projectCategory, description),
          relevance_score: aiSuggestion?.relevance_score || 0.8
        };
      })
      .sort((a, b) => b.relevance_score - a.relevance_score);
    
    const others = allMaterials.filter(material => !aiRecommendedIds.has(material.id));
    
    return {
      recommended,
      others,
      projectCategory,
      confidence,
      aiMessage: this.generateAIMessage(projectCategory, recommended.length)
    };
  }
  
  private generateMaterialReason(material: any, category: string, description: string): string {
    const reasons = {
      textile: `Perfect for textile projects like "${description}" - excellent drape and durability`,
      pottery: `Ideal for ceramic work - authentic traditional material`,
      jewelry: `Premium material for ornamental crafts`,
      general: `Recommended for your project based on AI analysis`
    };
    
    return reasons[category] || reasons.general;
  }
  
  private generateAIMessage(category: string, recommendedCount: number): string {
    if (recommendedCount === 0) {
      return "AI analysis complete - showing all materials";
    }
    
    const categoryMessages = {
      textile: `Perfect materials for textile and fabric projects`,
      pottery: `Authentic materials for ceramic and clay work`,
      jewelry: `Premium materials for jewelry making`,
      general: `AI-curated materials for your project`
    };
    
    return categoryMessages[category] || categoryMessages.general;
  }
  
  private async getAllMaterialsAsFallback(): Promise<SmartMaterialsResult> {
    try {
      const response = await apiClient.get('materials');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.success || !Array.isArray(data.data)) {
        throw new Error('Invalid materials data format');
      }
      
      return {
        recommended: [],
        others: data.data,
        projectCategory: 'general',
        confidence: 0,
        aiMessage: 'Showing all available materials'
      };
      
    } catch (error) {
      console.error('❌ Fallback materials loading failed:', error);
      return {
        recommended: [],
        others: [],
        projectCategory: 'general',
        confidence: 0,
        aiMessage: 'Unable to load materials - please check API connection'
      };
    }
  }
}

export const smartMaterialsService = new SmartMaterialsService();
