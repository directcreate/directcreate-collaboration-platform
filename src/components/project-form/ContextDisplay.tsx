
interface ContextDisplayProps {
  contextData: any;
}

const ContextDisplay = ({ contextData }: ContextDisplayProps) => {
  // Don't render if no context data
  if (!contextData || (!contextData.selectedCraft && !contextData.selectedMaterial && !contextData.selectedTechnique)) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 mb-8">
      {contextData.selectedCraft && (
        <div className="bg-muted border border-border rounded-lg p-4 mb-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Your Selected Craft</h3>
          <div className="flex items-center space-x-4">
            <img 
              src={contextData.selectedCraft.bannerImage || 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400&h=300&fit=crop&auto=format'} 
              alt={contextData.selectedCraft.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h4 className="text-lg font-semibold text-foreground">{contextData.selectedCraft.name}</h4>
              <p className="text-sm text-muted-foreground">Traditional Craft</p>
              <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                {contextData.selectedCraft.difficulty}
              </span>
            </div>
          </div>
        </div>
      )}

      {contextData.selectedMaterial && (
        <div className="bg-muted border border-border rounded-lg p-4 mb-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Your Selected Material</h3>
          <div className="flex items-center space-x-4">
            <img 
              src={contextData.selectedMaterial.image || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop&auto=format'} 
              alt={contextData.selectedMaterial.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h4 className="text-lg font-semibold text-foreground">{contextData.selectedMaterial.name}</h4>
              <p className="text-sm text-muted-foreground">Material</p>
              <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                {contextData.selectedMaterial.category}
              </span>
            </div>
          </div>
        </div>
      )}

      {contextData.selectedTechnique && (
        <div className="bg-muted border border-border rounded-lg p-4 mb-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Your Selected Technique</h3>
          <div className="flex items-center space-x-4">
            <img 
              src={contextData.selectedTechnique.image || 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&h=300&fit=crop&auto=format'} 
              alt={contextData.selectedTechnique.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h4 className="text-lg font-semibold text-foreground">{contextData.selectedTechnique.name}</h4>
              <p className="text-sm text-muted-foreground">Technique</p>
              <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                {contextData.selectedTechnique.difficulty}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContextDisplay;
