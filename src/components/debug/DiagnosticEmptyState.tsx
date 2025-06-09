
import { AlertTriangle } from "lucide-react";

const DiagnosticEmptyState = () => {
  return (
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
  );
};

export default DiagnosticEmptyState;
