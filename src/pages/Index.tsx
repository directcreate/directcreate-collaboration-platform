
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Camera, MessageCircle, Hammer, Package, Settings, Grid3X3 } from "lucide-react";

const Index = () => {
  const [intent, setIntent] = useState("");
  const navigate = useNavigate();

  const handleCollaborationOption = (type: string) => {
    switch (type) {
      case 'visual':
        navigate('/collaborate/visual/upload');
        break;
      case 'use-case':
        navigate('/collaborate/use-case');
        break;
      case 'craft':
        navigate('/collaborate/craft');
        break;
      case 'material':
        navigate('/collaborate/material');
        break;
      case 'technique':
        navigate('/collaborate/technique');
        break;
      case 'product':
        navigate('/collaborate/product');
        break;
      default:
        break;
    }
  };

  const handleStartCreating = () => {
    if (intent.trim()) {
      navigate('/collaborate/use-case', { state: { initialIntent: intent } });
    }
  };

  const collaborationOptions = [
    {
      id: 'visual',
      icon: Camera,
      title: 'Visual',
      subtitle: 'Upload inspiration'
    },
    {
      id: 'use-case',
      icon: MessageCircle,
      title: 'Purpose',
      subtitle: 'Describe needs'
    },
    {
      id: 'craft',
      icon: Hammer,
      title: 'Craft',
      subtitle: 'Traditional methods'
    },
    {
      id: 'material',
      icon: Package,
      title: 'Material',
      subtitle: 'Start with substance'
    },
    {
      id: 'technique',
      icon: Settings,
      title: 'Technique',
      subtitle: 'Choose approach'
    },
    {
      id: 'product',
      icon: Grid3X3,
      title: 'Gallery',
      subtitle: 'Browse creations'
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="pt-4 sm:pt-6 pb-2 text-center flex-shrink-0">
        <h1 className="text-xl sm:text-2xl font-medium text-foreground tracking-tight">
          Craft
        </h1>
      </header>

      {/* Main Content - Full Height Container */}
      <main className="flex-1 px-4 sm:px-6 max-w-6xl mx-auto w-full flex flex-col">
        {/* Hero Section */}
        <section className="text-center flex-1 flex flex-col justify-center min-h-0">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light text-foreground mb-3 sm:mb-4 tracking-tight leading-tight">
              Ideas become
              <br />
              reality
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto font-light leading-relaxed">
              Connect with master craftspeople through intelligent collaboration
            </p>
          </div>

          {/* Intent Input */}
          <div className="max-w-2xl mx-auto mb-6 sm:mb-8 w-full">
            <Textarea
              value={intent}
              onChange={(e) => setIntent(e.target.value)}
              placeholder="Describe what you'd like to create..."
              className="min-h-[80px] sm:min-h-[100px] text-base sm:text-lg leading-relaxed border-border/30 focus:border-primary/50 resize-none bg-background/50 backdrop-blur-sm text-center"
            />
            <p className="text-sm sm:text-base text-muted-foreground mt-3 text-center">
              Share your vision or choose a starting point below
            </p>
          </div>

          <div className="mb-6 sm:mb-8">
            <Button
              onClick={handleStartCreating}
              size="lg"
              className="h-12 sm:h-14 px-8 sm:px-10 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base sm:text-lg transition-all duration-200 shadow-sm"
            >
              {intent.trim() ? 'Begin collaboration' : 'Start creating'}
            </Button>
          </div>

          {/* Starting Points */}
          <div className="w-full">
            <h2 className="text-2xl sm:text-3xl font-light text-center text-foreground mb-4 sm:mb-6">
              Starting points
            </h2>
            
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto">
              {collaborationOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <div
                    key={option.id}
                    onClick={() => handleCollaborationOption(option.id)}
                    className="bg-card hover:bg-accent/30 border border-border/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] backdrop-blur-sm group"
                  >
                    <div className="flex flex-col items-center text-center space-y-2 sm:space-y-3">
                      <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-foreground/80 group-hover:text-foreground transition-colors stroke-[1.5]" />
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1">
                          {option.title}
                        </h3>
                        <p className="text-sm sm:text-base text-muted-foreground font-medium">
                          {option.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="pb-4 sm:pb-6 text-center flex-shrink-0">
        <p className="text-xs sm:text-sm text-muted-foreground/70">
          Connecting vision with craft
        </p>
      </footer>
    </div>
  );
};

export default Index;
