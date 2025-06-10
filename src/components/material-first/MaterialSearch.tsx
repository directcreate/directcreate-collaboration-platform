
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface MaterialSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  materialsCount: number;
}

const MaterialSearch = ({ searchTerm, onSearchChange, materialsCount }: MaterialSearchProps) => {
  if (materialsCount === 0) return null;

  return (
    <div className="relative max-w-sm sm:max-w-md mx-auto mb-6 sm:mb-8">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
      <Input
        placeholder="Search DirectCreate materials..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10 h-11 sm:h-12 rounded-2xl border-2 text-sm sm:text-base"
      />
    </div>
  );
};

export default MaterialSearch;
