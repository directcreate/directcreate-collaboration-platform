
interface SelectionSummaryProps {
  selectedMaterial: any;
  selectedCraft: any;
  selectedTechnique: any;
}

const SelectionSummary = ({ selectedMaterial, selectedCraft, selectedTechnique }: SelectionSummaryProps) => {
  return (
    <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-xl">
      <p className="text-sm font-medium text-primary mb-2">Finding specialists for:</p>
      <div className="flex flex-wrap gap-2">
        {selectedMaterial && (
          <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
            {selectedMaterial.name}
          </span>
        )}
        {selectedCraft && (
          <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
            {selectedCraft.name}
          </span>
        )}
        {selectedTechnique && (
          <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
            {selectedTechnique.name}
          </span>
        )}
      </div>
    </div>
  );
};

export default SelectionSummary;
