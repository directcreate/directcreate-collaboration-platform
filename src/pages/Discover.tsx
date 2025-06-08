
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Star, MapPin, Users, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockDirectCreateAPI } from "@/services/mockData";

const Discover = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedMakers, setSelectedMakers] = useState<string[]>([]);
  const [makers, setMakers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const intent = location.state?.intent || "";

  useEffect(() => {
    const loadData = async () => {
      try {
        const artisansData = await mockDirectCreateAPI.getArtisans();
        // Duplicate the artisans to show 12 total (2 sets of 6)
        const duplicatedArtisans = [
          ...artisansData.data,
          ...artisansData.data.map(artisan => ({
            ...artisan,
            id: `${artisan.id}-2`
          }))
        ];
        setMakers(duplicatedArtisans);
      } catch (error) {
        console.error("Failed to load artisans:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const toggleMaker = (makerId: string) => {
    setSelectedMakers(prev => 
      prev.includes(makerId) 
        ? prev.filter(id => id !== makerId)
        : [...prev, makerId]
    );
  };

  const handleConnect = () => {
    if (selectedMakers.length > 0) {
      const selectedMakerDetails = makers.filter(maker => 
        selectedMakers.includes(maker.id)
      );
      navigate("/connect", { 
        state: { 
          intent, 
          selectedMakers: selectedMakerDetails 
        } 
      });
    }
  };

  const handleViewProfile = (makerId: string) => {
    console.log(`View profile for artisan: ${makerId}`);
  };

  if (loading) {
    return (
      <div className="h-screen bg-background flex items-center justify-center">
        <div className="text-lg text-muted-foreground">Loading DirectCreate artisans...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border/20">
        <div className="px-4 sm:px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="hover:bg-accent rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2 stroke-[1.5]" />
            Back
          </Button>
          
          <h1 className="text-lg font-medium">Discover Artisans</h1>
          
          <div className="w-16" />
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 py-6 max-w-7xl mx-auto">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-light text-foreground mb-3 leading-tight">
            Discover Master Artisans
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Connect with skilled craftspeople across India who bring traditional techniques to life
          </p>
        </div>

        {/* Artisans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {makers.map((maker) => (
            <Card
              key={maker.id}
              className={`relative cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] overflow-hidden ${
                selectedMakers.includes(maker.id)
                  ? "ring-2 ring-primary shadow-lg"
                  : "hover:shadow-md"
              }`}
            >
              {/* Selection Indicator */}
              {selectedMakers.includes(maker.id) && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center z-10">
                  <Check className="w-4 h-4 text-primary-foreground stroke-[2]" />
                </div>
              )}

              {/* Banner Image - Full Width */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={maker.bannerImage}
                  alt={`${maker.name} workshop`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                {/* Availability Badge */}
                <div className="absolute top-3 left-3">
                  <Badge 
                    variant={maker.availability === 'Available' ? 'default' : 'secondary'}
                    className={`text-xs ${
                      maker.availability === 'Available' 
                        ? 'bg-green-500 hover:bg-green-600 text-white' 
                        : maker.availability === 'Busy'
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                    }`}
                  >
                    {maker.availability}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-4">
                {/* Artisan Info */}
                <div className="mb-3">
                  <h4 className="font-semibold text-foreground mb-1">
                    {maker.name}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-1">
                    {maker.organization}
                  </p>
                  <p className="text-xs text-primary font-medium mb-2">
                    {maker.specialty}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {maker.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      {maker.experience}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                      <span className="text-sm font-medium text-foreground mr-1">
                        {maker.rating}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({maker.reviews})
                      </span>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="w-3 h-3 mr-1" />
                      {maker.responseTime}
                    </div>
                  </div>
                </div>

                {/* Brief Description */}
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  {maker.aboutMe.substring(0, 100)}...
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {maker.skills.slice(0, 3).map((skill: string, idx: number) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                {/* Portfolio Thumbnails */}
                <div className="mb-4">
                  <p className="text-xs font-medium text-foreground mb-2">Recent Work</p>
                  <div className="flex gap-1">
                    {maker.portfolioImages.slice(0, 3).map((image: string, idx: number) => (
                      <img
                        key={idx}
                        src={image}
                        alt={`Portfolio ${idx + 1}`}
                        className="w-12 h-12 object-cover rounded border"
                      />
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewProfile(maker.id);
                    }}
                  >
                    View Profile
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMaker(maker.id);
                    }}
                  >
                    {selectedMakers.includes(maker.id) ? 'Selected' : 'Select'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Connect Button */}
        <div className="text-center">
          <Button
            onClick={handleConnect}
            disabled={selectedMakers.length === 0}
            size="lg"
            className="h-12 px-8 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Users className="w-5 h-5 mr-2" />
            Connect with {selectedMakers.length > 0 ? selectedMakers.length : ""} Artisan{selectedMakers.length !== 1 ? "s" : ""}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Discover;
