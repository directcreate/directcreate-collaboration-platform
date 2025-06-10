
import { Star, Award, MapPin, Lightbulb } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface ArtisanCardProps {
  artisan: any;
}

const ArtisanCard = ({ artisan }: ArtisanCardProps) => {
  // Safe fallback for name
  const artisanName = artisan?.name || 'Unknown Artisan';
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card className="border-border/50 hover:border-primary/50 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={artisan?.profile_photo} alt={artisanName} />
            <AvatarFallback>{getInitials(artisanName)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <CardTitle className="text-lg">{artisanName}</CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3" />
              {artisan?.location || 'Location not specified'}
            </CardDescription>
          </div>

          {/* Compatibility Score */}
          <div className="text-right">
            <div className="bg-primary text-primary-foreground px-2 py-1 rounded-lg text-sm font-bold">
              {artisan?.compatibility_score || 0}%
            </div>
            <div className="text-xs text-muted-foreground mt-1">match</div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* AI Reasoning */}
        {artisan?.ai_reasoning && (
          <div className="mb-4 p-3 bg-muted/30 rounded-lg">
            <div className="flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">{artisan.ai_reasoning}</p>
            </div>
          </div>
        )}

        {/* Adapted Specialties */}
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2">Specialized In:</h4>
          <div className="flex flex-wrap gap-1">
            {artisan?.adapted_specialties?.map((specialty, index) => (
              <span key={index} className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded">
                {specialty}
              </span>
            ))}
          </div>
        </div>

        {/* Experience & Rating */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <Award className="w-4 h-4 text-muted-foreground" />
            <span>{artisan?.years_experience || 0} years</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{artisan?.rating || 0}/5</span>
          </div>
        </div>

        {/* Education/Background */}
        {artisan?.education && (
          <div className="mt-3 text-xs text-muted-foreground">
            {artisan.education}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ArtisanCard;
