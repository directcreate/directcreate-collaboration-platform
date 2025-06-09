
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, Info, ExternalLink, Zap } from "lucide-react";
import { API_CONFIG, buildApiUrl } from "../../config/apiConfig";

interface DiagnosticResult {
  test: string;
  status: 'success' | 'error' | 'info';
  message: string;
  details?: any;
}

const APIDiagnostics = () => {
  const [results, setResults] = useState<DiagnosticResult[]>([]);
  const [testing, setTesting] = useState(false);

  const addResult = (result: DiagnosticResult) => {
    setResults(prev => [...prev, result]);
  };

  const runDiagnostics = async () => {
    setTesting(true);
    setResults([]);
    
    // Test 1: Environment Check - HTTPS to HTTPS
    addResult({
      test: 'Environment Check',
      status: 'info',
      message: `HTTPS → HTTPS: ${window.location.origin} → ${API_CONFIG.BASE_URL}`,
      details: {
        origin: window.location.origin,
        target: API_CONFIG.BASE_URL,
        protocol: 'HTTPS to HTTPS - Secure ✅'
      }
    });

    // Test 2: Basic Materials Test
    await testEndpoint(
      'Materials API',
      buildApiUrl(API_CONFIG.ENDPOINTS.materials),
      'Basic materials fetch'
    );

    // Test 3: Crafts Test
    await testEndpoint(
      'Crafts API',
      buildApiUrl(API_CONFIG.ENDPOINTS.crafts),
      'Basic crafts fetch'
    );

    // Test 4: Techniques Test
    await testEndpoint(
      'Techniques API',
      buildApiUrl(API_CONFIG.ENDPOINTS.techniques),
      'Basic techniques fetch'
    );

    // Test 5: Compatible Crafts with sample material (GOTS Organic Cotton)
    await testEndpoint(
      'Compatible Crafts',
      `${buildApiUrl(API_CONFIG.ENDPOINTS.crafts)}&material_id=90`,
      'Compatible crafts for GOTS Organic Cotton (ID: 90)'
    );

    // Test 6: Compatible Materials with sample craft (Ajrakh Printing)
    await testEndpoint(
      'Compatible Materials',
      `${buildApiUrl(API_CONFIG.ENDPOINTS.materials)}&craft_id=167`,
      'Compatible materials for Ajrakh Printing (ID: 167)'
    );

    // Test 7: Compatible Techniques with sample parameters
    await testEndpoint(
      'Compatible Techniques',
      `${buildApiUrl(API_CONFIG.ENDPOINTS.techniques)}&material_id=90&craft_id=167`,
      'Compatible techniques for cotton + Ajrakh'
    );

    // Test 8: AI Material Suggestions
    await testEndpoint(
      'AI Material Suggestions',
      `${buildApiUrl(API_CONFIG.ENDPOINTS.aiMaterialSuggestions)}&project_type=textile&style=traditional`,
      'AI material suggestions for textile project'
    );

    // Test 9: AI Project Analysis
    await testEndpoint(
      'AI Project Analysis',
      `${buildApiUrl(API_CONFIG.ENDPOINTS.aiProjectAnalysis)}&description=traditional wall hanging&style=handwoven`,
      'AI project analysis for wall hanging'
    );

    // Test 10: Find Artisans
    await testEndpoint(
      'Find Artisans',
      `${buildApiUrl(API_CONFIG.ENDPOINTS.findArtisans)}&material_id=90&craft_id=167`,
      'Find artisans for cotton + Ajrakh'
    );

    setTesting(false);
  };

  const testEndpoint = async (testName: string, url: string, description: string) => {
    try {
      console.log(`🧪 Testing ${testName}: ${url}`);
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
        
        addResult({
          test: testName,
          status: 'success',
          message: `✅ ${description} - ${dataCount} items`,
          details: {
            status: response.status,
            statusText: response.statusText,
            dataCount: dataCount,
            success: data.success,
            sampleData: Array.isArray(data.data) ? data.data.slice(0, 3) : data.data
          }
        });
      } else {
        addResult({
          test: testName,
          status: 'error',
          message: `❌ HTTP ${response.status} ${response.statusText}`,
          details: {
            status: response.status,
            statusText: response.statusText,
            url: url
          }
        });
      }
    } catch (error) {
      console.error(`🚨 ${testName} failed:`, error);
      addResult({
        test: testName,
        status: 'error',
        message: `❌ ${error.name}: ${error.message}`,
        details: {
          name: error.name,
          message: error.message,
          url: url
        }
      });
    }
  };

  const openDirectAPI = () => {
    window.open(buildApiUrl(API_CONFIG.ENDPOINTS.materials), '_blank');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return '✅';
      case 'error': return '❌';
      default: return 'ℹ️';
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            <CardTitle>DirectCreate API Diagnostics</CardTitle>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={openDirectAPI}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Test Direct Access
            </Button>
            <Button
              onClick={runDiagnostics}
              disabled={testing}
              size="sm"
              className="gap-2"
            >
              <Zap className="w-4 h-4" />
              {testing ? 'Running...' : 'Run Full Diagnostics'}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {results.length === 0 && !testing ? (
          <div className="text-center py-8 text-muted-foreground">
            <AlertTriangle className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">DirectCreate API Complete Diagnostics</p>
            <p>Test all endpoints including AI features and intelligent filtering</p>
            <div className="mt-4 text-sm">
              <p className="font-medium">Will test:</p>
              <p>• Materials, Crafts, Techniques</p>
              <p>• Compatible filtering endpoints</p>
              <p>• AI analysis and suggestions</p>
              <p>• Artisan matching</p>
            </div>
          </div>
        ) : (
          <ScrollArea className="h-96">
            <div className="space-y-3">
              {results.map((result, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getStatusIcon(result.status)}</span>
                      <span className="font-medium">{result.test}</span>
                    </div>
                    <Badge variant={result.status === 'error' ? 'destructive' : result.status === 'success' ? 'default' : 'secondary'}>
                      {result.status}
                    </Badge>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    {result.message}
                  </div>
                  
                  {result.details && (
                    <details className="text-xs">
                      <summary className="cursor-pointer text-blue-600 hover:text-blue-800">
                        View Details
                      </summary>
                      <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-auto">
                        {JSON.stringify(result.details, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              ))}
              
              {testing && (
                <div className="border rounded-lg p-4 flex items-center gap-2 text-muted-foreground">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <span>Running comprehensive API diagnostics...</span>
                </div>
              )}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default APIDiagnostics;
