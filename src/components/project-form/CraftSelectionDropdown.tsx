import { useEffect } from "react";
import { Loader2, Filter } from "lucide-react";
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
      console.log('🔍 All available crafts:', crafts.map(c => ({ id: c.id, type: typeof c.id, name: c.name })));
      
      const response = await directCreateAPI.getCompatibleCrafts(parseInt(materialId));
      
      if (response.success && Array.isArray(response.data) && response.data.length > 0) {
        console.log('📋 Compatible craft IDs from API:', response.data);
        
        // CORRECT: response.data is an array of craft IDs as numbers [167, 170, 177, etc.]
        const compatibleCraftIds = response.data;
        console.log('🔍 Compatible craft IDs (actual data):', compatibleCraftIds.map(id => ({ id, type: typeof id })));
        
        // Filter the main crafts list to show only compatible ones
        // Compare craft.id with the returned ID numbers
        const filteredCraftsList = crafts.filter(craft => {
          const craftIdNum = typeof craft.id === 'string' ? parseInt(craft.id) : craft.id;
          const isCompatible = compatibleCraftIds.some(compatibleId => {
            const compatibleIdNum = typeof compatibleId === 'string' ? parseInt(compatibleId) : compatibleId;
            return compatibleIdNum === craftIdNum;
          });
          console.log(`🔍 Checking craft ${craft.name} (ID: ${craftIdNum}): ${isCompatible ? 'COMPATIBLE' : 'not compatible'}`);
          return isCompatible;
        });
        
        console.log('✨ Final filtered crafts:', filteredCraftsList.map(c => ({ id: c.id, name: c.name })));
        
        setFilteredCrafts(filteredCraftsList);
        setCraftFilterMessage(`${filteredCraftsList.length} compatible craft${filteredCraftsList.length !== 1 ? 's' : ''} found for this material`);
        console.log('✅ Compatible crafts loaded:', filteredCraftsList.length);
      } else {
        console.log('⚠️ No compatible crafts found, showing all crafts');
        setFilteredCrafts(crafts);
        setCraftFilterMessage("No specific craft compatibility found - showing all options");
      }
    } catch (error) {
      console.error('❌ Error loading compatible crafts:', error);
      setFilteredCrafts(crafts);
      setCraftFilterMessage("Error loading compatibility - showing all options");
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
      <label className="text-sm font-medium text-foreground flex items-center gap-2">
        Craft
        {loadingCompatibleCrafts && (
          <Loader2 className="w-3 h-3 animate-spin" />
        )}
        {selectedMaterial && !loadingCompatibleCrafts && filteredCrafts.length < crafts.length && (
          <div className="flex items-center gap-1 text-primary">
            <Filter className="w-3 h-3" />
            <span className="text-xs">Filtered</span>
          </div>
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
      
      {/* Enhanced filtering status with visual feedback */}
      {craftFilterMessage && (
        <div className={`text-xs p-2 border rounded-lg ${
          filteredCrafts.length === 0 
            ? 'text-destructive bg-destructive/5 border-destructive/20'
            : selectedMaterial && filteredCrafts.length < crafts.length
              ? 'text-primary bg-primary/5 border-primary/20'
              : 'text-muted-foreground bg-muted/30 border-border'
        }`}>
          <div className="flex items-center gap-1">
            {selectedMaterial && filteredCrafts.length < crafts.length && (
              <Filter className="w-3 h-3" />
            )}
            {craftFilterMessage}
          </div>
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
