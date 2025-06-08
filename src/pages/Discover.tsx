
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
        setMakers(artisansData.data);
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

  const handleViewAll = () => {
    console.log("Navigate to full artisan directory");
  };

  if (loading) {
    return (
      <div className="h-screen bg-background flex items-center justify-center">
        <div className="text-lg text-muted-foreground">Loading DirectCreate artisans...</div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <header className="px-4 sm:px-6 py-4 flex items-center justify-between border-b border-border/20 flex-shrink-0">
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
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-6 py-6 sm:py-8 max-w-7xl mx-auto w-full flex flex-col min-h-0 overflow-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-foreground mb-4 leading-tight">
            Discover Master Artisans
            <br />
            on DirectCreate
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-light">
            Connect with skilled craftspeople across India who bring traditional techniques to life
          </p>
        </div>

        {/* Featured Artisans Grid */}
        <section className="mb-12">
          <h3 className="text-2xl font-semibold mb-8 text-foreground">Featured Artisans</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {makers.slice(0, 8).map((maker) => (
              <Card
                key={maker.id}
                onClick={() => toggleMaker(maker.id)}
                className={`relative cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] overflow-hidden ${
                  selectedMakers.includes(maker.id)
                    ? "ring-2 ring-primary shadow-lg"
                    : "hover:shadow-md"
                }`}
              >
                {selectedMakers.includes(maker.id) && (
                  <div className="absolute top-4 right-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center z-10">
                    <Check className="w-4 h-4 text-primary-foreground stroke-[2]" />
                  </div>
                )}

                {/* Banner Image */}
                <div className="h-32 overflow-hidden relative">
                  <img
                    src={maker.bannerImage}
                    alt={`${maker.name} workshop`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Availability Status */}
                  <div className="absolute top-3 left-3">
                    <Badge 
                      variant={maker.availability === 'Available' ? 'default' : 'secondary'}
                      className={`text-xs ${
                        maker.availability === 'Available' 
                          ? 'bg-green-500 hover:bg-green-600' 
                          : maker.availability === 'Busy'
                          ? 'bg-red-500 hover:bg-red-600'
                          : 'bg-yellow-500 hover:bg-yellow-600'
                      }`}
                    >
                      {maker.availability}
                    </Badge>
                  </div>

                  {/* Profile Photo Overlay */}
                  <div className="absolute -bottom-6 left-4">
                    <img
                      src={maker.profilePhoto}
                      alt={maker.name}
                      className="w-12 h-12 rounded-full border-2 border-white object-cover"
                    />
                  </div>
                </div>

                <CardContent className="p-4 pt-8">
                  <div className="text-center mb-4">
                    <h4 className="font-bold text-foreground mb-1 text-base">
                      {maker.name}
                    </h4>
                    <p className="text-xs text-muted-foreground font-medium mb-1">
                      {maker.organization}
                    </p>
                    <p className="text-xs text-primary font-medium mb-3">
                      {maker.specialty}
                    </p>
                    
                    <div className="flex items-center justify-center gap-4 mb-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {maker.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        {maker.experience}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-center mb-3">
                      <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                      <span className="text-sm font-bold text-foreground mr-1">
                        {maker.rating}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({maker.reviews} reviews)
                      </span>
                    </div>

                    <div className="flex items-center justify-center mb-3">
                      <Clock className="w-3 h-3 text-muted-foreground mr-1" />
                      <span className="text-xs text-muted-foreground">
                        Responds in {maker.responseTime}
                      </span>
                    </div>

                    {/* About Me Section */}
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3 text-left">
                      {maker.aboutMe.substring(0, 120)}...
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1 justify-center mb-3">
                      {maker.skills.slice(0, 2).map((skill: string, idx: number) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {maker.skills.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{maker.skills.length - 2}
                        </Badge>
                      )}
                    </div>

                    {/* Portfolio Thumbnails */}
                    <div>
                      <p className="text-xs font-medium text-foreground mb-2">Portfolio</p>
                      <div className="flex gap-1 justify-center">
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
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* View All Artisans Button */}
          <div className="text-center mb-8">
            <Button
              onClick={handleViewAll}
              variant="outline"
              size="lg"
              className="h-12 px-8 rounded-xl border-2 hover:bg-accent"
            >
              View All Artisans
            </Button>
          </div>
        </section>

        {/* Connect Button */}
        <div className="text-center flex-shrink-0">
          <Button
            onClick={handleConnect}
            disabled={selectedMakers.length === 0}
            size="lg"
            className="h-14 px-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
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
