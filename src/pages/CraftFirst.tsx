
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Hammer } from "lucide-react";
import { Button } from "@/components/ui/button";
import CraftHeader from "../components/craft-first/CraftHeader";
import LoadingScreen from "../components/craft-first/LoadingScreen";
import SmartFiltering from "../components/project-form/SmartFiltering";
import { useCrafts } from "../hooks/useCrafts";

const CraftFirst = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedCraft, setSelectedCraft] = useState("");
  const { crafts, loading } = useCrafts();

  // Get the project description from URL params
  const projectDescription = searchParams.get('description') || '';

  console.log('🎯 CraftFirst - Project description:', projectDescription);
  console.log('🎯 CraftFirst - Will show smart filtering for:', projectDescription);

  const handleContinue = () => {
    if (selectedCraft) {
      const craft = crafts.find(c => c.id === selectedCraft);
      console.log('🎯 Selected craft for intelligent workflow:', craft);
      
      // Pass craft data to form page for intelligent filtering
      navigate('/collaborate/form', { 
        state: { 
          selectedCraft: craft,
          craftFirst: true // Flag to indicate this came from craft-first workflow
        } 
      });
    }
  };

  const renderCraft = (craft, isRecommended = false, reason = '') => (
    <div
      className={`bg-card rounded-2xl p-4 sm:p-6 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg border-2 ${
        selectedCraft === craft.id
          ? 'border-primary shadow-lg'
          : isRecommended
            ? 'border-primary/30 hover:border-primary/50'
            : 'border-transparent hover:border-border'
      }`}
    >
      <div className="text-center">
        <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{craft.icon}</div>
        <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
          {craft.name}
        </h3>
        {isRecommended && reason && (
          <p className="text-xs text-primary font-medium mb-2">
            {reason}
          </p>
        )}
        <div className="text-muted-foreground text-xs sm:text-sm font-medium mb-3">
          <p className="leading-relaxed">{craft.description}</p>
        </div>
        <div className="text-xs text-muted-foreground space-y-1">
          <div className="flex justify-between">
            <span>Difficulty:</span>
            <span className="font-medium">{craft.difficulty}</span>
          </div>
          <div className="flex justify-between">
            <span>Timeline:</span>
            <span className="font-medium">{craft.time_estimate}</span>
          </div>
          <div className="flex justify-between">
            <span>Category:</span>
            <span className="font-medium">{craft.category}</span>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <CraftHeader onBack={() => navigate("/")} />

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-6 py-8 max-w-6xl mx-auto w-full">
        <SmartFiltering
          title="Choose Your Craft"
          description="Start with the traditional craft you want to explore"
          allItems={crafts}
          selectedItem={selectedCraft}
          onItemSelect={setSelectedCraft}
          projectDescription={projectDescription}
          itemType="crafts"
          renderItem={renderCraft}
        />
        
        <div className="text-center mt-12">
          <Button
            onClick={handleContinue}
            disabled={!selectedCraft}
            size="lg"
            className="h-12 sm:h-14 px-8 sm:px-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base sm:text-lg disabled:opacity-30"
          >
            <Hammer className="w-5 h-5 mr-2 stroke-[1.5]" />
            Continue with {selectedCraft ? crafts.find(c => c.id === selectedCraft)?.name : 'Selected Craft'}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default CraftFirst;
