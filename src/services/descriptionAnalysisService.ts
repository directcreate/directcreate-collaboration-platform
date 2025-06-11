
import { aiService } from './aiService';

export interface DetectedElements {
  materials: Array<{name: string, confidence: number, id?: string}>;
  crafts: Array<{name: string, confidence: number, id?: string}>;
  techniques: Array<{name: string, confidence: number, id?: string}>;
  style?: string;
  colors?: string;
  use?: string;
  completeness: 'minimal' | 'partial' | 'detailed' | 'complete';
}

export interface AnalysisResult {
  detected: DetectedElements;
  suggestedPaths: string[];
  autoRoute: boolean;
  confidence: number;
}

class DescriptionAnalysisService {
  // Common keywords for detection
  private materialKeywords = {
    'cotton': ['cotton', 'organic cotton', 'handspun cotton'],
    'silk': ['silk', 'mulberry silk', 'tussar silk', 'raw silk'],
    'wool': ['wool', 'sheep wool', 'merino wool', 'pashmina'],
    'bamboo': ['bamboo', 'bamboo fiber', 'bamboo fabric'],
    'jute': ['jute', 'burlap', 'hessian'],
    'clay': ['clay', 'terracotta', 'ceramic', 'pottery clay'],
    'wood': ['wood', 'teak', 'rosewood', 'bamboo wood'],
    'metal': ['brass', 'copper', 'silver', 'iron', 'bronze'],
    'leather': ['leather', 'cowhide', 'goatskin']
  };

  private craftKeywords = {
    'block printing': ['block print', 'block printed', 'woodblock', 'hand block'],
    'ajrakh': ['ajrakh', 'ajrak'],
    'bandhani': ['bandhani', 'bandhej', 'tie dye', 'tie-dye'],
    'embroidery': ['embroidery', 'embroidered', 'hand embroidery', 'zari work'],
    'weaving': ['woven', 'handwoven', 'hand woven', 'loom'],
    'pottery': ['pottery', 'ceramic', 'terracotta'],
    'basketry': ['basket', 'basketry', 'wicker'],
    'jewelry': ['jewelry', 'jewellery', 'necklace', 'earrings'],
    'metalwork': ['metalwork', 'brass work', 'copper work'],
    'carpet making': ['carpet', 'rug', 'dhurrie']
  };

  private techniqueKeywords = {
    'natural dyeing': ['natural dye', 'indigo', 'turmeric dye', 'madder'],
    'hand spinning': ['hand spun', 'handspun', 'charkha'],
    'hand weaving': ['hand woven', 'handwoven', 'loom weaving'],
    'glazing': ['glaze', 'glazed', 'ceramic glaze'],
    'carving': ['carved', 'carving', 'hand carved'],
    'painting': ['painted', 'hand painted', 'miniature painting']
  };

