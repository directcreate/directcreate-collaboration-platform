
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Hammer, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import CraftHeader from "../components/craft-first/CraftHeader";
import CraftSearch from "../components/craft-first/CraftSearch";
import CraftGrid from "../components/craft-first/CraftGrid";
import LoadingScreen from "../components/craft-first/LoadingScreen";
import CraftCard from "../components/craft-first/CraftCard";
import { useCrafts } from "../hooks/useCrafts";

const CraftFirst = () => {
  const navigate = useNavigate();
  const [selectedCraft, setSelectedCraft] = useState("");
  const [showAllCrafts, setShowAllCrafts] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { crafts, loading } = useCrafts();

  // Show first 12 crafts initially, all crafts when expanded
  const initialCrafts = crafts.slice(0, 12);
  const allCrafts = crafts;

  const filteredCrafts = (showAllCrafts ? allCrafts : initialCrafts).filter(craft =>
    craft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    craft.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContinue = () => {
    if (selectedCraft) {
      const craft = allCrafts.find(c => c.id === selectedCraft);
      navigate('/collaborate/form', { 
        state: { selectedCraft: craft } 
      });
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <CraftHeader onBack={() => navigate("/")} />

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-6 py-8 max-w-6xl mx-auto w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-foreground mb-6 leading-tight">
            Choose Your
            <br />
            Craft
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground font-light mb-8">
            Start with the traditional craft you want to explore
          </p>
          
          <CraftSearch 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        </div>
        
        {showAllCrafts ? (
          <ScrollArea className="h-[600px] mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
              {filteredCrafts.map((craft) => (
                <CraftCard
                  key={craft.id}
                  craft={craft}
                  isSelected={selectedCraft === craft.id}
                  onSelect={setSelectedCraft}
                />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <CraftGrid 
            crafts={filteredCrafts}
            selectedCraft={selectedCraft}
            onCraftSelect={setSelectedCraft}
          />
        )}
        
        <div className="text-center space-y-4">
          {!showAllCrafts && (
            <Button
              onClick={() => setShowAllCrafts(true)}
              variant="outline"
              size="lg"
              className="h-12 sm:h-14 px-8 sm:px-12 rounded-2xl border-2 border-muted-foreground/20 text-muted-foreground hover:bg-accent hover:text-accent-foreground font-medium text-base sm:text-lg mb-4"
            >
              <Plus className="w-5 h-5 mr-2 stroke-[1.5]" />
              More Crafts from DC Platform
            </Button>
          )}
          
          <Button
            onClick={handleContinue}
            disabled={!selectedCraft}
            size="lg"
            className="h-12 sm:h-14 px-8 sm:px-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base sm:text-lg disabled:opacity-30"
          >
            <Hammer className="w-5 h-5 mr-2 stroke-[1.5]" />
            Continue with {selectedCraft ? allCrafts.find(c => c.id === selectedCraft)?.name : 'Selected Craft'}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default CraftFirst;
