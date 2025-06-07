
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

const TechniqueFirst = () => {
  const navigate = useNavigate();
  const [selectedTechnique, setSelectedTechnique] = useState("");

  const techniques = [
    { id: "hand-carving", name: "Hand Carving", icon: "🪚", description: "Traditional sculptural techniques" },
    { id: "wheel-throwing", name: "Wheel Throwing", icon: "🏺", description: "Classic pottery formation" },
    { id: "weaving", name: "Weaving", icon: "🧵", description: "Interlacing fibers and threads" },
    { id: "forging", name: "Forging", icon: "🔨", description: "Shaping metal through heat" },
    { id: "glass-blowing", name: "Glass Blowing", icon: "💨", description: "Forming molten glass" },
    { id: "hand-stitching", name: "Hand Stitching", icon: "🪡", description: "Traditional needlework" },
    { id: "stone-carving", name: "Stone Carving", icon: "⛏️", description: "Sculpting with chisel and hammer" },
    { id: "wood-turning", name: "Wood Turning", icon: "🌀", description: "Lathe-based shaping" }
  ];

  const handleContinue = () => {
    if (selectedTechnique) {
      const technique = techniques.find(t => t.id === selectedTechnique);
      navigate('/collaborate/form', { 
        state: { selectedTechnique: technique } 
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border/50 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="hover:bg-accent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <h1 className="text-lg font-semibold">Technique First</h1>
          
          <div className="w-16" />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-light text-foreground mb-6 leading-tight">
            Choose Your Technique
          </h1>
          <p className="text-xl text-muted-foreground">
            Start with the traditional technique you want to explore
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {techniques.map((technique) => (
            <div
              key={technique.id}
              onClick={() => setSelectedTechnique(technique.id)}
              className={`bg-card rounded-3xl p-6 cursor-pointer transition-all duration-200 hover:scale-105 ${
                selectedTechnique === technique.id
                  ? 'ring-2 ring-primary shadow-lg'
                  : 'hover:shadow-md'
              }`}
            >
              <div className="text-center">
                <div className="text-4xl mb-4">{technique.icon}</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {technique.name}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {technique.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button
            onClick={handleContinue}
            disabled={!selectedTechnique}
            size="lg"
            className="h-14 px-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-lg disabled:opacity-30"
          >
            <Wrench className="w-5 h-5 mr-2" />
            Continue with {selectedTechnique ? techniques.find(t => t.id === selectedTechnique)?.name : 'Selected Technique'}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default TechniqueFirst;
