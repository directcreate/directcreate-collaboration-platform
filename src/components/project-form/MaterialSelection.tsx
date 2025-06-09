
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
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
      
      if (response.success && Array.isArray(response.data)) {
        console.log('📋 Compatible material IDs from API:', response.data.map(m => m.id));
        console.log('📋 Available materials:', materials.map(m => ({ id: m.id, name: m.name })));
        
        // Filter materials based on the compatible IDs returned by API
        const compatibleIds = response.data.map(material => material.id);
        const filteredMaterialsList = materials.filter(material => 
          compatibleIds.includes(material.id)
        );
        
        console.log('✨ Filtered materials:', filteredMaterialsList.map(m => ({ id: m.id, name: m.name })));
        
        setFilteredMaterials(filteredMaterialsList);
        if (filteredMaterialsList.length === 0) {
          setMaterialFilterMessage("No compatible materials found for this craft");
        } else {
          setMaterialFilterMessage(`Showing ${filteredMaterialsList.length} compatible material${filteredMaterialsList.length !== 1 ? 's' : ''} for this craft`);
        }
        console.log('✅ Compatible materials loaded:', filteredMaterialsList.length);
      } else {
        console.error('Compatible materials API error:', response.message);
        setFilteredMaterials(materials);
        setMaterialFilterMessage("Unable to filter materials - showing all options");
      }
    } catch (error) {
      console.error('❌ Error loading compatible materials:', error);
      setFilteredMaterials(materials);
      setMaterialFilterMessage("Error filtering materials - showing all options");
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
      <label className="text-sm font-medium text-foreground">
        Material
        {loadingCompatibleMaterials && (
          <Loader2 className="w-3 h-3 animate-spin inline ml-2" />
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
      {materialFilterMessage && (
        <div className="text-xs text-primary p-2 bg-primary/5 border border-primary/20 rounded-lg">
          {materialFilterMessage}
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
