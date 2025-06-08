
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectFormHeaderProps {
  onBack: () => void;
}

const ProjectFormHeader = ({ onBack }: ProjectFormHeaderProps) => {
  return (
    <header className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border/50 z-10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="hover:bg-accent"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        <h1 className="text-lg font-semibold">Project Details</h1>
        
        <div className="w-16" />
      </div>
    </header>
  );
};

export default ProjectFormHeader;
