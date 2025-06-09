
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CraftHeaderProps {
  onBack: () => void;
}

const CraftHeader = ({ onBack }: CraftHeaderProps) => {
  return (
    <header className="px-4 sm:px-6 py-4 flex items-center justify-between border-b border-border/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <Button
        variant="ghost"
        size="sm"
        onClick={onBack}
        className="hover:bg-accent rounded-xl"
      >
        <ArrowLeft className="w-4 h-4 mr-2 stroke-[1.5]" />
        Back
      </Button>
      
      <h1 className="text-lg font-medium">Craft First</h1>
      
      <div className="w-16" />
    </header>
  );
};

export default CraftHeader;
