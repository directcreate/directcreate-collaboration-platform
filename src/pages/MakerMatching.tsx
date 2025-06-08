
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockDirectCreateAPI } from "@/services/mockData";
import ArtisanCard from "@/components/artisan/ArtisanCard";

const MakerMatching = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedMakers, setSelectedMakers] = useState<string[]>([]);
  const [locationFilter, setLocationFilter] = useState("all");
  const [skillFilter, setSkillFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [allMakers, setAllMakers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Get project data from previous pages
  const projectData = location.state || {};
  const { projectDetails, selectedMaterial, selectedCraft, selectedTechnique } = projectData;

  console.log('🎯 Project data received:', projectData);

  useEffect(() => {
    const loadArtisans = async () => {
      try {
        const artisansData = await mockDirectCreateAPI.getArtisans();
        setAllMakers(artisansData.data);
      } catch (error) {
        console.error("Failed to load artisans:", error);
      } finally {
        setLoading(false);
      }
    };

    loadArtisans();
  }, []);

  // Calculate match percentage based on project requirements
  const calculateMatchPercentage = (maker: any) => {
    let matchScore = 0;
    let totalFactors = 0;

    // Material match (30% weight)
    if (selectedMaterial && maker.materials.some((m: string) => 
      m.toLowerCase().includes(selectedMaterial.name.toLowerCase()) ||
      selectedMaterial.name.toLowerCase().includes(m.toLowerCase())
    )) {
      matchScore += 30;
    }
    totalFactors += 30;

    // Craft match (30% weight)
    if (selectedCraft && maker.crafts.some((c: string) => 
      c.toLowerCase().includes(selectedCraft.name.toLowerCase()) ||
      selectedCraft.name.toLowerCase().includes(c.toLowerCase())
    )) {
      matchScore += 30;
    }
    totalFactors += 30;

    // Technique match (25% weight)
    if (selectedTechnique && maker.techniques.some((t: string) => 
      t.toLowerCase().includes(selectedTechnique.category.toLowerCase()) ||
      selectedTechnique.category.toLowerCase().includes(t.toLowerCase())
    )) {
      matchScore += 25;
    }
    totalFactors += 25;

    // Rating and completion rate (15% weight)
    const qualityScore = (maker.rating / 5) * 0.7 + (maker.completionRate / 100) * 0.3;
    matchScore += qualityScore * 15;
    totalFactors += 15;

    return Math.round((matchScore / totalFactors) * 100);
  };

  // Filter and sort makers
  const filteredMakers = allMakers
    .map(maker => ({
      ...maker,
      matchPercentage: calculateMatchPercentage(maker)
    }))
    .filter(maker => {
      if (locationFilter !== "all" && !maker.location.toLowerCase().includes(locationFilter.toLowerCase())) return false;
      if (skillFilter !== "all" && !maker.skills.some(skill => skill.toLowerCase().includes(skillFilter.toLowerCase()))) return false;
      if (availabilityFilter !== "all" && maker.availability.toLowerCase() !== availabilityFilter.toLowerCase()) return false;
      return true;
    })
    .sort((a, b) => b.matchPercentage - a.matchPercentage);

  const toggleMakerSelection = (makerId: string) => {
    setSelectedMakers(prev => 
      prev.includes(makerId) 
        ? prev.filter(id => id !== makerId)
        : [...prev, makerId]
    );
  };

  const handleContinue = () => {
    if (selectedMakers.length > 0) {
      const selected = filteredMakers.filter(maker => selectedMakers.includes(maker.id));
      navigate('/collaborate/request', { 
        state: { 
          ...location.state,
          selectedMakers: selected
        } 
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-lg text-muted-foreground">Loading artisans...</div>
      </div>
    );
  }

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
          
          <h1 className="text-lg font-semibold">Artisan Matching</h1>
          
          <div className="w-16" />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Project Context */}
        {(selectedMaterial || selectedCraft || selectedTechnique) && (
          <div className="bg-primary/5 border border-primary/20 rounded-3xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-primary mb-4">🎯 Your Project Requirements</h2>
            <div className="flex flex-wrap gap-3">
              {selectedMaterial && (
                <div className="bg-background px-4 py-2 rounded-xl border">
                  <span className="text-sm text-muted-foreground">Material:</span>
                  <span className="ml-2 font-medium">{selectedMaterial.name}</span>
                </div>
              )}
              {selectedCraft && (
                <div className="bg-background px-4 py-2 rounded-xl border">
                  <span className="text-sm text-muted-foreground">Craft:</span>
                  <span className="ml-2 font-medium">{selectedCraft.name}</span>
                </div>
              )}
              {selectedTechnique && (
                <div className="bg-background px-4 py-2 rounded-xl border">
                  <span className="text-sm text-muted-foreground">Technique:</span>
                  <span className="ml-2 font-medium">{selectedTechnique.name}</span>
                </div>
              )}
              {projectDetails?.title && (
                <div className="bg-background px-4 py-2 rounded-xl border">
                  <span className="text-sm text-muted-foreground">Project:</span>
                  <span className="ml-2 font-medium">{projectDetails.title}</span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-foreground mb-6">
            Perfect artisans for your project
          </h1>
          <p className="text-muted-foreground mb-4">
            {filteredMakers.length} compatible artisans found • Showing top matches
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 p-4 bg-card rounded-2xl">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filters:</span>
          </div>
          
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="rajasthan">Rajasthan</SelectItem>
              <SelectItem value="delhi">Delhi</SelectItem>
              <SelectItem value="gujarat">Gujarat</SelectItem>
              <SelectItem value="karnataka">Karnataka</SelectItem>
              <SelectItem value="uttar pradesh">Uttar Pradesh</SelectItem>
            </SelectContent>
          </Select>

          <Select value={skillFilter} onValueChange={setSkillFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Skills" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Skills</SelectItem>
              <SelectItem value="carving">Carving</SelectItem>
              <SelectItem value="weaving">Weaving</SelectItem>
              <SelectItem value="embroidery">Embroidery</SelectItem>
              <SelectItem value="metalwork">Metalwork</SelectItem>
              <SelectItem value="pottery">Pottery</SelectItem>
            </SelectContent>
          </Select>

          <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Availability</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="busy">Busy</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Artisan Profile Cards */}
        <div className="space-y-8 mb-12">
          {filteredMakers.map((maker) => (
            <ArtisanCard
              key={maker.id}
              maker={maker}
              isSelected={selectedMakers.includes(maker.id)}
              onToggleSelection={toggleMakerSelection}
            />
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-muted-foreground mb-6">
            Selected <span className="font-semibold">{selectedMakers.length} artisan(s)</span> for your collaboration
          </p>
          <Button
            onClick={handleContinue}
            disabled={selectedMakers.length === 0}
            size="lg"
            className="h-14 px-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-lg disabled:opacity-30"
          >
            Create Collaboration Request
          </Button>
        </div>
      </main>
    </div>
  );
};

export default MakerMatching;
