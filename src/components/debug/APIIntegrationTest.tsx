
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle, XCircle, Clock, RefreshCw, Database, Activity } from "lucide-react";
import { API_CONFIG, checkApiHealth } from "../../config/apiConfig";
import { directCreateAPI } from "../../config/api";

interface TestResult {
  endpoint: string;
  status: 'success' | 'error' | 'testing';
  itemCount?: number;
  response?: any;
  error?: string;
  timing?: number;
}

const APIIntegrationTest = () => {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isTestingAll, setIsTestingAll] = useState(false);
  const [lastTestTime, setLastTestTime] = useState<Date | null>(null);

  const endpoints = [
    { name: 'Health Check', path: '?path=health', testFn: () => checkApiHealth() },
    { name: 'Materials', path: '?path=materials', testFn: () => directCreateAPI.getMaterials() },
    { name: 'Crafts', path: '?path=crafts', testFn: () => directCreateAPI.getCrafts() },
    { name: 'Techniques', path: '?path=techniques', testFn: () => directCreateAPI.getTechniques() },
    { name: 'Compatible Artisans', path: '?path=compatible-artisans&material_id=90&craft_id=167', testFn: () => directCreateAPI.getCompatibleArtisans(90, 167) }
  ];

  const testEndpoint = async (endpoint: { name: string; path: string; testFn: () => Promise<any> }) => {
    const startTime = performance.now();
    
    // Update status to testing
    setTestResults(prev => [
      ...prev.filter(r => r.endpoint !== endpoint.name),
      { endpoint: endpoint.name, status: 'testing' }
    ]);

    try {
      console.log(`🧪 Testing ${endpoint.name}...`);
      const response = await endpoint.testFn();
      const timing = Math.round(performance.now() - startTime);
      
      console.log(`✅ ${endpoint.name} Response:`, response);
      
      const result: TestResult = {
        endpoint: endpoint.name,
        status: response.success ? 'success' : 'error',
        response,
        timing,
        itemCount: Array.isArray(response.data) ? response.data.length : undefined,
        error: response.success ? undefined : response.message
      };

      setTestResults(prev => [
        ...prev.filter(r => r.endpoint !== endpoint.name),
        result
      ]);

      return result;
    } catch (error) {
      const timing = Math.round(performance.now() - startTime);
      console.error(`❌ ${endpoint.name} Error:`, error);
      
      const result: TestResult = {
        endpoint: endpoint.name,
        status: 'error',
        error: error.message || 'Unknown error',
        timing
      };

      setTestResults(prev => [
        ...prev.filter(r => r.endpoint !== endpoint.name),
        result
      ]);

      return result;
    }
  };

  const runAllTests = async () => {
    setIsTestingAll(true);
    setTestResults([]);
    console.log('🚀 Starting comprehensive API integration tests...');
    
    for (const endpoint of endpoints) {
      await testEndpoint(endpoint);
      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    setIsTestingAll(false);
    setLastTestTime(new Date());
    console.log('🏁 API integration testing completed');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'testing': return <Clock className="w-4 h-4 text-yellow-500 animate-pulse" />;
      default: return <Activity className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (result: TestResult | undefined) => {
    // Handle null/undefined result
    if (!result || !result.status) {
      return (
        <Badge variant="outline" className="gap-1 border-gray-200 text-gray-500 bg-gray-50">
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          Not tested
        </Badge>
      );
    }

    switch (result.status) {
      case 'success':
        return (
          <Badge variant="outline" className="gap-1 border-green-200 text-green-700 bg-green-50">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Success
          </Badge>
        );
      case 'error':
        return (
          <Badge variant="outline" className="gap-1 border-red-200 text-red-700 bg-red-50">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            Failed
          </Badge>
        );
      case 'testing':
        return (
          <Badge variant="outline" className="gap-1 border-yellow-200 text-yellow-700 bg-yellow-50">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
            Testing...
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="gap-1 border-gray-200 text-gray-500 bg-gray-50">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            Unknown
          </Badge>
        );
    }
  };

  const successCount = testResults.filter(r => r && r.status === 'success').length;
  const errorCount = testResults.filter(r => r && r.status === 'error').length;
  const totalDataItems = testResults.reduce((sum, r) => sum + (r?.itemCount || 0), 0);

  // Auto-run tests on component mount
  useEffect(() => {
    runAllTests();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Database className="w-6 h-6 text-primary" />
              <div>
                <CardTitle>DirectCreate API Integration Test</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Testing: {API_CONFIG.BASE_URL}
                </p>
              </div>
            </div>
            <Button
              onClick={runAllTests}
              disabled={isTestingAll}
              className="gap-2"
            >
              {isTestingAll ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              {isTestingAll ? 'Testing...' : 'Run Tests'}
            </Button>
          </div>

          {/* Summary Stats */}
          {testResults.length > 0 && (
            <div className="flex items-center gap-4 pt-4 border-t">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium">{successCount} Passed</span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-500" />
                <span className="text-sm font-medium">{errorCount} Failed</span>
              </div>
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium">{totalDataItems} Items Loaded</span>
              </div>
              {lastTestTime && (
                <span className="text-xs text-muted-foreground ml-auto">
                  Last tested: {lastTestTime.toLocaleTimeString()}
                </span>
              )}
            </div>
          )}
        </CardHeader>

        <CardContent>
          <ScrollArea className="h-96">
            <div className="space-y-4">
              {endpoints.map((endpoint, index) => {
                const result = testResults.find(r => r?.endpoint === endpoint.name);
                
                return (
                  <div key={endpoint.name} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(result?.status || '')}
                        <div>
                          <h4 className="font-medium">{endpoint.name}</h4>
                          <p className="text-xs text-muted-foreground">{endpoint.path}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {result?.timing && (
                          <span className="text-xs text-muted-foreground">{result.timing}ms</span>
                        )}
                        {getStatusBadge(result)}
                      </div>
                    </div>

                    {result && (
                      <div className="text-sm space-y-2">
                        {result.status === 'success' && (
                          <div className="bg-green-50 border border-green-200 rounded p-3 space-y-1">
                            <div className="text-green-800 font-medium">
                              ✅ Success - {result.itemCount !== undefined ? `${result.itemCount} items loaded` : 'Connected'}
                            </div>
                            {result.response?.message && (
                              <div className="text-green-700 text-xs">
                                {result.response.message}
                              </div>
                            )}
                            {result.response?.data && Array.isArray(result.response.data) && result.response.data.length > 0 && (
                              <details className="text-xs">
                                <summary className="cursor-pointer text-green-600 hover:text-green-800">
                                  Show sample data
                                </summary>
                                <pre className="mt-2 bg-white p-2 border rounded overflow-x-auto">
                                  {JSON.stringify(result.response.data[0], null, 2)}
                                </pre>
                              </details>
                            )}
                          </div>
                        )}

                        {result.status === 'error' && (
                          <div className="bg-red-50 border border-red-200 rounded p-3">
                            <div className="text-red-800 font-medium">
                              ❌ Error: {result.error}
                            </div>
                          </div>
                        )}

                        {result.status === 'testing' && (
                          <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                            <div className="text-yellow-800 font-medium flex items-center gap-2">
                              <RefreshCw className="w-3 h-3 animate-spin" />
                              Testing endpoint...
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Quick Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Integration Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">{successCount}</div>
              <div className="text-sm text-muted-foreground">Endpoints Working</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{totalDataItems}</div>
              <div className="text-sm text-muted-foreground">Total Items Loaded</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-red-600">{errorCount}</div>
              <div className="text-sm text-muted-foreground">Errors Encountered</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default APIIntegrationTest;
