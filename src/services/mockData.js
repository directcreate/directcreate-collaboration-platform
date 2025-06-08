
// Mock data service to simulate API responses
export const mockMaterials = [
  {
    id: 1,
    name: "Reclaimed Oak",
    category: "Wood",
    description: "Sustainable hardwood with rich grain patterns",
    sustainability_rating: 9
  },
  {
    id: 2,
    name: "Recycled Steel",
    category: "Metal",
    description: "Industrial strength recycled steel",
    sustainability_rating: 8
  },
  {
    id: 3,
    name: "Organic Cotton",
    category: "Textile",
    description: "GOTS certified organic cotton fiber",
    sustainability_rating: 9
  },
  {
    id: 4,
    name: "Bamboo Fiber",
    category: "Natural",
    description: "Fast-growing sustainable bamboo",
    sustainability_rating: 10
  },
  {
    id: 5,
    name: "Cork",
    category: "Natural",
    description: "Harvested cork from sustainable forests",
    sustainability_rating: 9
  }
];

export const mockCrafts = [
  {
    id: 1,
    name: "Hand Weaving",
    description: "Traditional textile creation using looms",
    difficulty: "Intermediate",
    time_estimate: "2-4 weeks"
  },
  {
    id: 2,
    name: "Wood Carving",
    description: "Sculptural shaping of wood using hand tools",
    difficulty: "Advanced",
    time_estimate: "1-3 weeks"
  },
  {
    id: 3,
    name: "Pottery",
    description: "Clay forming and ceramic glazing techniques",
    difficulty: "Beginner",
    time_estimate: "1-2 weeks"
  },
  {
    id: 4,
    name: "Metalworking",
    description: "Forging and shaping metal into functional art",
    difficulty: "Advanced",
    time_estimate: "2-6 weeks"
  }
];

export const mockTechniques = [
  {
    id: 1,
    name: "Japanese Joinery",
    description: "Precision woodworking without nails or screws",
    origin: "Japan",
    complexity: "High"
  },
  {
    id: 2,
    name: "Sashiko Stitching",
    description: "Traditional Japanese reinforcement stitching",
    origin: "Japan",
    complexity: "Medium"
  },
  {
    id: 3,
    name: "Raku Firing",
    description: "Japanese ceramic firing technique",
    origin: "Japan",
    complexity: "High"
  }
];

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
