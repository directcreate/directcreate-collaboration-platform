
interface ContextDisplayProps {
  contextData: any;
}

const ContextDisplay = ({ contextData }: ContextDisplayProps) => {
  if (!contextData.selectedMaterial && !contextData.selectedCraft && !contextData.selectedTechnique) {
    return null;
  }

  return (
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
  );
};

export default ContextDisplay;
