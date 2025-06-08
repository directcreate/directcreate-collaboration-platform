
import { Eye, MessageSquare, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ArtisanActionsProps {
  makerId: string;
  isSelected: boolean;
  onToggleSelection: (makerId: string) => void;
}

const ArtisanActions = ({ makerId, isSelected, onToggleSelection }: ArtisanActionsProps) => {
  return (
    <div className="flex gap-3 flex-wrap">
      <Button variant="outline" size="sm">
        <Eye className="w-4 h-4 mr-2" />
        View Full Profile
      </Button>
      <Button variant="outline" size="sm">
        <MessageSquare className="w-4 h-4 mr-2" />
        Send Message
      </Button>
      <Button 
        onClick={() => onToggleSelection(makerId)}
        className={`flex-1 ${isSelected ? 'bg-primary hover:bg-primary/90' : ''}`}
        variant={isSelected ? "default" : "outline"}
      >
        {isSelected ? (
          <>
            <Check className="w-4 h-4 mr-2" />
            Selected for Collaboration
          </>
        ) : (
          "Select for Collaboration"
        )}
      </Button>
    </div>
  );
};

export default ArtisanActions;
