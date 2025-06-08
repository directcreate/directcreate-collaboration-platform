
import { mockMaterials } from './mockMaterials.js';
import { mockCrafts } from './mockCrafts.js';
import { mockTechniques } from './mockTechniques.js';

// Export the imported arrays
export { mockMaterials, mockCrafts, mockTechniques };

// Mock API service that simulates the real API
export const mockDirectCreateAPI = {
  getMaterials: async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      success: true,
      data: mockMaterials,
      message: "Materials loaded successfully"
    };
  },

  getCrafts: async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 700));
    return {
      success: true,
      data: mockCrafts,
      message: "Crafts loaded successfully"
    };
  },

  getTechniques: async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600));
    return {
      success: true,
      data: mockTechniques,
      message: "Techniques loaded successfully"
    };
  }
};
