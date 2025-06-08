
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ErrorDisplayProps {
  error: string;
  onRetry: () => void;
}

const ErrorDisplay = ({ error, onRetry }: ErrorDisplayProps) => {
  if (!error) return null;

  return (
    <Alert className="mb-8 border-destructive/20 bg-destructive/5">
      <AlertCircle className="h-4 w-4 text-destructive" />
      <AlertDescription className="text-sm text-destructive">
        {error}
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          className="ml-2 h-6 px-2 text-xs"
        >
          <RefreshCw className="w-3 h-3 mr-1" />
          Retry
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ErrorDisplay;
