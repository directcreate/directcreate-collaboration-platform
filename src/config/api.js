
// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://calm-showers-glow.loca.lt',
  // Add other API-related constants here
};

// Helper function to build API URLs
export const buildApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
};
