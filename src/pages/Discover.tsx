
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Star, MapPin, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockDirectCreateAPI } from "@/services/mockData";

interface ActiveProject {
  id: string;
  title: string;
  description: string;
  materials: string[];
  crafts: string[];
  techniques: string[];
  artisan: {
    name: string;
    image: string;
    specialty: string;
    location: string;
  };
  progress: number;
  estimatedCompletion: string;
  images: string[];
}

const Discover = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedMakers, setSelectedMakers] = useState<string[]>([]);
  const [activeProjects, setActiveProjects] = useState<ActiveProject[]>([]);
  const [makers, setMakers] = useState<any[]>([]);
  const [materials, setMaterials] = useState<any[]>([]);
  const [crafts, setCrafts] = useState<any[]>([]);
  const [techniques, setTechniques] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const intent = location.state?.intent || "";

  useEffect(() => {
    const loadData = async () => {
      try {
        const [materialsData, craftsData, techniquesData, artisansData] = await Promise.all([
          mockDirectCreateAPI.getMaterials(),
          mockDirectCreateAPI.getCrafts(),
          mockDirectCreateAPI.getTechniques(),
          mockDirectCreateAPI.getArtisans()
        ]);

        setMaterials(materialsData.data);
        setCrafts(craftsData.data);
        setTechniques(techniquesData.data);
        setMakers(artisansData.data);

        // Generate realistic active projects using real data
        const projects: ActiveProject[] = [
          {
            id: "1",
            title: "Sustainable Dining Set",
            description: "Custom dining table and chairs using reclaimed materials",
            materials: ["Reclaimed Oak", "Organic Cotton"],
            crafts: ["Wood Carving", "Hand Weaving"],
            techniques: ["Japanese Joinery", "Hand Carving"],
            artisan: artisansData.data[0], // Rajesh Kumar
            progress: 65,
            estimatedCompletion: "2 weeks",
            images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop"]
          },
          {
            id: "2", 
            title: "Ceramic Tea Set Collection",
            description: "Handcrafted porcelain tea set with traditional glazing",
            materials: ["Porcelain Clay", "Sterling Silver"],
            crafts: ["Pottery", "Metalworking"],
            techniques: ["Wheel Throwing", "Raku Firing"],
            artisan: artisansData.data[1], // Priya Sharma
            progress: 80,
            estimatedCompletion: "1 week",
            images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"]
          },
          {
            id: "3",
            title: "Handwoven Textile Art",
            description: "Large-scale wall hanging using sustainable fibers",
            materials: ["Hemp Fiber", "Organic Cotton", "Silk"],
            crafts: ["Hand Weaving", "Textile"],
            techniques: ["Hand Weaving", "Sashiko Stitching"],
            artisan: artisansData.data[2], // Kumar Singh
            progress: 45,
            estimatedCompletion: "3 weeks",
            images: ["https://images.unsplash.com/photo-1558618666-9c0c8c4b1994?w=400&h=300&fit=crop"]
          },
          {
            id: "4",
            title: "Artisan Jewelry Collection",
            description: "Custom engagement ring set with ethical sourcing",
            materials: ["Sterling Silver", "Recycled Steel"],
            crafts: ["Jewelry Making", "Metalworking"],
            techniques: ["Hand Carving", "Lost Wax Casting"],
            artisan: artisansData.data[3], // Anita Rao
            progress: 90,
            estimatedCompletion: "3 days",
            images: ["https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=300&fit=crop"]
          }
        ];

        setActiveProjects(projects);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const toggleMaker = (makerId: string) => {
    setSelectedMakers(prev => 
      prev.includes(makerId) 
        ? prev.filter(id => id !== makerId)
        : [...prev, makerId]
    );
  };

  const handleConnect = () => {
    if (selectedMakers.length > 0) {
      const selectedMakerDetails = makers.filter(maker => 
        selectedMakers.includes(maker.id)
      );
      navigate("/connect", { 
        state: { 
          intent, 
          selectedMakers: selectedMakerDetails 
        } 
      });
    }
  };

  if (loading) {
    return (
      <div className="h-screen bg-background flex items-center justify-center">
        <div className="text-lg text-muted-foreground">Loading DirectCreate platform...</div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <header className="px-4 sm:px-6 py-4 flex items-center justify-between border-b border-border/20 flex-shrink-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/")}
          className="hover:bg-accent rounded-xl"
        >
          <ArrowLeft className="w-4 h-4 mr-2 stroke-[1.5]" />
          Back
        </Button>
        
        <h1 className="text-lg font-medium">Discover DirectCreate</h1>
        
        <div className="w-16" />
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-6 py-6 sm:py-8 max-w-7xl mx-auto w-full flex flex-col min-h-0 overflow-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-foreground mb-4 leading-tight">
            Explore living collaborations
            <br />
            on DirectCreate
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-light">
            See real projects using {materials.length}+ materials, {crafts.length}+ crafts, and {techniques.length}+ techniques
          </p>
        </div>

        {/* Active Projects Section */}
        <section className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 text-foreground">Active Collaborations</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activeProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={project.images[0]} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                    </div>
                    <Badge variant="secondary" className="ml-2">
                      {project.progress}% complete
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {/* Materials, Crafts, Techniques */}
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1">
                        <span className="text-xs font-medium text-muted-foreground">Materials:</span>
                        {project.materials.map((material, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {material}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        <span className="text-xs font-medium text-muted-foreground">Crafts:</span>
                        {project.crafts.map((craft, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {craft}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        <span className="text-xs font-medium text-muted-foreground">Techniques:</span>
                        {project.techniques.map((technique, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {technique}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Artisan Info */}
                    <div className="flex items-center justify-between pt-2 border-t border-border/20">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={project.artisan.image} 
                          alt={project.artisan.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-medium">{project.artisan.name}</p>
                          <p className="text-xs text-muted-foreground">{project.artisan.specialty}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{project.estimatedCompletion}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{project.artisan.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Platform Stats */}
        <section className="mb-12">
          <Card className="bg-accent/20">
            <CardContent className="pt-6">
              <div className="grid grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-foreground">{materials.length}+</div>
                  <div className="text-sm text-muted-foreground">Sustainable Materials</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    From {materials.find(m => m.name === 'Reclaimed Oak')?.name} to {materials.find(m => m.name === 'Bamboo Fiber')?.name}
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-foreground">{crafts.length}+</div>
                  <div className="text-sm text-muted-foreground">Traditional Crafts</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Including {crafts.find(c => c.name === 'Hand Weaving')?.name} and {crafts.find(c => c.name === 'Pottery')?.name}
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-foreground">{techniques.length}+</div>
                  <div className="text-sm text-muted-foreground">Master Techniques</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    From {techniques.find(t => t.name === 'Japanese Joinery')?.name} to {techniques.find(t => t.name === 'Digital Fabrication')?.name}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Featured Makers */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-6 text-foreground">Featured Artisans</h3>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {makers.map((maker) => (
              <div
                key={maker.id}
                onClick={() => toggleMaker(maker.id)}
                className={`relative bg-card rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${
                  selectedMakers.includes(maker.id)
                    ? "ring-2 ring-primary shadow-lg"
                    : "hover:shadow-md"
                }`}
              >
                {selectedMakers.includes(maker.id) && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary-foreground stroke-[2]" />
                  </div>
                )}

                <div className="mb-3">
                  <img
                    src={maker.image}
                    alt={maker.name}
                    className="w-16 h-16 rounded-full mx-auto object-cover"
                  />
                </div>

                <div className="text-center">
                  <h3 className="font-bold text-foreground mb-1 text-lg">
                    {maker.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2 font-medium">
                    {maker.specialty}
                  </p>
                  <p className="text-xs text-muted-foreground mb-2">
                    {maker.location}
                  </p>
                  <div className="flex items-center justify-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                    <span className="text-sm font-bold text-foreground">
                      {maker.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Connect Button */}
        <div className="text-center flex-shrink-0">
          <Button
            onClick={handleConnect}
            disabled={selectedMakers.length === 0}
            size="lg"
            className="h-14 px-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Users className="w-5 h-5 mr-2" />
            Connect with {selectedMakers.length > 0 ? selectedMakers.length : ""} Artisan{selectedMakers.length !== 1 ? "s" : ""}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Discover;
