
import { useEffect } from "react";
import { Loader2, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { directCreateAPI } from "../../config/api";

interface MaterialSelectionProps {
  materials: any[];
  selectedMaterial: string;
  selectedCraft: string;
  onMaterialChange: (materialId: string) => void;
  onCraftChange: (craftId: string) => void;
  loadingCompatibleMaterials: boolean;
  setLoadingCompatibleMaterials: (loading: boolean) => void;
  setFilteredMaterials: (materials: any[]) => void;
  setMaterialFilterMessage: (message: string) => void;
  materialFilterMessage: string;
  filteredMaterials: any[];
  onTechniqueSuggestionsUpdate: (materialId?: string, craftId?: string) => void;
}

const MaterialSelection = ({
  materials,
  selectedMaterial,
  selectedCraft,
  onMaterialChange,
  onCraftChange,
  loadingCompatibleMaterials,
  setLoadingCompatibleMaterials,
  setFilteredMaterials,
  setMaterialFilterMessage,
  materialFilterMessage,
  filteredMaterials,
  onTechniqueSuggestionsUpdate
}: MaterialSelectionProps) => {
  
  const loadCompatibleMaterials = async (craftId: string) => {
    if (!craftId) {
      setFilteredMaterials(materials);
      setMaterialFilterMessage("");
      return;
    }

    try {
      setLoadingCompatibleMaterials(true);
      setMaterialFilterMessage("");
      console.log('🔄 Loading compatible materials for craft:', craftId);
      
      const response = await directCreateAPI.getCompatibleMaterials(parseInt(craftId));
      
      if (response.success && Array.isArray(response.data) && response.data.length > 0) {
        console.log('📋 Compatible materials from API:', response.data);
        
        // The API returns full material objects, not just IDs
        const compatibleMaterials = response.data;
        
        // Filter the main materials list to show only compatible ones
        const filteredMaterialsList = materials.filter(material => 
          compatibleMaterials.some(compatible => compatible.id === material.id)
        );
        
        console.log('✨ Filtered compatible materials:', filteredMaterialsList.map(m => ({ id: m.id, name: m.name })));
        
        setFilteredMaterials(filteredMaterialsList);
        setMaterialFilterMessage(`${filteredMaterialsList.length} compatible material${filteredMaterialsList.length !== 1 ? 's' : ''} found for this craft`);
        console.log('✅ Compatible materials loaded:', filteredMaterialsList.length);
      } else {
        console.log('⚠️ No compatible materials found, showing all materials');
        setFilteredMaterials(materials);
        setMaterialFilterMessage("No specific material compatibility found - showing all options");
      }
    } catch (error) {
      console.error('❌ Error loading compatible materials:', error);
      setFilteredMaterials(materials);
      setMaterialFilterMessage("Error loading compatibility - showing all options");
    } finally {
      setLoadingCompatibleMaterials(false);
    }
  };

  const handleMaterialChange = (materialId: string) => {
    onMaterialChange(materialId);
    
    // Load technique suggestions if craft is still selected
    if (selectedCraft) {
      onTechniqueSuggestionsUpdate(materialId, selectedCraft);
    } else {
      onTechniqueSuggestionsUpdate();
    }
  };

  // Initialize filtered data when base data is loaded
  useEffect(() => {
    if (materials.length > 0 && filteredMaterials.length === 0) {
      console.log('🔄 Initializing filtered materials with all materials');
      setFilteredMaterials(materials);
    }
  }, [materials]);

  // Load compatible data when craft is selected
  useEffect(() => {
    if (selectedCraft && materials.length > 0) {
      console.log('🎯 Craft selected, loading compatible materials for ID:', selectedCraft);
      loadCompatibleMaterials(selectedCraft);
    } else if (!selectedCraft && materials.length > 0) {
      console.log('🔄 No craft selected, showing all materials');
      setFilteredMaterials(materials);
      setMaterialFilterMessage("");
    }
  }, [selectedCraft, materials]);

  const getSelectedMaterial = () => filteredMaterials.find(m => m.id.toString() === selectedMaterial);

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground flex items-center gap-2">
        Material
        {loadingCompatibleMaterials && (
          <Loader2 className="w-3 h-3 animate-spin" />
        )}
        {selectedCraft && !loadingCompatibleMaterials && filteredMaterials.length < materials.length && (
          <div className="flex items-center gap-1 text-primary">
            <Filter className="w-3 h-3" />
            <span className="text-xs">Filtered</span>
          </div>
        )}
      </label>
      <Select 
        value={selectedMaterial} 
        onValueChange={handleMaterialChange}
        disabled={loadingCompatibleMaterials}
      >
        <SelectTrigger className="h-12 rounded-xl">
          <SelectValue placeholder={
            loadingCompatibleMaterials 
              ? "Loading compatible materials..." 
              : selectedCraft 
                ? "Choose compatible material" 
                : "Choose DirectCreate material"
          } />
        </SelectTrigger>
        <SelectContent>
          {filteredMaterials.map((material) => (
            <SelectItem key={material.id} value={material.id.toString()}>
              <div className="flex flex-col">
                <span className="font-medium">{material.name}</span>
                <span className="text-xs text-muted-foreground">{material.category}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {/* Enhanced filtering status with visual feedback */}
      {materialFilterMessage && (
        <div className={`text-xs p-2 border rounded-lg ${
          filteredMaterials.length === 0 
            ? 'text-destructive bg-destructive/5 border-destructive/20'
            : selectedCraft && filteredMaterials.length < materials.length
              ? 'text-primary bg-primary/5 border-primary/20'
              : 'text-muted-foreground bg-muted/30 border-border'
        }`}>
          <div className="flex items-center gap-1">
            {selectedCraft && filteredMaterials.length < materials.length && (
              <Filter className="w-3 h-3" />
            )}
            {materialFilterMessage}
          </div>
        </div>
      )}
      
      {getSelectedMaterial() && (
        <div className="text-xs text-muted-foreground p-3 bg-muted/30 rounded-lg">
          <p className="font-medium mb-1">{getSelectedMaterial().category}</p>
          <p>{getSelectedMaterial().description}</p>
          <p className="mt-1">Sustainability: {getSelectedMaterial().sustainability_rating}/10</p>
        </div>
      )}
    </div>
  );
};

export default MaterialSelection;
