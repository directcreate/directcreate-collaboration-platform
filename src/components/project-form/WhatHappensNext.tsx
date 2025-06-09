
interface WhatHappensNextProps {
  contextData: any;
}

const WhatHappensNext = ({ contextData }: WhatHappensNextProps) => {
  // Don't render if no context data
  if (!contextData || (!contextData.selectedCraft && !contextData.selectedMaterial && !contextData.selectedTechnique)) {
    return null;
  }

  const getSelectionName = () => {
    if (contextData.selectedCraft) return contextData.selectedCraft.name;
    if (contextData.selectedMaterial) return contextData.selectedMaterial.name;
    if (contextData.selectedTechnique) return contextData.selectedTechnique.name;
    return "your selection";
  };

  const getSteps = () => {
    const selectionName = getSelectionName();
    
    if (contextData.selectedCraft) {
      return [
        `AI will suggest materials compatible with ${selectionName}`,
        `Specialized ${selectionName} artisans will be matched`,
        `Traditional techniques specific to ${selectionName} will be recommended`
      ];
    }
    
    if (contextData.selectedMaterial) {
      return [
        `AI will suggest crafts that work best with ${selectionName}`,
        `Artisans specialized in ${selectionName} will be matched`,
        `Traditional techniques for working with ${selectionName} will be recommended`
      ];
    }
    
    if (contextData.selectedTechnique) {
      return [
        `AI will suggest materials compatible with ${selectionName}`,
        `Artisans skilled in ${selectionName} will be matched`,
        `Traditional crafts that use ${selectionName} will be recommended`
      ];
    }
    
    return [];
  };

  const steps = getSteps();

  return (
    <div className="bg-muted rounded-lg p-6 mt-8">
      <h3 className="text-lg font-semibold text-foreground mb-4">What Happens Next</h3>
      <div className="space-y-3">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-primary text-sm font-semibold">{index + 1}</span>
            </div>
            <span className="text-muted-foreground">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatHappensNext;
