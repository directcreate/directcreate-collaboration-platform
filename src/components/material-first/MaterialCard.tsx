
interface Material {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: string;
  sustainability_rating: number;
}

interface MaterialCardProps {
  material: Material;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const MaterialCard = ({ material, isSelected, onSelect }: MaterialCardProps) => {
  return (
    <div
      onClick={() => onSelect(material.id)}
      className={`bg-card rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg ${
        isSelected
          ? 'ring-2 ring-primary shadow-lg'
          : 'hover:shadow-md'
      }`}
    >
      <div className="text-center">
        <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl mb-2 sm:mb-3 lg:mb-4">
          {material.icon}
        </div>
        <h3 className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-foreground mb-1 sm:mb-2 line-clamp-2">
          {material.name}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground font-medium line-clamp-2 sm:line-clamp-3">
          {material.description}
        </p>
      </div>
    </div>
  );
};

export default MaterialCard;
