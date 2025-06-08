
import { useState } from "react";
import { Sparkles, Loader2, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { aiService } from "../../services/aiService";

interface AIAnalysisProps {
  onSuggestionsApplied: (suggestions: any) => void;
}

const AIAnalysis = ({ onSuggestionsApplied }: AIAnalysisProps) => {
  const [description, setDescription] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [suggestions, setSuggestions] = useState(null);

  const handleAnalyze = async () => {
    if (!description.trim()) return;

    try {
      setAnalyzing(true);
      console.log('🧠 Analyzing project with AI:', description);
      
      const result = await aiService.analyzeProject(description);
      
      if (result) {
        setSuggestions(result.data);
        console.log('✅ AI analysis complete:', result.data);
      } else {
        console.error('❌ AI analysis failed');
      }
    } catch (error) {
      console.error('❌ Error during AI analysis:', error);
    } finally {
      setAnalyzing(false);
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
        <Brain className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-semibold">AI Project Analysis</h2>
        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
          <Sparkles className="w-3 h-3 inline mr-1" />
          AI Enhanced
        </span>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-foreground font-medium mb-2">
            Describe your project vision
          </label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., Traditional textile wall hanging with intricate patterns for living room..."
            className="min-h-[100px] rounded-xl"
          />
        </div>

        <Button
          onClick={handleAnalyze}
          disabled={!description.trim() || analyzing}
          className="w-full h-12 rounded-xl"
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
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
            <h3 className="font-semibold text-primary mb-3">AI Recommendations</h3>
            <div className="space-y-3">
              {suggestions.materials && (
                <div>
                  <p className="text-sm font-medium mb-1">Recommended Materials:</p>
                  <p className="text-sm text-muted-foreground">{suggestions.materials}</p>
                </div>
              )}
              {suggestions.crafts && (
                <div>
                  <p className="text-sm font-medium mb-1">Suggested Crafts:</p>
                  <p className="text-sm text-muted-foreground">{suggestions.crafts}</p>
                </div>
              )}
              {suggestions.reasoning && (
                <div>
                  <p className="text-sm font-medium mb-1">AI Reasoning:</p>
                  <p className="text-sm text-muted-foreground">{suggestions.reasoning}</p>
                </div>
              )}
              {suggestions.confidence && (
                <div>
                  <p className="text-sm font-medium mb-1">Confidence: {suggestions.confidence}%</p>
                </div>
              )}
            </div>
            <Button
              onClick={applySuggestions}
              variant="outline"
              size="sm"
              className="mt-3"
            >
              Apply Suggestions
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAnalysis;
