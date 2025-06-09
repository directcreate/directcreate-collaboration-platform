
import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cleanDescription, truncateText } from "./utils/textUtils";

interface Craft {
  id: string;
  name: string;
  description: string;
  difficulty: string;
  time_estimate: string;
  category: string;
}

interface CraftContentProps {
  craft: Craft;
}

const CraftContent = ({ craft }: CraftContentProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const openCraftDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Use correct DirectCreate URL structure for craft details
    window.open(`https://directcreate.com/products?craft=${craft.id}`, '_blank');
  };

  const fullDescription = cleanDescription(craft.description);

  return (
    <div className="p-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-foreground line-clamp-1">
          {craft.name}
        </h3>
        <Badge variant="secondary" className="ml-2 text-xs">
          {craft.difficulty}
        </Badge>
      </div>
      
      <div className="mb-3">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {isExpanded ? fullDescription : truncateText(craft.description, 100)}
        </p>
        
        {/* Action buttons row */}
        <div className="flex items-center gap-2 mt-2">
          {fullDescription.length > 100 && (
            <button
              onClick={toggleExpanded}
              className="text-primary text-xs hover:underline flex items-center gap-1"
            >
              {isExpanded ? (
                <>Show Less <ChevronUp className="w-3 h-3" /></>
              ) : (
                <>Read More <ChevronDown className="w-3 h-3" /></>
              )}
            </button>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={openCraftDetails}
            className="text-xs h-6 px-2 text-primary hover:text-primary"
          >
            <ExternalLink className="w-3 h-3 mr-1" />
            View Details
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center text-xs text-muted-foreground">
        <span className="bg-muted px-2 py-1 rounded-full">
          {craft.category}
        </span>
        <span>{craft.time_estimate}</span>
      </div>
    </div>
  );
};

export default CraftContent;
