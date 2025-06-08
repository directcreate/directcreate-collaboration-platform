
import { Badge } from "@/components/ui/badge";

interface ArtisanPortfolioProps {
  maker: {
    aboutMe: string;
    awards: string[];
    portfolioImages: string[];
  };
}

const ArtisanPortfolio = ({ maker }: ArtisanPortfolioProps) => {
  return (
    <div className="space-y-4 mb-6">
      <div>
        <h4 className="font-semibold text-foreground mb-2">About Me</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">{maker.aboutMe}</p>
      </div>
      
      <div>
        <h4 className="font-semibold text-foreground mb-2">Recent Awards</h4>
        <div className="flex flex-wrap gap-2">
          {maker.awards.map(award => (
            <Badge key={award} variant="secondary" className="text-xs">
              🏆 {award}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-foreground mb-3">Portfolio Showcase</h4>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {maker.portfolioImages.map((image, index) => (
            <div key={index} className="flex-shrink-0">
              <img 
                src={image} 
                alt={`Portfolio ${index + 1}`}
                className="w-20 h-20 object-cover rounded-lg border"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtisanPortfolio;
