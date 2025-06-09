
import { Button } from "@/components/ui/button";
import CraftSelection from "./CraftSelection";
import ArtisanMatching from "./ArtisanMatching";
import ProjectOverview from "./ProjectOverview";
import TimelineBudget from "./TimelineBudget";
import LocationPreferences from "./LocationPreferences";
import AIAnalysis from "./AIAnalysis";
import QuickProjectType from "./QuickProjectType";
import WhatHappensNext from "./WhatHappensNext";

interface ProjectFormContentProps {
  formData: {
    title: string;
    description: string;
    timeline: string;
    budget: string;
    location: string;
    city: string;
    pinCode: string;
  };
  selectedMaterial: string;
  selectedCraft: string;
  selectedTechnique: string;
  materials: any[];
  crafts: any[];
  techniques: any[];
  contextData: any;
  onInputChange: (field: string, value: string) => void;
  onMaterialChange: (materialId: string) => void;
  onCraftChange: (craftId: string) => void;
  onTechniqueChange: (techniqueId: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const ProjectFormContent = ({
  formData,
  selectedMaterial,
  selectedCraft,
  selectedTechnique,
  materials,
  crafts,
  techniques,
  contextData,
  onInputChange,
  onMaterialChange,
  onCraftChange,
  onTechniqueChange,
  onSubmit
}: ProjectFormContentProps) => {

  const handleAISuggestions = (suggestions: any) => {
    console.log('🤖 Applying AI suggestions:', suggestions);
    
    // Auto-populate selections based on AI suggestions
    if (suggestions.recommended_materials?.length > 0) {
      const suggestedMaterial = materials.find(m => 
        m.name.toLowerCase().includes(suggestions.recommended_materials[0].name.toLowerCase())
      );
      if (suggestedMaterial) {
        onMaterialChange(suggestedMaterial.id.toString());
      }
    }
    
    if (suggestions.recommended_crafts?.length > 0) {
      const suggestedCraft = crafts.find(c => 
        c.name.toLowerCase().includes(suggestions.recommended_crafts[0].name.toLowerCase())
      );
      if (suggestedCraft) {
        onCraftChange(suggestedCraft.id.toString());
      }
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <form onSubmit={onSubmit} className="space-y-8">
        {/* AI-Enhanced Features */}
        <AIAnalysis onSuggestionsApplied={handleAISuggestions} contextData={contextData} />
        
        <QuickProjectType onSuggestionsApplied={handleAISuggestions} />

        <CraftSelection
          materials={materials}
          crafts={crafts}
          techniques={techniques}
          selectedMaterial={selectedMaterial}
          selectedCraft={selectedCraft}
          selectedTechnique={selectedTechnique}
          onMaterialChange={onMaterialChange}
          onCraftChange={onCraftChange}
          onTechniqueChange={onTechniqueChange}
          contextData={contextData}
        />

        <ArtisanMatching
          selectedMaterial={selectedMaterial}
          selectedCraft={selectedCraft}
          selectedTechnique={selectedTechnique}
          materials={materials}
          crafts={crafts}
          techniques={techniques}
        />

        <ProjectOverview formData={formData} onInputChange={onInputChange} />
        <TimelineBudget formData={formData} onInputChange={onInputChange} />
        <LocationPreferences formData={formData} onInputChange={onInputChange} />

        {/* What Happens Next Section */}
        <WhatHappensNext contextData={contextData} />

        <div className="text-center">
          <Button
            type="submit"
            size="lg"
            className="h-14 px-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-lg"
          >
            Find Compatible Makers
          </Button>
        </div>
      </form>
    </main>
  );
};

export default ProjectFormContent;
