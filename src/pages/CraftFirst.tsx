
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
    { id: "glasswork", name: "Glasswork", icon: "🪟", description: "Blown and sculpted glass art" },
    { id: "leatherwork", name: "Leatherwork", icon: "🧳", description: "Handcrafted leather goods" },
    { id: "stonework", name: "Stonework", icon: "🗿", description: "Carved and sculpted stone" }
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
          
          <h1 className="text-lg font-semibold">Craft First</h1>
          
          <div className="w-16" />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-light text-foreground mb-6 leading-tight">
            Choose Your Craft Tradition
          </h1>
          <p className="text-xl text-muted-foreground">
            Start with the traditional craft that speaks to you
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {crafts.map((craft) => (
            <div
              key={craft.id}
              onClick={() => setSelectedCraft(craft.id)}
              className={`bg-card rounded-3xl p-6 cursor-pointer transition-all duration-200 hover:scale-105 ${
                selectedCraft === craft.id
                  ? 'ring-2 ring-primary shadow-lg'
                  : 'hover:shadow-md'
              }`}
            >
              <div className="text-center">
                <div className="text-4xl mb-4">{craft.icon}</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {craft.name}
                </h3>
                <p className="text-muted-foreground text-sm">
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
            className="h-14 px-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-lg disabled:opacity-30"
          >
            <Hammer className="w-5 h-5 mr-2" />
            Continue with {selectedCraft ? crafts.find(c => c.id === selectedCraft)?.name : 'Selected Craft'}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default CraftFirst;
