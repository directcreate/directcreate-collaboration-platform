
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProjectFormHeader from "@/components/project-form/ProjectFormHeader";
import ProjectFormTitle from "@/components/project-form/ProjectFormTitle";
import ErrorDisplay from "@/components/project-form/ErrorDisplay";
import LoadingScreen from "@/components/project-form/LoadingScreen";
import ProjectFormContent from "@/components/project-form/ProjectFormContent";
import ContextDisplay from "@/components/project-form/ContextDisplay";
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

  const handleBack = () => navigate(-1);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-background">
      <ProjectFormHeader onBack={handleBack} />
      
      <ProjectFormTitle contextData={contextData} />
      
      <ErrorDisplay error={error} onRetry={handleRetry} />

      {/* Context Display */}
      <ContextDisplay contextData={contextData} />

      <ProjectFormContent
        formData={formData}
        selectedMaterial={selectedMaterial}
        selectedCraft={selectedCraft}
        selectedTechnique={selectedTechnique}
        materials={materials}
        crafts={crafts}
        techniques={techniques}
        contextData={contextData}
        onInputChange={handleInputChange}
        onMaterialChange={setSelectedMaterial}
        onCraftChange={setSelectedCraft}
        onTechniqueChange={setSelectedTechnique}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ProjectForm;
