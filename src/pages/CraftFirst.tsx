
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Hammer } from "lucide-react";
import { Button } from "@/components/ui/button";

const CraftFirst = () => {
  const navigate = useNavigate();
  const [selectedMaterial, setSelectedMaterial] = useState("");

  const materials = [
    { id: "wood", name: "Wood", icon: "🌳", description: "Oak, Pine, Walnut, and exotic hardwoods" },
    { id: "clay", name: "Clay", icon: "🏺", description: "Earthenware, stoneware, and porcelain" },
    { id: "textile", name: "Textile", icon: "🧶", description: "Cotton, silk, wool, and natural fibers" },
    { id: "metal", name: "Metal", icon: "⚒️", description: "Iron, brass, silver, and copper alloys" },
    { id: "stone", name: "Stone", icon: "🗿", description: "Marble, granite, and natural stones" },
    { id: "glass", name: "Glass", icon: "💎", description: "Blown, cast, and sculpted glass art" }
  ];

  const handleContinue = () => {
    if (selectedMaterial) {
      const material = materials.find(m => m.id === selectedMaterial);
      navigate('/collaborate/form', { 
        state: { selectedMaterial: material } 
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
        
        <h1 className="text-lg font-medium">Material First</h1>
        
        <div className="w-16" />
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-6 py-6 sm:py-8 max-w-6xl mx-auto w-full flex flex-col justify-center min-h-0">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-foreground mb-4 sm:mb-6 leading-tight">
            Choose Your
            <br />
            Material
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground font-light">
            Start with the material that inspires your creation
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {materials.map((material) => (
            <div
              key={material.id}
              onClick={() => setSelectedMaterial(material.id)}
              className={`bg-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                selectedMaterial === material.id
                  ? 'ring-2 ring-primary shadow-lg'
                  : 'hover:shadow-md'
              }`}
            >
              <div className="text-center">
                <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">{material.icon}</div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-3">
                  {material.name}
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base font-medium">
                  {material.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button
            onClick={handleContinue}
            disabled={!selectedMaterial}
            size="lg"
            className="h-12 sm:h-14 px-8 sm:px-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base sm:text-lg disabled:opacity-30"
          >
            <Hammer className="w-5 h-5 mr-2 stroke-[1.5]" />
            Continue with {selectedMaterial ? materials.find(m => m.id === selectedMaterial)?.name : 'Selected Material'}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default CraftFirst;
