
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const UseCaseAnalysis = () => {
  const navigate = useNavigate();
  const [vision, setVision] = useState("");

  const handleContinue = () => {
    if (vision.trim()) {
      navigate('/collaborate/use-case/processing', { 
        state: { vision } 
      });
    }
  };

  const inspirationTags = ['Birthday Gift', 'Wedding', 'Garden', 'Traditional', 'Modern', 'Functional'];
  const examples = [
    '"A meaningful gift celebrating heritage"',
    '"Functional art for daily joy"',
    '"Something that tells our story"'
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border/50 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="hover:bg-accent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <h1 className="text-lg font-semibold">Use Case Analysis</h1>
          
          <div className="w-16" />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-foreground mb-6 leading-tight">
            Describe Your Creative Vision
          </h1>
          <p className="text-xl text-muted-foreground">
            Share the story behind what you want to create
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Textarea 
              value={vision}
              onChange={(e) => setVision(e.target.value)}
              className="w-full h-64 text-lg border-border rounded-3xl p-8 resize-none focus:ring-2 focus:ring-primary leading-relaxed"
              placeholder="I'm dreaming of a special piece for my mother who loves gardening and traditional crafts. Something meaningful that celebrates her spirit..."
            />
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick inspiration</h3>
              <div className="flex flex-wrap gap-2">
                {inspirationTags.map(tag => (
                  <Button
                    key={tag}
                    variant="outline"
                    size="sm"
                    onClick={() => setVision(prev => prev + (prev ? ' ' : '') + tag)}
                    className="rounded-full text-sm h-8"
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Examples</h3>
              <div className="space-y-2">
                {examples.map((example, i) => (
                  <p key={i} className="text-sm text-muted-foreground italic">
                    {example}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Button
            onClick={handleContinue}
            disabled={!vision.trim()}
            size="lg"
            className="h-14 px-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-lg disabled:opacity-30"
          >
            <Lightbulb className="w-5 h-5 mr-2" />
            Find Matching Crafts
          </Button>
        </div>
      </main>
    </div>
  );
};

export default UseCaseAnalysis;
