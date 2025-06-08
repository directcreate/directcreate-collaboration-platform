
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TimelineBudgetProps {
  formData: {
    timeline: string;
    budget: string;
  };
  onInputChange: (field: string, value: string) => void;
}

const TimelineBudget = ({ formData, onInputChange }: TimelineBudgetProps) => {
  return (
    <div className="bg-card rounded-3xl p-8">
      <h2 className="text-2xl font-semibold text-foreground mb-6">Timeline & Budget</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-foreground font-medium mb-2">Preferred Timeline</label>
          <Select value={formData.timeline} onValueChange={(value) => onInputChange('timeline', value)}>
            <SelectTrigger className="w-full h-12 border border-border rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-primary bg-background">
              <SelectValue placeholder="Select timeline" />
            </SelectTrigger>
            <SelectContent className="bg-background border border-border rounded-xl shadow-lg">
              <SelectItem value="1-2 weeks">1-2 weeks</SelectItem>
              <SelectItem value="3-4 weeks">3-4 weeks</SelectItem>
              <SelectItem value="1-2 months">1-2 months</SelectItem>
              <SelectItem value="3+ months">3+ months</SelectItem>
              <SelectItem value="flexible">Flexible</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-foreground font-medium mb-2">Budget Range</label>
          <Select value={formData.budget} onValueChange={(value) => onInputChange('budget', value)}>
            <SelectTrigger className="w-full h-12 border border-border rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-primary bg-background">
              <SelectValue placeholder="Select budget" />
            </SelectTrigger>
            <SelectContent className="bg-background border border-border rounded-xl shadow-lg">
              <SelectItem value="under-5k">Under ₹5,000</SelectItem>
              <SelectItem value="5k-15k">₹5,000 - ₹15,000</SelectItem>
              <SelectItem value="15k-50k">₹15,000 - ₹50,000</SelectItem>
              <SelectItem value="50k-100k">₹50,000 - ₹1,00,000</SelectItem>
              <SelectItem value="100k+">₹1,00,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default TimelineBudget;
