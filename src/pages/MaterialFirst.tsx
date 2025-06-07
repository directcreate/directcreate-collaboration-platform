
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

const MaterialFirst = () => {
  const navigate = useNavigate();
  const [selectedMaterial, setSelectedMaterial] = useState("");

  const materials = [
    { id: "wood", name: "Wood", icon: "🌳", description: "Oak, Teak, Pine, and more", crafts: ["Furniture", "Decor", "Instruments"] },
    { id: "clay", name: "Clay", icon: "🧱", description: "Earthenware, Stoneware, Porcelain", crafts: ["Pottery", "Tiles", "Sculptures"] },
    { id: "metal", name: "Metal", icon: "⚙️", description: "Iron, Brass, Silver, Copper", crafts: ["Jewelry", "Tools", "Decor"] },
    { id: "fabric", name: "Fabric", icon: "🧵", description: "Cotton, Silk, Wool, Linen", crafts: ["Clothing", "Textiles", "Tapestries"] },
    { id: "stone", name: "Stone", icon: "🪨", description: "Marble, Granite, Sandstone", crafts: ["Sculptures", "Architecture", "Decor"] },
    { id: "glass", name: "Glass", icon: "💎", description: "Clear, Colored, Recycled", crafts: ["Art", "Functional", "Decor"] },
    { id: "leather", name: "Leather", icon: "🐄", description: "Cowhide, Goat, Exotic", crafts: ["Bags", "Shoes", "Accessories"] },
    { id: "bamboo", name: "Bamboo", icon: "🎋", description: "Sustainable and versatile", crafts: ["Furniture", "Baskets", "Decor"] }
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
          
          <h1 className="text-lg font-semibold">Material First</h1>
          
          <div className="w-16" />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-light text-foreground mb-6 leading-tight">
            Choose Your Material
          </h1>
          <p className="text-xl text-muted-foreground">
            Start with the material that inspires you
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {materials.map((material) => (
            <div
              key={material.id}
              onClick={() => setSelectedMaterial(material.id)}
              className={`bg-card rounded-3xl p-6 cursor-pointer transition-all duration-200 hover:scale-105 ${
                selectedMaterial === material.id
                  ? 'ring-2 ring-primary shadow-lg'
                  : 'hover:shadow-md'
              }`}
            >
              <div className="text-center mb-4">
                <div className="text-4xl mb-3">{material.icon}</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {material.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-3">
                  {material.description}
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Compatible Crafts:</h4>
                <div className="flex flex-wrap gap-1">
                  {material.crafts.map((craft, i) => (
                    <span key={i} className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs">
                      {craft}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button
            onClick={handleContinue}
            disabled={!selectedMaterial}
            size="lg"
            className="h-14 px-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-lg disabled:opacity-30"
          >
            <Package className="w-5 h-5 mr-2" />
            Continue with {selectedMaterial ? materials.find(m => m.id === selectedMaterial)?.name : 'Selected Material'}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default MaterialFirst;
