
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface CraftSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const CraftSearch = ({ searchTerm, onSearchChange }: CraftSearchProps) => {
  return (
    <div className="relative max-w-md mx-auto mb-12">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
      <Input
        placeholder="Search crafts..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10 h-12 rounded-2xl border-2 text-base"
      />
    </div>
  );
};

export default CraftSearch;
