
import { useState, useEffect } from "react";
import { directCreateAPI } from "../../config/api";
import MaterialSelection from "./MaterialSelection";
import CraftSelectionDropdown from "./CraftSelectionDropdown";
import TechniqueSelection from "./TechniqueSelection";
import TechniqueSuggestions from "./TechniqueSuggestions";
import ContextDisplay from "./ContextDisplay";

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
  const [suggestedTechniques, setSuggestedTechniques] = useState([]);
  const [loadingCompatibleCrafts, setLoadingCompatibleCrafts] = useState(false);
  const [loadingCompatibleMaterials, setLoadingCompatibleMaterials] = useState(false);
  const [loadingCompatibleTechniques, setLoadingCompatibleTechniques] = useState(false);
  const [materialFilterMessage, setMaterialFilterMessage] = useState("");
  const [craftFilterMessage, setCraftFilterMessage] = useState("");
  const [techniqueFilterMessage, setTechniqueFilterMessage] = useState("");

  const loadCompatibleTechniques = async (materialId?: string, craftId?: string) => {
    if (!materialId && !craftId) {
      setSuggestedTechniques([]);
      setTechniqueFilterMessage("");
      return;
    }

    try {
      setLoadingCompatibleTechniques(true);
      setTechniqueFilterMessage("");
      console.log('🔄 Loading compatible techniques for material:', materialId, 'craft:', craftId);
      
      const response = await directCreateAPI.getCompatibleTechniques(
        materialId ? parseInt(materialId) : undefined,
        craftId ? parseInt(craftId) : undefined
      );
      
      if (response.success && Array.isArray(response.data)) {
        setSuggestedTechniques(response.data);
        if (response.data.length === 0) {
          setTechniqueFilterMessage("No technique suggestions available for this combination");
        } else {
          setTechniqueFilterMessage(`${response.data.length} suggested technique${response.data.length !== 1 ? 's' : ''} found`);
        }
        console.log('✅ Compatible techniques loaded:', response.data.length);
      } else {
        console.error('Compatible techniques API error:', response.message);
        setSuggestedTechniques([]);
        setTechniqueFilterMessage("Unable to load technique suggestions");
      }
    } catch (error) {
      console.error('❌ Error loading compatible techniques:', error);
      setSuggestedTechniques([]);
      setTechniqueFilterMessage("Error loading technique suggestions");
    } finally {
      setLoadingCompatibleTechniques(false);
    }
  };

  // Load technique suggestions if both material and craft are selected
  useEffect(() => {
    if (selectedMaterial && selectedCraft) {
      loadCompatibleTechniques(selectedMaterial, selectedCraft);
    }
  }, [selectedMaterial, selectedCraft]);

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

      <TechniqueSuggestions
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
