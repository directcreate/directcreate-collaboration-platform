

// DirectCreate API Configuration - LIVE PRODUCTION API
const DIRECTCREATE_API = 'https://3053-2401-4900-417f-4067-19d6-c759-d006-21fa.ngrok-free.app/production-api.php';

export const API_CONFIG = {
  BASE_URL: DIRECTCREATE_API,
  ENDPOINTS: {
    health: '?path=health',
    materials: '?path=materials',
    crafts: '?path=crafts', 
    techniques: '?path=techniques',
    artisans: '?path=artisans',
    compatibleCrafts: '?path=compatible-crafts',
    compatibleMaterials: '?path=compatible-materials',
    compatibleTechniques: '?path=compatible-techniques',
    compatibleArtisans: '?path=compatible-artisans',
    initialize: '?path=wizard/initialize',
    saveStep: '?path=wizard/save-step',
    analyzeVision: '?path=wizard/analyze-vision',
    findArtisans: '?path=wizard/find-artisans',
    completeWizard: '?path=wizard/complete-wizard',
    aiProjectAnalysis: '?path=ai-project-analysis',
    aiMaterialSuggestions: '?path=ai-material-suggestions',
    imageProxy: '?path=image-proxy&url=' // Add image proxy endpoint
  }
};

// Production helper function to build API URLs
export const buildApiUrl = (endpoint: string) => {
  const fullUrl = `${API_CONFIG.BASE_URL}${endpoint}`;
  if (process.env.NODE_ENV === 'development') {
    console.log(`🔗 Live API URL: ${fullUrl}`);
  }
  return fullUrl;
};

// Helper function to build proxied image URLs
export const buildProxiedImageUrl = (imageUrl: string) => {
  const encodedUrl = encodeURIComponent(imageUrl);
  return buildApiUrl(`${API_CONFIG.ENDPOINTS.imageProxy}${encodedUrl}`);
};

// Live API health check function
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
    console.error('❌ Live API Health Check Failed:', error);
    return { success: false, message: `Health check failed: ${error.message}` };
  }
};

// Live API call logging (development only)
export const logApiCall = (endpoint: string, method: string = 'GET') => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`📡 Live API Call: ${method} ${buildApiUrl(endpoint)}`);
  }
};

// Live API response logging (development only)
export const logApiResponse = (endpoint: string, response: any, success: boolean) => {
  if (process.env.NODE_ENV === 'development') {
    const status = success ? '✅' : '❌';
    console.log(`${status} Live API Response for ${endpoint}:`, {
      success,
      dataLength: response?.data?.length || 0,
      message: response?.message
    });
  }
};

