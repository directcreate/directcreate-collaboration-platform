
// config/apiConfig.ts - SINGLE SOURCE OF TRUTH
export const API_CONFIG = {
  // PRIMARY API - Local DirectCreate with AI
  primary: {
    baseUrl: 'http://localhost:8081/api-proxy.php',
    endpoints: {
      health: '?path=health',
      materials: '?path=materials',
      crafts: '?path=crafts', 
      techniques: '?path=techniques',
      artisans: '?path=artisans',
      compatibleCrafts: '?path=compatible-crafts',
      compatibleMaterials: '?path=compatible-materials',
      compatibleTechniques: '?path=compatible-techniques',
      compatibleArtisans: '?path=compatible-artisans',
      // AI-POWERED ENDPOINTS
      aiAnalysis: '?path=ai-project-analysis',
      aiMaterials: '?path=ai-material-suggestions',
      aiArtisans: '?path=ai-artisan-matching'
    }
  }
};

// Type-safe API client
export const apiClient = {
  get: (endpoint: keyof typeof API_CONFIG.primary.endpoints, params?: string) => {
    const url = `${API_CONFIG.primary.baseUrl}${API_CONFIG.primary.endpoints[endpoint]}${params ? `&${params}` : ''}`;
    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
  },
  
  post: (endpoint: keyof typeof API_CONFIG.primary.endpoints, data: any) =>
    fetch(`${API_CONFIG.primary.baseUrl}${API_CONFIG.primary.endpoints[endpoint]}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
};

// Legacy exports for backward compatibility (will be removed)
export const buildApiUrl = (endpoint: string) => {
  console.warn('buildApiUrl is deprecated, use apiClient instead');
  return `${API_CONFIG.primary.baseUrl}${endpoint}`;
};

export const checkApiHealth = async () => {
  try {
    const response = await apiClient.get('health');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('❌ API Health Check Failed:', error);
    return { success: false, message: `Health check failed: ${error.message}` };
  }
};

// Development logging helpers
export const logApiCall = (endpoint: string, method: string = 'GET') => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`📡 API Call: ${method} ${API_CONFIG.primary.baseUrl}${endpoint}`);
  }
};

export const logApiResponse = (endpoint: string, response: any, success: boolean) => {
  if (process.env.NODE_ENV === 'development') {
    const status = success ? '✅' : '❌';
    console.log(`${status} API Response for ${endpoint}:`, {
      success,
      dataLength: response?.data?.length || 0,
      message: response?.message
    });
  }
};
