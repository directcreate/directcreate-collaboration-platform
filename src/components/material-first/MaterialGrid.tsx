
import { ScrollArea } from "@/components/ui/scroll-area";
import MaterialCard from "./MaterialCard";

interface Material {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: string;
  sustainability_rating: number;
}

interface MaterialGridProps {
  materials: Material[];
  selectedMaterialId: string;
  onMaterialSelect: (id: string) => void;
  showAllMaterials: boolean;
}

const MaterialGrid = ({ 
  materials, 
  selectedMaterialId, 
  onMaterialSelect, 
  showAllMaterials 
}: MaterialGridProps) => {
  if (materials.length === 0) return null;

  const GridContent = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
      {materials.map((material) => (
        <MaterialCard
          key={material.id}
          material={material}
          isSelected={selectedMaterialId === material.id}
          onSelect={onMaterialSelect}
        />
      ))}
    </div>
  );

  if (showAllMaterials) {
    return (
      <ScrollArea className="h-[400px] sm:h-[500px] lg:h-[600px] mb-6 sm:mb-8">
        <div className="pb-6">
          <GridContent />
        </div>
      </ScrollArea>
    );
  }

  return (
    <div className="mb-6 sm:mb-8 lg:mb-12">
      <GridContent />
    </div>
  );
};

export default MaterialGrid;
