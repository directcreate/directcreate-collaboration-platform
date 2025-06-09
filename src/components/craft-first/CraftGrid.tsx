
import CraftCard from "./CraftCard";

interface Craft {
  id: string;
  name: string;
  icon: string;
  description: string;
  difficulty: string;
  time_estimate: string;
  banner: string;
  bannerImage?: string; // ✅ Add bannerImage property
  category: string;
}

interface CraftGridProps {
  crafts: Craft[];
  selectedCraft: string;
  onCraftSelect: (craftId: string) => void;
}

const CraftGrid = ({ crafts, selectedCraft, onCraftSelect }: CraftGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {crafts.map((craft) => (
        <CraftCard
          key={craft.id}
          craft={craft}
          isSelected={selectedCraft === craft.id}
          onSelect={onCraftSelect}
        />
      ))}
    </div>
  );
};

export default CraftGrid;
