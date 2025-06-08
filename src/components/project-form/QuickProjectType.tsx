
import { useState } from "react";
import { Sparkles, Loader2, Home, Shirt, Armchair, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { aiService } from "../../services/aiService";

interface QuickProjectTypeProps {
  onSuggestionsApplied: (suggestions: any) => void;
}

const QuickProjectType = ({ onSuggestionsApplied }: QuickProjectTypeProps) => {
  const [selectedType, setSelectedType] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(null);

  const projectTypes = [
    { id: "home-decor", label: "Home Decor", icon: Home },
    { id: "fashion", label: "Fashion", icon: Shirt },
    { id: "furniture", label: "Furniture", icon: Armchair },
    { id: "art", label: "Art", icon: Palette }
  ];

  const styles = [
    { id: "traditional", label: "Traditional" },
    { id: "modern", label: "Modern" },
    { id: "contemporary", label: "Contemporary" }
  ];

  const handleGetSuggestions = async () => {
    if (!selectedType || !selectedStyle) return;

    try {
      setLoading(true);
      console.log('🔮 Getting AI suggestions for:', selectedType, selectedStyle);
      
      const result = await aiService.suggestMaterials(selectedType, selectedStyle);
      
      if (result) {
        setSuggestions(result.data);
        console.log('✅ AI suggestions received:', result.data);
      } else {
        console.error('❌ AI suggestions failed');
      }
    } catch (error) {
      console.error('❌ Error getting AI suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  const applySuggestions = () => {
    if (suggestions) {
      onSuggestionsApplied(suggestions);
    }
  };

  return (
    <div className="bg-card rounded-2xl p-6 border border-border/20">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-semibold">Quick AI Suggestions</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-foreground font-medium mb-3">Project Type</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {projectTypes.map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                variant={selectedType === id ? "default" : "outline"}
                onClick={() => setSelectedType(id)}
                className="h-auto p-4 flex flex-col gap-2"
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{label}</span>
              </Button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-foreground font-medium mb-3">Style Preference</label>
          <div className="grid grid-cols-3 gap-3">
            {styles.map(({ id, label }) => (
              <Button
                key={id}
                variant={selectedStyle === id ? "default" : "outline"}
                onClick={() => setSelectedStyle(id)}
                className="h-12"
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        <Button
          onClick={handleGetSuggestions}
          disabled={!selectedType || !selectedStyle || loading}
          className="w-full h-12 rounded-xl"
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
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
            <h3 className="font-semibold text-primary mb-3">AI Recommendations</h3>
            <div className="space-y-3">
              {suggestions.recommended_materials?.map((material, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">{material.name}</p>
                    <p className="text-xs text-muted-foreground">{material.reasoning}</p>
                  </div>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    {material.confidence}%
                  </span>
                </div>
              ))}
              {suggestions.cultural_context && (
                <div className="pt-2 border-t border-border/50">
                  <p className="text-sm font-medium mb-1">Cultural Context:</p>
                  <p className="text-xs text-muted-foreground">{suggestions.cultural_context}</p>
                </div>
              )}
            </div>
            <Button
              onClick={applySuggestions}
              variant="outline"
              size="sm"
              className="mt-3 w-full"
            >
              Apply AI Suggestions
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickProjectType;
