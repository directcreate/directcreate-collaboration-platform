
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, RefreshCw, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const UseCaseResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const vision = location.state?.vision || "";

  const matches = [
    {
      name: "🏺 Ceramic Garden Planter",
      match: 89,
      description: "Perfect for plant lovers who appreciate traditional crafts",
      approach: "Traditional wheel throwing with hand-painted details",
      timeline: "2-3 weeks for careful creation",
      featured: true
    },
    {
      name: "🌿 Bamboo Plant Stand",
      match: 84,
      description: "Sustainable and beautiful",
      approach: "Handcrafted bamboo construction",
      timeline: "1-2 weeks"
    },
    {
      name: "🪵 Wooden Garden Box",
      match: 78,
      description: "Functional storage solution",
      approach: "Traditional woodworking techniques",
      timeline: "2-3 weeks"
    }
  ];

  const handleReSearch = () => {
    navigate('/collaborate/use-case/processing', { 
      state: { vision, isReSearch: true } 
    });
  };

  const handleRefineVision = () => {
    navigate('/collaborate/use-case', { 
      state: { previousVision: vision } 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border/50 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/collaborate/use-case")}
            className="hover:bg-accent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <h1 className="text-lg font-semibold">Perfect Matches</h1>
          
          <div className="w-16" />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-light text-foreground mb-6 leading-tight">
            Perfect matches for your vision
          </h1>
          {vision && (
            <p className="text-lg text-muted-foreground italic max-w-2xl mx-auto">
              "{vision.substring(0, 100)}..."
            </p>
          )}
        </div>
        
        {/* Top Match */}
        <div className="border-2 border-green-500 bg-green-50 rounded-3xl p-8 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Perfect Match
              </span>
              <h2 className="text-3xl font-semibold text-foreground mt-3">
                {matches[0].name}
              </h2>
            </div>
            <span className="text-4xl font-bold text-green-600">{matches[0].match}%</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Why this matches</h4>
              <p className="text-muted-foreground">{matches[0].description}</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Approach</h4>
              <p className="text-muted-foreground">{matches[0].approach}</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Timeline</h4>
              <p className="text-muted-foreground">{matches[0].timeline}</p>
            </div>
          </div>
          
          <Button
            onClick={() => navigate('/collaborate/form', { state: { selectedMatch: matches[0] } })}
            className="w-full bg-primary text-primary-foreground py-4 rounded-2xl text-lg font-medium"
          >
            Explore This Path
          </Button>
        </div>
        
        {/* Alternative Options */}
        <h3 className="text-2xl font-light text-foreground mb-8">Other possibilities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {matches.slice(1).map((item, i) => (
            <div key={i} className="bg-card rounded-3xl p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <span className="text-2xl font-bold text-primary">{item.match}%</span>
              </div>
              <p className="text-muted-foreground mb-4">{item.description}</p>
              <Button
                onClick={() => navigate('/collaborate/form', { state: { selectedMatch: item } })}
                variant="outline"
                className="w-full py-3 rounded-xl"
              >
                Explore This Path
              </Button>
            </div>
          ))}
        </div>

        {/* More Options */}
        <div className="bg-card rounded-3xl p-8 border border-border">
          <h3 className="text-2xl font-light text-foreground mb-6 text-center">
            Not finding exactly what you're looking for?
          </h3>
          <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
            We can help you explore more possibilities or refine your vision to find the perfect match.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Button
              onClick={handleReSearch}
              variant="outline"
              size="lg"
              className="h-14 rounded-2xl border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <RefreshCw className="w-5 h-5 mr-3" />
              Search for More Options
            </Button>
            
            <Button
              onClick={handleRefineVision}
              variant="outline"
              size="lg"
              className="h-14 rounded-2xl border-2 border-secondary text-secondary-foreground hover:bg-secondary transition-colors"
            >
              <MessageCircle className="w-5 h-5 mr-3" />
              Refine Your Vision
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UseCaseResults;
