
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Wrench, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import SmartFiltering from "../components/project-form/SmartFiltering";
import { directCreateAPI } from "../config/api";

const TechniqueFirst = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedTechnique, setSelectedTechnique] = useState("");
  const [techniques, setTechniques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedTechniques, setExpandedTechniques] = useState(new Set());

  // Get the project description from URL params
  const projectDescription = searchParams.get('description') || '';

  console.log('🎯 TechniqueFirst - Project description:', projectDescription);
  console.log('🎯 TechniqueFirst - Will show smart filtering for:', projectDescription);

  // Clean HTML content and extract plain text
  const cleanDescription = (htmlDescription) => {
    if (!htmlDescription) return '';
    
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

  const handleContinue = () => {
    if (selectedTechnique) {
      const technique = techniques.find(t => t.id === selectedTechnique);
      navigate('/collaborate/form', { 
        state: { selectedTechnique: technique } 
      });
    }
  };

  const renderTechnique = (technique, isRecommended = false, reason = '') => {
    const isExpanded = expandedTechniques.has(technique.id);
    const cleanText = cleanDescription(technique.description);
    const truncatedText = truncateDescription(technique.description);
    const shouldShowReadMore = cleanText.length > 150;

    return (
      <div
        className={`bg-card rounded-2xl p-4 sm:p-6 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg border-2 ${
          selectedTechnique === technique.id
            ? 'border-primary shadow-lg'
            : isRecommended
              ? 'border-primary/30 hover:border-primary/50'
              : 'border-transparent hover:border-border'
        }`}
      >
        <div className="text-center">
          <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{technique.icon}</div>
          <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
            {technique.name}
          </h3>
          {isRecommended && reason && (
            <p className="text-xs text-primary font-medium mb-2">
              {reason}
            </p>
          )}
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
          </div>
        </div>
      </div>
    );
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
        <SmartFiltering
          title="Choose Your Technique"
          description="Start with the traditional technique you want to explore"
          allItems={techniques}
          selectedItem={selectedTechnique}
          onItemSelect={setSelectedTechnique}
          projectDescription={projectDescription}
          itemType="techniques"
          renderItem={renderTechnique}
        />
        
        <div className="text-center mt-12">
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
