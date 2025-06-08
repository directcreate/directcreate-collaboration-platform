
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

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
    } else {
      const collaborationSection = document.getElementById('collaboration-options');
      collaborationSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const collaborationOptions = [
    {
      id: 'visual',
      emoji: '📷',
      title: 'Visual',
      subtitle: 'Upload inspiration',
      featured: true
    },
    {
      id: 'use-case',
      emoji: '💭',
      title: 'Purpose',
      subtitle: 'Describe your needs'
    },
    {
      id: 'craft',
      emoji: '🔨',
      title: 'Craft',
      subtitle: 'Traditional methods'
    },
    {
      id: 'material',
      emoji: '🪨',
      title: 'Material',
      subtitle: 'Start with substance'
    },
    {
      id: 'technique',
      emoji: '⚙️',
      title: 'Technique',
      subtitle: 'Choose your approach'
    },
    {
      id: 'product',
      emoji: '📦',
      title: 'Gallery',
      subtitle: 'Browse creations'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="pt-6 pb-2 text-center">
        <h1 className="text-lg font-medium text-foreground tracking-tight">
          Craft
        </h1>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="text-center py-8 sm:py-12">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light text-foreground mb-4 sm:mb-6 tracking-tight leading-tight">
            Ideas become
            <br />
            reality
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mb-8 sm:mb-12 max-w-lg mx-auto font-light leading-relaxed">
            Connect with master craftspeople through intelligent collaboration
          </p>

          {/* Intent Input */}
          <div className="max-w-xl mx-auto mb-8 sm:mb-12">
            <Textarea
              value={intent}
              onChange={(e) => setIntent(e.target.value)}
              placeholder="Describe what you'd like to create..."
              className="min-h-[100px] sm:min-h-[120px] text-sm sm:text-base leading-relaxed border-border/30 focus:border-primary/50 resize-none bg-background/50 backdrop-blur-sm"
            />
            <p className="text-xs sm:text-sm text-muted-foreground mt-3 text-left">
              Share your vision or choose a starting point below
            </p>
          </div>

          <Button
            onClick={handleStartCreating}
            size="lg"
            className="h-11 sm:h-12 px-6 sm:px-8 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-sm sm:text-base transition-all duration-200 shadow-sm"
          >
            {intent.trim() ? 'Begin collaboration' : 'Start creating'}
          </Button>
        </section>

        {/* Collaboration Options */}
        <section id="collaboration-options" className="pb-12 sm:pb-16">
          <h2 className="text-xl sm:text-2xl font-light text-center text-foreground mb-6 sm:mb-8">
            Starting points
          </h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {collaborationOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => handleCollaborationOption(option.id)}
                className={`
                  ${option.featured 
                    ? 'col-span-2 lg:col-span-1 bg-gradient-to-br from-primary/90 to-primary text-primary-foreground' 
                    : 'bg-card hover:bg-accent/30 border border-border/20'
                  }
                  rounded-xl sm:rounded-2xl p-4 sm:p-6 cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] backdrop-blur-sm
                `}
              >
                <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">
                  {option.emoji}
                </div>
                <h3 className={`
                  text-base sm:text-lg font-medium mb-1 sm:mb-2
                  ${option.featured ? 'text-primary-foreground' : 'text-foreground'}
                `}>
                  {option.title}
                </h3>
                <p className={`
                  text-xs sm:text-sm
                  ${option.featured ? 'text-primary-foreground/80' : 'text-muted-foreground'}
                `}>
                  {option.subtitle}
                </p>
                {option.featured && (
                  <div className="mt-3 sm:mt-4">
                    <span className="bg-primary-foreground text-primary px-2 py-1 rounded-full text-xs font-medium">
                      Popular
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="pb-6 text-center">
        <p className="text-xs text-muted-foreground/70">
          Connecting vision with craft
        </p>
      </footer>
    </div>
  );
};

export default Index;
