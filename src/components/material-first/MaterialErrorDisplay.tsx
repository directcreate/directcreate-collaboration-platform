
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface MaterialErrorDisplayProps {
  error: string;
  onRetry: () => void;
}

const MaterialErrorDisplay = ({ error, onRetry }: MaterialErrorDisplayProps) => {
  if (!error) return null;

  return (
    <Alert className="max-w-md mx-auto mb-4 sm:mb-6 border-destructive/20 bg-destructive/5">
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

export default MaterialErrorDisplay;
