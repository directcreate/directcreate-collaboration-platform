
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
    { id: "hand-stitching", name: "Hand Stitching", icon: "🪡", description: "Traditional needlework" }
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
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <header className="px-4 sm:px-6 py-4 flex items-center justify-between border-b border-border/20 flex-shrink-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/")}
          className="hover:bg-accent rounded-xl"
        >
          <ArrowLeft className="w-4 h-4 mr-2 stroke-[1.5]" />
          Back
        </Button>
        
        <h1 className="text-lg font-medium">Technique First</h1>
        
        <div className="w-16" />
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-6 py-6 sm:py-8 max-w-6xl mx-auto w-full flex flex-col justify-center min-h-0">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-foreground mb-4 sm:mb-6 leading-tight">
            Choose Your
            <br />
            Technique
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground font-light">
            Start with the traditional technique you want to explore
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {techniques.map((technique) => (
            <div
              key={technique.id}
              onClick={() => setSelectedTechnique(technique.id)}
              className={`bg-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                selectedTechnique === technique.id
                  ? 'ring-2 ring-primary shadow-lg'
                  : 'hover:shadow-md'
              }`}
            >
              <div className="text-center">
                <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">{technique.icon}</div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-3">
                  {technique.name}
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base font-medium">
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
            className="h-12 sm:h-14 px-8 sm:px-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base sm:text-lg disabled:opacity-30"
          >
            <Wrench className="w-5 h-5 mr-2 stroke-[1.5]" />
            Continue with {selectedTechnique ? techniques.find(t => t.id === selectedTechnique)?.name : 'Selected Technique'}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default TechniqueFirst;
