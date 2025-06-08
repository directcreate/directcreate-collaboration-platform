
import { Users } from "lucide-react";

const ArtisanEmptyState = () => {
  return (
    <div className="text-center py-8">
      <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
      <p className="text-muted-foreground">No specialized artisans found for this combination.</p>
      <p className="text-sm text-muted-foreground mt-2">Try selecting different materials or crafts.</p>
    </div>
  );
};

export default ArtisanEmptyState;
