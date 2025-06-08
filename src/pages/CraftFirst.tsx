
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Hammer } from "lucide-react";
import { Button } from "@/components/ui/button";

const CraftFirst = () => {
  const navigate = useNavigate();
  const [selectedCraft, setSelectedCraft] = useState("");

  const crafts = [
    { id: "woodworking", name: "Woodworking", icon: "🪵", description: "Traditional furniture and decor" },
    { id: "pottery", name: "Pottery", icon: "🏺", description: "Ceramic art and functional pieces" },
    { id: "textile", name: "Textile", icon: "🧶", description: "Weaving and fabric arts" },
    { id: "metalwork", name: "Metalwork", icon: "⚒️", description: "Forged and crafted metal items" },
    { id: "jewelry", name: "Jewelry", icon: "💍", description: "Precious and artistic accessories" },
    { id: "glasswork", name: "Glasswork", icon: "🪟", description: "Blown and sculpted glass art" }
  ];

  const handleContinue = () => {
    if (selectedCraft) {
      const craft = crafts.find(c => c.id === selectedCraft);
      navigate('/collaborate/form', { 
        state: { selectedCraft: craft } 
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
        
        <h1 className="text-lg font-medium">Craft First</h1>
        
        <div className="w-16" />
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-6 py-6 sm:py-8 max-w-6xl mx-auto w-full flex flex-col justify-center min-h-0">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-foreground mb-4 sm:mb-6 leading-tight">
            Choose Your Craft
            <br />
            Tradition
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground font-light">
            Start with the traditional craft that speaks to you
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {crafts.map((craft) => (
            <div
              key={craft.id}
              onClick={() => setSelectedCraft(craft.id)}
              className={`bg-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                selectedCraft === craft.id
                  ? 'ring-2 ring-primary shadow-lg'
                  : 'hover:shadow-md'
              }`}
            >
              <div className="text-center">
                <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">{craft.icon}</div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-3">
                  {craft.name}
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base font-medium">
                  {craft.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button
            onClick={handleContinue}
            disabled={!selectedCraft}
            size="lg"
            className="h-12 sm:h-14 px-8 sm:px-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base sm:text-lg disabled:opacity-30"
          >
            <Hammer className="w-5 h-5 mr-2 stroke-[1.5]" />
            Continue with {selectedCraft ? crafts.find(c => c.id === selectedCraft)?.name : 'Selected Craft'}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default CraftFirst;
