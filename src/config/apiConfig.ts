
// DirectCreate API Configuration - Development Environment
const DIRECTCREATE_API = 'http://localhost:8081/api-proxy.php';

export const API_CONFIG = {
  BASE_URL: DIRECTCREATE_API,
  ENDPOINTS: {
    materials: '?path=materials',
    crafts: '?path=crafts', 
    techniques: '?path=techniques',
    initialize: '?path=wizard/initialize',
    saveStep: '?path=wizard/save-step',
    analyzeVision: '?path=wizard/analyze-vision',
    findArtisans: '?path=wizard/find-artisans',
    completeWizard: '?path=wizard/complete-wizard'
  }
};

// Helper function to build API URLs
export const buildApiUrl = (endpoint: string) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};
