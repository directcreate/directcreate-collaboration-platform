
// DirectCreate API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://calm-showers-glow.loca.lt',
  ENDPOINTS: {
    materials: '/wizard/materials',
    crafts: '/wizard/crafts', 
    techniques: '/wizard/techniques',
    initialize: '/wizard/initialize',
    saveStep: '/wizard/save-step',
    analyzeVision: '/wizard/analyze-vision',
    findArtisans: '/wizard/find-artisans',
    completeWizard: '/wizard/complete-wizard'
  }
};

// Helper function to build API URLs
export const buildApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
};

// Utility functions for API calls
export const directCreateAPI = {
  // Get materials list
  getMaterials: async () => {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.materials}`);
    return response.json();
  },

  // Get crafts list  
  getCrafts: async () => {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.crafts}`);
    return response.json();
  },

  // Get techniques list
  getTechniques: async () => {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.techniques}`);
    return response.json();
  }
};