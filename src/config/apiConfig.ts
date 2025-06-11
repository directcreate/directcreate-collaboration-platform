// config/apiConfig.ts - SINGLE SOURCE OF TRUTH FOR DIRECTCREATE API
export const API_CONFIG = {
  baseUrl: 'https://directcreate-api.onrender.com/api-proxy.php',
  primary: {
    baseUrl: 'https://directcreate-api.onrender.com/api-proxy.php',
    endpoints: {
      health: '?path=health',
      materials: '?path=materials',
      crafts: '?path=crafts',
      techniques: '?path=techniques',
      aiAnalysis: '?path=ai-project-analysis',
      aiMaterials: '?path=ai-material-suggestions',
      aiArtisans: '?path=ai-artisan-matching'
    }
  },
  endpoints: {
    // Core data endpoints
    health: '?path=health',
    materials: '?path=materials',
    crafts: '?path=crafts', 
    techniques: '?path=techniques',
    artisans: '?path=artisans',
    
    // Compatibility endpoints
    compatibleCrafts: '?path=compatible-crafts',
    compatibleMaterials: '?path=compatible-materials',
    compatibleTechniques: '?path=compatible-techniques',
    compatibleArtisans: '?path=compatible-artisans',
    
    // AI-powered endpoints
    aiAnalysis: '?path=ai-project-analysis',
    aiMaterials: '?path=ai-material-suggestions',
    aiArtisans: '?path=ai-artisan-matching'
  }
} as const;

// Type-safe API client
export const apiClient = {
  get: async (endpoint: keyof typeof API_CONFIG.endpoints, params?: string) => {
    const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints[endpoint]}${params ? `&${params}` : ''}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return response;
  },
  
  post: async (endpoint: keyof typeof API_CONFIG.endpoints, data: any) => {
    const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints[endpoint]}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response;
  }
};

// Utility functions
export const buildApiUrl = (endpoint: string) => `${API_CONFIG.baseUrl}${endpoint}`;

export const checkApiHealth = async () => {
  try {
    const response = await apiClient.get('health');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('🔍 Health check response:', data);
    
    // Handle the actual API response format
    if (data.status === 'ok') {
      return { 
        success: true, 
        message: `${data.service} is healthy`,
        data: data
      };
    } else {
      return { 
        success: false, 
        message: `Health check failed: ${data.error || 'Unknown error'}` 
      };
    }
  } catch (error) {
    console.error('❌ API Health Check Failed:', error);
    return { 
      success: false, 
      message: `Health check failed: ${error.message}` 
    };
  }
};
