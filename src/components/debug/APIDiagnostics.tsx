
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle } from "lucide-react";
import { DiagnosticResult } from "./types";
import { DiagnosticService } from "./diagnosticService";
import DiagnosticControls from "./DiagnosticControls";
import DiagnosticResultComponent from "./DiagnosticResult";
import DiagnosticEmptyState from "./DiagnosticEmptyState";

const APIDiagnostics = () => {
  const [results, setResults] = useState<DiagnosticResult[]>([]);
  const [testing, setTesting] = useState(false);

  const addResult = (result: DiagnosticResult) => {
    setResults(prev => [...prev, result]);
  };

  const runDiagnostics = async () => {
    setTesting(true);
    setResults([]);
    
    const diagnosticService = new DiagnosticService(addResult);
    await diagnosticService.runAllTests();
    
    setTesting(false);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            <CardTitle>DirectCreate API Diagnostics</CardTitle>
          </div>
          <DiagnosticControls testing={testing} onRunDiagnostics={runDiagnostics} />
        </div>
      </CardHeader>
      
      <CardContent>
        {results.length === 0 && !testing ? (
          <DiagnosticEmptyState />
        ) : (
          <ScrollArea className="h-96">
            <div className="space-y-3">
              {results.map((result, index) => (
                <DiagnosticResultComponent
                  key={index}
                  result={result}
                  index={index}
                />
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
