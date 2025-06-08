
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Hammer, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

const CraftFirst = () => {
  const navigate = useNavigate();
  const [selectedCraft, setSelectedCraft] = useState("");
  const [showAllCrafts, setShowAllCrafts] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const initialCrafts = [
    { id: "pottery", name: "Pottery", icon: "🏺", description: "Wheel throwing, hand building, glazing" },
    { id: "woodworking", name: "Woodworking", icon: "🪵", description: "Furniture, carving, turning" },
    { id: "jewelry", name: "Jewelry Making", icon: "💍", description: "Metalsmithing, beading, wire work" },
    { id: "textiles", name: "Textiles", icon: "🧶", description: "Weaving, knitting, embroidery" },
    { id: "glassblowing", name: "Glassblowing", icon: "🫧", description: "Blown glass, fused glass, stained glass" },
    { id: "leatherwork", name: "Leatherwork", icon: "🦴", description: "Bags, belts, bookbinding" },
    { id: "metalwork", name: "Metalwork", icon: "🔨", description: "Blacksmithing, welding, casting" },
    { id: "ceramics", name: "Ceramics", icon: "🏺", description: "Functional pottery, sculptural work" },
    { id: "basketry", name: "Basketry", icon: "🧺", description: "Traditional weaving techniques" },
    { id: "stonework", name: "Stonework", icon: "🗿", description: "Carving, masonry, sculpture" },
    { id: "bookbinding", name: "Bookbinding", icon: "📚", description: "Traditional and modern binding" },
    { id: "calligraphy", name: "Calligraphy", icon: "✒️", description: "Hand lettering and illumination" }
  ];

  const allCrafts = [
    ...initialCrafts,
    { id: "candle-making", name: "Candle Making", icon: "🕯️", description: "Hand-dipped, molded, decorative" },
    { id: "soap-making", name: "Soap Making", icon: "🧼", description: "Cold process, melt and pour" },
    { id: "brewing", name: "Brewing", icon: "🍺", description: "Beer, mead, fermentation" },
    { id: "distilling", name: "Distilling", icon: "🥃", description: "Spirits, essential oils" },
    { id: "perfumery", name: "Perfumery", icon: "🌸", description: "Natural fragrances, blending" },
    { id: "instrument-making", name: "Instrument Making", icon: "🎸", description: "Guitars, violins, drums" },
    { id: "furniture", name: "Furniture Making", icon: "🪑", description: "Custom furniture, restoration" },
    { id: "upholstery", name: "Upholstery", icon: "🛋️", description: "Furniture restoration, custom work" },
    { id: "millinery", name: "Millinery", icon: "🎩", description: "Hat making, headpieces" },
    { id: "cobbling", name: "Cobbling", icon: "👞", description: "Shoe making, repair" },
    { id: "paper-making", name: "Paper Making", icon: "📜", description: "Handmade papers, specialty sheets" },
    { id: "printmaking", name: "Printmaking", icon: "🖨️", description: "Block printing, etching, screen printing" }
  ];

  const filteredCrafts = (showAllCrafts ? allCrafts : initialCrafts).filter(craft =>
    craft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    craft.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContinue = () => {
    if (selectedCraft) {
      const craft = allCrafts.find(c => c.id === selectedCraft);
      navigate('/collaborate/form', { 
        state: { selectedCraft: craft } 
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="px-4 sm:px-6 py-4 flex items-center justify-between border-b border-border/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
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
      <main className="flex-1 px-4 sm:px-6 py-8 max-w-6xl mx-auto w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-foreground mb-6 leading-tight">
            Choose Your
            <br />
            Craft
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground font-light mb-8">
            Start with the traditional craft you want to explore
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-12">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search crafts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 rounded-2xl border-2 text-base"
            />
          </div>
        </div>
        
        {showAllCrafts ? (
          <ScrollArea className="h-[600px] mb-8">
            <div className="grid grid-cols-3 gap-4 sm:gap-6 pb-6">
              {filteredCrafts.map((craft) => (
                <div
                  key={craft.id}
                  onClick={() => setSelectedCraft(craft.id)}
                  className={`bg-card rounded-2xl p-4 sm:p-6 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                    selectedCraft === craft.id
                      ? 'ring-2 ring-primary shadow-lg'
                      : 'hover:shadow-md'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{craft.icon}</div>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                      {craft.name}
                    </h3>
                    <p className="text-muted-foreground text-xs sm:text-sm font-medium">
                      {craft.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-12">
            {filteredCrafts.map((craft) => (
              <div
                key={craft.id}
                onClick={() => setSelectedCraft(craft.id)}
                className={`bg-card rounded-2xl p-4 sm:p-6 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                  selectedCraft === craft.id
                    ? 'ring-2 ring-primary shadow-lg'
                    : 'hover:shadow-md'
                }`}
              >
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{craft.icon}</div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                    {craft.name}
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm font-medium">
                    {craft.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="text-center space-y-4">
          {!showAllCrafts && (
            <Button
              onClick={() => setShowAllCrafts(true)}
              variant="outline"
              size="lg"
              className="h-12 sm:h-14 px-8 sm:px-12 rounded-2xl border-2 border-muted-foreground/20 text-muted-foreground hover:bg-accent hover:text-accent-foreground font-medium text-base sm:text-lg mb-4"
            >
              <Plus className="w-5 h-5 mr-2 stroke-[1.5]" />
              More Crafts from DC Platform
            </Button>
          )}
          
          <Button
            onClick={handleContinue}
            disabled={!selectedCraft}
            size="lg"
            className="h-12 sm:h-14 px-8 sm:px-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base sm:text-lg disabled:opacity-30"
          >
            <Hammer className="w-5 h-5 mr-2 stroke-[1.5]" />
            Continue with {selectedCraft ? allCrafts.find(c => c.id === selectedCraft)?.name : 'Selected Craft'}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default CraftFirst;
