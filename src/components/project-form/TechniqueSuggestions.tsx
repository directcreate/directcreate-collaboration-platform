
import { Loader2, Lightbulb } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface TechniqueSuggestionsProps {
  selectedMaterial: string;
  selectedCraft: string;
  suggestedTechniques: any[];
  loadingCompatibleTechniques: boolean;
  techniqueFilterMessage: string;
  onTechniqueChange: (techniqueId: string) => void;
}

const TechniqueSuggestions = ({
  selectedMaterial,
  selectedCraft,
  suggestedTechniques,
  loadingCompatibleTechniques,
  techniqueFilterMessage,
  onTechniqueChange
}: TechniqueSuggestionsProps) => {

  if (!selectedMaterial || !selectedCraft) {
    return null;
  }

  return (
    <div className="mt-8">
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-primary" />
            Technique Suggestions
            {loadingCompatibleTechniques && (
              <Loader2 className="w-4 h-4 animate-spin" />
            )}
          </CardTitle>
          <CardDescription>
            {techniqueFilterMessage || "Based on your material and craft selection"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {suggestedTechniques.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {suggestedTechniques.map((technique) => (
                <div
                  key={technique.id}
                  className="p-3 bg-background rounded-lg border border-border/50 hover:border-primary/50 transition-colors cursor-pointer"
                  onClick={() => onTechniqueChange(technique.id.toString())}
                >
                  <h4 className="font-medium text-sm">{technique.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{technique.category}</p>
                  <p className="text-xs text-muted-foreground mt-1">{technique.difficulty}</p>
                </div>
              ))}
            </div>
          ) : (
            !loadingCompatibleTechniques && (
              <p className="text-sm text-muted-foreground">
                No technique suggestions available for this combination.
              </p>
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TechniqueSuggestions;
