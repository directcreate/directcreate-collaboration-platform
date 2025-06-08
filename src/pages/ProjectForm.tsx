import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, AlertCircle, RefreshCw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ProjectOverview from "@/components/project-form/ProjectOverview";
import TimelineBudget from "@/components/project-form/TimelineBudget";
import LocationPreferences from "@/components/project-form/LocationPreferences";
import { directCreateAPI } from "../config/api";

const ProjectForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    timeline: "",
    budget: "",
    location: "",
    city: "",
    pinCode: ""
  });

  const [materials, setMaterials] = useState([]);
  const [crafts, setCrafts] = useState([]);
  const [filteredCrafts, setFilteredCrafts] = useState([]);
  const [techniques, setTechniques] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedCraft, setSelectedCraft] = useState("");
  const [selectedTechnique, setSelectedTechnique] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingCompatibleCrafts, setLoadingCompatibleCrafts] = useState(false);
  const [error, setError] = useState("");
  const [craftFilterMessage, setCraftFilterMessage] = useState("");

  const contextData = location.state || {};

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      console.log('🔄 Loading all DirectCreate data for project form...');
      
      const [materialsResponse, craftsResponse, techniquesResponse] = await Promise.all([
        directCreateAPI.getMaterials(),
        directCreateAPI.getCrafts(),
        directCreateAPI.getTechniques()
      ]);

      if (materialsResponse.success) {
        setMaterials(materialsResponse.data);
      } else {
        console.error('Materials API error:', materialsResponse.message);
      }
      
      if (craftsResponse.success) {
        setCrafts(craftsResponse.data);
      } else {
        console.error('Crafts API error:', craftsResponse.message);
      }
      
      if (techniquesResponse.success) {
        setTechniques(techniquesResponse.data);
      } else {
        console.error('Techniques API error:', techniquesResponse.message);
      }

      // Check if any API calls failed
      if (!materialsResponse.success || !craftsResponse.success || !techniquesResponse.success) {
        const failedAPIs = [];
        if (!materialsResponse.success) failedAPIs.push('materials');
        if (!craftsResponse.success) failedAPIs.push('crafts');
        if (!techniquesResponse.success) failedAPIs.push('techniques');
        
        setError(`Failed to load: ${failedAPIs.join(', ')}`);
      }

      // Pre-populate selections from previous pages
      if (contextData.selectedMaterial) {
        setSelectedMaterial(contextData.selectedMaterial.id.toString());
      }
      if (contextData.selectedCraft) {
        setSelectedCraft(contextData.selectedCraft.id.toString());
      }
      if (contextData.selectedTechnique) {
        setSelectedTechnique(contextData.selectedTechnique.id.toString());
      }

      console.log('✅ DirectCreate data loaded successfully');
    } catch (error) {
      console.error('❌ Error loading DirectCreate data:', error);
      setError(`Connection error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const loadCompatibleCrafts = async (materialId: string) => {
    if (!materialId) {
      setFilteredCrafts(crafts);
      setCraftFilterMessage("");
      return;
    }

    try {
      setLoadingCompatibleCrafts(true);
      setCraftFilterMessage("");
      console.log('🔄 Loading compatible crafts for material:', materialId);
      
      const response = await directCreateAPI.getCompatibleCrafts(parseInt(materialId));
      
      if (response.success && Array.isArray(response.data)) {
        setFilteredCrafts(response.data);
        if (response.data.length === 0) {
          setCraftFilterMessage("No compatible crafts found for this material");
        } else {
          setCraftFilterMessage(`Showing ${response.data.length} compatible craft${response.data.length !== 1 ? 's' : ''}`);
        }
        console.log('✅ Compatible crafts loaded:', response.data.length);
      } else {
        console.error('Compatible crafts API error:', response.message);
        setFilteredCrafts(crafts); // Fallback to all crafts
        setCraftFilterMessage("Unable to filter crafts - showing all options");
      }
    } catch (error) {
      console.error('❌ Error loading compatible crafts:', error);
      setFilteredCrafts(crafts); // Fallback to all crafts
      setCraftFilterMessage("Error filtering crafts - showing all options");
    } finally {
      setLoadingCompatibleCrafts(false);
    }
  };

  const handleMaterialChange = (materialId: string) => {
    setSelectedMaterial(materialId);
    setSelectedCraft(""); // Clear craft selection when material changes
    loadCompatibleCrafts(materialId);
  };

  useEffect(() => {
    loadData();
  }, [contextData]);

  // Initialize filtered crafts when crafts data is loaded
  useEffect(() => {
    if (crafts.length > 0) {
      setFilteredCrafts(crafts);
    }
  }, [crafts]);

  // Load compatible crafts if material is pre-selected
  useEffect(() => {
    if (selectedMaterial && crafts.length > 0) {
      loadCompatibleCrafts(selectedMaterial);
    }
  }, [selectedMaterial, crafts]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedMaterialData = materials.find(m => m.id.toString() === selectedMaterial);
    const selectedCraftData = filteredCrafts.find(c => c.id.toString() === selectedCraft);
    const selectedTechniqueData = techniques.find(t => t.id.toString() === selectedTechnique);
    
    navigate('/collaborate/makers', { 
      state: { 
        ...contextData,
        projectDetails: formData,
        selectedMaterial: selectedMaterialData,
        selectedCraft: selectedCraftData,
        selectedTechnique: selectedTechniqueData
      } 
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getSelectedMaterial = () => materials.find(m => m.id.toString() === selectedMaterial);
  const getSelectedCraft = () => filteredCrafts.find(c => c.id.toString() === selectedCraft);
  const getSelectedTechnique = () => techniques.find(t => t.id.toString() === selectedTechnique);

  const handleRetry = () => {
    loadData();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Loading DirectCreate data...</p>
          <p className="text-sm text-muted-foreground mt-2">Fetching materials, crafts, and techniques...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border/50 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="hover:bg-accent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <h1 className="text-lg font-semibold">Project Details</h1>
          
          <div className="w-16" />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-foreground mb-6 leading-tight">
            Project Details
          </h1>
          <p className="text-xl text-muted-foreground">
            Tell us more about your vision using DirectCreate data
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <Alert className="mb-8 border-destructive/20 bg-destructive/5">
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

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Material, Craft, Technique Selection */}
          <div className="bg-card rounded-2xl p-6 border border-border/20">
            <h2 className="text-2xl font-semibold mb-6">Craft Specifications</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Material Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Material</label>
                <Select value={selectedMaterial} onValueChange={handleMaterialChange}>
                  <SelectTrigger className="h-12 rounded-xl">
                    <SelectValue placeholder="Choose DirectCreate material" />
                  </SelectTrigger>
                  <SelectContent>
                    {materials.map((material) => (
                      <SelectItem key={material.id} value={material.id.toString()}>
                        <div className="flex flex-col">
                          <span className="font-medium">{material.name}</span>
                          <span className="text-xs text-muted-foreground">{material.category}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {getSelectedMaterial() && (
                  <div className="text-xs text-muted-foreground p-3 bg-muted/30 rounded-lg">
                    <p className="font-medium mb-1">{getSelectedMaterial().category}</p>
                    <p>{getSelectedMaterial().description}</p>
                    <p className="mt-1">Sustainability: {getSelectedMaterial().sustainability_rating}/10</p>
                  </div>
                )}
              </div>

              {/* Craft Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">
                  Craft
                  {loadingCompatibleCrafts && (
                    <Loader2 className="w-3 h-3 animate-spin inline ml-2" />
                  )}
                </label>
                <Select 
                  value={selectedCraft} 
                  onValueChange={setSelectedCraft}
                  disabled={loadingCompatibleCrafts}
                >
                  <SelectTrigger className="h-12 rounded-xl">
                    <SelectValue placeholder={
                      loadingCompatibleCrafts 
                        ? "Loading compatible crafts..." 
                        : selectedMaterial 
                          ? "Choose compatible craft" 
                          : "Choose DirectCreate craft"
                    } />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredCrafts.map((craft) => (
                      <SelectItem key={craft.id} value={craft.id.toString()}>
                        <div className="flex flex-col">
                          <span className="font-medium">{craft.name}</span>
                          <span className="text-xs text-muted-foreground">{craft.difficulty}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {craftFilterMessage && (
                  <div className="text-xs text-primary p-2 bg-primary/5 border border-primary/20 rounded-lg">
                    {craftFilterMessage}
                  </div>
                )}
                {getSelectedCraft() && (
                  <div className="text-xs text-muted-foreground p-3 bg-muted/30 rounded-lg">
                    <p className="font-medium mb-1">Difficulty: {getSelectedCraft().difficulty}</p>
                    <p>{getSelectedCraft().description}</p>
                    <p className="mt-1">Timeline: {getSelectedCraft().time_estimate}</p>
                  </div>
                )}
              </div>

              {/* Technique Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Technique</label>
                <Select value={selectedTechnique} onValueChange={setSelectedTechnique}>
                  <SelectTrigger className="h-12 rounded-xl">
                    <SelectValue placeholder="Choose DirectCreate technique" />
                  </SelectTrigger>
                  <SelectContent>
                    {techniques.map((technique) => (
                      <SelectItem key={technique.id} value={technique.id.toString()}>
                        <div className="flex flex-col">
                          <span className="font-medium">{technique.name}</span>
                          <span className="text-xs text-muted-foreground">{technique.category}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {getSelectedTechnique() && (
                  <div className="text-xs text-muted-foreground p-3 bg-muted/30 rounded-lg">
                    <p className="font-medium mb-1">{getSelectedTechnique().category}</p>
                    <p>{getSelectedTechnique().description}</p>
                    <p className="mt-1">Difficulty: {getSelectedTechnique().difficulty}</p>
                    <p>Time: {getSelectedTechnique().time_required}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Show pre-selected context */}
            {(contextData.selectedMaterial || contextData.selectedCraft || contextData.selectedTechnique) && (
              <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-xl">
                <p className="text-sm font-medium text-primary mb-2">From your previous selection:</p>
                <div className="flex flex-wrap gap-2">
                  {contextData.selectedMaterial && (
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                      Material: {contextData.selectedMaterial.name}
                    </span>
                  )}
                  {contextData.selectedCraft && (
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                      Craft: {contextData.selectedCraft.name}
                    </span>
                  )}
                  {contextData.selectedTechnique && (
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                      Technique: {contextData.selectedTechnique.name}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          <ProjectOverview formData={formData} onInputChange={handleInputChange} />
          <TimelineBudget formData={formData} onInputChange={handleInputChange} />
          <LocationPreferences formData={formData} onInputChange={handleInputChange} />

          <div className="text-center">
            <Button
              type="submit"
              size="lg"
              className="h-14 px-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-lg"
            >
              Find Compatible Makers
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ProjectForm;
