
import { API_CONFIG } from '../config/apiConfig';

export interface ProjectAnalysis {
  success: boolean;
  project_category: string;
  confidence_score: number;
  suggested_materials: Array<{id: number, name: string, relevance_score: number}>;
  suggested_crafts: Array<{id: number, name: string, relevance_score: number}>;
  suggested_techniques: Array<{id: number, name: string, relevance_score: number}>;
  suggested_path: string;
  reasoning: string;
}

export interface DetectedElements {
  materials: Array<{id: number, name: string, relevance_score?: number}>;
  crafts: Array<{id: number, name: string, relevance_score?: number}>;
  techniques: Array<{id: number, name: string, relevance_score?: number}>;
  style?: string;
  colors?: string;
  use?: string;
}

export interface ProjectRecommendations {
  projectType: string;
  contextMessage: string;
  materials: Array<{id: number, name: string, reason: string}>;
  crafts: Array<{id: number, name: string, reason: string}>;
  techniques: Array<{id: number, name: string, reason: string}>;
}

class DescriptionAnalysisService {
  private materialKeywords = {
    textile: ['cotton', 'silk', 'fabric', 'cloth', 'textile', 'bedsheet', 'curtain', 'saree', 'dupatta', 'scarf'],
    pottery: ['clay', 'ceramic', 'pottery', 'bowl', 'pot', 'vase', 'terracotta'],
    jewelry: ['jewelry', 'jewellery', 'necklace', 'bracelet', 'earring', 'ring', 'ornament'],
    metal: ['metal', 'brass', 'copper', 'bronze', 'iron', 'steel', 'silver'],
    wood: ['wood', 'wooden', 'furniture', 'table', 'chair', 'cabinet', 'carving']
  };

  private craftKeywords = {
    printing: ['block print', 'ajrakh', 'bagru', 'kalamkari', 'print'],
    weaving: ['weaving', 'woven', 'handloom', 'loom'],
    embroidery: ['embroidery', 'embroidered', 'stitch', 'applique'],
    pottery: ['pottery', 'ceramic', 'clay work'],
    metalwork: ['metalwork', 'engraving', 'hammering']
  };

  private techniqueKeywords = {
    dyeing: ['dye', 'color', 'natural dye', 'indigo'],
    printing: ['print', 'stamp', 'block'],
    weaving: ['weave', 'loom', 'warp', 'weft'],
    carving: ['carve', 'carved', 'engrave'],
    shaping: ['shape', 'mold', 'form']
  };

  async analyzeDescription(description: string): Promise<ProjectAnalysis> {
    try {
      // First try enhanced API
      const response = await fetch(`${API_CONFIG.BASE_URL}?path=ai-project-analysis`, {
        method: 'POST',
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description })
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          return this.enhanceApiResult(result.data, description);
        }
      }

