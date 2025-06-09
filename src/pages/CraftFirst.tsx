import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Hammer, Plus, Search, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { directCreateAPI } from "../config/api";

const CraftFirst = () => {
  const navigate = useNavigate();
  const [selectedCraft, setSelectedCraft] = useState("");
  const [showAllCrafts, setShowAllCrafts] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [crafts, setCrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCards, setExpandedCards] = useState(new Set());

  // Utility function to truncate text
  const truncateText = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  // Toggle expanded state for a specific craft card
  const toggleExpanded = (craftId: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(craftId)) {
      newExpanded.delete(craftId);
    } else {
      newExpanded.add(craftId);
    }
    setExpandedCards(newExpanded);
  };

  // Category icon mapping (keeping as fallback)
  const getCraftIcon = (name) => {
    const iconMap = {
      "Hand Weaving": "🧶",
      "Wood Carving": "🪵", 
      "Pottery": "🏺",
      "Metalworking": "🔨",
      "Jewelry Making": "💍",
      "Glassblowing": "🫧",
      "Leatherwork": "🦴",
      "Basketry": "🧺",
      "Blacksmithing": "⚒️",
      "Ceramics": "🏺",
      "Textiles": "🧶",
      "Stonework": "🗿"
    };
    return iconMap[name] || "🎨";
  };

  useEffect(() => {
    const loadCrafts = async () => {
      try {
        console.log('🔄 Loading crafts from DirectCreate API...');
        const response = await directCreateAPI.getCrafts();
        
        if (response.success) {
          // Transform API response to match UI format
          const transformedCrafts = response.data.map(craft => ({
            id: craft.id.toString(),
            name: craft.name,
            icon: getCraftIcon(craft.name),
            description: craft.description,
            difficulty: craft.difficulty,
            time_estimate: craft.time_estimate,
            banner: craft.banner, // Use real banner from API
            category: craft.category || 'Traditional Craft'
          }));
          
          setCrafts(transformedCrafts);
          console.log('✅ Crafts loaded:', transformedCrafts.length);
        }
      } catch (error) {
        console.error('❌ Error loading crafts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCrafts();
  }, []);

  // Show first 12 crafts initially, all crafts when expanded
  const initialCrafts = crafts.slice(0, 12);
  const allCrafts = crafts;

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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Loading crafts...</p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
              {filteredCrafts.map((craft) => (
                <Card
                  key={craft.id}
                  onClick={() => setSelectedCraft(craft.id)}
                  className={`cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg overflow-hidden ${
                    selectedCraft === craft.id
                      ? 'ring-2 ring-primary shadow-lg'
                      : 'hover:shadow-md'
                  }`}
                >
                  {/* Craft Banner Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={craft.banner || 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'}
                      alt={craft.name}
                      className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                      onError={(e) => {
                        // Fallback to placeholder if banner fails to load
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop';
                      }}
                    />
                    {/* Overlay with icon */}
                    <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full p-2">
                      <span className="text-2xl">{craft.icon}</span>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-foreground line-clamp-1">
                        {craft.name}
                      </h3>
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {craft.difficulty}
                      </Badge>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {expandedCards.has(craft.id) 
                          ? craft.description 
                          : truncateText(craft.description, 120)
                        }
                      </p>
                      {craft.description.length > 120 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExpanded(craft.id);
                          }}
                          className="text-primary text-xs mt-1 hover:underline flex items-center gap-1"
                        >
                          {expandedCards.has(craft.id) ? (
                            <>Show Less <ChevronUp className="w-3 h-3" /></>
                          ) : (
                            <>Read More <ChevronDown className="w-3 h-3" /></>
                          )}
                        </button>
                      )}
                    </div>

                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span className="bg-muted px-2 py-1 rounded-full">
                        {craft.category}
                      </span>
                      <span>{craft.time_estimate}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredCrafts.map((craft) => (
              <Card
                key={craft.id}
                onClick={() => setSelectedCraft(craft.id)}
                className={`cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg overflow-hidden ${
                  selectedCraft === craft.id
                    ? 'ring-2 ring-primary shadow-lg'
                    : 'hover:shadow-md'
                }`}
              >
                {/* Craft Banner Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={craft.banner || 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'}
                    alt={craft.name}
                    className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                    onError={(e) => {
                      // Fallback to placeholder if banner fails to load
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop';
                    }}
                  />
                  {/* Overlay with icon */}
                  <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full p-2">
                    <span className="text-2xl">{craft.icon}</span>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-foreground line-clamp-1">
                      {craft.name}
                    </h3>
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {craft.difficulty}
                    </Badge>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {expandedCards.has(craft.id) 
                        ? craft.description 
                        : truncateText(craft.description, 120)
                      }
                    </p>
                    {craft.description.length > 120 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpanded(craft.id);
                        }}
                        className="text-primary text-xs mt-1 hover:underline flex items-center gap-1"
                      >
                        {expandedCards.has(craft.id) ? (
                          <>Show Less <ChevronUp className="w-3 h-3" /></>
                        ) : (
                          <>Read More <ChevronDown className="w-3 h-3" /></>
                        )}
                      </button>
                    )}
                  </div>

                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span className="bg-muted px-2 py-1 rounded-full">
                      {craft.category}
                    </span>
                    <span>{craft.time_estimate}</span>
                  </div>
                </CardContent>
              </Card>
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
