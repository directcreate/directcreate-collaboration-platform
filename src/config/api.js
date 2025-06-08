
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
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.materials}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch materials:', error);
      throw error;
    }
  },

  // Get crafts list  
  getCrafts: async () => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.crafts}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch crafts:', error);
      throw error;
    }
  },

  // Get techniques list
  getTechniques: async () => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.techniques}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch techniques:', error);
      throw error;
    }
  }
};
