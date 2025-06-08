
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
export const buildApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Real DirectCreate API calls
export const directCreateAPI = {
  // Get materials from real DirectCreate database
  getMaterials: async () => {
    try {
      console.log('🔄 Fetching materials from DirectCreate database...');
      const response = await fetch(`${DIRECTCREATE_API}?path=materials`, {
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
      console.log('✅ DirectCreate materials loaded:', data);
      
      // Handle DirectCreate API response format
      if (data.success && Array.isArray(data.data)) {
        return {
          success: true,
          data: data.data,
          message: "Real materials loaded from DirectCreate database"
        };
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('❌ DirectCreate API Error:', error);
      // Return empty array as fallback with error indication
      return {
        success: false,
        data: [],
        message: `API Error: ${error.message}`,
        error: error.message
      };
    }
  },

  // Get crafts from real DirectCreate database  
  getCrafts: async () => {
    try {
      console.log('🔄 Fetching crafts from DirectCreate database...');
      const response = await fetch(`${DIRECTCREATE_API}?path=crafts`, {
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
      console.log('✅ DirectCreate crafts loaded:', data);
      
      if (data.success && Array.isArray(data.data)) {
        return {
          success: true,
          data: data.data,
          message: "Real crafts loaded from DirectCreate database"
        };
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('❌ DirectCreate API Error:', error);
      return {
        success: false,
        data: [],
        message: `API Error: ${error.message}`,
        error: error.message
      };
    }
  },

  // Get techniques from real DirectCreate database
  getTechniques: async () => {
    try {
      console.log('🔄 Fetching techniques from DirectCreate database...');
      const response = await fetch(`${DIRECTCREATE_API}?path=techniques`, {
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
      console.log('✅ DirectCreate techniques loaded:', data);
      
      if (data.success && Array.isArray(data.data)) {
        return {
          success: true,
          data: data.data,
          message: "Real techniques loaded from DirectCreate database"
        };
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('❌ DirectCreate API Error:', error);
      return {
        success: false,
        data: [],
        message: `API Error: ${error.message}`,
        error: error.message
      };
    }
  }
};
