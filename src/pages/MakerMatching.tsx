import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

const MakerMatching = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedMakers, setSelectedMakers] = useState<string[]>([]);

  const makers = [
    {
      id: "rajesh-kumar",
      name: "Rajesh Kumar",
      location: "Jodhpur, Rajasthan",
      specialty: "Traditional Woodworking Expert",
      rating: 4.9,
      reviews: 127,
      experience: "15 years",
      availability: "30% capacity",
      compatibility: 94.7,
      skills: ["Hand Carving", "Wood Joining", "Traditional Polish"],
      completionRate: 96,
      profileImage: "👨‍🎨"
    },
    {
      id: "priya-sharma",
      name: "Priya Sharma",
      location: "Delhi",
      specialty: "Ceramic Artist",
      rating: 4.8,
      reviews: 89,
      experience: "12 years",
      availability: "45% capacity",
      compatibility: 89.2,
      skills: ["Wheel Throwing", "Glazing", "Hand Painting"],
      completionRate: 94,
      profileImage: "👩‍🎨"
    },
    {
      id: "kumar-singh",
      name: "Kumar Singh",
      location: "Ahmedabad, Gujarat",
      specialty: "Textile Craftsman",
      rating: 4.7,
      reviews: 156,
      experience: "18 years",
      availability: "20% capacity",
      compatibility: 87.5,
      skills: ["Block Printing", "Natural Dyeing", "Weaving"],
      completionRate: 92,
      profileImage: "👨‍🎨"
    }
  ];

  const toggleMakerSelection = (makerId: string) => {
    setSelectedMakers(prev => 
      prev.includes(makerId) 
        ? prev.filter(id => id !== makerId)
        : [...prev, makerId]
    );
  };

  const handleContinue = () => {
    if (selectedMakers.length > 0) {
      const selected = makers.filter(maker => selectedMakers.includes(maker.id));
      navigate('/collaborate/request', { 
        state: { 
          ...location.state,
          selectedMakers: selected
        } 
      });
    }
  };

  const topMaker = makers[0];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border/50 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="hover:bg-accent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <h1 className="text-lg font-semibold">Maker Matching</h1>
          
          <div className="w-16" />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-foreground mb-6">
            Perfect makers for your project
          </h1>
          <p className="text-muted-foreground mb-4">
            {makers.length} compatible makers found • Showing top matches
          </p>
        </div>
        
        {/* Top Match */}
        <div className="border-2 border-green-500 bg-green-50 dark:bg-green-950 rounded-3xl p-8 mb-8">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 bg-muted rounded-2xl flex items-center justify-center text-4xl">
              {topMaker.profileImage}
            </div>
            
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-semibold text-foreground">{topMaker.name}</h2>
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    <span className="text-green-600 text-sm">Online</span>
                  </div>
                  <div className="flex items-center gap-4 text-muted-foreground mb-2">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {topMaker.rating}/5 ({topMaker.reviews} reviews)
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {topMaker.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      {topMaker.specialty}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-4xl font-bold text-green-600">{topMaker.compatibility}%</span>
                  <p className="text-sm text-muted-foreground">compatibility</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Why Perfect Match</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Skills: Perfect match for your project</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Availability: {topMaker.availability}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Quality: {topMaker.completionRate}% success rate</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Expertise</h4>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {topMaker.skills.map(skill => (
                      <span key={skill} className="bg-background px-3 py-1 rounded-full text-sm border">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    🏆 {topMaker.completionRate}% completion rate • 💼 {topMaker.experience} experience
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button variant="outline">
                  👀 View Portfolio
                </Button>
                <Button variant="outline">
                  💬 Message
                </Button>
                <Button 
                  onClick={() => toggleMakerSelection(topMaker.id)}
                  className={selectedMakers.includes(topMaker.id) ? "bg-green-500 hover:bg-green-600" : ""}
                >
                  {selectedMakers.includes(topMaker.id) ? "✓ Selected" : "Select for Collaboration"}
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Other Matches */}
        <h3 className="text-2xl font-light text-foreground mb-8">Other excellent matches</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {makers.slice(1).map((maker) => (
            <div 
              key={maker.id} 
              className={`bg-card rounded-3xl p-6 transition-all duration-200 cursor-pointer hover:shadow-md ${
                selectedMakers.includes(maker.id) ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => toggleMakerSelection(maker.id)}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center text-2xl">
                  {maker.profileImage}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-1">{maker.name}</h3>
                  <p className="text-muted-foreground text-sm mb-2">📍 {maker.location}</p>
                  <p className="text-muted-foreground text-sm">⭐ {maker.rating}/5</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-primary">{maker.compatibility}%</span>
                  <span className="text-sm text-muted-foreground block">match</span>
                </div>
              </div>
              
              <Button 
                className="w-full"
                variant={selectedMakers.includes(maker.id) ? "default" : "outline"}
              >
                {selectedMakers.includes(maker.id) ? "✓ Selected" : "Select Maker"}
              </Button>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-muted-foreground mb-6">
            Selected <span className="font-semibold">{selectedMakers.length} maker(s)</span> for your collaboration
          </p>
          <Button
            onClick={handleContinue}
            disabled={selectedMakers.length === 0}
            size="lg"
            className="h-14 px-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-lg disabled:opacity-30"
          >
            Create Collaboration Request
          </Button>
        </div>
      </main>
    </div>
  );
};

export default MakerMatching;
