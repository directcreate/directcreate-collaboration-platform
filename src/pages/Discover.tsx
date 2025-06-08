
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
        
        <h1 className="text-lg font-medium">Discover Makers</h1>
        
        <div className="w-16" />
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-6 py-6 sm:py-8 max-w-7xl mx-auto w-full flex flex-col min-h-0">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-foreground mb-3 sm:mb-4 leading-tight">
            Perfect makers for
            <br />
            your vision
          </h2>
          {intent && (
            <p className="text-lg sm:text-xl text-muted-foreground italic max-w-3xl mx-auto font-light">
              "{intent}"
            </p>
          )}
        </div>

        {/* Makers Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8 flex-1 min-h-0 overflow-auto">
          {makers.map((maker) => (
            <div
              key={maker.id}
              onClick={() => toggleMaker(maker.id)}
              className={`relative bg-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${
                selectedMakers.includes(maker.id)
                  ? "ring-2 ring-primary shadow-lg"
                  : "hover:shadow-md"
              }`}
            >
              {/* Selection Indicator */}
              {selectedMakers.includes(maker.id) && (
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary-foreground stroke-[2]" />
                </div>
              )}

              {/* Maker Photo */}
              <div className="mb-3 sm:mb-4">
                <img
                  src={maker.image}
                  alt={maker.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto object-cover"
                />
              </div>

              {/* Maker Info */}
              <div className="text-center">
                <h3 className="font-bold text-foreground mb-1 text-lg sm:text-xl">
                  {maker.name}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-2 font-medium">
                  {maker.specialty}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                  {maker.location}
                </p>
                <div className="flex items-center justify-center">
                  <span className="text-sm sm:text-base font-bold text-foreground">
                    ★ {maker.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Connect Button */}
        <div className="text-center flex-shrink-0">
          <Button
            onClick={handleConnect}
            disabled={selectedMakers.length === 0}
            size="lg"
            className="h-12 sm:h-14 px-8 sm:px-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base sm:text-lg transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Connect with {selectedMakers.length > 0 ? selectedMakers.length : ""} Maker{selectedMakers.length !== 1 ? "s" : ""}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Discover;
