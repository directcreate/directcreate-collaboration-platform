
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Maker {
  id: string;
  name: string;
  specialty: string;
  image: string;
  rating: number;
  location: string;
}

const makers: Maker[] = [
  {
    id: "1",
    name: "Elena Rodriguez",
    specialty: "Ceramic Artisan",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    rating: 4.9,
    location: "Portland, OR"
  },
  {
    id: "2",
    name: "Marcus Chen",
    specialty: "Woodworker",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    rating: 4.8,
    location: "San Francisco, CA"
  },
  {
    id: "3",
    name: "Sofia Nakamura",
    specialty: "Textile Designer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    rating: 4.9,
    location: "Brooklyn, NY"
  },
  {
    id: "4",
    name: "James Mitchell",
    specialty: "Metalworker",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    rating: 4.7,
    location: "Austin, TX"
  },
  {
    id: "5",
    name: "Aria Patel",
    specialty: "Glass Artist",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    rating: 4.8,
    location: "Seattle, WA"
  },
  {
    id: "6",
    name: "Diego Santos",
    specialty: "Leather Craftsman",
    image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=400&fit=crop&crop=face",
    rating: 4.9,
    location: "Los Angeles, CA"
  }
];

const Discover = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedMakers, setSelectedMakers] = useState<string[]>([]);
  const intent = location.state?.intent || "";

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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border/50 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="hover:bg-accent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <h1 className="text-lg font-semibold">Discover Makers</h1>
          
          <div className="w-16" /> {/* Spacer for center alignment */}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
            Here are makers who can
            <br />
            bring your vision to life
          </h2>
          {intent && (
            <p className="text-lg text-muted-foreground italic max-w-2xl mx-auto">
              "{intent}"
            </p>
          )}
        </div>

        {/* Makers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {makers.map((maker) => (
            <div
              key={maker.id}
              onClick={() => toggleMaker(maker.id)}
              className={`relative bg-card rounded-3xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                selectedMakers.includes(maker.id)
                  ? "ring-2 ring-primary shadow-lg"
                  : "hover:shadow-md"
              }`}
            >
              {/* Selection Indicator */}
              {selectedMakers.includes(maker.id) && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>
              )}

              {/* Maker Photo */}
              <div className="mb-4">
                <img
                  src={maker.image}
                  alt={maker.name}
                  className="w-20 h-20 rounded-full mx-auto object-cover"
                />
              </div>

              {/* Maker Info */}
              <div className="text-center">
                <h3 className="font-semibold text-foreground mb-1">
                  {maker.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {maker.specialty}
                </p>
                <p className="text-xs text-muted-foreground mb-2">
                  {maker.location}
                </p>
                <div className="flex items-center justify-center">
                  <span className="text-sm font-medium text-foreground">
                    ★ {maker.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Connect Button */}
        <div className="text-center">
          <Button
            onClick={handleConnect}
            disabled={selectedMakers.length === 0}
            size="lg"
            className="h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Connect with {selectedMakers.length > 0 ? selectedMakers.length : ""} Maker{selectedMakers.length !== 1 ? "s" : ""}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Discover;
