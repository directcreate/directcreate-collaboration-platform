
// This component is now completely hidden from users
// All debug information is removed for production

interface TechniqueDebugPanelProps {
  selectedMaterial: string;
  selectedCraft: string;
  suggestedTechniques: any[];
  loadingCompatibleTechniques: boolean;
  techniqueFilterMessage: string;
}

const TechniqueDebugPanel = ({
  selectedMaterial,
  selectedCraft,
  suggestedTechniques,
  loadingCompatibleTechniques,
  techniqueFilterMessage
}: TechniqueDebugPanelProps) => {
  // Always return null - no debug info for users
  return null;
};

export default TechniqueDebugPanel;
