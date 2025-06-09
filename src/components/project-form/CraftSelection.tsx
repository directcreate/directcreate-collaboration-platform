
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
    console.log('🔄 loadCompatibleTechniques called with:', { materialId, craftId });
    
    if (!materialId || !craftId) {
      console.log('⚠️ Missing material or craft ID, clearing technique suggestions');
      setSuggestedTechniques([]);
      setTechniqueFilterMessage("");
      return;
    }

    try {
      setLoadingCompatibleTechniques(true);
      setTechniqueFilterMessage("");
      console.log('🔄 Loading compatible techniques for material:', materialId, 'craft:', craftId);
      console.log('🔗 API call: compatible-techniques with material_id=' + materialId + '&craft_id=' + craftId);
      
      const response = await directCreateAPI.getCompatibleTechniques(
        parseInt(materialId),
        parseInt(craftId)
      );
      
      console.log('📋 Technique API response:', response);
      
      if (response.success && Array.isArray(response.data) && response.data.length > 0) {
        console.log('✅ Technique API returned data:', response.data);
        
        // Check if response.data contains full technique objects or just IDs
        const firstItem = response.data[0];
        console.log('🔍 First technique item:', firstItem, 'Type:', typeof firstItem);
        
        if (typeof firstItem === 'object' && firstItem.id) {
          // API returns full technique objects
          console.log('📋 API returned full technique objects');
          setSuggestedTechniques(response.data);
          setTechniqueFilterMessage(`${response.data.length} suggested technique${response.data.length !== 1 ? 's' : ''} found`);
        } else if (typeof firstItem === 'number') {
          // API returns technique IDs, need to get full objects
          console.log('📋 API returned technique IDs, filtering full techniques');
          const compatibleTechniqueIds = response.data;
          const filteredTechniquesList = techniques.filter(technique => {
            const techniqueIdNum = typeof technique.id === 'string' ? parseInt(technique.id) : technique.id;
            const isCompatible = compatibleTechniqueIds.some(compatibleId => {
              const compatibleIdNum = typeof compatibleId === 'string' ? parseInt(compatibleId) : compatibleId;
              return compatibleIdNum === techniqueIdNum;
            });
            return isCompatible;
          });
          
          console.log('✨ Filtered techniques:', filteredTechniquesList.map(t => ({ id: t.id, name: t.name })));
          setSuggestedTechniques(filteredTechniquesList);
          setTechniqueFilterMessage(`${filteredTechniquesList.length} suggested technique${filteredTechniquesList.length !== 1 ? 's' : ''} found`);
        }
        
        console.log('✅ Compatible techniques loaded:', response.data.length);
      } else {
        console.log('⚠️ No compatible techniques found or API failed');
        console.log('API success:', response.success, 'Data:', response.data);
        setSuggestedTechniques([]);
        setTechniqueFilterMessage("No technique suggestions available for this combination");
      }
    } catch (error) {
      console.error('❌ Error loading compatible techniques:', error);
      setSuggestedTechniques([]);
      setTechniqueFilterMessage("Error loading technique suggestions");
    } finally {
      setLoadingCompatibleTechniques(false);
    }
  };

  // Load technique suggestions when both material and craft are selected
  useEffect(() => {
    console.log('🔄 Effect triggered - selectedMaterial:', selectedMaterial, 'selectedCraft:', selectedCraft);
    
    if (selectedMaterial && selectedCraft) {
      console.log('✅ Both material and craft selected, loading techniques...');
      loadCompatibleTechniques(selectedMaterial, selectedCraft);
    } else {
      console.log('⚠️ Missing selection - Material:', !!selectedMaterial, 'Craft:', !!selectedCraft);
      setSuggestedTechniques([]);
      setTechniqueFilterMessage("");
    }
  }, [selectedMaterial, selectedCraft, techniques]);

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
