
import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
  const [imageError, setImageError] = useState(false);

  // Clean HTML description and extract plain text
  const cleanDescription = (htmlDescription: string) => {
    if (!htmlDescription) return '';
    
    // Create a temporary div to extract text from HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlDescription;
    const cleanText = tempDiv.textContent || tempDiv.innerText || '';
    
    return cleanText.trim();
  };

  // Truncate text to specified length
  const truncateText = (text: string, maxLength: number = 100) => {
    const cleanText = cleanDescription(text);
    if (cleanText.length <= maxLength) return cleanText;
    return cleanText.substring(0, maxLength).trim() + '...';
  };

  const toggleExpanded = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const openCraftDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`https://directcreate.com/crafts/${craft.id}`, '_blank');
  };

  // Get a fallback image based on craft name/category
  const getFallbackImage = () => {
    const name = craft.name.toLowerCase();
    if (name.includes('painting') || name.includes('3d painting')) {
      return 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop&auto=format';
    }
    if (name.includes('accessories') || name.includes('jewelry')) {
      return 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop&auto=format';
    }
    if (name.includes('weaving') || name.includes('textile')) {
      return 'https://images.unsplash.com/photo-1586985289906-406988974504?w=400&h=300&fit=crop&auto=format';
    }
    if (name.includes('pottery') || name.includes('ceramic')) {
      return 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&auto=format';
    }
    if (name.includes('wood') || name.includes('carving')) {
      return 'https://images.unsplash.com/photo-1609205807107-171cea41d6cd?w=400&h=300&fit=crop&auto=format';
    }
    // Default fallback
    return 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400&h=300&fit=crop&auto=format';
  };

  const fullDescription = cleanDescription(craft.description);
  const displayImage = imageError ? getFallbackImage() : (craft.banner || getFallbackImage());

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
      <div className="relative h-48 overflow-hidden bg-muted">
        <img
          src={displayImage}
          alt={craft.name}
          className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
          onError={() => setImageError(true)}
          onLoad={() => setImageError(false)}
        />
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
      </CardContent>
    </Card>
  );
};

export default CraftCard;
