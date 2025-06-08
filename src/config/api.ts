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
  },

  // Get compatible crafts for a specific material
  getCompatibleCrafts: async (materialId: number) => {
    try {
      console.log(`🔄 Fetching compatible crafts for material ID: ${materialId}...`);
      const response = await fetch(`${DIRECTCREATE_API}?path=compatible-crafts&material_id=${materialId}`, {
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
      console.log('✅ DirectCreate compatible crafts loaded:', data);
      
      if (data.success && Array.isArray(data.data)) {
        return {
          success: true,
          data: data.data,
          message: "Compatible crafts loaded from DirectCreate database"
        };
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('❌ DirectCreate Compatible Crafts API Error:', error);
      return {
        success: false,
        data: [],
        message: `API Error: ${error.message}`,
        error: error.message
      };
    }
  },

  // Get compatible materials for a specific craft
  getCompatibleMaterials: async (craftId: number) => {
    try {
      console.log(`🔄 Fetching compatible materials for craft ID: ${craftId}...`);
      const response = await fetch(`${DIRECTCREATE_API}?path=compatible-materials&craft_id=${craftId}`, {
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
      console.log('✅ DirectCreate compatible materials loaded:', data);
      
      if (data.success && Array.isArray(data.data)) {
        return {
          success: true,
          data: data.data,
          message: "Compatible materials loaded from DirectCreate database"
        };
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('❌ DirectCreate Compatible Materials API Error:', error);
      return {
        success: false,
        data: [],
        message: `API Error: ${error.message}`,
        error: error.message
      };
    }
  },

  // Get compatible techniques for specific material and/or craft
  getCompatibleTechniques: async (materialId?: number, craftId?: number) => {
    const params = new URLSearchParams();
    if (materialId) params.append('material_id', materialId.toString());
    if (craftId) params.append('craft_id', craftId.toString());
    
    try {
      console.log(`🔄 Fetching compatible techniques for material: ${materialId}, craft: ${craftId}...`);
      const response = await fetch(`${DIRECTCREATE_API}?path=compatible-techniques&${params}`, {
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
      console.log('✅ DirectCreate compatible techniques loaded:', data);
      
      if (data.success && Array.isArray(data.data)) {
        return {
          success: true,
          data: data.data,
          message: "Compatible techniques loaded from DirectCreate database"
        };
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('❌ DirectCreate Compatible Techniques API Error:', error);
      return {
        success: false,
        data: [],
        message: `API Error: ${error.message}`,
        error: error.message
      };
    }
  }
};
