
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Wrench, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

const TechniqueFirst = () => {
  const navigate = useNavigate();
  const [selectedTechnique, setSelectedTechnique] = useState("");
  const [showAllTechniques, setShowAllTechniques] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const initialTechniques = [
    { id: "hand-carving", name: "Hand Carving", icon: "🪚", description: "Traditional sculptural techniques" },
    { id: "wheel-throwing", name: "Wheel Throwing", icon: "🏺", description: "Classic pottery formation" },
    { id: "weaving", name: "Weaving", icon: "🧵", description: "Interlacing fibers and threads" },
    { id: "forging", name: "Forging", icon: "🔨", description: "Shaping metal through heat" },
    { id: "glass-blowing", name: "Glass Blowing", icon: "💨", description: "Forming molten glass" },
    { id: "hand-stitching", name: "Hand Stitching", icon: "🪡", description: "Traditional needlework" },
    { id: "hand-building", name: "Hand Building", icon: "👐", description: "Ceramic coil and slab techniques" },
    { id: "turning", name: "Wood Turning", icon: "🌪️", description: "Lathe work and shaping" },
    { id: "engraving", name: "Engraving", icon: "🔍", description: "Fine detail work on various materials" },
    { id: "embossing", name: "Embossing", icon: "📄", description: "Raised relief patterns" },
    { id: "braiding", name: "Braiding", icon: "🔗", description: "Interlacing strands and cords" },
    { id: "spinning", name: "Spinning", icon: "🌀", description: "Creating thread from fiber" }
  ];

  const allTechniques = [
    ...initialTechniques,
    { id: "lost-wax-casting", name: "Lost Wax Casting", icon: "🕯️", description: "Investment casting technique" },
    { id: "cloisonne", name: "Cloisonné", icon: "🎨", description: "Enamel technique with metal divisions" },
    { id: "damascening", name: "Damascening", icon: "⚔️", description: "Metal inlay technique" },
    { id: "marquetry", name: "Marquetry", icon: "🧩", description: "Wood inlay artistry" },
    { id: "gilding", name: "Gilding", icon: "✨", description: "Gold leaf application" },
    { id: "repoussé", name: "Repoussé", icon: "🔨", description: "Metal relief hammering" },
    { id: "niello", name: "Niello", icon: "⚫", description: "Black metal alloy inlay" },
    { id: "granulation", name: "Granulation", icon: "🔴", description: "Tiny sphere decoration technique" },
    { id: "filigree", name: "Filigree", icon: "🕸️", description: "Delicate wire work" },
    { id: "champlevé", name: "Champlevé", icon: "🎭", description: "Recessed enamel technique" }
  ];

  const filteredTechniques = (showAllTechniques ? allTechniques : initialTechniques).filter(technique =>
    technique.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    technique.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContinue = () => {
    if (selectedTechnique) {
      const technique = allTechniques.find(t => t.id === selectedTechnique);
      navigate('/collaborate/form', { 
        state: { selectedTechnique: technique } 
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
        
        <h1 className="text-lg font-medium">Technique First</h1>
        
        <div className="w-16" />
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-6 py-8 max-w-6xl mx-auto w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-foreground mb-6 leading-tight">
            Choose Your
            <br />
            Technique
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground font-light mb-8">
            Start with the traditional technique you want to explore
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-12">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search techniques..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 rounded-2xl border-2 text-base"
            />
          </div>
        </div>
        
        {showAllTechniques ? (
          <ScrollArea className="h-[600px] mb-8">
            <div className="grid grid-cols-3 gap-4 sm:gap-6 pb-6">
              {filteredTechniques.map((technique) => (
                <div
                  key={technique.id}
                  onClick={() => setSelectedTechnique(technique.id)}
                  className={`bg-card rounded-2xl p-4 sm:p-6 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                    selectedTechnique === technique.id
                      ? 'ring-2 ring-primary shadow-lg'
                      : 'hover:shadow-md'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{technique.icon}</div>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                      {technique.name}
                    </h3>
                    <p className="text-muted-foreground text-xs sm:text-sm font-medium">
                      {technique.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-12">
            {filteredTechniques.map((technique) => (
              <div
                key={technique.id}
                onClick={() => setSelectedTechnique(technique.id)}
                className={`bg-card rounded-2xl p-4 sm:p-6 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                  selectedTechnique === technique.id
                    ? 'ring-2 ring-primary shadow-lg'
                    : 'hover:shadow-md'
                }`}
              >
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{technique.icon}</div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                    {technique.name}
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm font-medium">
                    {technique.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="text-center space-y-4">
          {!showAllTechniques && (
            <Button
              onClick={() => setShowAllTechniques(true)}
              variant="outline"
              size="lg"
              className="h-12 sm:h-14 px-8 sm:px-12 rounded-2xl border-2 border-muted-foreground/20 text-muted-foreground hover:bg-accent hover:text-accent-foreground font-medium text-base sm:text-lg mb-4"
            >
              <Plus className="w-5 h-5 mr-2 stroke-[1.5]" />
              More Techniques from DC Platform
            </Button>
          )}
          
          <Button
            onClick={handleContinue}
            disabled={!selectedTechnique}
            size="lg"
            className="h-12 sm:h-14 px-8 sm:px-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base sm:text-lg disabled:opacity-30"
          >
            <Wrench className="w-5 h-5 mr-2 stroke-[1.5]" />
            Continue with {selectedTechnique ? allTechniques.find(t => t.id === selectedTechnique)?.name : 'Selected Technique'}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default TechniqueFirst;
