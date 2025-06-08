
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Wrench, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { mockDirectCreateAPI } from "../services/mockData";

const TechniqueFirst = () => {
  const navigate = useNavigate();
  const [selectedTechnique, setSelectedTechnique] = useState("");
  const [showAllTechniques, setShowAllTechniques] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [techniques, setTechniques] = useState([]);
  const [loading, setLoading] = useState(true);

  // Category icon mapping
  const getTechniqueIcon = (name) => {
    const iconMap = {
      "Japanese Joinery": "🪚",
      "Sashiko Stitching": "🪡",
      "Raku Firing": "🔥",
      "Hand Carving": "🪚",
      "Wheel Throwing": "🏺",
      "Weaving": "🧵",
      "Forging": "🔨",
      "Glass Blowing": "💨",
      "Hand Stitching": "🪡",
      "Hand Building": "👐",
      "Wood Turning": "🌪️",
      "Engraving": "🔍",
      "Embossing": "📄",
      "Braiding": "🔗",
      "Spinning": "🌀",
      "Lost Wax Casting": "🕯️",
      "Cloisonné": "🎨",
      "Damascening": "⚔️",
      "Marquetry": "🧩",
      "Gilding": "✨",
      "Repoussé": "🔨",
      "Niello": "⚫",
      "Granulation": "🔴",
      "Filigree": "🕸️",
      "Champlevé": "🎭"
    };
    return iconMap[name] || "🔧";
  };

  useEffect(() => {
    const loadTechniques = async () => {
      try {
        console.log('🔄 Loading techniques from mock API...');
        const response = await mockDirectCreateAPI.getTechniques();
        
        if (response.success) {
          // Transform API response to match UI format
          const transformedTechniques = response.data.map(technique => ({
            id: technique.id.toString(),
            name: technique.name,
            icon: getTechniqueIcon(technique.name),
            description: technique.description,
            origin: technique.origin,
            complexity: technique.complexity
          }));
          
          setTechniques(transformedTechniques);
          console.log('✅ Techniques loaded:', transformedTechniques.length);
        }
      } catch (error) {
        console.error('❌ Error loading techniques:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTechniques();
  }, []);

  // Show first 12 techniques initially, all techniques when expanded
  const initialTechniques = techniques.slice(0, 12);
  const allTechniques = techniques;

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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Loading techniques...</p>
        </div>
      </div>
    );
  }

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
