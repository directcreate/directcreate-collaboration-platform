
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProjectForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    timeline: "",
    budget: "",
    location: "",
    city: "",
    pinCode: ""
  });

  const contextData = location.state || {};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/collaborate/makers', { 
      state: { 
        ...contextData,
        projectDetails: formData
      } 
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border/50 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="hover:bg-accent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <h1 className="text-lg font-semibold">Project Details</h1>
          
          <div className="w-16" />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-foreground mb-6 leading-tight">
            Project Details
          </h1>
          <p className="text-xl text-muted-foreground">
            Tell us more about your vision
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Project Overview */}
          <div className="bg-card rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-semibold text-foreground">Project Overview</h2>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                <Sparkles className="w-3 h-3 inline mr-1" />
                AI Enhanced
              </span>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-foreground font-medium mb-2">Project Title</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full border border-border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  placeholder="e.g., Custom Dining Table"
                  required
                />
              </div>
              
              <div>
                <label className="block text-foreground font-medium mb-2">Description</label>
                <textarea 
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full h-32 border border-border rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  placeholder="Describe your vision in detail..."
                  required
                />
              </div>
            </div>
          </div>

          {/* Timeline & Budget */}
          <div className="bg-card rounded-3xl p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Timeline & Budget</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-foreground font-medium mb-2">Preferred Timeline</label>
                <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
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
                <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
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

          {/* Location Preferences */}
          <div className="bg-card rounded-3xl p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Location Preferences</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-foreground font-medium mb-2">Preferred Location</label>
                <Select value={formData.location} onValueChange={(value) => handleInputChange('location', value)}>
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
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="w-full h-12 border border-border rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  placeholder="Enter city name"
                />
              </div>
              
              <div>
                <label className="block text-foreground font-medium mb-2">PIN Code</label>
                <input 
                  type="text" 
                  value={formData.pinCode}
                  onChange={(e) => handleInputChange('pinCode', e.target.value)}
                  className="w-full h-12 border border-border rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  placeholder="Enter PIN code"
                  pattern="[0-9]{6}"
                  maxLength={6}
                />
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button
              type="submit"
              size="lg"
              className="h-14 px-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-lg"
            >
              Find Compatible Makers
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ProjectForm;
