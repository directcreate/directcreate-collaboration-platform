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

export interface ProjectRecommendations {
  materials: Array<{name: string, reason: string, priority: number}>;
  crafts: Array<{name: string, reason: string, priority: number}>;
  techniques: Array<{name: string, reason: string, priority: number}>;
  projectType: string;
  contextMessage: string;
}

class DescriptionAnalysisService {
  // Enhanced project-specific recommendations with broader keyword matching
  private projectRecommendations: Record<string, ProjectRecommendations> = {
    'bedsheet': {
      materials: [
        { name: 'organic cotton', reason: 'Breathable, soft for sleep', priority: 1 },
        { name: 'cotton', reason: 'Classic bedding choice', priority: 2 },
        { name: 'linen', reason: 'Cool, natural feel', priority: 3 },
        { name: 'bamboo', reason: 'Eco-friendly, smooth', priority: 4 }
      ],
      crafts: [
        { name: 'block printing', reason: 'Traditional patterns', priority: 1 },
        { name: 'ajrakh', reason: 'Indigo heritage designs', priority: 2 },
        { name: 'bandhani', reason: 'Tie-dye patterns', priority: 3 },
        { name: 'hand weaving', reason: 'Textured fabric', priority: 4 }
      ],
      techniques: [
        { name: 'natural dyeing', reason: 'Organic, safe colors', priority: 1 },
        { name: 'hand weaving', reason: 'Artisan texture', priority: 2 },
        { name: 'block printing', reason: 'Traditional patterns', priority: 3 },
        { name: 'embroidery', reason: 'Decorative borders', priority: 4 }
      ],
      projectType: 'Bedsheet',
      contextMessage: 'These options create beautiful, comfortable bedsheets with traditional appeal'
    },
    'saree': {
      materials: [
        { name: 'silk', reason: 'Traditional elegance', priority: 1 },
        { name: 'cotton', reason: 'Comfortable daily wear', priority: 2 },
        { name: 'handloom cotton', reason: 'Artisan quality', priority: 3 },
        { name: 'tussar silk', reason: 'Natural sheen', priority: 4 }
      ],
      crafts: [
        { name: 'hand weaving', reason: 'Traditional saree method', priority: 1 },
        { name: 'embroidery', reason: 'Decorative beauty', priority: 2 },
        { name: 'block printing', reason: 'Heritage patterns', priority: 3 },
        { name: 'zari work', reason: 'Metallic elegance', priority: 4 }
      ],
      techniques: [
        { name: 'hand weaving', reason: 'Authentic drape', priority: 1 },
        { name: 'natural dyeing', reason: 'Rich, lasting colors', priority: 2 },
        { name: 'embroidery', reason: 'Intricate details', priority: 3 },
        { name: 'thread work', reason: 'Fine decoration', priority: 4 }
      ],
      projectType: 'Saree',
      contextMessage: 'These techniques preserve the authentic beauty of traditional sarees'
    },
    'curtains': {
      materials: [
        { name: 'cotton', reason: 'Durable, easy to wash', priority: 1 },
        { name: 'linen', reason: 'Natural drape', priority: 2 },
        { name: 'jute', reason: 'Rustic, eco-friendly', priority: 3 },
        { name: 'cotton blend', reason: 'Balanced properties', priority: 4 }
      ],
      crafts: [
        { name: 'block printing', reason: 'Bold window patterns', priority: 1 },
        { name: 'hand weaving', reason: 'Textured finish', priority: 2 },
        { name: 'screen printing', reason: 'Large scale designs', priority: 3 }
      ],
      techniques: [
        { name: 'natural dyeing', reason: 'Fade-resistant colors', priority: 1 },
        { name: 'hand weaving', reason: 'Custom texture', priority: 2 },
        { name: 'block printing', reason: 'Pattern variety', priority: 3 }
      ],
      projectType: 'Curtains',
      contextMessage: 'These methods create stunning window treatments with lasting quality'
    },
    'pillow': {
      materials: [
        { name: 'cotton', reason: 'Soft, breathable comfort', priority: 1 },
        { name: 'silk', reason: 'Luxurious feel', priority: 2 },
        { name: 'linen', reason: 'Natural texture', priority: 3 },
        { name: 'organic cotton', reason: 'Pure, safe materials', priority: 4 }
      ],
      crafts: [
        { name: 'embroidery', reason: 'Decorative appeal', priority: 1 },
        { name: 'block printing', reason: 'Pattern variety', priority: 2 },
        { name: 'applique', reason: 'Textural interest', priority: 3 }
      ],
      techniques: [
        { name: 'embroidery', reason: 'Beautiful details', priority: 1 },
        { name: 'natural dyeing', reason: 'Rich colors', priority: 2 },
        { name: 'hand stitching', reason: 'Quality finish', priority: 3 }
      ],
      projectType: 'Pillow Cover',
      contextMessage: 'These techniques add comfort and style to your living space'
    },
    'bag': {
      materials: [
        { name: 'cotton', reason: 'Strong, durable', priority: 1 },
        { name: 'jute', reason: 'Eco-friendly strength', priority: 2 },
        { name: 'canvas', reason: 'Heavy-duty fabric', priority: 3 },
        { name: 'leather', reason: 'Long-lasting luxury', priority: 4 }
      ],
      crafts: [
        { name: 'block printing', reason: 'Unique patterns', priority: 1 },
        { name: 'embroidery', reason: 'Decorative touch', priority: 2 },
        { name: 'applique', reason: 'Textural design', priority: 3 }
      ],
      techniques: [
        { name: 'hand stitching', reason: 'Strong, durable seams', priority: 1 },
        { name: 'natural dyeing', reason: 'Vibrant colors', priority: 2 },
        { name: 'block printing', reason: 'Personal style', priority: 3 }
      ],
      projectType: 'Bag',
      contextMessage: 'These methods create functional bags with artistic flair'
    },
    'pottery': {
      materials: [
        { name: 'clay', reason: 'Essential pottery material', priority: 1 },
        { name: 'terracotta', reason: 'Traditional clay type', priority: 2 },
        { name: 'ceramic', reason: 'Refined finish', priority: 3 }
      ],
      crafts: [
        { name: 'pottery', reason: 'Core ceramic craft', priority: 1 },
        { name: 'wheel throwing', reason: 'Shaped pottery', priority: 2 },
        { name: 'hand building', reason: 'Sculpted forms', priority: 3 }
      ],
      techniques: [
        { name: 'wheel throwing', reason: 'Symmetrical shapes', priority: 1 },
        { name: 'glazing', reason: 'Protective finish', priority: 2 },
        { name: 'firing', reason: 'Hardening process', priority: 3 }
      ],
      projectType: 'Pottery',
      contextMessage: 'These traditional pottery techniques create lasting ceramic pieces'
    }
  };

