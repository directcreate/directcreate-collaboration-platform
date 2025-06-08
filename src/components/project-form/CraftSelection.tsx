
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { directCreateAPI } from "../../config/api";

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
  const [filteredCrafts, setFilteredCrafts] = useState(crafts);
  const [loadingCompatibleCrafts, setLoadingCompatibleCrafts] = useState(false);
  const [craftFilterMessage, setCraftFilterMessage] = useState("");

  const loadCompatibleCrafts = async (materialId: string) => {
    if (!materialId) {
      setFilteredCrafts(crafts);
      setCraftFilterMessage("");
      return;
    }

    try {
      setLoadingCompatibleCrafts(true);
      setCraftFilterMessage("");
      console.log('🔄 Loading compatible crafts for material:', materialId);
      
      const response = await directCreateAPI.getCompatibleCrafts(parseInt(materialId));
      
      if (response.success && Array.isArray(response.data)) {
        setFilteredCrafts(response.data);
        if (response.data.length === 0) {
          setCraftFilterMessage("No compatible crafts found for this material");
        } else {
          setCraftFilterMessage(`Showing ${response.data.length} compatible craft${response.data.length !== 1 ? 's' : ''}`);
        }
        console.log('✅ Compatible crafts loaded:', response.data.length);
      } else {
        console.error('Compatible crafts API error:', response.message);
        setFilteredCrafts(crafts);
        setCraftFilterMessage("Unable to filter crafts - showing all options");
      }
    } catch (error) {
      console.error('❌ Error loading compatible crafts:', error);
      setFilteredCrafts(crafts);
      setCraftFilterMessage("Error filtering crafts - showing all options");
    } finally {
      setLoadingCompatibleCrafts(false);
    }
  };

  const handleMaterialChange = (materialId: string) => {
    onMaterialChange(materialId);
    onCraftChange(""); // Clear craft selection when material changes
    loadCompatibleCrafts(materialId);
  };

  // Initialize filtered crafts when crafts data is loaded
  useEffect(() => {
    if (crafts.length > 0) {
      setFilteredCrafts(crafts);
    }
  }, [crafts]);

  // Load compatible crafts if material is pre-selected
  useEffect(() => {
    if (selectedMaterial && crafts.length > 0) {
      loadCompatibleCrafts(selectedMaterial);
    }
  }, [selectedMaterial, crafts]);

  const getSelectedMaterial = () => materials.find(m => m.id.toString() === selectedMaterial);
  const getSelectedCraft = () => filteredCrafts.find(c => c.id.toString() === selectedCraft);
  const getSelectedTechnique = () => techniques.find(t => t.id.toString() === selectedTechnique);

  return (
    <div className="bg-card rounded-2xl p-6 border border-border/20">
      <h2 className="text-2xl font-semibold mb-6">Craft Specifications</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Material Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Material</label>
          <Select value={selectedMaterial} onValueChange={handleMaterialChange}>
            <SelectTrigger className="h-12 rounded-xl">
              <SelectValue placeholder="Choose DirectCreate material" />
            </SelectTrigger>
            <SelectContent>
              {materials.map((material) => (
                <SelectItem key={material.id} value={material.id.toString()}>
                  <div className="flex flex-col">
                    <span className="font-medium">{material.name}</span>
                    <span className="text-xs text-muted-foreground">{material.category}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {getSelectedMaterial() && (
            <div className="text-xs text-muted-foreground p-3 bg-muted/30 rounded-lg">
              <p className="font-medium mb-1">{getSelectedMaterial().category}</p>
              <p>{getSelectedMaterial().description}</p>
              <p className="mt-1">Sustainability: {getSelectedMaterial().sustainability_rating}/10</p>
            </div>
          )}
        </div>

        {/* Craft Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">
            Craft
            {loadingCompatibleCrafts && (
              <Loader2 className="w-3 h-3 animate-spin inline ml-2" />
            )}
          </label>
          <Select 
            value={selectedCraft} 
            onValueChange={onCraftChange}
            disabled={loadingCompatibleCrafts}
          >
            <SelectTrigger className="h-12 rounded-xl">
              <SelectValue placeholder={
                loadingCompatibleCrafts 
                  ? "Loading compatible crafts..." 
                  : selectedMaterial 
                    ? "Choose compatible craft" 
                    : "Choose DirectCreate craft"
              } />
            </SelectTrigger>
            <SelectContent>
              {filteredCrafts.map((craft) => (
                <SelectItem key={craft.id} value={craft.id.toString()}>
                  <div className="flex flex-col">
                    <span className="font-medium">{craft.name}</span>
                    <span className="text-xs text-muted-foreground">{craft.difficulty}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {craftFilterMessage && (
            <div className="text-xs text-primary p-2 bg-primary/5 border border-primary/20 rounded-lg">
              {craftFilterMessage}
            </div>
          )}
          {getSelectedCraft() && (
            <div className="text-xs text-muted-foreground p-3 bg-muted/30 rounded-lg">
              <p className="font-medium mb-1">Difficulty: {getSelectedCraft().difficulty}</p>
              <p>{getSelectedCraft().description}</p>
              <p className="mt-1">Timeline: {getSelectedCraft().time_estimate}</p>
            </div>
          )}
        </div>

        {/* Technique Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Technique</label>
          <Select value={selectedTechnique} onValueChange={onTechniqueChange}>
            <SelectTrigger className="h-12 rounded-xl">
              <SelectValue placeholder="Choose DirectCreate technique" />
            </SelectTrigger>
            <SelectContent>
              {techniques.map((technique) => (
                <SelectItem key={technique.id} value={technique.id.toString()}>
                  <div className="flex flex-col">
                    <span className="font-medium">{technique.name}</span>
                    <span className="text-xs text-muted-foreground">{technique.category}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {getSelectedTechnique() && (
            <div className="text-xs text-muted-foreground p-3 bg-muted/30 rounded-lg">
              <p className="font-medium mb-1">{getSelectedTechnique().category}</p>
              <p>{getSelectedTechnique().description}</p>
              <p className="mt-1">Difficulty: {getSelectedTechnique().difficulty}</p>
              <p>Time: {getSelectedTechnique().time_required}</p>
            </div>
          )}
        </div>
      </div>

      {/* Show pre-selected context */}
      {(contextData.selectedMaterial || contextData.selectedCraft || contextData.selectedTechnique) && (
        <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-xl">
          <p className="text-sm font-medium text-primary mb-2">From your previous selection:</p>
          <div className="flex flex-wrap gap-2">
            {contextData.selectedMaterial && (
              <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                Material: {contextData.selectedMaterial.name}
              </span>
            )}
            {contextData.selectedCraft && (
              <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                Craft: {contextData.selectedCraft.name}
              </span>
            )}
            {contextData.selectedTechnique && (
              <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                Technique: {contextData.selectedTechnique.name}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CraftSelection;
