
import MaterialSelection from "./MaterialSelection";
import CraftSelectionDropdown from "./CraftSelectionDropdown";
import TechniqueSelection from "./TechniqueSelection";

interface MaterialCraftGridProps {
  materials: any[];
  crafts: any[];
  techniques: any[];
  selectedMaterial: string;
  selectedCraft: string;
  selectedTechnique: string;
  onMaterialChange: (materialId: string) => void;
  onCraftChange: (craftId: string) => void;
  onTechniqueChange: (techniqueId: string) => void;
  loadingCompatibleCrafts: boolean;
  setLoadingCompatibleCrafts: (loading: boolean) => void;
  loadingCompatibleMaterials: boolean;
  setLoadingCompatibleMaterials: (loading: boolean) => void;
  materialFilterMessage: string;
  setMaterialFilterMessage: (message: string) => void;
  craftFilterMessage: string;
  setCraftFilterMessage: (message: string) => void;
  filteredMaterials: any[];
  setFilteredMaterials: (materials: any[]) => void;
  filteredCrafts: any[];
  setFilteredCrafts: (crafts: any[]) => void;
  onTechniqueSuggestionsUpdate: (materialId?: string, craftId?: string) => void;
}

const MaterialCraftGrid = ({
  materials,
  crafts,
  techniques,
  selectedMaterial,
  selectedCraft,
  selectedTechnique,
  onMaterialChange,
  onCraftChange,
  onTechniqueChange,
  loadingCompatibleCrafts,
  setLoadingCompatibleCrafts,
  loadingCompatibleMaterials,
  setLoadingCompatibleMaterials,
  materialFilterMessage,
  setMaterialFilterMessage,
  craftFilterMessage,
  setCraftFilterMessage,
  filteredMaterials,
  setFilteredMaterials,
  filteredCrafts,
  setFilteredCrafts,
  onTechniqueSuggestionsUpdate
}: MaterialCraftGridProps) => {
  return (
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
        onTechniqueSuggestionsUpdate={onTechniqueSuggestionsUpdate}
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
        onTechniqueSuggestionsUpdate={onTechniqueSuggestionsUpdate}
      />

      <TechniqueSelection
        techniques={techniques}
        selectedTechnique={selectedTechnique}
        onTechniqueChange={onTechniqueChange}
      />
    </div>
  );
};

export default MaterialCraftGrid;
