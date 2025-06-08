
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const Index = () => {
  const [intent, setIntent] = useState("");
  const navigate = useNavigate();

  const handleCollaborationOption = (type: string) => {
    switch (type) {
      case 'visual':
        navigate('/collaborate/visual/upload');
        break;
      case 'use-case':
        navigate('/collaborate/use-case');
        break;
      case 'craft':
        navigate('/collaborate/craft');
        break;
      case 'material':
        navigate('/collaborate/material');
        break;
      case 'technique':
        navigate('/collaborate/technique');
        break;
      case 'product':
        navigate('/collaborate/product');
        break;
      default:
        break;
    }
  };

  const handleStartCreating = () => {
    if (intent.trim()) {
      // Navigate to use case analysis with the intent
      navigate('/collaborate/use-case', { state: { initialIntent: intent } });
    } else {
      // Scroll to collaboration options
      const collaborationSection = document.getElementById('collaboration-options');
      collaborationSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="pt-8 pb-4 text-center">
        <h1 className="text-xl font-semibold text-foreground tracking-tight">
          Craft
        </h1>
      </header>

      {/* Hero Section with Text Input */}
      <section className="py-12 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-light text-foreground mb-6 tracking-tight leading-tight">
          Transform Your Ideas
          <br />
          Into Reality
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto font-light">
          Connect with master craftspeople through AI-powered collaboration
        </p>

        {/* Creative Intent Text Box */}
        <div className="max-w-2xl mx-auto mb-8">
          <label htmlFor="intent" className="block text-sm font-medium text-foreground mb-3 text-left">
            Describe your creative vision (optional)
          </label>
          <Textarea
            id="intent"
            value={intent}
            onChange={(e) => setIntent(e.target.value)}
            placeholder="I'm dreaming of a special piece for my mother who loves gardening and traditional crafts. Something meaningful that celebrates her spirit..."
            className="min-h-[120px] text-base leading-relaxed border-border/50 focus:border-primary resize-none"
          />
          <p className="text-sm text-muted-foreground mt-2 text-left">
            Share your vision or skip to explore collaboration options below
          </p>
        </div>

        <Button
          onClick={handleStartCreating}
          size="lg"
          className="h-12 px-8 md:h-14 md:px-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-base md:text-lg transition-all duration-200"
        >
          {intent.trim() ? 'Analyze My Vision' : 'Start Creating'}
        </Button>
      </section>

      {/* Collaboration Starting Points */}
      <section id="collaboration-options" className="py-12 max-w-6xl mx-auto px-6 w-full">
        <h2 className="text-3xl md:text-4xl font-light text-center text-foreground mb-12">
          Choose Your Starting Point
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Visual Intelligence - Featured */}
          <div 
            onClick={() => handleCollaborationOption('visual')}
            className="col-span-1 sm:col-span-2 lg:col-span-1 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl md:rounded-3xl p-6 md:p-8 text-white cursor-pointer hover:scale-105 transition-transform duration-200"
          >
            <div className="text-3xl md:text-4xl mb-3 md:mb-4">📸</div>
            <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3">Visual Intelligence</h3>
            <p className="text-base md:text-lg opacity-90 mb-4 md:mb-6">Upload inspiration images</p>
            <span className="bg-white text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
              Most Popular
            </span>
          </div>

          {/* Use Case Analysis */}
          <div 
            onClick={() => handleCollaborationOption('use-case')}
            className="bg-card rounded-2xl md:rounded-3xl p-6 md:p-8 hover:bg-accent/50 transition-colors cursor-pointer hover:scale-105 duration-200 border border-border/50"
          >
            <div className="text-3xl md:text-4xl mb-3 md:mb-4">💡</div>
            <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2 md:mb-3">Use Case Analysis</h3>
            <p className="text-sm md:text-base text-muted-foreground">Describe your needs</p>
          </div>

          {/* Craft First */}
          <div 
            onClick={() => handleCollaborationOption('craft')}
            className="bg-card rounded-2xl md:rounded-3xl p-6 md:p-8 hover:bg-accent/50 transition-colors cursor-pointer hover:scale-105 duration-200 border border-border/50"
          >
            <div className="text-3xl md:text-4xl mb-3 md:mb-4">🔨</div>
            <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2 md:mb-3">Craft First</h3>
            <p className="text-sm md:text-base text-muted-foreground">Traditional approach</p>
          </div>

          {/* Material First */}
          <div 
            onClick={() => handleCollaborationOption('material')}
            className="bg-card rounded-2xl md:rounded-3xl p-6 md:p-8 hover:bg-accent/50 transition-colors cursor-pointer hover:scale-105 duration-200 border border-border/50"
          >
            <div className="text-3xl md:text-4xl mb-3 md:mb-4">🧱</div>
            <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2 md:mb-3">Material First</h3>
            <p className="text-sm md:text-base text-muted-foreground">Start with materials</p>
          </div>

          {/* Technique First */}
          <div 
            onClick={() => handleCollaborationOption('technique')}
            className="bg-card rounded-2xl md:rounded-3xl p-6 md:p-8 hover:bg-accent/50 transition-colors cursor-pointer hover:scale-105 duration-200 border border-border/50"
          >
            <div className="text-3xl md:text-4xl mb-3 md:mb-4">⚙️</div>
            <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2 md:mb-3">Technique First</h3>
            <p className="text-sm md:text-base text-muted-foreground">Choose your method</p>
          </div>

          {/* Product Browser */}
          <div 
            onClick={() => handleCollaborationOption('product')}
            className="bg-card rounded-2xl md:rounded-3xl p-6 md:p-8 hover:bg-accent/50 transition-colors cursor-pointer hover:scale-105 duration-200 border border-border/50"
          >
            <div className="text-3xl md:text-4xl mb-3 md:mb-4">📦</div>
            <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2 md:mb-3">Product Browser</h3>
            <p className="text-sm md:text-base text-muted-foreground">Explore existing work</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pb-8 text-center mt-8">
        <p className="text-sm text-muted-foreground">
          Connecting visionaries with craftspeople
        </p>
      </footer>
    </div>
  );
};

export default Index;