      // Fallback to keyword analysis
      return this.performKeywordAnalysis(description);
    } catch (error) {
      console.error('API analysis failed, using keyword analysis:', error);
      return this.performKeywordAnalysis(description);
    }
  }

  getProjectRecommendations(description: string): ProjectRecommendations | null {
    if (!description) return null;

    const lowerDesc = description.toLowerCase();
    const category = this.detectCategory(description);
    
    const recommendations: ProjectRecommendations = {
      projectType: category,
      contextMessage: this.getContextMessage(category),
      materials: this.getRecommendedMaterials(category),
      crafts: this.getRecommendedCrafts(category),
      techniques: this.getRecommendedTechniques(category)
    };

    return recommendations;
  }

  filterRecommendedItems(allItems: any[], recommendedItems: Array<{id: number, name: string, reason: string}>) {
    const recommendedIds = new Set(recommendedItems.map(item => item.id));
    
    const recommended = allItems
      .filter(item => recommendedIds.has(parseInt(item.id)))
      .map(item => {
        const rec = recommendedItems.find(r => r.id === parseInt(item.id));
        return { ...item, reason: rec?.reason || 'Recommended for your project' };
      });

    const others = allItems.filter(item => !recommendedIds.has(parseInt(item.id)));

    return { recommended, others };
  }

  private enhanceApiResult(apiResult: any, description: string): ProjectAnalysis {
    return {
      success: true,
      project_category: apiResult.project_category || this.detectCategory(description),
      confidence_score: apiResult.confidence_score || 0.8,
      suggested_materials: apiResult.recommended_materials || [],
      suggested_crafts: apiResult.recommended_crafts || [],
      suggested_techniques: apiResult.recommended_techniques || [],
      suggested_path: this.determineSuggestedPath(apiResult.project_category || this.detectCategory(description)),
      reasoning: apiResult.reasoning || 'AI analysis completed'
    };
  }

  private performKeywordAnalysis(description: string): ProjectAnalysis {
    const lowerDesc = description.toLowerCase();
    const category = this.detectCategory(description);
    const confidence = this.calculateConfidence(lowerDesc, category);

    return {
      success: true,
      project_category: category,
      confidence_score: confidence,
      suggested_materials: this.getSuggestedMaterials(category),
      suggested_crafts: this.getSuggestedCrafts(category),
      suggested_techniques: this.getSuggestedTechniques(category),
      suggested_path: this.determineSuggestedPath(category),
      reasoning: `Detected ${category} project based on keywords`
    };
  }

  private detectCategory(description: string): string {
    const lowerDesc = description.toLowerCase();
    
    for (const [category, keywords] of Object.entries(this.materialKeywords)) {
      if (keywords.some(keyword => lowerDesc.includes(keyword))) {
        return category;
      }
    }
    
    return 'general';
  }

  private calculateConfidence(description: string, category: string): number {
    const keywords = this.materialKeywords[category] || [];
    const matches = keywords.filter(keyword => description.includes(keyword)).length;
    return Math.min(0.6 + (matches * 0.2), 1.0);
  }

  private getContextMessage(category: string): string {
    const messages = {
      textile: 'Perfect for textile and fabric projects',
      pottery: 'Ideal for ceramic and clay work',
      jewelry: 'Great for jewelry and ornament making',
      metal: 'Suitable for metalworking projects',
      wood: 'Perfect for woodworking and furniture'
    };
    return messages[category] || 'Recommended for your project';
  }

  private getRecommendedMaterials(category: string): Array<{id: number, name: string, reason: string}> {
    const materialRecommendations = {
      textile: [
        {id: 210, name: 'Cotton', reason: 'Versatile natural fiber perfect for textiles'},
        {id: 211, name: 'Silk', reason: 'Premium fabric with elegant finish'},
        {id: 212, name: 'Linen', reason: 'Durable and sustainable option'}
      ],
      pottery: [
        {id: 213, name: 'Clay', reason: 'Essential for pottery making'},
        {id: 214, name: 'Terracotta', reason: 'Traditional ceramic material'}
      ],
      jewelry: [
        {id: 215, name: 'Silver', reason: 'Popular precious metal for jewelry'},
        {id: 216, name: 'Brass', reason: 'Affordable metal with golden appearance'}
      ]
    };
    
    return materialRecommendations[category] || [];
  }

  private getRecommendedCrafts(category: string): Array<{id: number, name: string, reason: string}> {
    const craftRecommendations = {
      textile: [
        {id: 167, name: 'Ajrakh Printing', reason: 'Traditional block printing technique'},
        {id: 170, name: 'Block Printing', reason: 'Versatile printing method'}
      ],
      pottery: [
        {id: 180, name: 'Pottery Making', reason: 'Core ceramic craft'}
      ],
      jewelry: [
        {id: 185, name: 'Jewelry Making', reason: 'Traditional ornament crafting'}
      ]
    };
    
    return craftRecommendations[category] || [];
  }

  private getRecommendedTechniques(category: string): Array<{id: number, name: string, reason: string}> {
    const techniqueRecommendations = {
      textile: [
        {id: 301, name: 'Natural Dyeing', reason: 'Eco-friendly coloring method'},
        {id: 302, name: 'Block Printing', reason: 'Traditional pattern application'}
      ],
      pottery: [
        {id: 310, name: 'Wheel Throwing', reason: 'Classic pottery shaping technique'}
      ],
      jewelry: [
        {id: 320, name: 'Wire Wrapping', reason: 'Versatile jewelry technique'}
      ]
    };
    
    return techniqueRecommendations[category] || [];
  }

  private getSuggestedMaterials(category: string): Array<{id: number, name: string, relevance_score: number}> {
    const materialSuggestions = {
      textile: [
        {id: 210, name: 'Cotton', relevance_score: 0.9},
        {id: 211, name: 'Silk', relevance_score: 0.8},
        {id: 212, name: 'Linen', relevance_score: 0.7}
      ],
      pottery: [
        {id: 213, name: 'Clay', relevance_score: 0.9},
        {id: 214, name: 'Terracotta', relevance_score: 0.8}
      ],
      jewelry: [
        {id: 215, name: 'Silver', relevance_score: 0.9},
        {id: 216, name: 'Brass', relevance_score: 0.8}
      ]
    };
    
    return materialSuggestions[category] || [];
  }

  private getSuggestedCrafts(category: string): Array<{id: number, name: string, relevance_score: number}> {
    const craftSuggestions = {
      textile: [
        {id: 167, name: 'Ajrakh Printing', relevance_score: 0.9},
        {id: 170, name: 'Block Printing', relevance_score: 0.8}
      ],
      pottery: [
        {id: 180, name: 'Pottery Making', relevance_score: 0.9}
      ],
      jewelry: [
        {id: 185, name: 'Jewelry Making', relevance_score: 0.9}
      ]
    };
    
    return craftSuggestions[category] || [];
  }

  private getSuggestedTechniques(category: string): Array<{id: number, name: string, relevance_score: number}> {
    const techniqueSuggestions = {
      textile: [
        {id: 301, name: 'Natural Dyeing', relevance_score: 0.9},
        {id: 302, name: 'Block Printing', relevance_score: 0.8}
      ],
      pottery: [
        {id: 310, name: 'Wheel Throwing', relevance_score: 0.9}
      ],
      jewelry: [
        {id: 320, name: 'Wire Wrapping', relevance_score: 0.9}
      ]
    };
    
    return techniqueSuggestions[category] || [];
  }

  private determineSuggestedPath(category: string): string {
    const pathMapping = {
      textile: 'materials',
      pottery: 'crafts',
      jewelry: 'materials',
      metal: 'crafts',
      wood: 'materials'
    };
    
    return pathMapping[category] || 'materials';
  }
}

export const descriptionAnalysisService = new DescriptionAnalysisService();
