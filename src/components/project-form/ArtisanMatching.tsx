
import { useState, useEffect } from "react";
import { Users, Star, Award, MapPin, Lightbulb, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { directCreateAPI } from "../../config/api";

interface ArtisanMatchingProps {
  selectedMaterial: string;
  selectedCraft: string;
  selectedTechnique: string;
  materials: any[];
  crafts: any[];
  techniques: any[];
}

const ArtisanMatching = ({
  selectedMaterial,
  selectedCraft,
  selectedTechnique,
  materials,
  crafts,
  techniques
}: ArtisanMatchingProps) => {
  const [compatibleArtisans, setCompatibleArtisans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const loadCompatibleArtisans = async (materialId?: string, craftId?: string, techniqueId?: string) => {
    if (!materialId && !craftId) {
      setCompatibleArtisans([]);
      setMessage("");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      console.log('🔄 Loading compatible artisans for selection...');
      
      const response = await directCreateAPI.getCompatibleArtisans(
        materialId ? parseInt(materialId) : undefined,
        craftId ? parseInt(craftId) : undefined,
        techniqueId ? parseInt(techniqueId) : undefined
      );
      
      if (response.success && Array.isArray(response.data)) {
        setCompatibleArtisans(response.data);
        if (response.data.length === 0) {
          setMessage("No specialized artisans found for this combination");
        } else {
          setMessage(`${response.data.length} specialized artisan${response.data.length !== 1 ? 's' : ''} found`);
        }
        console.log('✅ Compatible artisans loaded:', response.data.length);
      } else {
        console.error('Compatible artisans API error:', response.message);
        setCompatibleArtisans([]);
        setMessage("Unable to load artisan matches");
      }
    } catch (error) {
      console.error('❌ Error loading compatible artisans:', error);
      setCompatibleArtisans([]);
      setMessage("Error loading artisan matches");
    } finally {
      setLoading(false);
    }
  };

  // Load compatible artisans when selections change
  useEffect(() => {
    if (selectedMaterial || selectedCraft) {
      loadCompatibleArtisans(selectedMaterial, selectedCraft, selectedTechnique);
    } else {
      setCompatibleArtisans([]);
      setMessage("");
    }
  }, [selectedMaterial, selectedCraft, selectedTechnique]);

  const getSelectedMaterial = () => materials.find(m => m.id.toString() === selectedMaterial);
  const getSelectedCraft = () => crafts.find(c => c.id.toString() === selectedCraft);
  const getSelectedTechnique = () => techniques.find(t => t.id.toString() === selectedTechnique);

  if (!selectedMaterial && !selectedCraft) {
    return null;
  }

  return (
    <div className="bg-card rounded-2xl p-6 border border-border/20">
      <div className="flex items-center gap-3 mb-6">
        <Users className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-semibold">Specialized Artisans</h2>
        {loading && <Loader2 className="w-5 h-5 animate-spin" />}
      </div>

      {/* Selection Summary */}
      <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-xl">
        <p className="text-sm font-medium text-primary mb-2">Finding specialists for:</p>
        <div className="flex flex-wrap gap-2">
          {getSelectedMaterial() && (
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
              {getSelectedMaterial().name}
            </span>
          )}
          {getSelectedCraft() && (
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
              {getSelectedCraft().name}
            </span>
          )}
          {getSelectedTechnique() && (
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
              {getSelectedTechnique().name}
            </span>
          )}
        </div>
      </div>

      {message && (
        <div className="text-sm text-primary p-3 bg-primary/5 border border-primary/20 rounded-lg mb-6">
          {message}
        </div>
      )}

      {/* Artisan Cards */}
      {compatibleArtisans.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {compatibleArtisans.map((artisan) => (
            <Card key={artisan.id} className="border-border/50 hover:border-primary/50 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={artisan.profile_photo} alt={artisan.name} />
                    <AvatarFallback>{artisan.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <CardTitle className="text-lg">{artisan.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {artisan.location}
                    </CardDescription>
                  </div>

                  {/* Compatibility Score */}
                  <div className="text-right">
                    <div className="bg-primary text-primary-foreground px-2 py-1 rounded-lg text-sm font-bold">
                      {artisan.compatibility_score}%
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">match</div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                {/* AI Reasoning */}
                {artisan.ai_reasoning && (
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
                    {artisan.adapted_specialties?.map((specialty, index) => (
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
                    <span>{artisan.years_experience} years</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{artisan.rating}/5</span>
                  </div>
                </div>

                {/* Education/Background */}
                {artisan.education && (
                  <div className="mt-3 text-xs text-muted-foreground">
                    {artisan.education}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {loading && compatibleArtisans.length === 0 && (
        <div className="text-center py-8">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Finding specialized artisans...</p>
        </div>
      )}

      {!loading && compatibleArtisans.length === 0 && (selectedMaterial || selectedCraft) && (
        <div className="text-center py-8">
          <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">No specialized artisans found for this combination.</p>
          <p className="text-sm text-muted-foreground mt-2">Try selecting different materials or crafts.</p>
        </div>
      )}
    </div>
  );
};

export default ArtisanMatching;
