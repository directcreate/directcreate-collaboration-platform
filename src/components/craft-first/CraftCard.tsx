
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface CraftCardProps {
  craft: {
    id: string;
    name: string;
    icon: string;
    description: string;
    difficulty: string;
    time_estimate: string;
    banner: string;
    category: string;
  };
  isSelected: boolean;
  onSelect: (craftId: string) => void;
}

const CraftCard = ({ craft, isSelected, onSelect }: CraftCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Utility function to truncate text
  const truncateText = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  const toggleExpanded = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <Card
      onClick={() => onSelect(craft.id)}
      className={`cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg overflow-hidden ${
        isSelected
          ? 'ring-2 ring-primary shadow-lg'
          : 'hover:shadow-md'
      }`}
    >
      {/* Craft Banner Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={craft.banner || 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'}
          alt={craft.name}
          className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
          onError={(e) => {
            // Fallback to placeholder if banner fails to load
            e.currentTarget.src = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop';
          }}
        />
        {/* Overlay with icon */}
        <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full p-2">
          <span className="text-2xl">{craft.icon}</span>
        </div>
      </div>

      <CardContent className="p-4">
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
            {isExpanded 
              ? craft.description 
              : truncateText(craft.description, 120)
            }
          </p>
          {craft.description.length > 120 && (
            <button
              onClick={toggleExpanded}
              className="text-primary text-xs mt-1 hover:underline flex items-center gap-1"
            >
              {isExpanded ? (
                <>Show Less <ChevronUp className="w-3 h-3" /></>
              ) : (
                <>Read More <ChevronDown className="w-3 h-3" /></>
              )}
            </button>
          )}
        </div>

        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span className="bg-muted px-2 py-1 rounded-full">
            {craft.category}
          </span>
          <span>{craft.time_estimate}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CraftCard;
