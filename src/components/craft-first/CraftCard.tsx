
import { Card, CardContent } from "@/components/ui/card";
import CraftImage from "./CraftImage";
import CraftContent from "./CraftContent";

interface CraftCardProps {
  craft: {
    id: string;
    name: string;
    icon: string;
    description: string;
    difficulty: string;
    time_estimate: string;
    banner: string;
    bannerImage?: string; // Real DirectCreate banner from API
    category: string;
    detailUrl?: string; // Add detailUrl property from API
  };
  isSelected: boolean;
  onSelect: (craftId: string) => void;
}

const CraftCard = ({ craft, isSelected, onSelect }: CraftCardProps) => {
  // Debug log to see what's being received
  console.log('🔍 Craft received in CraftCard:', craft.name);
  console.log('🔍 Banner URL from API:', craft.bannerImage);
  console.log('🔍 Detail URL from API:', craft.detailUrl);

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
      <CraftImage craft={craft} />

      <CardContent className="p-0">
        <CraftContent craft={craft} />
      </CardContent>
    </Card>
  );
};

export default CraftCard;
