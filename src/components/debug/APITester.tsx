
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RefreshCw, CheckCircle, XCircle, Clock, Network } from "lucide-react";
import { directCreateAPI } from "../../config/api";

interface TestResult {
  endpoint: string;
  status: 'success' | 'error' | 'pending';
  response?: any;
  error?: string;
  timing?: number;
  url?: string;
}

const APITester = () => {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [testing, setTesting] = useState(false);
  const [lastTest, setLastTest] = useState<Date | null>(null);

  const endpoints = [
    { name: 'Materials', fn: () => directCreateAPI.getMaterials() },
    { name: 'Crafts', fn: () => directCreateAPI.getCrafts() },
    { name: 'Techniques', fn: () => directCreateAPI.getTechniques() },
    { name: 'Compatible Crafts', fn: () => directCreateAPI.getCompatibleCrafts(1) },
    { name: 'Compatible Materials', fn: () => directCreateAPI.getCompatibleMaterials(1) },
    { name: 'Compatible Techniques', fn: () => directCreateAPI.getCompatibleTechniques(1, 1) },
    { name: 'Compatible Artisans', fn: () => directCreateAPI.getCompatibleArtisans(1, 1, 1) },
    { name: 'AI Project Analysis', fn: () => directCreateAPI.analyzeProject("Test project description") },
    { name: 'AI Material Suggestions', fn: () => directCreateAPI.suggestMaterials("textile", "traditional") }
  ];

  const testEndpoint = async (endpoint: { name: string; fn: () => Promise<any> }) => {
    const startTime = performance.now();
    
    try {
      console.log(`🧪 Testing ${endpoint.name} endpoint...`);
      const response = await endpoint.fn();
      const timing = performance.now() - startTime;
      
      console.log(`✅ ${endpoint.name} test completed:`, response);
      
      return {
        endpoint: endpoint.name,
        status: 'success' as const,
        response,
        timing: Math.round(timing),
        url: response?.url || 'N/A'
      };
    } catch (error) {
      const timing = performance.now() - startTime;
      console.error(`❌ ${endpoint.name} test failed:`, error);
      
      return {
        endpoint: endpoint.name,
        status: 'error' as const,
        error: error.message,
        timing: Math.round(timing)
      };
    }
  };

  const runAllTests = async () => {
    setTesting(true);
    setTestResults([]);
    console.log('🚀 Starting comprehensive DirectCreate API tests...');
    
    const results: TestResult[] = [];
    
    for (const endpoint of endpoints) {
      const result = await testEndpoint(endpoint);
      results.push(result);
      setTestResults([...results]);
    }
    
    setTesting(false);
    setLastTest(new Date());
    console.log('🏁 API testing completed');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-yellow-500';
    }
  };

  const successCount = testResults.filter(r => r.status === 'success').length;
  const errorCount = testResults.filter(r => r.status === 'error').length;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Network className="w-5 h-5" />
            <CardTitle>DirectCreate API Connection Tester</CardTitle>
          </div>
          <Button
            onClick={runAllTests}
            disabled={testing}
            size="sm"
            className="gap-2"
          >
            {testing ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            {testing ? 'Testing...' : 'Run Tests'}
          </Button>
        </div>
        
        {lastTest && (
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Last tested: {lastTest.toLocaleTimeString()}</span>
            {testResults.length > 0 && (
              <>
                <Badge variant="outline" className="gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  {successCount} Success
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  {errorCount} Failed
                </Badge>
              </>
            )}
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        {testResults.length === 0 && !testing ? (
          <div className="text-center py-8 text-muted-foreground">
            <Network className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">Ready to test DirectCreate API</p>
            <p>Click "Run Tests" to verify all endpoint connections</p>
          </div>
        ) : (
          <ScrollArea className="h-96">
            <div className="space-y-3">
              {endpoints.map((endpoint, index) => {
                const result = testResults[index];
                const isPending = testing && index >= testResults.length;
                
                return (
                  <div
                    key={endpoint.name}
                    className="border rounded-lg p-4 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(result?.status || (isPending ? 'pending' : ''))}
                        <span className="font-medium">{endpoint.name}</span>
                      </div>
                      
                      {result && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          {result.timing && <span>{result.timing}ms</span>}
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(result.status)}`}></div>
                        </div>
                      )}
                    </div>
                    
                    {result && (
                      <div className="text-sm space-y-1">
                        {result.status === 'success' ? (
                          <div className="space-y-1">
                            <div className="text-green-600">
                              ✅ Success - Data loaded: {result.response?.data?.length || 0} items
                            </div>
                            {result.response?.message && (
                              <div className="text-muted-foreground italic">
                                {result.response.message}
                              </div>
                            )}
                          </div>
                        ) : result.status === 'error' ? (
                          <div className="text-red-600">
                            ❌ Error: {result.error}
                          </div>
                        ) : null}
                      </div>
                    )}
                    
                    {isPending && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <RefreshCw className="w-3 h-3 animate-spin" />
                        Testing...
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default APITester;
