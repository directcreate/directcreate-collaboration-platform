
import { Sparkles } from "lucide-react";

interface ProjectOverviewProps {
  formData: {
    title: string;
    description: string;
  };
  onInputChange: (field: string, value: string) => void;
}

const ProjectOverview = ({ formData, onInputChange }: ProjectOverviewProps) => {
  return (
    <div className="bg-card rounded-3xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-2xl font-semibold text-foreground">Project Overview</h2>
        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
          <Sparkles className="w-3 h-3 inline mr-1" />
          AI Enhanced
        </span>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-foreground font-medium mb-2">Project Title</label>
          <input 
            type="text" 
            value={formData.title}
            onChange={(e) => onInputChange('title', e.target.value)}
            className="w-full border border-border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-primary bg-background"
            placeholder="e.g., Custom Dining Table"
            required
          />
        </div>
        
        <div>
          <label className="block text-foreground font-medium mb-2">Description</label>
          <textarea 
            value={formData.description}
            onChange={(e) => onInputChange('description', e.target.value)}
            className="w-full h-32 border border-border rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-primary bg-background"
            placeholder="Describe your vision in detail..."
            required
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;
