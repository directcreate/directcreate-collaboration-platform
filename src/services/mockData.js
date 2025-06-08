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

// Mock products showcasing work by our consistent artisans
export const mockProducts = [
  {
    id: "dining-table-rajesh",
    name: "Handcrafted Dining Table",
    description: "Traditional dining table crafted from reclaimed oak with intricate hand carving",
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    artisan: {
      id: "rajesh-kumar",
      name: "Rajesh Kumar",
      location: "Jodhpur, Rajasthan"
    },
    materials: ["Reclaimed Oak"],
    crafts: ["Wood Carving", "Furniture Making"],
    techniques: ["Hand Carving", "Japanese Joinery"],
    price: "₹45,000",
    rating: 4.9,
    reviews: 23,
    timeToMake: "3-4 weeks",
    dimensions: "180cm x 90cm x 75cm"
  },
  {
    id: "ceramic-vase-priya",
    name: "Contemporary Ceramic Vase",
    description: "Elegant porcelain vase with hand-painted glazing and traditional wheel throwing",
    category: "Pottery",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    artisan: {
      id: "priya-sharma",
      name: "Priya Sharma",
      location: "Delhi"
    },
    materials: ["Porcelain Clay"],
    crafts: ["Pottery", "Ceramics"],
    techniques: ["Wheel Throwing", "Hand Painting"],
    price: "₹3,500",
    rating: 4.8,
    reviews: 31,
    timeToMake: "1-2 weeks",
    dimensions: "25cm x 25cm x 40cm"
  },
  {
    id: "silk-textile-kumar",
    name: "Block Printed Silk Scarf",
    description: "Heritage textile with traditional block printing and natural dyeing on pure silk",
    category: "Textile",
    image: "https://images.unsplash.com/photo-1558618666-9c0c8c4b1994?w=400&h=300&fit=crop",
    artisan: {
      id: "kumar-singh",
      name: "Kumar Singh", 
      location: "Ahmedabad, Gujarat"
    },
    materials: ["Silk", "Organic Cotton"],
    crafts: ["Block Printing", "Textile"],
    techniques: ["Block Printing", "Natural Dyeing"],
    price: "₹2,800",
    rating: 4.7,
    reviews: 18,
    timeToMake: "2-3 weeks",
    dimensions: "200cm x 70cm"
  },
  {
    id: "copper-sculpture-anita",
    name: "Garden Metal Sculpture",
    description: "Modern copper sculpture with patina finish, perfect for garden spaces",
    category: "Metalwork",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=300&fit=crop",
    artisan: {
      id: "anita-rao",
      name: "Anita Rao",
      location: "Bangalore, Karnataka"
    },
    materials: ["Copper", "Recycled Steel"],
    crafts: ["Metalworking", "Sculpture"],
    techniques: ["Metal Forming", "Lost Wax Casting"],
    price: "₹25,000",
    rating: 4.9,
    reviews: 15,
    timeToMake: "4-5 weeks",
    dimensions: "120cm x 60cm x 180cm"
  },
  {
    id: "silver-jewelry-mahesh",
    name: "Traditional Silver Necklace",
    description: "Handcrafted sterling silver necklace with precious stone setting",
    category: "Jewelry",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop",
    artisan: {
      id: "mahesh-gupta",
      name: "Mahesh Gupta",
      location: "Jaipur, Rajasthan"
    },
    materials: ["Sterling Silver", "Precious Stones"],
    crafts: ["Jewelry Making", "Metalworking"],
    techniques: ["Hand Carving", "Stone Setting"],
    price: "₹15,000",
    rating: 4.6,
    reviews: 42,
    timeToMake: "2-3 weeks",
    dimensions: "45cm length"
  },
  {
    id: "embroidered-cushion-lalita",
    name: "Chikankari Cushion Cover",
    description: "Traditional Lucknowi chikankari embroidery on organic cotton",
    category: "Textile",
    image: "https://images.unsplash.com/photo-1586880244406-556ebe35f282?w=400&h=300&fit=crop",
    artisan: {
      id: "lalita-devi",
      name: "Lalita Devi",
      location: "Lucknow, Uttar Pradesh"
    },
    materials: ["Organic Cotton", "Silk"],
    crafts: ["Embroidery", "Hand Weaving"],
    techniques: ["Hand Embroidery", "Pattern Design"],
    price: "₹1,200",
    rating: 4.8,
    reviews: 67,
    timeToMake: "1-2 weeks",
    dimensions: "45cm x 45cm"
  },
  {
    id: "wooden-chest-rajesh",
    name: "Carved Storage Chest",
    description: "Traditional Rajasthani wooden chest with intricate carving and brass fittings",
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=300&fit=crop",
    artisan: {
      id: "rajesh-kumar",
      name: "Rajesh Kumar",
      location: "Jodhpur, Rajasthan"
    },
    materials: ["Teak", "Brass"],
    crafts: ["Wood Carving", "Woodworking"],
    techniques: ["Hand Carving", "Traditional Methods"],
    price: "₹32,000",
    rating: 4.9,
    reviews: 19,
    timeToMake: "4-6 weeks",
    dimensions: "100cm x 50cm x 60cm"
  },
  {
    id: "ceramic-dinnerware-priya",
    name: "Ceramic Dinnerware Set",
    description: "Complete ceramic dinnerware set with contemporary glazing techniques",
    category: "Pottery",
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&h=300&fit=crop",
    artisan: {
      id: "priya-sharma",
      name: "Priya Sharma",
      location: "Delhi"
    },
    materials: ["Stoneware", "Porcelain Clay"],
    crafts: ["Pottery", "Ceramics"],
    techniques: ["Wheel Throwing", "Glazing"],
    price: "₹8,500",
    rating: 4.8,
    reviews: 35,
    timeToMake: "2-3 weeks",
    dimensions: "Service for 6"
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
  },

  getProducts: async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600));
    return {
      success: true,
      data: mockProducts,
      message: "Products loaded successfully"
    };
  }
};
