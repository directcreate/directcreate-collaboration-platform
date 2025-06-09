
import { API_CONFIG, buildApiUrl } from "../../config/apiConfig";
import { DiagnosticResult } from "./types";

export class DiagnosticService {
  private addResult: (result: DiagnosticResult) => void;

  constructor(addResult: (result: DiagnosticResult) => void) {
    this.addResult = addResult;
  }

  async runAllTests() {
    // Test 1: Environment Check - HTTPS to HTTPS with NEW TUNNEL
    this.addResult({
      test: 'Environment Check',
      status: 'info',
      message: `🆕 NEW STABLE TUNNEL: ${window.location.origin} → ${API_CONFIG.BASE_URL}`,
      details: {
        origin: window.location.origin,
        target: API_CONFIG.BASE_URL,
        protocol: 'HTTPS to HTTPS - New Stable Tunnel ✅',
        tunnelStatus: 'genres-competent-anger-clusters.trycloudflare.com - STABLE'
      }
    });

    // Test 2: Basic Materials Test
    await this.testEndpoint(
      'Materials API',
      buildApiUrl(API_CONFIG.ENDPOINTS.materials),
      'Basic materials fetch from new tunnel'
    );

    // Test 3: Crafts Test
    await this.testEndpoint(
      'Crafts API',
      buildApiUrl(API_CONFIG.ENDPOINTS.crafts),
      'Basic crafts fetch from new tunnel'
    );

    // Test 4: Techniques Test
    await this.testEndpoint(
      'Techniques API',
      buildApiUrl(API_CONFIG.ENDPOINTS.techniques),
      'Basic techniques fetch from new tunnel'
    );

    // Test 5: Compatible Crafts with sample material (GOTS Organic Cotton)
    await this.testEndpoint(
      'Compatible Crafts',
      `${API_CONFIG.BASE_URL}?path=compatible-crafts&material_id=90`,
      'Compatible crafts for GOTS Organic Cotton (ID: 90)'
    );

    // Test 6: Compatible Materials with sample craft (Ajrakh Printing)
    await this.testEndpoint(
      'Compatible Materials',
      `${API_CONFIG.BASE_URL}?path=compatible-materials&craft_id=167`,
      'Compatible materials for Ajrakh Printing (ID: 167)'
    );

    // Test 7: Compatible Techniques with sample parameters
    await this.testEndpoint(
      'Compatible Techniques',
      `${API_CONFIG.BASE_URL}?path=compatible-techniques&material_id=90&craft_id=167`,
      'Compatible techniques for cotton + Ajrakh'
    );

    // Test 8: AI Material Suggestions
    await this.testEndpoint(
      'AI Material Suggestions',
      buildApiUrl(API_CONFIG.ENDPOINTS.aiMaterialSuggestions) + '&project_type=textile&style=traditional',
      'AI material suggestions for textile project'
    );

    // Test 9: AI Project Analysis
    await this.testEndpoint(
      'AI Project Analysis',
      buildApiUrl(API_CONFIG.ENDPOINTS.aiProjectAnalysis) + '&description=traditional wall hanging&style=handwoven',
      'AI project analysis for wall hanging'
    );

    // Test 10: Find Artisans
    await this.testEndpoint(
      'Find Artisans',
      `${API_CONFIG.BASE_URL}?path=compatible-artisans&material_id=90&craft_id=167`,
      'Find artisans for cotton + Ajrakh'
    );
  }

  private async testEndpoint(testName: string, url: string, description: string) {
    try {
      console.log(`🧪 Testing ${testName} with NEW TUNNEL: ${url}`);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        mode: 'cors'
      });
      
      if (response.ok) {
        const data = await response.json();
        const dataCount = Array.isArray(data.data) ? data.data.length : 'N/A';
        
        this.addResult({
          test: testName,
          status: 'success',
          message: `✅ ${description} - ${dataCount} items`,
          details: {
            status: response.status,
            statusText: response.statusText,
            dataCount: dataCount,
            success: data.success,
            tunnelUrl: 'genres-competent-anger-clusters.trycloudflare.com',
            sampleData: Array.isArray(data.data) ? data.data.slice(0, 3) : data.data
          }
        });
      } else {
        this.addResult({
          test: testName,
          status: 'error',
          message: `❌ HTTP ${response.status} ${response.statusText}`,
          details: {
            status: response.status,
            statusText: response.statusText,
            url: url,
            tunnelUrl: 'genres-competent-anger-clusters.trycloudflare.com'
          }
        });
      }
    } catch (error) {
      console.error(`🚨 ${testName} failed with NEW TUNNEL:`, error);
      this.addResult({
        test: testName,
        status: 'error',
        message: `❌ ${error.name}: ${error.message}`,
        details: {
          name: error.name,
          message: error.message,
          url: url,
          tunnelUrl: 'genres-competent-anger-clusters.trycloudflare.com'
        }
      });
    }
  }
}
