
import { useState } from "react";
import { ChevronDown, ChevronUp, Sparkles, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { descriptionAnalysisService } from "../../services/descriptionAnalysisService";

interface SmartFilteringProps {
  title: string;
  description: string;
  allItems: any[];
  selectedItem: string;
  onItemSelect: (itemId: string) => void;
  projectDescription: string;
  itemType: 'materials' | 'crafts' | 'techniques';
  renderItem: (item: any, isRecommended?: boolean, reason?: string) => React.ReactNode;
}

const SmartFiltering = ({
  title,
  description,
  allItems,
  selectedItem,
  onItemSelect,
  projectDescription,
  itemType,
  renderItem
}: SmartFilteringProps) => {
  const [showAllItems, setShowAllItems] = useState(false);
  
  console.log('🔍 SmartFiltering - Processing:', {
    projectDescription,
    itemType,
    itemCount: allItems.length
  });
  
  // Get project-specific recommendations
  const recommendations = descriptionAnalysisService.getProjectRecommendations(projectDescription);
  
  if (!recommendations || !projectDescription) {
    console.log('🔍 No recommendations found, showing all items equally');
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-foreground mb-4 leading-tight">
            {title}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground font-light mb-6">
            {description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {allItems.map((item) => (
            <div key={item.id} onClick={() => onItemSelect(item.id)}>
              {renderItem(item)}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Apply smart filtering
  const { recommended, others } = descriptionAnalysisService.filterRecommendedItems(
    allItems,
    recommendations[itemType]
  );

  console.log('🔍 Smart filtering results:', {
    recommendedCount: recommended.length,
    othersCount: others.length,
    projectType: recommendations.projectType
  });

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-foreground mb-4 leading-tight">
          {title}
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground font-light mb-6">
          {description}
        </p>
      </div>

      {/* Smart Recommendations Section */}
      {recommended.length > 0 && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              ✨ Perfect for {recommendations.projectType}
            </CardTitle>
            <CardDescription className="text-base">
              {recommendations.contextMessage}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {recommended.slice(0, 6).map((item) => (
                <div 
                  key={item.id} 
                  className="relative"
                  onClick={() => onItemSelect(item.id)}
                >
                  {renderItem(item, true, item.reason)}
                  <Badge 
                    variant="secondary" 
                    className="absolute top-2 right-2 bg-primary/10 text-primary border-primary/20 text-xs"
                  >
                    <Sparkles className="w-3 h-3 mr-1" />
                    Recommended
                  </Badge>
                </div>
              ))}
            </div>
            
            {recommended.length > 6 && (
              <p className="text-sm text-muted-foreground text-center">
                Showing top 6 recommendations • {recommended.length - 6} more similar options below
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Browse All Section */}
      {others.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-foreground">
              📋 Browse All {itemType.charAt(0).toUpperCase() + itemType.slice(1)}
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAllItems(!showAllItems)}
              className="flex items-center gap-2"
            >
              {showAllItems ? (
                <>
                  Show Less <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  Show All ({others.length}) <ChevronDown className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
          
          {showAllItems && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {others.map((item) => (
                <div key={item.id} onClick={() => onItemSelect(item.id)}>
                  {renderItem(item)}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Show remaining recommended items if more than 6 */}
      {recommended.length > 6 && showAllItems && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">
            ⭐ More Recommendations
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommended.slice(6).map((item) => (
              <div 
                key={item.id} 
                className="relative"
                onClick={() => onItemSelect(item.id)}
              >
                {renderItem(item, true, item.reason)}
                <Badge 
                  variant="secondary" 
                  className="absolute top-2 right-2 bg-primary/10 text-primary border-primary/20 text-xs"
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  Recommended
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartFiltering;
