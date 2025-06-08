import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ProjectOverview from "@/components/project-form/ProjectOverview";
import TimelineBudget from "@/components/project-form/TimelineBudget";
import LocationPreferences from "@/components/project-form/LocationPreferences";
import CraftSelection from "@/components/project-form/CraftSelection";
import ArtisanMatching from "@/components/project-form/ArtisanMatching";
import { useDirectCreateData } from "../hooks/useDirectCreateData";

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

  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedCraft, setSelectedCraft] = useState("");
  const [selectedTechnique, setSelectedTechnique] = useState("");

  const contextData = location.state || {};
  const { materials, crafts, techniques, loading, error, handleRetry } = useDirectCreateData();

  // Pre-populate selections from previous pages
  useEffect(() => {
    if (contextData.selectedMaterial) {
      setSelectedMaterial(contextData.selectedMaterial.id.toString());
    }
    if (contextData.selectedCraft) {
      setSelectedCraft(contextData.selectedCraft.id.toString());
    }
    if (contextData.selectedTechnique) {
      setSelectedTechnique(contextData.selectedTechnique.id.toString());
    }
  }, [contextData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedMaterialData = materials.find(m => m.id.toString() === selectedMaterial);
    const selectedCraftData = crafts.find(c => c.id.toString() === selectedCraft);
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
          <CraftSelection
            materials={materials}
            crafts={crafts}
            techniques={techniques}
            selectedMaterial={selectedMaterial}
            selectedCraft={selectedCraft}
            selectedTechnique={selectedTechnique}
            onMaterialChange={setSelectedMaterial}
            onCraftChange={setSelectedCraft}
            onTechniqueChange={setSelectedTechnique}
            contextData={contextData}
          />

          <ArtisanMatching
            selectedMaterial={selectedMaterial}
            selectedCraft={selectedCraft}
            selectedTechnique={selectedTechnique}
            materials={materials}
            crafts={crafts}
            techniques={techniques}
          />

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
