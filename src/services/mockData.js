// Note: Materials, crafts, and techniques are now loaded from real DirectCreate API
// This file now only contains artisan and product mock data for development

// Enhanced artisan profiles with comprehensive DirectCreate-style data
export const mockArtisans = [
  {
    id: "rajesh-kumar",
    name: "Rajesh Kumar",
    organization: "Kumar Heritage Woodcraft",
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
    specialtyTechniques: ["Rajasthani Carving", "Dovetail Joints", "Wood Inlay", "Natural Finishing"],
    completionRate: 96,
    bannerImage: "https://images.unsplash.com/photo-1606744824163-985d376605aa?w=800&h=300&fit=crop",
    aboutMe: "Third-generation woodworker specializing in traditional Rajasthani furniture. I combine ancestral techniques with modern functionality to create heirloom pieces that tell stories.",
    portfolio: ["Custom dining table", "Carved wooden panels", "Traditional chest"],
    portfolioImages: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150&h=150&fit=crop",
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=150&h=150&fit=crop",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=150&h=150&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150&h=150&fit=crop"
    ],
    priceRange: "₹15,000 - ₹50,000",
    annualTurnover: "₹8-12 Lakhs",
    responseTime: "2-4 hours",
    awards: ["Rajasthan State Craft Award 2022", "Best Traditional Furniture - 2021"],
    languages: ["Hindi", "English", "Rajasthani"]
  },
  {
    id: "priya-sharma",
    name: "Priya Sharma",
    organization: "Sharma Ceramics Studio",
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
    specialtyTechniques: ["Raku Firing", "Underglaze Painting", "Crystalline Glazes", "Sgraffito"],
    completionRate: 94,
    bannerImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=300&fit=crop",
    aboutMe: "Contemporary ceramic artist blending traditional Indian pottery with modern design aesthetics. Each piece reflects the harmony between form, function, and artistic expression.",
    portfolio: ["Ceramic dinnerware set", "Decorative vases", "Custom tiles"],
    portfolioImages: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150&h=150&fit=crop",
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=150&h=150&fit=crop",
      "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=150&h=150&fit=crop",
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=150&h=150&fit=crop"
    ],
    priceRange: "₹8,000 - ₹25,000",
    annualTurnover: "₹6-9 Lakhs",
    responseTime: "1-3 hours",
    awards: ["Delhi Craft Council Recognition 2023", "Emerging Artist Award - 2020"],
    languages: ["Hindi", "English", "Punjabi"]
  },
  {
    id: "kumar-singh",
    name: "Kumar Singh",
    organization: "Heritage Textiles Gujarat",
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
    specialtyTechniques: ["Ajrakh Printing", "Bandhani Tie-Dye", "Khadi Weaving", "Indigo Dyeing"],
    completionRate: 92,
    bannerImage: "https://images.unsplash.com/photo-1558618666-9c0c8c4b1994?w=800&h=300&fit=crop",
    aboutMe: "Master weaver preserving Gujarat's rich textile heritage through traditional block printing and natural dyeing techniques. Creating sustainable fashion for the modern world.",
    portfolio: ["Block printed fabrics", "Traditional sarees", "Custom tapestries"],
    portfolioImages: [
      "https://images.unsplash.com/photo-1558618666-9c0c8c4b1994?w=150&h=150&fit=crop",
      "https://images.unsplash.com/photo-1610546099313-6b400b25db22?w=150&h=150&fit=crop",
      "https://images.unsplash.com/photo-1564584217132-2271339881ed?w=150&h=150&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9739b663fb?w=150&h=150&fit=crop"
    ],
    priceRange: "₹5,000 - ₹30,000",
    annualTurnover: "₹10-15 Lakhs",
    responseTime: "4-8 hours",
    awards: ["Gujarat State Textile Award 2023", "Master Craftsman Certificate - 2019"],
    languages: ["Hindi", "Gujarati", "English"]
  },
  {
    id: "anita-rao",
    name: "Anita Rao",
    organization: "Rao Metal Arts",
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
    specialtyTechniques: ["Lost Wax Casting", "Repoussé", "Chasing", "Patination"],
    completionRate: 98,
    bannerImage: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=300&fit=crop",
    aboutMe: "Contemporary metal artist creating sculptural pieces that bridge traditional Indian metalwork with modern design. Specializing in sustainable practices using recycled materials.",
    portfolio: ["Garden sculptures", "Decorative panels", "Custom lighting"],
    portfolioImages: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=150&h=150&fit=crop",
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=150&h=150&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150&h=150&fit=crop",
      "https://images.unsplash.com/photo-1601049676869-702ea24cfd58?w=150&h=150&fit=crop"
    ],
    priceRange: "₹20,000 - ₹75,000",
    annualTurnover: "₹12-18 Lakhs",
    responseTime: "1-2 hours",
    awards: ["Karnataka State Art Award 2022", "Best Contemporary Sculpture - 2021"],
    languages: ["English", "Kannada", "Tamil"]
  },
  {
    id: "mahesh-gupta",
    name: "Mahesh Gupta",
    organization: "Gupta Jewellers & Arts",
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
    specialtyTechniques: ["Kundan Setting", "Meenakari Enamel", "Jaipur Cut", "Filigree Work"],
    completionRate: 89,
    bannerImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=300&fit=crop",
    aboutMe: "Master jeweler from Jaipur's renowned jewelry district, specializing in traditional Rajasthani techniques. Creating bespoke pieces that celebrate India's gemstone heritage.",
    portfolio: ["Custom wedding jewelry", "Traditional necklaces", "Stone rings"],
    portfolioImages: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=150&h=150&fit=crop",
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=150&h=150&fit=crop",
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=150&h=150&fit=crop",
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=150&h=150&fit=crop"
    ],
    priceRange: "₹10,000 - ₹1,00,000",
    annualTurnover: "₹15-25 Lakhs",
    responseTime: "3-6 hours",
    awards: ["Gem & Jewellery Export Council Award 2023", "Master Craftsman - 2018"],
    languages: ["Hindi", "Rajasthani", "English"]
  },
  {
    id: "lalita-devi",
    name: "Lalita Devi",
    organization: "Lucknow Chikan House",
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
    specialtyTechniques: ["Chikankari", "Shadow Work", "Phanda", "Murri Stitching"],
    completionRate: 95,
    bannerImage: "https://images.unsplash.com/photo-1586880244406-556ebe35f282?w=800&h=300&fit=crop",
    aboutMe: "Master embroiderer preserving Lucknow's 400-year-old Chikankari tradition. Each piece tells a story through intricate stitches passed down through generations.",
    portfolio: ["Chikankari kurtas", "Decorative dupattas", "Table linens"],
    portfolioImages: [
      "https://images.unsplash.com/photo-1586880244406-556ebe35f282?w=150&h=150&fit=crop",
      "https://images.unsplash.com/photo-1564584217132-2271339881ed?w=150&h=150&fit=crop",
      "https://images.unsplash.com/photo-1610546099313-6b400b25db22?w=150&h=150&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9739b663fb?w=150&h=150&fit=crop"
    ],
    priceRange: "₹3,000 - ₹15,000",
    annualTurnover: "₹5-8 Lakhs",
    responseTime: "2-5 hours",
    awards: ["UP State Embroidery Award 2023", "Chikankari Master Artist - 2020"],
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

// Mock API service for artisans and products (non-DirectCreate data)
export const mockDirectCreateAPI = {
  // Artisans and products still use mock data since they're not in DirectCreate API yet
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
  },

  // Add the missing getTechniques function
  getTechniques: async () => {
    // Import the mock techniques data
    const { mockTechniques } = await import('./mockTechniques.js');
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      success: true,
      data: mockTechniques,
      message: "Techniques loaded successfully"
    };
  }
};
