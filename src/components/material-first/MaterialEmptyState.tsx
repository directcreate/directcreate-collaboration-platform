
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MaterialEmptyStateProps {
  onRetry: () => void;
}

const MaterialEmptyState = ({ onRetry }: MaterialEmptyStateProps) => {
  return (
    <div className="text-center py-8 sm:py-12 px-4">
      <div className="text-4xl sm:text-6xl mb-4">📦</div>
      <h3 className="text-lg sm:text-xl font-medium text-foreground mb-2">No Materials Available</h3>
      <p className="text-sm sm:text-base text-muted-foreground mb-4">Unable to load materials from DirectCreate database</p>
      <Button onClick={onRetry} variant="outline">
        <RefreshCw className="w-4 h-4 mr-2" />
        Try Again
      </Button>
    </div>
  );
};

export default MaterialEmptyState;
