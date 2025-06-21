
# DirectCreate API Integration Project - Comprehensive Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project File Structure](#project-file-structure)
4. [API Configuration](#api-configuration)
5. [Service Architecture](#service-architecture)
6. [Data Models & Interfaces](#data-models--interfaces)
7. [Debug & Testing Tools](#debug--testing-tools)
8. [Current API Status](#current-api-status)
9. [Development Dependencies](#development-dependencies)
10. [Known Issues & Limitations](#known-issues--limitations)

---

## Project Overview

This is a React-based web application built to integrate with the DirectCreate API, focusing on artisan craft matching, material selection, and AI-powered project recommendations. The project implements an AI-first approach with fallback mechanisms for traditional data retrieval.

### Core Features
- Material, craft, and technique browsing with AI-powered recommendations
- Smart artisan matching based on project requirements
- AI project analysis and intelligent filtering
- Comprehensive API testing and debugging tools
- Responsive design with modern UI components

---

## Technology Stack

### Frontend Framework
- **React** v18.3.1 with TypeScript
- **Vite** for build tooling and development server
- **React Router DOM** v6.26.2 for client-side routing

### UI & Styling
- **Tailwind CSS** for utility-first styling
- **Shadcn/UI** component library with Radix UI primitives
- **Lucide React** v0.462.0 for icons
- **Next Themes** v0.3.0 for theme management

### State Management & Data Fetching
- **TanStack React Query** v5.56.2 for server state management
- **React Hook Form** v7.53.0 with Zod validation

### Additional Libraries
- **Recharts** v2.12.7 for data visualization
- **Date-fns** v3.6.0 for date manipulation
- **Sonner** v1.5.0 for toast notifications

---

## Project File Structure

```
src/
├── config/
│   ├── apiConfig.ts              # Central API configuration and client
│   └── api.ts                    # Consolidated API interface
├── services/
│   ├── Legacy Services (deprecated):
│   │   ├── materialsService.ts   # Basic materials fetching
│   │   ├── craftsService.ts      # Basic crafts fetching
│   │   ├── techniquesService.ts  # Basic techniques fetching
│   │   └── artisansService.ts    # Basic artisans fetching
│   ├── Smart AI-First Services:
│   │   ├── smartMaterialsService.ts     # AI-powered material recommendations
│   │   ├── smartCraftsService.ts        # AI-powered craft suggestions
│   │   ├── smartTechniquesService.ts    # Context-aware technique matching
│   │   └── smartArtisansService.ts      # AI artisan matching system
│   ├── aiService.ts              # Direct AI API interactions
│   └── descriptionAnalysisService.ts    # Project description analysis
├── components/
│   ├── debug/
│   │   ├── APIIntegrationTest.tsx       # Comprehensive API testing UI
│   │   ├── APITester.tsx               # Basic endpoint testing
│   │   ├── APIDiagnostics.tsx          # Advanced diagnostics
│   │   └── ConnectionStatus.tsx         # Real-time connection monitoring
│   [... other component directories ...]
├── hooks/
│   ├── useDirectCreateData.ts    # Main data fetching hooks
│   ├── useMaterials.ts          # Material-specific hooks
│   ├── useCrafts.ts             # Craft-specific hooks
│   └── [... other hooks ...]
└── pages/
    ├── ProjectForm.tsx          # Main project creation interface
    ├── MaterialFirst.tsx        # Material-centric workflow
    ├── CraftFirst.tsx           # Craft-centric workflow
    └── [... other pages ...]
```

---

## API Configuration

### Base Configuration
```typescript
// Primary API Endpoint
baseUrl: 'https://directcreate-api.onrender.com/api-proxy.php'

// Request Headers
{
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}
```

### Available Endpoints

#### Core Data Endpoints
```typescript
health: '?path=health'                    # API health check
materials: '?path=materials'              # Get all materials
crafts: '?path=crafts'                   # Get all crafts  
techniques: '?path=techniques'            # Get all techniques
artisans: '?path=artisans'               # Get all artisans
```

#### Compatibility Endpoints
```typescript
compatibleCrafts: '?path=compatible-crafts'           # Crafts for material
compatibleMaterials: '?path=compatible-materials'     # Materials for craft
compatibleTechniques: '?path=compatible-techniques'   # Techniques for material/craft
compatibleArtisans: '?path=compatible-artisans'       # Artisans for requirements
```

#### AI-Powered Endpoints
```typescript
aiAnalysis: '?path=ai-project-analysis'        # Project description analysis
aiMaterials: '?path=ai-material-suggestions'   # AI material recommendations
aiArtisans: '?path=ai-artisan-matching'        # AI artisan matching
```

### API Client Methods
```typescript
// GET request
apiClient.get(endpoint, params?)

// POST request  
apiClient.post(endpoint, data)

// Health check utility
checkApiHealth() -> Promise<{success: boolean, message: string}>
```

---

## Service Architecture

### AI-First Smart Services (Recommended)

#### SmartMaterialsService
```typescript
interface SmartMaterialsResult {
  recommended: Material[];     # AI-curated recommendations
  others: Material[];         # Remaining materials
  projectCategory: string;    # Detected project type
  confidence: number;         # AI confidence score
  aiMessage: string;         # Contextual message
}

// Usage
smartMaterialsService.getMaterials(projectDescription?)
```

#### SmartCraftsService
```typescript
interface SmartCraftsResult {
  recommended: Craft[];       # AI-recommended crafts
  others: Craft[];           # Other available crafts
  projectCategory: string;   # Project classification
  confidence: number;        # Recommendation confidence
  aiMessage: string;        # Context message
}

// Usage
smartCraftsService.getCrafts(projectDescription?, materialId?)
```

#### SmartTechniquesService
```typescript
interface SmartTechniquesResult {
  recommended: Technique[];   # Context-aware techniques
  others: Technique[];       # Additional techniques
  contextMessage: string;    # Guidance message
  confidence: number;        # Match confidence
}

// Usage
smartTechniquesService.getTechniques(projectDescription?, materialId?, craftId?)
```

#### SmartArtisansService
```typescript
interface SmartArtisansResult {
  recommended: Artisan[];     # AI-matched artisans
  others: Artisan[];         # Other artisans
  matchingCriteria: string;  # Match explanation
  aiMessage: string;         # Result summary
}

// Usage
smartArtisansService.getArtisans({
  description?: string,
  materialId?: number,
  craftId?: number,
  techniqueId?: number,
  location?: string
})
```

### Legacy Services (Deprecated)
- `materialsService.getMaterials()`
- `craftsService.getCrafts()`
- `techniquesService.getTechniques()`
- `artisansService.getCompatibleArtisans()`

### AI Service
```typescript
aiService.analyzeProject(description, imageUrl?)
aiService.suggestMaterials(projectType, style)
aiService.matchArtisans(materialIds[], craftIds[], description)
```

---

## Data Models & Interfaces

### Material
```typescript
interface Material {
  id: string;
  name: string;
  description: string;
  category: string;
  sustainability_rating: number;
  reason?: string;              # AI recommendation reason
  relevance_score?: number;     # AI relevance score
}
```

### Craft
```typescript
interface Craft {
  id: string;
  name: string;
  description: string;
  difficulty: string;
  time_estimate: string;
  category: string;
  banner?: string;
  bannerImage?: string;
  cultural_authenticity?: number;
  reason?: string;
}
```

### Technique
```typescript
interface Technique {
  id: number;
  name: string;
  description: string;
  category: string;
  difficulty: string;
  time_required: string;
  authenticity_score?: number;
  reason?: string;
}
```

### Artisan
```typescript
interface Artisan {
  id: number;
  name: string;
  location: string;
  specialties: string[];
  experience_years: number;
  rating: number;
  cultural_expertise?: string[];
  ai_match_score?: number;
  match_reason?: string;
}
```

### Project Analysis
```typescript
interface ProjectAnalysis {
  success: boolean;
  project_category: string;
  confidence_score: number;
  suggested_materials: Array<{id: number, name: string, relevance_score: number}>;
  suggested_crafts: Array<{id: number, name: string, relevance_score: number}>;
  suggested_techniques: Array<{id: number, name: string, relevance_score: number}>;
  suggested_path: string;
  reasoning: string;
}
```

---

## Debug & Testing Tools

### APIIntegrationTest Component
**Location**: `src/components/debug/APIIntegrationTest.tsx`
**Purpose**: Comprehensive API endpoint testing with detailed results

**Features**:
- Tests all major endpoints sequentially
- Displays response times and data counts
- Shows success/failure status with detailed error messages
- Sample data preview for successful responses
- Auto-runs tests on component mount

**Tested Endpoints**:
- Health Check
- Materials
- Crafts  
- Techniques
- AI Artisan Matching

### APITester Component
**Location**: `src/components/debug/APITester.tsx`
**Purpose**: Basic endpoint connectivity testing

**Features**:
- Quick endpoint validation
- Response timing measurement
- Error reporting
- Manual test triggering

### APIDiagnostics Component
**Location**: `src/components/debug/APIDiagnostics.tsx`
**Purpose**: Advanced API troubleshooting and analysis

---

## Current API Status

### ✅ Working Endpoints
- **Health Check** (`?path=health`)
  - Status: ✅ Operational
  - Response: `{status: 'ok', service: 'DirectCreate API'}`

### ⚠️ Partially Working Endpoints
- **Materials** (`?path=materials`)
  - Status: ⚠️ Returns "Unknown endpoint" error
  - Fallback: Using mock data or error handling

- **Crafts** (`?path=crafts`)
  - Status: ⚠️ Returns "Unknown endpoint" error
  - Fallback: Using mock data or error handling

- **Techniques** (`?path=techniques`)
  - Status: ⚠️ Returns "Unknown endpoint" error
  - Fallback: Using mock data or error handling

### 🔄 AI Endpoints
- **AI Project Analysis** (`?path=ai-project-analysis`)
  - Status: 🔄 Under development
  - Method: POST with `{description, image_url?}`

- **AI Material Suggestions** (`?path=ai-material-suggestions`)
  - Status: 🔄 Under development
  - Method: GET with query params

- **AI Artisan Matching** (`?path=ai-artisan-matching`)
  - Status: 🔄 Under development
  - Method: POST with project requirements

### ❌ Non-Working Endpoints
- **Compatible Crafts** (`?path=compatible-crafts`)
- **Compatible Materials** (`?path=compatible-materials`)
- **Compatible Techniques** (`?path=compatible-techniques`)
- **Compatible Artisans** (`?path=compatible-artisans`)

---

## Development Dependencies

### Core Dependencies
```json
{
  "@tanstack/react-query": "^5.56.2",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.26.2",
  "typescript": "latest"
}
```

### UI Dependencies
```json
{
  "@radix-ui/react-*": "various versions",
  "tailwindcss": "latest",
  "lucide-react": "^0.462.0",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "tailwind-merge": "^2.5.2"
}
```

### Form & Validation
```json
{
  "react-hook-form": "^7.53.0",
  "@hookform/resolvers": "^3.9.0",
  "zod": "^3.23.8"
}
```

### Utilities
```json
{
  "date-fns": "^3.6.0",
  "sonner": "^1.5.0",
  "recharts": "^2.12.7"
}
```

---

## Known Issues & Limitations

### API Issues
1. **Endpoint Availability**: Most core endpoints return "Unknown endpoint" errors
2. **Inconsistent Response Format**: Some endpoints may have different response structures
3. **Rate Limiting**: Potential rate limits on API calls (not documented)
4. **CORS Issues**: Possible cross-origin restrictions

### Service Architecture Issues
1. **Fallback Reliability**: Some fallback mechanisms may not cover all edge cases
2. **Error Handling**: Inconsistent error handling across different services
3. **Data Validation**: Limited validation of API response data
4. **Caching Strategy**: No sophisticated caching mechanism implemented

### UI/UX Issues
1. **Loading States**: Some components may show loading indefinitely on API failures
2. **Error Messages**: Generic error messages that may not be user-friendly
3. **Responsive Design**: Some debug components may not be fully responsive

### Development Issues
1. **Type Safety**: Some API responses may not match TypeScript interfaces
2. **Testing Coverage**: Limited automated testing for API integrations
3. **Documentation**: Some utility functions lack comprehensive documentation

### Performance Considerations
1. **Bundle Size**: Large number of dependencies may impact load time
2. **API Calls**: Multiple sequential API calls may slow down user experience
3. **Memory Usage**: Large data sets may impact browser performance

---

## Debugging Recommendations

### For External Debugging Tools

1. **API Testing**:
   - Use Postman/Insomnia to test endpoints directly
   - Base URL: `https://directcreate-api.onrender.com/api-proxy.php`
   - Test with query parameters like `?path=health`

2. **Network Analysis**:
   - Monitor network requests in browser DevTools
   - Check for CORS errors or failed requests
   - Analyze response times and payload sizes

3. **State Management**:
   - Use React DevTools to inspect component state
   - Monitor TanStack Query cache and network states
   - Check for memory leaks in long-running sessions

4. **Performance Profiling**:
   - Use React Profiler to identify slow components
   - Monitor bundle size with webpack-bundle-analyzer
   - Check for unnecessary re-renders

### Logging & Monitoring
- Console logs are extensively used throughout the codebase
- API requests and responses are logged with emoji prefixes
- Error states include detailed error messages and stack traces

---

## Future Development Plans

1. **API Stabilization**: Work with API provider to resolve endpoint issues
2. **Enhanced Error Handling**: Implement robust error boundaries and user feedback
3. **Performance Optimization**: Implement proper caching and data virtualization
4. **Testing Suite**: Add comprehensive unit and integration tests
5. **Documentation**: Complete inline code documentation and user guides

---

*Last Updated: December 2024*
*Project Status: Active Development*
