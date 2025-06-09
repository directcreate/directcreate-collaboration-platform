
import { Badge } from "@/components/ui/badge";

interface DiagnosticResultProps {
  result: {
    test: string;
    status: 'success' | 'error' | 'info';
    message: string;
    details?: any;
  };
  index: number;
}

const DiagnosticResult = ({ result, index }: DiagnosticResultProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return '✅';
      case 'error': return '❌';
      default: return 'ℹ️';
    }
  };

  return (
    <div className="border rounded-lg p-4 space-y-2">
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
  );
};

export default DiagnosticResult;
