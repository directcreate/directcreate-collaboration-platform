
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LocationPreferencesProps {
  formData: {
    location: string;
    city: string;
    pinCode: string;
  };
  onInputChange: (field: string, value: string) => void;
}

const LocationPreferences = ({ formData, onInputChange }: LocationPreferencesProps) => {
  return (
    <div className="bg-card rounded-3xl p-8">
      <h2 className="text-2xl font-semibold text-foreground mb-6">Location Preferences</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-foreground font-medium mb-2">Preferred Location</label>
          <Select value={formData.location} onValueChange={(value) => onInputChange('location', value)}>
            <SelectTrigger className="w-full h-12 border border-border rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-primary bg-background">
              <SelectValue placeholder="Any location" />
            </SelectTrigger>
            <SelectContent className="bg-background border border-border rounded-xl shadow-lg">
              <SelectItem value="rajasthan">Rajasthan</SelectItem>
              <SelectItem value="gujarat">Gujarat</SelectItem>
              <SelectItem value="delhi">Delhi NCR</SelectItem>
              <SelectItem value="mumbai">Mumbai</SelectItem>
              <SelectItem value="bangalore">Bangalore</SelectItem>
              <SelectItem value="chennai">Chennai</SelectItem>
              <SelectItem value="kolkata">Kolkata</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-foreground font-medium mb-2">City</label>
          <input 
            type="text" 
            value={formData.city}
            onChange={(e) => onInputChange('city', e.target.value)}
            className="w-full h-12 border border-border rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-primary bg-background"
            placeholder="Enter city name"
          />
        </div>
        
        <div>
          <label className="block text-foreground font-medium mb-2">PIN Code</label>
          <input 
            type="text" 
            value={formData.pinCode}
            onChange={(e) => onInputChange('pinCode', e.target.value)}
            className="w-full h-12 border border-border rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-primary bg-background"
            placeholder="Enter PIN code"
            pattern="[0-9]{6}"
            maxLength={6}
          />
        </div>
      </div>
    </div>
  );
};

export default LocationPreferences;
