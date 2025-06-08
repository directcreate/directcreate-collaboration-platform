
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TechniqueSelectionProps {
  techniques: any[];
  selectedTechnique: string;
  onTechniqueChange: (techniqueId: string) => void;
}

const TechniqueSelection = ({
  techniques,
  selectedTechnique,
  onTechniqueChange
}: TechniqueSelectionProps) => {

  const getSelectedTechnique = () => techniques.find(t => t.id.toString() === selectedTechnique);

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">Technique</label>
      <Select value={selectedTechnique} onValueChange={onTechniqueChange}>
        <SelectTrigger className="h-12 rounded-xl">
          <SelectValue placeholder="Choose DirectCreate technique" />
        </SelectTrigger>
        <SelectContent>
          {techniques.map((technique) => (
            <SelectItem key={technique.id} value={technique.id.toString()}>
              <div className="flex flex-col">
                <span className="font-medium">{technique.name}</span>
                <span className="text-xs text-muted-foreground">{technique.category}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {getSelectedTechnique() && (
        <div className="text-xs text-muted-foreground p-3 bg-muted/30 rounded-lg">
          <p className="font-medium mb-1">{getSelectedTechnique().category}</p>
          <p>{getSelectedTechnique().description}</p>
          <p className="mt-1">Difficulty: {getSelectedTechnique().difficulty}</p>
          <p>Time: {getSelectedTechnique().time_required}</p>
        </div>
      )}
    </div>
  );
};

export default TechniqueSelection;