  analyzeDescription(description: string): AnalysisResult {
    const lowerDesc = description.toLowerCase();
    const detected: DetectedElements = {
      materials: [],
      crafts: [],
      techniques: [],
      completeness: 'minimal'
    };

    // Detect materials
    Object.entries(this.materialKeywords).forEach(([material, keywords]) => {
      const confidence = this.calculateKeywordConfidence(lowerDesc, keywords);
      if (confidence > 0.3) {
        detected.materials.push({ name: material, confidence });
      }
    });

    // Detect crafts
    Object.entries(this.craftKeywords).forEach(([craft, keywords]) => {
      const confidence = this.calculateKeywordConfidence(lowerDesc, keywords);
      if (confidence > 0.3) {
        detected.crafts.push({ name: craft, confidence });
      }
    });

    // Detect techniques
    Object.entries(this.techniqueKeywords).forEach(([technique, keywords]) => {
      const confidence = this.calculateKeywordConfidence(lowerDesc, keywords);
      if (confidence > 0.3) {
        detected.techniques.push({ name: technique, confidence });
      }
    });

    // Extract style hints
    if (lowerDesc.includes('traditional') || lowerDesc.includes('ethnic')) {
      detected.style = 'traditional';
    } else if (lowerDesc.includes('modern') || lowerDesc.includes('contemporary')) {
      detected.style = 'modern';
    } else if (lowerDesc.includes('minimalist') || lowerDesc.includes('simple')) {
      detected.style = 'minimalist';
    }

    // Extract color hints
    const colorWords = ['blue', 'red', 'green', 'yellow', 'indigo', 'natural', 'earth tone'];
    const foundColors = colorWords.filter(color => lowerDesc.includes(color));
    if (foundColors.length > 0) {
      detected.colors = foundColors.join(', ');
    }

    // Extract use hints
    if (lowerDesc.includes('daily') || lowerDesc.includes('everyday')) {
      detected.use = 'daily use';
    } else if (lowerDesc.includes('special') || lowerDesc.includes('occasion')) {
      detected.use = 'special occasions';
    }

    // Determine completeness
    const elementCount = detected.materials.length + detected.crafts.length + detected.techniques.length;
    if (elementCount >= 3) {
      detected.completeness = 'complete';
    } else if (elementCount >= 2) {
      detected.completeness = 'detailed';
    } else if (elementCount >= 1) {
      detected.completeness = 'partial';
    }

    // Determine suggested paths and auto-routing
    const suggestedPaths = this.getSuggestedPaths(detected);
    const autoRoute = detected.completeness === 'complete';
    const confidence = this.calculateOverallConfidence(detected);

    return {
      detected,
      suggestedPaths,
      autoRoute,
      confidence
    };
  }

  private calculateKeywordConfidence(text: string, keywords: string[]): number {
    let maxConfidence = 0;
    keywords.forEach(keyword => {
      if (text.includes(keyword)) {
        // Exact match gets higher confidence
        const wordBoundaryMatch = new RegExp(`\\b${keyword}\\b`).test(text);
        maxConfidence = Math.max(maxConfidence, wordBoundaryMatch ? 0.9 : 0.6);
      }
    });
    return maxConfidence;
  }

  private getSuggestedPaths(detected: DetectedElements): string[] {
    const paths = [];
    
    if (detected.materials.length === 0) paths.push('materials');
    if (detected.crafts.length === 0) paths.push('crafts');
    if (detected.techniques.length === 0) paths.push('techniques');
    
    // Always suggest these as additional options
    paths.push('visual', 'text');
    
    return paths;
  }

  private calculateOverallConfidence(detected: DetectedElements): number {
    const allElements = [...detected.materials, ...detected.crafts, ...detected.techniques];
    if (allElements.length === 0) return 0;
    
    const avgConfidence = allElements.reduce((sum, elem) => sum + elem.confidence, 0) / allElements.length;
    return avgConfidence;
  }

  async enhanceWithAI(description: string): Promise<DetectedElements> {
    try {
      console.log('🤖 Enhancing description analysis with AI...');
      const response = await aiService.analyzeProject(description);
      
      if (response.success && response.data) {
        // Map AI response to our format
        const enhanced: DetectedElements = {
          materials: response.data.recommended_materials?.slice(0, 3).map((m: any) => ({
            name: m.name,
            confidence: 0.8,
            id: m.id?.toString()
          })) || [],
          crafts: response.data.recommended_crafts?.slice(0, 3).map((c: any) => ({
            name: c.name,
            confidence: 0.8,
            id: c.id?.toString()
          })) || [],
          techniques: response.data.recommended_techniques?.slice(0, 3).map((t: any) => ({
            name: t.name,
            confidence: 0.8,
            id: t.id?.toString()
          })) || [],
          style: response.data.style_preference,
          colors: response.data.color_preference,
          use: response.data.intended_use,
          completeness: 'detailed'
        };
        
        return enhanced;
      }
    } catch (error) {
      console.error('❌ AI enhancement failed:', error);
    }
    
    // Fallback to keyword-based analysis
    return this.analyzeDescription(description).detected;
  }
}

export const descriptionAnalysisService = new DescriptionAnalysisService();
