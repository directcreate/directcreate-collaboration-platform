
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MaterialFirstHeaderProps {
  onBack: () => void;
}

const MaterialFirstHeader = ({ onBack }: MaterialFirstHeaderProps) => {
  return (
    <header className="px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between border-b border-border/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <Button
        variant="ghost"
        size="sm"
        onClick={onBack}
        className="hover:bg-accent rounded-xl text-sm"
      >
        <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2 stroke-[1.5]" />
        <span className="hidden sm:inline">Back</span>
      </Button>
      
      <h1 className="text-base sm:text-lg font-medium">Material First</h1>
      
      <div className="w-12 sm:w-16" />
    </header>
  );
};

export default MaterialFirstHeader;
