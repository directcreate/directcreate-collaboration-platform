
import { Package, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { useState } from "react";

interface Material {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: string;
  sustainability_rating: number;
}

interface MaterialStickyActionsProps {
  selectedMaterialId: string;
  allMaterials: Material[];
  showAllMaterials: boolean;
  totalMaterialsCount: number;
  onShowAll: () => void;
  onContinue: () => void;
}

const MaterialStickyActions = ({
  selectedMaterialId,
  allMaterials,
  showAllMaterials,
  totalMaterialsCount,
  onShowAll,
  onContinue
}: MaterialStickyActionsProps) => {
  const isMobile = useIsMobile();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const selectedMaterial = allMaterials.find(m => m.id === selectedMaterialId);

  if (isMobile) {
    // Mobile: Sticky footer
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 z-50">
        <div className="flex flex-col gap-3">
          {!showAllMaterials && totalMaterialsCount > 12 && (
            <Button
              onClick={onShowAll}
              variant="outline"
              size="lg"
              className="h-12 rounded-xl border-2 border-muted-foreground/20 text-muted-foreground hover:bg-accent hover:text-accent-foreground font-medium w-full"
            >
              <Plus className="w-4 h-4 mr-2 stroke-[1.5]" />
              Show All {totalMaterialsCount}
            </Button>
          )}
          
          <Button
            onClick={onContinue}
            disabled={!selectedMaterialId}
            size="lg"
            className="h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold disabled:opacity-30 w-full"
          >
            <Package className="w-4 h-4 mr-2 stroke-[1.5]" />
            Continue
          </Button>
        </div>
      </div>
    );
  }

  // Desktop: Left drawer
  return (
    <>
      <Button
        onClick={() => setIsDrawerOpen(true)}
        variant="outline"
        size="lg"
        className="fixed left-4 top-1/2 -translate-y-1/2 z-50 h-12 px-4 rounded-xl bg-background border-2 shadow-lg"
      >
        <Package className="w-5 h-5 mr-2" />
        Actions
      </Button>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="h-[400px] left-0 right-auto w-96">
          <DrawerHeader>
            <DrawerTitle>Material Actions</DrawerTitle>
            <DrawerDescription>
              Manage your material selection and continue with your project.
            </DrawerDescription>
          </DrawerHeader>
          
          <div className="p-6 space-y-4">
            {selectedMaterial && (
              <div className="p-4 rounded-lg bg-accent/50 border">
                <h4 className="font-medium text-sm text-muted-foreground mb-1">Selected Material</h4>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{selectedMaterial.icon}</span>
                  <div>
                    <p className="font-medium">{selectedMaterial.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedMaterial.category}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {!showAllMaterials && totalMaterialsCount > 12 && (
                <Button
                  onClick={onShowAll}
                  variant="outline"
                  size="lg"
                  className="h-12 rounded-xl border-2 border-muted-foreground/20 text-muted-foreground hover:bg-accent hover:text-accent-foreground font-medium w-full"
                >
                  <Plus className="w-5 h-5 mr-2 stroke-[1.5]" />
                  Show All {totalMaterialsCount} Materials
                </Button>
              )}
              
              <Button
                onClick={() => {
                  onContinue();
                  setIsDrawerOpen(false);
                }}
                disabled={!selectedMaterialId}
                size="lg"
                className="h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold disabled:opacity-30 w-full"
              >
                <Package className="w-5 h-5 mr-2 stroke-[1.5]" />
                Continue with {selectedMaterial?.name || 'Selected Material'}
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MaterialStickyActions;
