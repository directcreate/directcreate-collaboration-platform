
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Wrench, Plus, Search, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { directCreateAPI } from "../config/api";

const TechniqueFirst = () => {
  const navigate = useNavigate();
  const [selectedTechnique, setSelectedTechnique] = useState("");
  const [showAllTechniques, setShowAllTechniques] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [techniques, setTechniques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedTechniques, setExpandedTechniques] = useState(new Set());

  // Clean HTML content and extract plain text
  const cleanDescription = (htmlDescription) => {
    if (!htmlDescription) return '';
    
    // Create a temporary div to extract text from HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlDescription;
    const cleanText = tempDiv.textContent || tempDiv.innerText || '';
    
    return cleanText.trim();
  };

  // Truncate text to 3 lines (approximately 150 characters)
  const truncateDescription = (description, maxLength = 150) => {
    const cleanText = cleanDescription(description);
    if (cleanText.length <= maxLength) return cleanText;
    return cleanText.substring(0, maxLength).trim() + '...';
  };

  const toggleExpanded = (techniqueId) => {
    const newExpanded = new Set(expandedTechniques);
    if (newExpanded.has(techniqueId)) {
      newExpanded.delete(techniqueId);
    } else {
      newExpanded.add(techniqueId);
    }
    setExpandedTechniques(newExpanded);
  };

  // Category icon mapping
  const getTechniqueIcon = (category) => {
    const iconMap = {
      "Hand Tools": "🔨",
      "Machine Work": "⚙️",
      "Traditional Methods": "🏺",
      "Modern Techniques": "🖥️"
    };
    return iconMap[category] || "🔧";
  };

  useEffect(() => {
    const loadTechniques = async () => {
      try {
        setLoading(true);
        setError("");
        console.log('🔄 Loading techniques from DirectCreate API...');
        
        const response = await directCreateAPI.getTechniques();
        
        if (response.success) {
          // Transform API response to match UI format
          const transformedTechniques = response.data.map(technique => ({
            id: technique.id.toString(),
            name: technique.name,
            icon: getTechniqueIcon(technique.category || "Modern Techniques"),
            description: technique.description,
            category: technique.category || "Modern Techniques",
            difficulty: technique.difficulty || "Intermediate",
            time_required: technique.time_required || "2-4 weeks",
            tools_needed: technique.tools_needed || []
          }));
          
          setTechniques(transformedTechniques);
          console.log('✅ DirectCreate techniques loaded:', transformedTechniques.length);
        } else {
          setError(response.message || "Failed to load techniques");
          console.error('❌ DirectCreate techniques API error:', response.message);
        }
      } catch (error) {
        console.error('❌ Error loading DirectCreate techniques:', error);
        setError(`Connection error: ${error.message}`);
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
    cleanDescription(technique.description).toLowerCase().includes(searchTerm.toLowerCase()) ||
    technique.category.toLowerCase().includes(searchTerm.toLowerCase())
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
          <p className="text-lg text-muted-foreground">Loading DirectCreate techniques...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-destructive mb-4">Error loading techniques: {error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  const TechniqueCard = ({ technique }) => {
    const isExpanded = expandedTechniques.has(technique.id);
    const cleanText = cleanDescription(technique.description);
    const truncatedText = truncateDescription(technique.description);
    const shouldShowReadMore = cleanText.length > 150;

    return (
      <div
        key={technique.id}
        onClick={() => setSelectedTechnique(technique.id)}
        className={`bg-card rounded-2xl p-4 sm:p-6 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg border-2 ${
          selectedTechnique === technique.id
            ? 'border-primary shadow-lg'
            : 'border-transparent hover:border-border'
        }`}
      >
        <div className="text-center">
          <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{technique.icon}</div>
          <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
            {technique.name}
          </h3>
          <div className="text-muted-foreground text-xs sm:text-sm font-medium mb-3">
            <p className="leading-relaxed">
              {isExpanded ? cleanText : truncatedText}
            </p>
            {shouldShowReadMore && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpanded(technique.id);
                }}
                className="text-primary text-xs hover:underline flex items-center gap-1 mt-2 mx-auto"
              >
                {isExpanded ? (
                  <>Show Less <ChevronUp className="w-3 h-3" /></>
                ) : (
                  <>Read More <ChevronDown className="w-3 h-3" /></>
                )}
              </button>
            )}
          </div>
          <div className="text-xs text-muted-foreground space-y-1">
            <div className="flex justify-between">
              <span>Category:</span>
              <span className="font-medium">{technique.category}</span>
            </div>
            <div className="flex justify-between">
              <span>Difficulty:</span>
              <span className="font-medium">{technique.difficulty}</span>
            </div>
            <div className="flex justify-between">
              <span>Time:</span>
              <span className="font-medium">{technique.time_required}</span>
            </div>
            <div className="mt-2 pt-2 border-t border-border/30">
              <span className="text-xs text-muted-foreground/80">
                Tools: {Array.isArray(technique.tools_needed) ? technique.tools_needed.slice(0, 2).join(", ") : technique.tools_needed}
                {Array.isArray(technique.tools_needed) && technique.tools_needed.length > 2 && "..."}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pb-6">
              {filteredTechniques.map((technique) => (
                <TechniqueCard key={technique.id} technique={technique} />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
            {filteredTechniques.map((technique) => (
              <TechniqueCard key={technique.id} technique={technique} />
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
              More Techniques from DirectCreate Platform
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
