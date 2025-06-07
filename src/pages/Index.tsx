
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Palette, Package, Users, Hammer, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [intent, setIntent] = useState("");
  const navigate = useNavigate();

  const handleStartCreating = () => {
    // Scroll to collaboration options
    const collaborationSection = document.getElementById('collaboration-options');
    collaborationSection?.scrollIntoView({ behavior: 'smooth' });
  };

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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="pt-12 pb-8 text-center">
        <h1 className="text-2xl font-semibold text-foreground tracking-tight">
          Craft
        </h1>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center">
        <h1 className="text-6xl font-light text-foreground mb-6 tracking-tight leading-tight">
          Transform Your Ideas
          <br />
          Into Reality
        </h1>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto font-light">
          Connect with master craftspeople through AI-powered collaboration
        </p>
        <Button
          onClick={handleStartCreating}
          size="lg"
          className="h-14 px-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-lg transition-all duration-200"
        >
          Start Creating
        </Button>
      </section>

      {/* Collaboration Starting Points */}
      <section id="collaboration-options" className="py-20 max-w-6xl mx-auto px-6 w-full">
        <h2 className="text-4xl font-light text-center text-foreground mb-16">
          Choose Your Starting Point
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Visual Intelligence - Featured */}
          <div 
            onClick={() => handleCollaborationOption('visual')}
            className="col-span-1 md:col-span-2 lg:col-span-1 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-8 text-white cursor-pointer hover:scale-105 transition-transform duration-200"
          >
            <div className="text-4xl mb-4">📸</div>
            <h3 className="text-2xl font-semibold mb-3">Visual Intelligence</h3>
            <p className="text-lg opacity-90 mb-6">Upload inspiration images</p>
            <span className="bg-white text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
              Most Popular
            </span>
          </div>

          {/* Use Case Analysis */}
          <div 
            onClick={() => handleCollaborationOption('use-case')}
            className="bg-card rounded-3xl p-8 hover:bg-accent/50 transition-colors cursor-pointer hover:scale-105 duration-200"
          >
            <div className="text-4xl mb-4">💡</div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Use Case Analysis</h3>
            <p className="text-muted-foreground">Describe your needs</p>
          </div>

          {/* Craft First */}
          <div 
            onClick={() => handleCollaborationOption('craft')}
            className="bg-card rounded-3xl p-8 hover:bg-accent/50 transition-colors cursor-pointer hover:scale-105 duration-200"
          >
            <div className="text-4xl mb-4">🔨</div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Craft First</h3>
            <p className="text-muted-foreground">Traditional approach</p>
          </div>

          {/* Material First */}
          <div 
            onClick={() => handleCollaborationOption('material')}
            className="bg-card rounded-3xl p-8 hover:bg-accent/50 transition-colors cursor-pointer hover:scale-105 duration-200"
          >
            <div className="text-4xl mb-4">🧱</div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Material First</h3>
            <p className="text-muted-foreground">Start with materials</p>
          </div>

          {/* Technique First */}
          <div 
            onClick={() => handleCollaborationOption('technique')}
            className="bg-card rounded-3xl p-8 hover:bg-accent/50 transition-colors cursor-pointer hover:scale-105 duration-200"
          >
            <div className="text-4xl mb-4">⚙️</div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Technique First</h3>
            <p className="text-muted-foreground">Choose your method</p>
          </div>

          {/* Product Browser */}
          <div 
            onClick={() => handleCollaborationOption('product')}
            className="bg-card rounded-3xl p-8 hover:bg-accent/50 transition-colors cursor-pointer hover:scale-105 duration-200"
          >
            <div className="text-4xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Product Browser</h3>
            <p className="text-muted-foreground">Explore existing work</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pb-8 text-center mt-auto">
        <p className="text-sm text-muted-foreground">
          Connecting visionaries with craftspeople
        </p>
      </footer>
    </div>
  );
};

export default Index;
