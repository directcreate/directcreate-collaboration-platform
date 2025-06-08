
import { mockMaterials } from './mockMaterials.js';
import { mockCrafts } from './mockCrafts.js';
import { mockTechniques } from './mockTechniques.js';

// Export the imported arrays
export { mockMaterials, mockCrafts, mockTechniques };

// Shared artisan profiles for consistency across the platform
export const mockArtisans = [
  {
    id: "rajesh-kumar",
    name: "Rajesh Kumar",
    location: "Jodhpur, Rajasthan",
    specialty: "Traditional Woodworking Master",
    rating: 4.9,
    reviews: 127,
    experience: "15 years",
    availability: "Available",
    capacityPercentage: 30,
    skills: ["Hand Carving", "Wood Joining", "Traditional Polish", "Inlay Work"],
    materials: ["Reclaimed Oak", "Bamboo", "Teak", "Pine"],
    crafts: ["Wood Carving", "Furniture Making", "Woodworking"],
    techniques: ["Hand Carving", "Japanese Joinery", "Traditional Methods"],
    completionRate: 96,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    portfolio: ["Custom dining table", "Carved wooden panels", "Traditional chest"],
    priceRange: "₹15,000 - ₹50,000",
    responseTime: "2-4 hours",
    languages: ["Hindi", "English", "Rajasthani"]
  },
  {
    id: "priya-sharma",
    name: "Priya Sharma",
    location: "Delhi",
    specialty: "Contemporary Ceramic Artist",
    rating: 4.8,
    reviews: 89,
    experience: "12 years",
    availability: "Available",
    capacityPercentage: 45,
    skills: ["Wheel Throwing", "Glazing", "Hand Painting", "Kiln Firing"],
    materials: ["Porcelain Clay", "Ceramic", "Stoneware"],
    crafts: ["Pottery", "Ceramics", "Sculpture"],
    techniques: ["Wheel Throwing", "Raku Firing", "Hand Painting"],
    completionRate: 94,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    portfolio: ["Ceramic dinnerware set", "Decorative vases", "Custom tiles"],
    priceRange: "₹8,000 - ₹25,000",
    responseTime: "1-3 hours",
    languages: ["Hindi", "English", "Punjabi"]
  },
  {
    id: "kumar-singh",
    name: "Kumar Singh",
    location: "Ahmedabad, Gujarat",
    specialty: "Heritage Textile Craftsman",
    rating: 4.7,
    reviews: 156,
    experience: "18 years",
    availability: "Busy",
    capacityPercentage: 80,
    skills: ["Block Printing", "Natural Dyeing", "Weaving", "Embroidery"],
    materials: ["Organic Cotton", "Hemp Fiber", "Silk", "Linen"],
    crafts: ["Hand Weaving", "Textile", "Block Printing"],
    techniques: ["Hand Weaving", "Block Printing", "Natural Dyeing"],
    completionRate: 92,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    portfolio: ["Block printed fabrics", "Traditional sarees", "Custom tapestries"],
    priceRange: "₹5,000 - ₹30,000",
    responseTime: "4-8 hours",
    languages: ["Hindi", "Gujarati", "English"]
  },
  {
    id: "anita-rao",
    name: "Anita Rao",
    location: "Bangalore, Karnataka",
    specialty: "Modern Metal Sculptor",
    rating: 4.9,
    reviews: 73,
    experience: "10 years",
    availability: "Available",
    capacityPercentage: 25,
    skills: ["Welding", "Metal Forming", "Patina", "Assembly"],
    materials: ["Sterling Silver", "Recycled Steel", "Copper", "Bronze"],
    crafts: ["Metalworking", "Sculpture", "Jewelry Making"],
    techniques: ["Lost Wax Casting", "Hand Carving", "Metal Forming"],
    completionRate: 98,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    portfolio: ["Garden sculptures", "Decorative panels", "Custom lighting"],
    priceRange: "₹20,000 - ₹75,000",
    responseTime: "1-2 hours",
    languages: ["English", "Kannada", "Tamil"]
  },
  {
    id: "mahesh-gupta",
    name: "Mahesh Gupta",
    location: "Jaipur, Rajasthan",
    specialty: "Gemstone & Jewelry Artisan",
    rating: 4.6,
    reviews: 203,
    experience: "22 years",
    availability: "Available",
    capacityPercentage: 40,
    skills: ["Stone Setting", "Metal Casting", "Engraving", "Polish"],
    materials: ["Sterling Silver", "Precious Stones", "Gold", "Recycled Metals"],
    crafts: ["Jewelry Making", "Gemcutting", "Metalworking"],
    techniques: ["Hand Carving", "Lost Wax Casting", "Stone Setting"],
    completionRate: 89,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    portfolio: ["Custom wedding jewelry", "Traditional necklaces", "Stone rings"],
    priceRange: "₹10,000 - ₹1,00,000",
    responseTime: "3-6 hours",
    languages: ["Hindi", "Rajasthani", "English"]
  },
  {
    id: "lalita-devi",
    name: "Lalita Devi",
    location: "Lucknow, Uttar Pradesh",
    specialty: "Chikankari Embroidery Expert",
    rating: 4.8,
    reviews: 134,
    experience: "25 years",
    availability: "Available",
    capacityPercentage: 35,
    skills: ["Hand Embroidery", "Pattern Design", "Thread Work", "Finishing"],
    materials: ["Organic Cotton", "Silk", "Muslin", "Linen"],
    crafts: ["Embroidery", "Hand Weaving", "Textile"],
    techniques: ["Hand Embroidery", "Sashiko Stitching", "Pattern Design"],
    completionRate: 95,
    image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=400&fit=crop&crop=face",
    portfolio: ["Chikankari kurtas", "Decorative dupattas", "Table linens"],
    priceRange: "₹3,000 - ₹15,000",
    responseTime: "2-5 hours",
    languages: ["Hindi", "Urdu", "English"]
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
  },

  getArtisans: async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 400));
    return {
      success: true,
      data: mockArtisans,
      message: "Artisans loaded successfully"
    };
  }
};
