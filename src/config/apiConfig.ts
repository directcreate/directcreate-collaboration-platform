
// DirectCreate API Configuration - PRODUCTION CLOUD API
const DIRECTCREATE_API = 'https://directcreate-api.onrender.com';

export const API_CONFIG = {
  BASE_URL: DIRECTCREATE_API,
  ENDPOINTS: {
    health: '/',
    materials: '/?path=materials',
    crafts: '/?path=crafts', 
    techniques: '/?path=techniques',
    artisans: '/?path=artisans',
    compatibleCrafts: '/?path=compatible-crafts',
    compatibleMaterials: '/?path=compatible-materials',
    compatibleTechniques: '/?path=compatible-techniques',
    compatibleArtisans: '/?path=compatible-artisans',
    initialize: '/?path=wizard/initialize',
    saveStep: '/?path=wizard/save-step',
    analyzeVision: '/?path=wizard/analyze-vision',
    findArtisans: '/?path=wizard/find-artisans',
    completeWizard: '/?path=wizard/complete-wizard',
    aiProjectAnalysis: '/?path=ai-project-analysis',
    aiMaterialSuggestions: '/?path=ai-material-suggestions'
  }
};

// Production helper function to build API URLs
export const buildApiUrl = (endpoint: string) => {
  const fullUrl = `${API_CONFIG.BASE_URL}${endpoint}`;
  if (process.env.NODE_ENV === 'development') {
    console.log(`🔗 Production Cloud API URL: ${fullUrl}`);
  }
  return fullUrl;
};

// Production API health check function
export const checkApiHealth = async () => {
  try {
    const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.health), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('❌ Production API Health Check Failed:', error);
    return { success: false, message: `Health check failed: ${error.message}` };
  }
};

// Production API call logging (development only)
export const logApiCall = (endpoint: string, method: string = 'GET') => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`📡 Production API Call: ${method} ${buildApiUrl(endpoint)}`);
  }
};

// Production API response logging (development only)
export const logApiResponse = (endpoint: string, response: any, success: boolean) => {
  if (process.env.NODE_ENV === 'development') {
    const status = success ? '✅' : '❌';
    console.log(`${status} Production API Response for ${endpoint}:`, {
      success,
      dataLength: response?.data?.length || 0,
      message: response?.message
    });
  }
};
