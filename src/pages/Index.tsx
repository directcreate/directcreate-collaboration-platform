import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Camera, MessageCircle, Hammer, Package, Settings, Grid3X3 } from "lucide-react";
import HamburgerMenu from "@/components/navigation/HamburgerMenu";

const Index = () => {
  const navigate = useNavigate();
  const [projectDescription, setProjectDescription] = useState("");

  const startingPoints = [
    {
      id: 'visual',
      title: 'Visual',
      description: 'Upload inspiration',
      icon: Camera,
      path: '/collaborate/visual/upload'
    },
    {
      id: 'purpose',
      title: 'Purpose',
      description: 'Describe needs',
      icon: MessageCircle,
      path: '/collaborate/use-case'
    },
    {
      id: 'craft',
      title: 'Craft',
      description: 'Traditional methods',
      icon: Hammer,
      path: '/collaborate/craft'
    },
    {
      id: 'material',
      title: 'Material',
      description: 'Start with substance',
      icon: Package,
      path: '/collaborate/material'
    },
    {
      id: 'technique',
      title: 'Technique',
      description: 'Choose approach',
      icon: Settings,
      path: '/collaborate/technique'
    },
    {
      id: 'gallery',
      title: 'Gallery',
      description: 'Browse creations',
      icon: Grid3X3,
      path: '/collaborate/product'
    }
  ];

  const handleStartingPointClick = (path: string) => {
    navigate(path);
  };

  const handleStartCreating = () => {
    // TODO: Pass the projectDescription to the next page or store it
    navigate('/collaborate/visual/upload');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with hamburger menu */}
      <header className="px-4 sm:px-6 py-4 flex items-center justify-between border-b border-border/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <HamburgerMenu />
          <a href="/" className="flex items-center gap-2 font-semibold">
            <Sparkles className="w-6 h-6" />
            DirectCreate
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center px-4 sm:px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-16">
            <p className="text-sm text-muted-foreground mb-4 tracking-wider uppercase">Craft</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-foreground mb-6 leading-tight">
              Ideas become
              <br />
              reality
            </h1>
            <p className="text-xl text-muted-foreground mb-12">
              Connect with master craftspeople through intelligent collaboration
            </p>
          </div>

          {/* Description Input Area */}
          <div className="mb-8">
            <div className="bg-muted/30 rounded-2xl p-6 mb-6 border border-border/20">
              <h2 className="text-xl text-foreground mb-4">Describe what you'd like to create...</h2>
              <p className="text-sm text-muted-foreground mb-6">Share your vision or choose a starting point below</p>
              
              <Textarea
                placeholder="Enter your idea, project description, or keywords here..."
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                className="min-h-[120px] mb-6 text-base resize-none"
              />
              
              <Button
                onClick={handleStartCreating}
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 rounded-2xl px-8 py-3"
              >
                Start creating
              </Button>
            </div>
          </div>

          {/* Starting Points */}
          <div className="mb-8">
            <h2 className="text-2xl font-medium text-foreground mb-8">Starting points</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {startingPoints.map((point) => {
                const Icon = point.icon;
                return (
                  <button
                    key={point.id}
                    onClick={() => handleStartingPointClick(point.path)}
                    className="flex flex-col items-center p-6 rounded-2xl bg-background border border-border/20 hover:border-border/40 hover:shadow-md transition-all duration-200 group"
                  >
                    <div className="mb-4 p-3 rounded-xl bg-muted/30 group-hover:bg-muted/50 transition-colors">
                      <Icon className="w-6 h-6 text-foreground" />
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-2">{point.title}</h3>
                    <p className="text-sm text-muted-foreground">{point.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer Text */}
          <p className="text-sm text-muted-foreground">
            Connecting vision with craft
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
