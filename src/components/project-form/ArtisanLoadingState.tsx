
import { Loader2 } from "lucide-react";

const ArtisanLoadingState = () => {
  return (
    <div className="text-center py-8">
      <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
      <p className="text-muted-foreground">Finding specialized artisans...</p>
    </div>
  );
};

export default ArtisanLoadingState;
