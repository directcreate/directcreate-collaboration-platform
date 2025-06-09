
import { useState, useEffect } from "react";
import MaterialSelection from "./MaterialSelection";
import CraftSelectionDropdown from "./CraftSelectionDropdown";
import TechniqueSelection from "./TechniqueSelection";
import TechniqueSuggestions from "./TechniqueSuggestions";
import TechniqueDebugPanel from "./TechniqueDebugPanel";
import ContextDisplay from "./ContextDisplay";
import { useTechniqueLoading } from "../../hooks/useTechniqueLoading";

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
  const [filteredMaterials, setFilteredMaterials] = useState(materials);
  const [filteredCrafts, setFilteredCrafts] = useState(crafts);
  const [loadingCompatibleCrafts, setLoadingCompatibleCrafts] = useState(false);
  const [loadingCompatibleMaterials, setLoadingCompatibleMaterials] = useState(false);
  const [materialFilterMessage, setMaterialFilterMessage] = useState("");
  const [craftFilterMessage, setCraftFilterMessage] = useState("");

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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MaterialSelection
          materials={materials}
          selectedMaterial={selectedMaterial}
          selectedCraft={selectedCraft}
          onMaterialChange={onMaterialChange}
          onCraftChange={onCraftChange}
          loadingCompatibleMaterials={loadingCompatibleMaterials}
          setLoadingCompatibleMaterials={setLoadingCompatibleMaterials}
          setFilteredMaterials={setFilteredMaterials}
          setMaterialFilterMessage={setMaterialFilterMessage}
          materialFilterMessage={materialFilterMessage}
          filteredMaterials={filteredMaterials}
          onTechniqueSuggestionsUpdate={loadCompatibleTechniques}
        />

        <CraftSelectionDropdown
          crafts={crafts}
          selectedMaterial={selectedMaterial}
          selectedCraft={selectedCraft}
          onCraftChange={onCraftChange}
          onMaterialChange={onMaterialChange}
          loadingCompatibleCrafts={loadingCompatibleCrafts}
          setLoadingCompatibleCrafts={setLoadingCompatibleCrafts}
          setFilteredCrafts={setFilteredCrafts}
          setCraftFilterMessage={setCraftFilterMessage}
          craftFilterMessage={craftFilterMessage}
          filteredCrafts={filteredCrafts}
          onTechniqueSuggestionsUpdate={loadCompatibleTechniques}
        />

        <TechniqueSelection
          techniques={techniques}
          selectedTechnique={selectedTechnique}
          onTechniqueChange={onTechniqueChange}
        />
      </div>

      <div className="mt-8">
        <TechniqueDebugPanel
          selectedMaterial={selectedMaterial}
          selectedCraft={selectedCraft}
          suggestedTechniques={suggestedTechniques}
          loadingCompatibleTechniques={loadingCompatibleTechniques}
          techniqueFilterMessage={techniqueFilterMessage}
        />
        
        <TechniqueSuggestions
          selectedMaterial={selectedMaterial}
          selectedCraft={selectedCraft}
          suggestedTechniques={suggestedTechniques}
          loadingCompatibleTechniques={loadingCompatibleTechniques}
          techniqueFilterMessage={techniqueFilterMessage}
          onTechniqueChange={onTechniqueChange}
        />
      </div>

      <ContextDisplay contextData={contextData} />
    </div>
  );
};

export default CraftSelection;
