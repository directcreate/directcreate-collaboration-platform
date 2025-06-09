
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, Info, ExternalLink, Zap } from "lucide-react";

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
    
    const apiUrl = 'http://localhost:8081/api-proxy.php?path=materials';
    
    // Test 1: Check current origin and target URL
    addResult({
      test: 'Environment Check',
      status: 'info',
      message: `Origin: ${window.location.origin} → Target: ${apiUrl}`
    });

    // Test 2: Basic fetch test with detailed error capture
    try {
      console.log('🧪 Testing basic fetch to DirectCreate API...');
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        mode: 'cors' // Explicitly request CORS
      });
      
      addResult({
        test: 'Basic Fetch',
        status: 'success',
        message: `HTTP ${response.status} ${response.statusText}`,
        details: {
          ok: response.ok,
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries())
        }
      });

      const data = await response.text();
      addResult({
        test: 'Response Data',
        status: 'info',
        message: `Received ${data.length} characters`,
        details: data.substring(0, 500) + (data.length > 500 ? '...' : '')
      });

    } catch (error) {
      console.error('🚨 Fetch failed:', error);
      addResult({
        test: 'Basic Fetch',
        status: 'error',
        message: `${error.name}: ${error.message}`,
        details: {
          name: error.name,
          message: error.message,
          stack: error.stack
        }
      });
    }

    // Test 3: Try with no-cors mode
    try {
      console.log('🧪 Testing no-cors mode...');
      const response = await fetch(apiUrl, {
        method: 'GET',
        mode: 'no-cors'
      });
      
      addResult({
        test: 'No-CORS Fetch',
        status: response.ok ? 'success' : 'error',
        message: `Mode: no-cors, Type: ${response.type}, Status: ${response.status || 'opaque'}`
      });

    } catch (error) {
      addResult({
        test: 'No-CORS Fetch',
        status: 'error',
        message: `${error.name}: ${error.message}`
      });
    }

    // Test 4: Check if we can reach localhost at all
    try {
      console.log('🧪 Testing localhost reachability...');
      const response = await fetch('http://localhost:8081/', {
        method: 'GET',
        mode: 'no-cors'
      });
      
      addResult({
        test: 'Localhost Reachability',
        status: 'info',
        message: `Can reach localhost:8081 - Type: ${response.type}`
      });

    } catch (error) {
      addResult({
        test: 'Localhost Reachability',
        status: 'error',
        message: `Cannot reach localhost:8081 - ${error.message}`
      });
    }

    // Test 5: Analyze the error type
    const errorAnalysis = analyzeConnectionError();
    addResult({
      test: 'Error Analysis',
      status: 'info',
      message: errorAnalysis.summary,
      details: errorAnalysis.details
    });

    setTesting(false);
  };

  const analyzeConnectionError = () => {
    const isHttps = window.location.protocol === 'https:';
    const isLocalhost = window.location.hostname === 'localhost';
    const isLovableDomain = window.location.hostname.includes('lovableproject.com');

    let summary = '';
    let details = {};

    if (isLovableDomain) {
      summary = 'CORS Issue: Lovable domain trying to access localhost';
      details = {
        issue: 'Cross-origin request blocked',
        from: window.location.origin,
        to: 'http://localhost:8081',
        solution: 'Backend needs CORS headers or use proxy'
      };
    } else if (isHttps) {
      summary = 'Mixed Content: HTTPS trying to access HTTP';
      details = {
        issue: 'HTTPS cannot access HTTP resources',
        from: window.location.protocol,
        to: 'http://localhost:8081',
        solution: 'Use HTTPS for API or HTTP for frontend'
      };
    } else {
      summary = 'Network or Server Issue';
      details = {
        issue: 'API server may be down or unreachable',
        suggestion: 'Check if DirectCreate API is running'
      };
    }

    return { summary, details };
  };

  const openDirectAPI = () => {
    window.open('http://localhost:8081/api-proxy.php?path=materials', '_blank');
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
              {testing ? 'Running...' : 'Run Diagnostics'}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {results.length === 0 && !testing ? (
          <div className="text-center py-8 text-muted-foreground">
            <AlertTriangle className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">Ready to diagnose API connection</p>
            <p>Click "Run Diagnostics" to identify the exact issue</p>
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
                    <Badge variant={result.status === 'error' ? 'destructive' : 'secondary'}>
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
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default APIDiagnostics;
