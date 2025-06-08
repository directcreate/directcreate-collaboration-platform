
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectOverview from "@/components/project-form/ProjectOverview";
import TimelineBudget from "@/components/project-form/TimelineBudget";
import LocationPreferences from "@/components/project-form/LocationPreferences";

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

  const contextData = location.state || {};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/collaborate/makers', { 
      state: { 
        ...contextData,
        projectDetails: formData
      } 
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
            Tell us more about your vision
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
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
