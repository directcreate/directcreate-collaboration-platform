
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { directCreateAPI } from "../../config/api";

interface CraftSelectionDropdownProps {
  crafts: any[];
  selectedMaterial: string;
  selectedCraft: string;
  onCraftChange: (craftId: string) => void;
  onMaterialChange: (materialId: string) => void;
  loadingCompatibleCrafts: boolean;
  setLoadingCompatibleCrafts: (loading: boolean) => void;
  setFilteredCrafts: (crafts: any[]) => void;
  setCraftFilterMessage: (message: string) => void;
  craftFilterMessage: string;
  filteredCrafts: any[];
  onTechniqueSuggestionsUpdate: (materialId?: string, craftId?: string) => void;
}

const CraftSelectionDropdown = ({
  crafts,
  selectedMaterial,
  selectedCraft,
  onCraftChange,
  onMaterialChange,
  loadingCompatibleCrafts,
  setLoadingCompatibleCrafts,
  setFilteredCrafts,
  setCraftFilterMessage,
  craftFilterMessage,
  filteredCrafts,
  onTechniqueSuggestionsUpdate
}: CraftSelectionDropdownProps) => {

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
        console.log('📋 Compatible craft IDs from API:', response.data.map(c => c.id));
        console.log('📋 Available crafts:', crafts.map(c => ({ id: c.id, name: c.name })));
        
        // Filter crafts based on the compatible IDs returned by API
        const compatibleIds = response.data.map(craft => craft.id);
        const filteredCraftsList = crafts.filter(craft => 
          compatibleIds.includes(craft.id)
        );
        
        console.log('✨ Filtered crafts:', filteredCraftsList.map(c => ({ id: c.id, name: c.name })));
        
        setFilteredCrafts(filteredCraftsList);
        if (filteredCraftsList.length === 0) {
          setCraftFilterMessage("No compatible crafts found for this material");
        } else {
          setCraftFilterMessage(`Showing ${filteredCraftsList.length} compatible craft${filteredCraftsList.length !== 1 ? 's' : ''} for this material`);
        }
        console.log('✅ Compatible crafts loaded:', filteredCraftsList.length);
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

  const handleCraftChange = (craftId: string) => {
    onCraftChange(craftId);
    
    // Load technique suggestions if material is still selected
    if (selectedMaterial) {
      onTechniqueSuggestionsUpdate(selectedMaterial, craftId);
    } else {
      onTechniqueSuggestionsUpdate();
    }
  };

  // Initialize filtered data when base data is loaded
  useEffect(() => {
    if (crafts.length > 0 && filteredCrafts.length === 0) {
      console.log('🔄 Initializing filtered crafts with all crafts');
      setFilteredCrafts(crafts);
    }
  }, [crafts]);

  // Load compatible data when material is selected
  useEffect(() => {
    if (selectedMaterial && crafts.length > 0) {
      console.log('🎯 Material selected, loading compatible crafts for ID:', selectedMaterial);
      loadCompatibleCrafts(selectedMaterial);
    } else if (!selectedMaterial && crafts.length > 0) {
      console.log('🔄 No material selected, showing all crafts');
      setFilteredCrafts(crafts);
      setCraftFilterMessage("");
    }
  }, [selectedMaterial, crafts]);

  const getSelectedCraft = () => filteredCrafts.find(c => c.id.toString() === selectedCraft);

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">
        Craft
        {loadingCompatibleCrafts && (
          <Loader2 className="w-3 h-3 animate-spin inline ml-2" />
        )}
      </label>
      <Select 
        value={selectedCraft} 
        onValueChange={handleCraftChange}
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
  );
};

export default CraftSelectionDropdown;
