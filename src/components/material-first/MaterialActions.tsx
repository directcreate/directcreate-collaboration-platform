
import { Package, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Material {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: string;
  sustainability_rating: number;
}

interface MaterialActionsProps {
  selectedMaterialId: string;
  allMaterials: Material[];
  showAllMaterials: boolean;
  totalMaterialsCount: number;
  onShowAll: () => void;
  onContinue: () => void;
}

const MaterialActions = ({
  selectedMaterialId,
  allMaterials,
  showAllMaterials,
  totalMaterialsCount,
  onShowAll,
  onContinue
}: MaterialActionsProps) => {
  const selectedMaterial = allMaterials.find(m => m.id === selectedMaterialId);

  return (
    <div className="text-center space-y-3 sm:space-y-4 px-4">
      {!showAllMaterials && totalMaterialsCount > 12 && (
        <Button
          onClick={onShowAll}
          variant="outline"
          size="lg"
          className="h-11 sm:h-12 lg:h-14 px-6 sm:px-8 lg:px-12 rounded-xl sm:rounded-2xl border-2 border-muted-foreground/20 text-muted-foreground hover:bg-accent hover:text-accent-foreground font-medium text-sm sm:text-base lg:text-lg mb-3 sm:mb-4 w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2 stroke-[1.5]" />
          <span className="sm:hidden">Show All {totalMaterialsCount}</span>
          <span className="hidden sm:inline">Show All {totalMaterialsCount} DirectCreate Materials</span>
        </Button>
      )}
      
      <Button
        onClick={onContinue}
        disabled={!selectedMaterialId}
        size="lg"
        className="h-11 sm:h-12 lg:h-14 px-6 sm:px-8 lg:px-12 rounded-xl sm:rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm sm:text-base lg:text-lg disabled:opacity-30 w-full sm:w-auto"
      >
        <Package className="w-4 h-4 sm:w-5 sm:h-5 mr-2 stroke-[1.5]" />
        <span className="sm:hidden">Continue</span>
        <span className="hidden sm:inline">
          Continue with {selectedMaterial?.name || 'Selected Material'}
        </span>
      </Button>
    </div>
  );
};

export default MaterialActions;
