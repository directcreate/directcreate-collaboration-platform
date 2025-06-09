
import { Button } from "@/components/ui/button";
import { ExternalLink, Zap } from "lucide-react";
import { buildApiUrl, API_CONFIG } from "../../config/apiConfig";

interface DiagnosticControlsProps {
  testing: boolean;
  onRunDiagnostics: () => void;
}

const DiagnosticControls = ({ testing, onRunDiagnostics }: DiagnosticControlsProps) => {
  const openDirectAPI = () => {
    window.open(buildApiUrl(API_CONFIG.ENDPOINTS.materials), '_blank');
  };

  return (
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
        onClick={onRunDiagnostics}
        disabled={testing}
        size="sm"
        className="gap-2"
      >
        <Zap className="w-4 h-4" />
        {testing ? 'Running...' : 'Run Full Diagnostics'}
      </Button>
    </div>
  );
};

export default DiagnosticControls;
