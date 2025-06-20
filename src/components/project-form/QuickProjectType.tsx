
import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { directCreateAPI } from "../../config/api";

interface QuickProjectTypeProps {
  onSuggestionsApplied: (suggestions: any) => void;
  contextData?: any;
}

const QuickProjectType = ({ onSuggestionsApplied, contextData }: QuickProjectTypeProps) => {
  const [selectedType, setSelectedType] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(null);
  const [error, setError] = useState("");

  const getRelevantProjectTypes = () => {
    if (contextData?.selectedCraft) {
      const craftName = contextData.selectedCraft.name;
      
      // Textile crafts work best with certain project types
      if (craftName.includes('Ajrakh') || 
          craftName.includes('Bandhani') || 
          craftName.includes('Bagru') || 
          craftName.includes('Applique') ||
          craftName.includes('Embroidery')) {
        return [
          { id: 'home-decor', name: 'Home Decor', icon: '🏠', recommended: true },
          { id: 'fashion', name: 'Fashion', icon: '👗', recommended: true },
          { id: 'furniture', name: 'Furniture', icon: '🪑', recommended: false },
          { id: 'art', name: 'Art', icon: '🎨', recommended: false }
        ];
      }
      // Metal/Jewelry crafts
      else if (craftName.includes('Metal') || 
               craftName.includes('Jewellery') ||
               craftName.includes('Mirror')) {
        return [
          { id: 'home-decor', name: 'Home Decor', icon: '🏠', recommended: true },
          { id: 'fashion', name: 'Fashion', icon: '👗', recommended: false },
          { id: 'furniture', name: 'Furniture', icon: '🪑', recommended: false },
          { id: 'art', name: 'Art', icon: '🎨', recommended: true }
        ];
      }
    }
    
    // Default - all options equal
    return [
      { id: 'home-decor', name: 'Home Decor', icon: '🏠', recommended: false },
      { id: 'fashion', name: 'Fashion', icon: '👗', recommended: false },
      { id: 'furniture', name: 'Furniture', icon: '🪑', recommended: false },
      { id: 'art', name: 'Art', icon: '🎨', recommended: false }
    ];
  };

  const styleTypes = [
    { id: "traditional", name: "Traditional" },
    { id: "modern", name: "Modern" },
    { id: "contemporary", name: "Contemporary" },
    { id: "minimalist", name: "Minimalist" }
  ];

  const handleGetSuggestions = async () => {
    if (!selectedType || !selectedStyle) {
      setError("Please select both project type and style");
      return;
    }

    try {
      setLoading(true);
      setError("");
      console.log('🤖 Getting AI material suggestions for:', selectedType, selectedStyle);
      
      const response = await directCreateAPI.suggestMaterials(selectedType, selectedStyle);
      
      if (response && response.success) {
        setSuggestions(response.data);
        console.log('✅ AI suggestions received:', response.data);
      } else {
        setError("Failed to get AI suggestions. Please try again.");
        console.error('❌ AI suggestions error:', response?.message);
      }
    } catch (error) {
      console.error('❌ Error getting AI suggestions:', error);
      setError("Connection error. Please check your network and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleApplySuggestions = () => {
    if (suggestions) {
      onSuggestionsApplied(suggestions);
      console.log('🎯 Applied quick AI suggestions to form');
    }
  };

  const projectTypes = getRelevantProjectTypes();
  const recommendedTypes = projectTypes.filter(t => t.recommended);

  return (
    <div className="bg-card rounded-2xl p-6 border border-border/20">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-semibold">Quick Project Type</h2>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-3">Project Type</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {projectTypes.map((type) => (
              <Button
                key={type.id}
                variant={selectedType === type.id ? "default" : "outline"}
                onClick={() => setSelectedType(type.id)}
                className={`h-auto p-4 flex flex-col items-center gap-2 relative ${
                  type.recommended ? 'ring-2 ring-green-200' : ''
                }`}
              >
                {type.recommended && (
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    Recommended
                  </div>
                )}
                <span className="text-2xl">{type.icon}</span>
                <span className="text-sm">{type.name}</span>
              </Button>
            ))}
          </div>
          
          {contextData?.selectedCraft && recommendedTypes.length > 0 && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                💡 <strong>AI Recommendation:</strong> {contextData.selectedCraft.name} works exceptionally well for{' '}
                {recommendedTypes.map(t => t.name).join(' and ')} projects based on traditional craft knowledge.
              </p>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-3">Style Preference</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {styleTypes.map((style) => (
              <Button
                key={style.id}
                variant={selectedStyle === style.id ? "default" : "outline"}
                onClick={() => setSelectedStyle(style.id)}
                className="h-12"
              >
                {style.name}
              </Button>
            ))}
          </div>
        </div>

        {error && (
          <div className="text-sm text-destructive p-3 bg-destructive/5 border border-destructive/20 rounded-lg">
            {error}
          </div>
        )}

        <Button
          onClick={handleGetSuggestions}
          disabled={loading || !selectedType || !selectedStyle}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Getting AI Suggestions...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Get AI Suggestions
            </>
          )}
        </Button>

        {suggestions && (
          <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium text-primary">AI Recommendations</span>
              <Button
                onClick={handleApplySuggestions}
                size="sm"
              >
                Apply Suggestions
              </Button>
            </div>
            
            <div className="space-y-2 text-sm">
              {suggestions.recommended_materials && (
                <div>
                  <span className="font-medium">Materials:</span>
                  <p className="text-muted-foreground">
                    {suggestions.recommended_materials.slice(0, 3).map(m => m.name).join(", ")}
                  </p>
                </div>
              )}
              
              {suggestions.reasoning && (
                <div>
                  <span className="font-medium">Why:</span>
                  <p className="text-muted-foreground">{suggestions.reasoning}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickProjectType;