  // Broader keyword mapping for better detection
  private keywordMapping = {
    // Textile projects
    'bedsheet': ['bedsheet', 'bed sheet', 'bed linen', 'bedding', 'sheet'],
    'saree': ['saree', 'sari', 'traditional wear', 'indian dress'],
    'curtains': ['curtain', 'curtains', 'drape', 'drapes', 'window covering'],
    'pillow': ['pillow', 'cushion', 'pillow cover', 'cushion cover'],
    'bag': ['bag', 'tote', 'purse', 'handbag', 'carry bag', 'shopping bag'],
    
    // Pottery
    'pottery': ['pottery', 'ceramic', 'clay', 'bowl', 'pot', 'vase', 'mug', 'plate'],
    
    // Materials
    'cotton': ['cotton', 'organic cotton', 'handspun cotton'],
    'silk': ['silk', 'mulberry silk', 'tussar silk', 'raw silk'],
    'linen': ['linen', 'flax'],
    'jute': ['jute', 'burlap', 'hessian'],
    'bamboo': ['bamboo', 'bamboo fiber'],
    
    // Crafts
    'block printing': ['block print', 'block printing', 'woodblock', 'hand block'],
    'embroidery': ['embroidery', 'embroidered', 'thread work', 'zari'],
    'weaving': ['weaving', 'woven', 'handwoven', 'hand woven', 'loom'],
    'pottery': ['pottery', 'ceramic work', 'clay work']
  };

  getProjectRecommendations(description: string): ProjectRecommendations | null {
    if (!description || description.trim().length < 2) {
      return null;
    }
    
    const lowerDesc = description.toLowerCase();
    console.log('🔍 Analyzing description:', lowerDesc);
    
    // Check each project type against keywords
    for (const [projectKey, keywords] of Object.entries(this.keywordMapping)) {
      for (const keyword of keywords) {
        if (lowerDesc.includes(keyword)) {
          console.log('🎯 Found match:', projectKey, 'for keyword:', keyword);
          const recommendation = this.projectRecommendations[projectKey];
          if (recommendation) {
            return recommendation;
          }
        }
      }
    }
    
    console.log('❌ No specific project type detected');
    return null;
  }

  filterRecommendedItems<T extends {name: string, id?: string}>(
    allItems: T[], 
    recommendations: Array<{name: string, reason: string, priority: number}>
  ): {recommended: Array<T & {reason: string, priority: number}>, others: T[]} {
    const recommended: Array<T & {reason: string, priority: number}> = [];
    const others: T[] = [];
    
    allItems.forEach(item => {
      const recommendation = recommendations.find(rec => {
        const itemName = item.name.toLowerCase();
        const recName = rec.name.toLowerCase();
        
        // Exact match or partial match
        return itemName.includes(recName) || 
               recName.includes(itemName) ||
               this.fuzzyMatch(itemName, recName);
      });
      
      if (recommendation) {
        recommended.push({
          ...item,
          reason: recommendation.reason,
          priority: recommendation.priority
        });
      } else {
        others.push(item);
      }
    });
    
    // Sort recommended items by priority
    recommended.sort((a, b) => a.priority - b.priority);
    
    console.log('🔍 Filtering results:', {
      recommendedCount: recommended.length,
      othersCount: others.length,
      recommendedItems: recommended.map(r => r.name)
    });
    
    return { recommended, others };
  }

  private fuzzyMatch(str1: string, str2: string): boolean {
    // Simple fuzzy matching for similar words
    const words1 = str1.split(' ');
    const words2 = str2.split(' ');
    
    for (const word1 of words1) {
      for (const word2 of words2) {
        if (word1.length > 3 && word2.length > 3) {
          if (word1.includes(word2) || word2.includes(word1)) {
            return true;
          }
        }
      }
    }
    return false;
  }

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
