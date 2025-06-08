
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Package, Plus, Search, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { directCreateAPI } from "../config/api";

const MaterialFirst = () => {
  const navigate = useNavigate();
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [showAllMaterials, setShowAllMaterials] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Category icon mapping
  const getCategoryIcon = (category) => {
    const iconMap = {
      "Wood": "🌳",
      "Metal": "⚒️",
      "Textile": "🧶", 
      "Natural": "🎋",
      "Clay": "🏺",
      "Fabric": "🧶",
      "Leather": "🦎",
      "Cotton": "🧶",
      "Wool": "🐑",
      "Bamboo": "🎋",
      "Hemp": "🌿"
    };
    return iconMap[category] || "📦";
  };

  const loadMaterials = async () => {
    try {
      setLoading(true);
      setError("");
      console.log('🔄 Loading materials from DirectCreate API...');
      
      const response = await directCreateAPI.getMaterials();
      
      if (response.success && Array.isArray(response.data)) {
        // Transform API response to match UI format
        const transformedMaterials = response.data.map(material => ({
          id: material.id.toString(),
          name: material.name,
          icon: getCategoryIcon(material.category || material.type),
          description: material.description || `High-quality ${material.name.toLowerCase()}`,
          category: material.category || material.type || "Material",
          sustainability_rating: material.sustainability_rating || material.rating || 8
        }));
        
        setMaterials(transformedMaterials);
        console.log('✅ Real DirectCreate materials loaded:', transformedMaterials.length);
      } else {
        throw new Error(response.message || 'Failed to load materials');
      }
    } catch (error) {
      console.error('❌ Error loading DirectCreate materials:', error);
      setError(`Failed to load materials: ${error.message}`);
      setMaterials([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMaterials();
  }, []);

  // Show first 12 materials initially, all materials when expanded
  const initialMaterials = materials.slice(0, 12);
  const allMaterials = materials;

  const filteredMaterials = (showAllMaterials ? allMaterials : initialMaterials).filter(material =>
    material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContinue = () => {
    if (selectedMaterial) {
      const material = allMaterials.find(m => m.id === selectedMaterial);
      navigate('/collaborate/form', { 
        state: { selectedMaterial: material } 
      });
    }
  };

  const handleRetry = () => {
    loadMaterials();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Loading DirectCreate materials...</p>
          <p className="text-sm text-muted-foreground mt-2">Connecting to database...</p>
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
        
        <h1 className="text-lg font-medium">Material First</h1>
        
        <div className="w-16" />
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-6 py-8 max-w-6xl mx-auto w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-foreground mb-6 leading-tight">
            Choose Your
            <br />
            Material
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground font-light mb-8">
            Real materials from DirectCreate database
          </p>
          
          {/* Error Display */}
          {error && (
            <Alert className="max-w-md mx-auto mb-6 border-destructive/20 bg-destructive/5">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <AlertDescription className="text-sm text-destructive">
                {error}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRetry}
                  className="ml-2 h-6 px-2 text-xs"
                >
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Retry
                </Button>
              </AlertDescription>
            </Alert>
          )}
          
          {/* Search Bar */}
          {materials.length > 0 && (
            <div className="relative max-w-md mx-auto mb-12">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search DirectCreate materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 rounded-2xl border-2 text-base"
              />
            </div>
          )}
        </div>
        
        {/* Empty State */}
        {!loading && materials.length === 0 && !error && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-medium text-foreground mb-2">No Materials Available</h3>
            <p className="text-muted-foreground mb-4">Unable to load materials from DirectCreate database</p>
            <Button onClick={handleRetry} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        )}
        
        {/* Materials Grid */}
        {materials.length > 0 && (
          <>
            {showAllMaterials ? (
              <ScrollArea className="h-[600px] mb-8">
                <div className="grid grid-cols-3 gap-4 sm:gap-6 pb-6">
                  {filteredMaterials.map((material) => (
                    <div
                      key={material.id}
                      onClick={() => setSelectedMaterial(material.id)}
                      className={`bg-card rounded-2xl p-4 sm:p-6 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                        selectedMaterial === material.id
                          ? 'ring-2 ring-primary shadow-lg'
                          : 'hover:shadow-md'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{material.icon}</div>
                        <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                          {material.name}
                        </h3>
                        <p className="text-muted-foreground text-xs sm:text-sm font-medium">
                          {material.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-12">
                {filteredMaterials.map((material) => (
                  <div
                    key={material.id}
                    onClick={() => setSelectedMaterial(material.id)}
                    className={`bg-card rounded-2xl p-4 sm:p-6 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                      selectedMaterial === material.id
                        ? 'ring-2 ring-primary shadow-lg'
                        : 'hover:shadow-md'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{material.icon}</div>
                      <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                        {material.name}
                      </h3>
                      <p className="text-muted-foreground text-xs sm:text-sm font-medium">
                        {material.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="text-center space-y-4">
              {!showAllMaterials && materials.length > 12 && (
                <Button
                  onClick={() => setShowAllMaterials(true)}
                  variant="outline"
                  size="lg"
                  className="h-12 sm:h-14 px-8 sm:px-12 rounded-2xl border-2 border-muted-foreground/20 text-muted-foreground hover:bg-accent hover:text-accent-foreground font-medium text-base sm:text-lg mb-4"
                >
                  <Plus className="w-5 h-5 mr-2 stroke-[1.5]" />
                  Show All {materials.length} DirectCreate Materials
                </Button>
              )}
              
              <Button
                onClick={handleContinue}
                disabled={!selectedMaterial}
                size="lg"
                className="h-12 sm:h-14 px-8 sm:px-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base sm:text-lg disabled:opacity-30"
              >
                <Package className="w-5 h-5 mr-2 stroke-[1.5]" />
                Continue with {selectedMaterial ? allMaterials.find(m => m.id === selectedMaterial)?.name : 'Selected Material'}
              </Button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default MaterialFirst;
