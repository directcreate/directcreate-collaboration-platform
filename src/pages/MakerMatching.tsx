import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Briefcase, Filter, Search, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockDirectCreateAPI } from "@/services/mockData";

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

  const topMaker = filteredMakers[0];

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
        
        {/* Top Match */}
        {topMaker && (
          <div className="border-2 border-green-500 bg-green-50 dark:bg-green-950 rounded-3xl p-8 mb-8">
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 rounded-2xl overflow-hidden">
                <img 
                  src={topMaker.image} 
                  alt={topMaker.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-semibold text-foreground">{topMaker.name}</h2>
                      <span className={`w-3 h-3 rounded-full ${topMaker.availability === 'Available' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                      <span className={`text-sm ${topMaker.availability === 'Available' ? 'text-green-600' : 'text-yellow-600'}`}>
                        {topMaker.availability}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        {topMaker.rating}/5 ({topMaker.reviews} reviews)
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {topMaker.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {topMaker.specialty}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Responds in {topMaker.responseTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        {topMaker.experience} experience
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-4xl font-bold text-green-600">{topMaker.matchPercentage}%</span>
                    <p className="text-sm text-muted-foreground">match</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Perfect Match Because</h4>
                    <div className="space-y-1 text-sm">
                      {selectedMaterial && topMaker.materials.some(m => m.toLowerCase().includes(selectedMaterial.name.toLowerCase())) && (
                        <div className="flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          <span>Works with {selectedMaterial.name}</span>
                        </div>
                      )}
                      {selectedCraft && topMaker.crafts.some(c => c.toLowerCase().includes(selectedCraft.name.toLowerCase())) && (
                        <div className="flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          <span>Expert in {selectedCraft.name}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        <span>{topMaker.completionRate}% project success rate</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Specialties</h4>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {topMaker.skills.slice(0, 4).map(skill => (
                        <span key={skill} className="bg-background px-3 py-1 rounded-full text-sm border">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      💰 {topMaker.priceRange} • 🗣️ {topMaker.languages.join(', ')}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button variant="outline">
                    👀 View Portfolio
                  </Button>
                  <Button variant="outline">
                    💬 Message
                  </Button>
                  <Button 
                    onClick={() => toggleMakerSelection(topMaker.id)}
                    className={selectedMakers.includes(topMaker.id) ? "bg-green-500 hover:bg-green-600" : ""}
                  >
                    {selectedMakers.includes(topMaker.id) ? "✓ Selected" : "Select for Collaboration"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Other Matches */}
        {filteredMakers.length > 1 && (
          <>
            <h3 className="text-2xl font-light text-foreground mb-8">Other excellent matches</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {filteredMakers.slice(1).map((maker) => (
                <div 
                  key={maker.id} 
                  className={`bg-card rounded-3xl p-6 transition-all duration-200 cursor-pointer hover:shadow-md ${
                    selectedMakers.includes(maker.id) ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => toggleMakerSelection(maker.id)}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden">
                      <img 
                        src={maker.image} 
                        alt={maker.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-1">{maker.name}</h3>
                      <p className="text-muted-foreground text-sm mb-1">📍 {maker.location}</p>
                      <p className="text-muted-foreground text-sm mb-2">⭐ {maker.rating}/5 • 🏆 {maker.experience}</p>
                      <div className="flex flex-wrap gap-1">
                        {maker.skills.slice(0, 2).map(skill => (
                          <span key={skill} className="bg-muted px-2 py-1 rounded text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-primary">{maker.matchPercentage}%</span>
                      <span className="text-sm text-muted-foreground block">match</span>
                      <span className={`w-2 h-2 rounded-full inline-block mt-1 ${maker.availability === 'Available' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full"
                    variant={selectedMakers.includes(maker.id) ? "default" : "outline"}
                  >
                    {selectedMakers.includes(maker.id) ? "✓ Selected" : "Select Artisan"}
                  </Button>
                </div>
              ))}
            </div>
          </>
        )}
        
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
