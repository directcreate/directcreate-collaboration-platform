
import ArtisanHeader from './ArtisanHeader';
import ArtisanSkills from './ArtisanSkills';
import ArtisanPortfolio from './ArtisanPortfolio';
import ArtisanActions from './ArtisanActions';

interface ArtisanCardProps {
  maker: any;
  isSelected: boolean;
  onToggleSelection: (makerId: string) => void;
}

const ArtisanCard = ({ maker, isSelected, onToggleSelection }: ArtisanCardProps) => {
  return (
    <div 
      className={`bg-card rounded-3xl overflow-hidden shadow-sm border transition-all duration-200 hover:shadow-lg ${
        isSelected ? 'ring-2 ring-primary' : ''
      }`}
    >
      <ArtisanHeader maker={maker} />
      
      <div className="p-6">
        <ArtisanSkills maker={maker} />
        <ArtisanPortfolio maker={maker} />
        <ArtisanActions 
          makerId={maker.id}
          isSelected={isSelected}
          onToggleSelection={onToggleSelection}
        />
      </div>
    </div>
  );
};

export default ArtisanCard;
