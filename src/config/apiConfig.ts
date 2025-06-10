
// DirectCreate API Configuration - New Enhanced ML API Endpoint
const DIRECTCREATE_API = 'https://angry-regression-respondent-served.trycloudflare.com/enhanced-ml-api.php';

export const API_CONFIG = {
  BASE_URL: DIRECTCREATE_API,
  ENDPOINTS: {
    health: '?path=health',
    materials: '?path=materials',
    crafts: '?path=crafts', 
    techniques: '?path=techniques',
    initialize: '?path=wizard/initialize',
    saveStep: '?path=wizard/save-step',
    analyzeVision: '?path=wizard/analyze-vision',
    findArtisans: '?path=wizard/find-artisans',
    completeWizard: '?path=wizard/complete-wizard',
    aiProjectAnalysis: '?path=ai-project-analysis',
    aiMaterialSuggestions: '?path=ai-material-suggestions'
  }
};

// Enhanced helper function to build API URLs with logging
export const buildApiUrl = (endpoint: string) => {
  const fullUrl = `${API_CONFIG.BASE_URL}${endpoint}`;
  console.log(`🔗 Building API URL: ${fullUrl}`);
  return fullUrl;
};

// Add debugging helper
export const logApiCall = (endpoint: string, method: string = 'GET') => {
  console.log(`📡 API Call: ${method} ${buildApiUrl(endpoint)}`);
  console.log(`🕐 Timestamp: ${new Date().toISOString()}`);
};

// Add response logging helper
export const logApiResponse = (endpoint: string, response: any, success: boolean) => {
  const status = success ? '✅' : '❌';
  console.log(`${status} API Response for ${endpoint}:`, {
    success,
    dataLength: response?.data?.length || 0,
    message: response?.message,
    timestamp: new Date().toISOString()
  });
};
