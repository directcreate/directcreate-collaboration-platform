
import { useState } from "react";
import { Brain, Loader2, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { directCreateAPI } from "../../config/api";

interface AIAnalysisProps {
  onSuggestionsApplied: (suggestions: any) => void;
}

const AIAnalysis = ({ onSuggestionsApplied }: AIAnalysisProps) => {
  const [projectDescription, setProjectDescription] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [suggestions, setSuggestions] = useState(null);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!projectDescription.trim()) {
      setError("Please enter a project description");
      return;
    }

    try {
      setAnalyzing(true);
      setError("");
      console.log('🤖 Analyzing project with AI:', projectDescription);
      
      const response = await directCreateAPI.analyzeProject(projectDescription);
      
      if (response && response.success) {
        setSuggestions(response.data);
        console.log('✅ AI analysis completed:', response.data);
      } else {
        setError("AI analysis failed. Please try again.");
        console.error('❌ AI analysis error:', response?.message);
      }
    } catch (error) {
      console.error('❌ Error during AI analysis:', error);
      setError("Connection error. Please check your network and try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleApplySuggestions = () => {
    if (suggestions) {
      onSuggestionsApplied(suggestions);
      console.log('🎯 Applied AI suggestions to form');
    }
  };

  return (
    <div className="bg-card rounded-2xl p-6 border border-border/20">
      <div className="flex items-center gap-3 mb-6">
        <Brain className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-semibold">AI Project Analysis</h2>
        <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-medium">
          AI Enhanced
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Describe your project vision
          </label>
          <Textarea
            placeholder="e.g., Traditional textile wall hanging with intricate patterns for living room..."
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            className="min-h-[100px] resize-none"
          />
        </div>

        {error && (
          <div className="text-sm text-destructive p-3 bg-destructive/5 border border-destructive/20 rounded-lg">
            {error}
          </div>
        )}

        <Button
          onClick={handleAnalyze}
          disabled={analyzing || !projectDescription.trim()}
          className="w-full"
        >
          {analyzing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analyzing with AI...
            </>
          ) : (
            <>
              <Brain className="w-4 h-4 mr-2" />
              Analyze with AI
            </>
          )}
        </Button>

        {suggestions && (
          <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-4 h-4 text-primary" />
              <span className="font-medium text-primary">AI Suggestions</span>
            </div>
            
            <div className="space-y-3 text-sm">
              {suggestions.recommended_materials && (
                <div>
                  <span className="font-medium">Recommended Materials:</span>
                  <p className="text-muted-foreground mt-1">
                    {suggestions.recommended_materials.slice(0, 2).map(m => m.name).join(", ")}
                  </p>
                </div>
              )}
              
              {suggestions.recommended_crafts && (
                <div>
                  <span className="font-medium">Suggested Crafts:</span>
                  <p className="text-muted-foreground mt-1">
                    {suggestions.recommended_crafts.slice(0, 2).map(c => c.name).join(", ")}
                  </p>
                </div>
              )}
              
              {suggestions.cultural_context && (
                <div>
                  <span className="font-medium">Cultural Context:</span>
                  <p className="text-muted-foreground mt-1">{suggestions.cultural_context}</p>
                </div>
              )}
            </div>

            <Button
              onClick={handleApplySuggestions}
              size="sm"
              className="mt-3"
            >
              Apply AI Suggestions
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAnalysis;
