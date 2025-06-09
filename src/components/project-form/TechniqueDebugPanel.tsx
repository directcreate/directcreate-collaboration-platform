
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
  return (
    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm">
      <p className="font-semibold text-blue-800">🔍 TECHNIQUE SUGGESTIONS DEBUG:</p>
      <p className="text-blue-700">Material: {selectedMaterial || 'None'}</p>
      <p className="text-blue-700">Craft: {selectedCraft || 'None'}</p>
      <p className="text-blue-700">Suggestions Count: {suggestedTechniques?.length || 0}</p>
      <p className="text-blue-700">Loading: {loadingCompatibleTechniques ? 'Yes' : 'No'}</p>
      <p className="text-blue-700">Message: {techniqueFilterMessage || 'No message'}</p>
    </div>
  );
};

export default TechniqueDebugPanel;
