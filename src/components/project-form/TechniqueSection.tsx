
import TechniqueDebugPanel from "./TechniqueDebugPanel";
import TechniqueSuggestions from "./TechniqueSuggestions";

interface TechniqueSectionProps {
  selectedMaterial: string;
  selectedCraft: string;
  suggestedTechniques: any[];
  loadingCompatibleTechniques: boolean;
  techniqueFilterMessage: string;
  onTechniqueChange: (techniqueId: string) => void;
}

const TechniqueSection = ({
  selectedMaterial,
  selectedCraft,
  suggestedTechniques,
  loadingCompatibleTechniques,
  techniqueFilterMessage,
  onTechniqueChange
}: TechniqueSectionProps) => {
  return (
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
  );
};

export default TechniqueSection;
