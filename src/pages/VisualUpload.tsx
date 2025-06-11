
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { UploadCloud, CheckCircle2, Package, Hammer, Settings, Grid3X3 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { descriptionAnalysisService } from "@/services/descriptionAnalysisService";

const VisualUpload = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [detailedDescription, setDetailedDescription] = useState("");
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Get the project description from URL params (passed from home page)
  const initialDescription = searchParams.get('description') || '';

  const { toast } = useToast();

  useEffect(() => {
    // Set initial description if available
    if (initialDescription) {
      setDetailedDescription(initialDescription);
    }
  }, [initialDescription]);

  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    setSelectedImageFile(file);
  };

  const handleDetailedDescriptionChange = (event: any) => {
    setDetailedDescription(event.target.value);
  };

  const handleAnalyzeDescription = async () => {
    setIsAnalyzing(true);
    try {
      const analysisResult = await descriptionAnalysisService.analyzeDescription(detailedDescription);

      if (analysisResult.autoRoute) {
        toast({
          title: "Intelligent analysis complete!",
          description: "Automatically routing to the best path based on your description.",
        });
      } else {
        toast({
          title: "Analysis complete!",
          description: "Select a path below to continue.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Analysis failed.",
        description: "Please try again or provide a clearer description.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handlePathSelection = (pathId: string) => {
    console.log('🎯 Path selected:', pathId, 'with description:', detailedDescription);
    
    // Create URL with description parameter for intelligent filtering
    const descriptionParam = detailedDescription ? `?description=${encodeURIComponent(detailedDescription)}` : '';
    
    switch (pathId) {
      case 'materials':
        navigate(`/collaborate/material${descriptionParam}`);
        break;
      case 'crafts':
        navigate(`/collaborate/craft${descriptionParam}`);
        break;
      case 'techniques':
        navigate(`/collaborate/technique${descriptionParam}`);
        break;
      case 'visual':
        // Stay on current page but show visual options
        break;
      case 'text':
        // Stay on current page but focus on text description
        break;
      default:
        console.warn('Unknown path:', pathId);
    }
  };

  const pathOptions = [
    {
      id: 'materials',
      title: 'Materials',
      subtitle: 'Start with base materials',
      icon: Package,
      description: 'Choose from 197+ real materials'
    },
    {
      id: 'crafts', 
      title: 'Crafts',
      subtitle: 'Traditional techniques',
      icon: Hammer,
      description: 'Explore 134+ verified crafts'
    },
    {
      id: 'techniques',
      title: 'Techniques',
      subtitle: 'Select making methods',
      icon: Settings,
      description: 'Pick specific approaches'
    },
    {
      id: 'gallery',
      title: 'Browse',
      subtitle: 'Explore examples',
      icon: Grid3X3,
      description: 'See what others created'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="px-4 sm:px-6 py-4 flex items-center justify-between border-b border-border/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
          ← Back
        </Button>
        <h1 className="text-lg font-medium">Project Details</h1>
        <div className="w-16" />
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Project Description - Always visible at top */}
        {detailedDescription && (
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 mb-8">
            <h3 className="font-semibold text-primary mb-2">Your Project</h3>
            <p className="text-foreground">"{detailedDescription}"</p>
            <button 
              onClick={() => document.getElementById('description')?.focus()}
              className="text-primary text-sm hover:underline mt-1"
            >
              Edit description
            </button>
          </div>
        )}

        <div className="space-y-8">
          {/* Description Section */}
          <Card>
            <CardHeader>
              <CardTitle>Project Description</CardTitle>
              <CardDescription>
                Provide a detailed description to get personalized recommendations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description</Label>
                <Textarea
                  id="description"
                  placeholder="e.g., A hand-woven cotton bedsheet with block-printed floral patterns."
                  value={detailedDescription}
                  onChange={handleDetailedDescriptionChange}
                  className="resize-none min-h-[120px]"
                />
              </div>
              <Button onClick={handleAnalyzeDescription} disabled={isAnalyzing || !detailedDescription.trim()}>
                {isAnalyzing ? "Analyzing..." : "Analyze Description"}
              </Button>
            </CardContent>
          </Card>

          {/* Main Content Grid - Equal Height Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Image Upload Section */}
            <Card className="min-h-[320px]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UploadCloud className="w-5 h-5" />
                  Visual Inspiration
                </CardTitle>
                <CardDescription>
                  Upload reference images to help us understand your vision (optional).
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col justify-center flex-1">
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
                  <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <div className="space-y-2 mb-4">
                    <Label htmlFor="picture" className="text-base font-medium cursor-pointer hover:text-primary">
                      Choose files or drag here
                    </Label>
                    <p className="text-sm text-muted-foreground">Support for images up to 10MB</p>
                  </div>
                  <Input 
                    type="file" 
                    id="picture" 
                    accept="image/*" 
                    onChange={handleImageUpload}
                    className="max-w-xs mx-auto"
                  />
                </div>
                
                {selectedImageFile && (
                  <Alert className="mt-4">
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertTitle>Image Uploaded!</AlertTitle>
                    <AlertDescription>
                      {selectedImageFile.name} - {Math.round(selectedImageFile.size / 1024)}KB
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Path Selection Section */}
            <Card className="min-h-[320px]">
              <CardHeader>
                <CardTitle>Choose Your Path</CardTitle>
                <CardDescription>Select where you'd like to start building your project.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col justify-center flex-1">
                <div className="grid grid-cols-2 gap-3">
                  {pathOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.id}
                        onClick={() => handlePathSelection(option.id)}
                        className="border border-border rounded-xl p-4 h-24 flex flex-col justify-center items-center hover:border-primary hover:bg-primary/5 transition-all duration-200 group"
                      >
                        <Icon className="w-6 h-6 mb-1 text-muted-foreground group-hover:text-primary" />
                        <span className="font-medium text-sm text-foreground">{option.title}</span>
                        <span className="text-xs text-muted-foreground">{option.subtitle}</span>
                      </button>
                    );
                  })}
                </div>
                
                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    Each path will show personalized recommendations based on your description
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="text-center">
            <Button 
              onClick={() => handlePathSelection('materials')}
              disabled={!detailedDescription.trim()}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-2xl"
            >
              Start Creating with Materials
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              {!detailedDescription.trim() 
                ? "Add a description above to get started" 
                : "Or choose any path above"
              }
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VisualUpload;
