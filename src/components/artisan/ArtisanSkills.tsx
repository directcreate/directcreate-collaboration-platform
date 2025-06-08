
import { Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ArtisanSkillsProps {
  maker: {
    specialty: string;
    specialtyTechniques: string[];
    materials: string[];
    priceRange: string;
    annualTurnover: string;
    completionRate: number;
  };
}

const ArtisanSkills = ({ maker }: ArtisanSkillsProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <div>
        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <Briefcase className="w-4 h-4" />
          Primary Specialty
        </h4>
        <p className="text-sm text-muted-foreground mb-3">{maker.specialty}</p>
        <div className="flex flex-wrap gap-1">
          {maker.specialtyTechniques.slice(0, 3).map(technique => (
            <Badge key={technique} variant="outline" className="text-xs">
              {technique}
            </Badge>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="font-semibold text-foreground mb-3">Key Materials</h4>
        <div className="space-y-1">
          {maker.materials.slice(0, 4).map(material => (
            <div key={material} className="text-sm text-muted-foreground">• {material}</div>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="font-semibold text-foreground mb-3">Business Info</h4>
        <div className="space-y-1 text-sm text-muted-foreground">
          <div>💰 {maker.priceRange}</div>
          <div>📊 {maker.annualTurnover}</div>
          <div>🏆 {maker.completionRate}% success rate</div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanSkills;
