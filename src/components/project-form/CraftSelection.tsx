
import ContextDisplay from "./ContextDisplay";
import MaterialCraftGrid from "./MaterialCraftGrid";
import TechniqueSection from "./TechniqueSection";
import { useTechniqueLoading } from "../../hooks/useTechniqueLoading";
import { useMaterialCraftFiltering } from "../../hooks/useMaterialCraftFiltering";

interface CraftSelectionProps {
  materials: any[];
  crafts: any[];
  techniques: any[];
  selectedMaterial: string;
  selectedCraft: string;
  selectedTechnique: string;
  onMaterialChange: (materialId: string) => void;
  onCraftChange: (craftId: string) => void;
  onTechniqueChange: (techniqueId: string) => void;
  contextData: any;
}

const CraftSelection = ({
  materials,
  crafts,
  techniques,
  selectedMaterial,
  selectedCraft,
  selectedTechnique,
  onMaterialChange,
  onCraftChange,
  onTechniqueChange,
  contextData
}: CraftSelectionProps) => {
  const materialCraftFiltering = useMaterialCraftFiltering(materials, crafts);

  const {
    suggestedTechniques,
    loadingCompatibleTechniques,
    techniqueFilterMessage,
    loadCompatibleTechniques
  } = useTechniqueLoading(selectedMaterial, selectedCraft, techniques);

  console.log('🔥 [TECHNIQUE DEBUG] ===== RENDER DEBUG =====');
  console.log('🔥 [TECHNIQUE DEBUG] Render - suggestedTechniques:', suggestedTechniques);
  console.log('🔥 [TECHNIQUE DEBUG] Render - suggestedTechniques length:', suggestedTechniques?.length || 0);
  console.log('🔥 [TECHNIQUE DEBUG] Render - loadingCompatibleTechniques:', loadingCompatibleTechniques);
  console.log('🔥 [TECHNIQUE DEBUG] Render - techniqueFilterMessage:', techniqueFilterMessage);
  console.log('🔥 [TECHNIQUE DEBUG] Render - selectedMaterial:', selectedMaterial);
  console.log('🔥 [TECHNIQUE DEBUG] Render - selectedCraft:', selectedCraft);
  console.log('🔥 [TECHNIQUE DEBUG] ===== CHECKING COMPONENT RENDER =====');

  return (
    <div className="bg-card rounded-2xl p-6 border border-border/20">
      <h2 className="text-2xl font-semibold mb-6">Craft Specifications</h2>
      
      <MaterialCraftGrid
        materials={materials}
        crafts={crafts}
        techniques={techniques}
        selectedMaterial={selectedMaterial}
        selectedCraft={selectedCraft}
        selectedTechnique={selectedTechnique}
        onMaterialChange={onMaterialChange}
        onCraftChange={onCraftChange}
        onTechniqueChange={onTechniqueChange}
        onTechniqueSuggestionsUpdate={loadCompatibleTechniques}
        {...materialCraftFiltering}
      />

      <TechniqueSection
        selectedMaterial={selectedMaterial}
        selectedCraft={selectedCraft}
        suggestedTechniques={suggestedTechniques}
        loadingCompatibleTechniques={loadingCompatibleTechniques}
        techniqueFilterMessage={techniqueFilterMessage}
        onTechniqueChange={onTechniqueChange}
      />

      <ContextDisplay contextData={contextData} />
    </div>
  );
};

export default CraftSelection;
