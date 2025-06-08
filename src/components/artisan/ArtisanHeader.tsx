
import { Star, MapPin, Award, Clock } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface ArtisanHeaderProps {
  maker: {
    id: string;
    name: string;
    organization: string;
    location: string;
    bannerImage: string;
    profilePhoto: string;
    rating: number;
    reviews: number;
    experience: string;
    responseTime: string;
    availability: string;
    matchPercentage: number;
  };
}

const ArtisanHeader = ({ maker }: ArtisanHeaderProps) => {
  return (
    <div className="relative h-48 overflow-hidden">
      <img 
        src={maker.bannerImage} 
        alt={`${maker.name} workshop`}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      
      {/* Profile Photo Overlay */}
      <div className="absolute bottom-4 left-6 flex items-end gap-4">
        <Avatar className="w-20 h-20 border-4 border-white">
          <AvatarImage src={maker.profilePhoto} alt={maker.name} />
          <AvatarFallback>{maker.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        
        <div className="text-white mb-2">
          <h3 className="text-xl font-bold">{maker.name}</h3>
          <p className="text-sm opacity-90">{maker.organization}</p>
          <p className="text-xs opacity-75 flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {maker.location}
          </p>
        </div>
      </div>

      {/* Match Percentage Badge */}
      <div className="absolute top-4 right-4">
        <div className="bg-primary text-primary-foreground px-3 py-2 rounded-full text-sm font-bold">
          {maker.matchPercentage}% match
        </div>
      </div>

      {/* Stats Section */}
      <div className="absolute bottom-0 left-0 right-0 p-6 pt-24">
        <div className="flex items-center gap-4 text-sm text-white/90 mb-2">
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            {maker.rating}/5 ({maker.reviews} reviews)
          </span>
          <span className="flex items-center gap-1">
            <Award className="w-4 h-4" />
            {maker.experience} experience
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {maker.responseTime}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${maker.availability === 'Available' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
          <span className={`text-sm font-medium ${maker.availability === 'Available' ? 'text-green-300' : 'text-yellow-300'}`}>
            {maker.availability}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArtisanHeader;
