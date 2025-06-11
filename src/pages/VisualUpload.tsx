import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { UploadCloud, CheckCircle2, XCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { descriptionAnalysisService } from "@/services/descriptionAnalysisService";

const VisualUpload = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedPath, setSelectedPath] = useState("");
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
        // Implement auto-routing logic here based on analysisResult.suggestedPaths
        // For example, navigate(analysisResult.suggestedPaths[0]);
      } else {
        toast({
          title: "Analysis complete!",
          description: "Select a path below to continue.",
        });
        // Optionally, display suggested paths to the user
        setSelectedPath("visual"); // Set a default path
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
    console.log('🎯 Path selected:', pathId, 'with description:', initialDescription);
    
    // Create URL with description parameter for intelligent filtering
    const descriptionParam = initialDescription ? `?description=${encodeURIComponent(initialDescription)}` : '';
    
    switch (pathId) {
      case 'visual':
        setSelectedPath('visual');
        break;
      case 'text':
        setSelectedPath('text');
        break;
      case 'materials':
        navigate(`/collaborate/material${descriptionParam}`);
        break;
      case 'crafts':
        navigate(`/collaborate/craft${descriptionParam}`);
        break;
      case 'techniques':
        navigate(`/collaborate/technique${descriptionParam}`);
        break;
      default:
        console.warn('Unknown path:', pathId);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="px-4 sm:px-6 py-4 flex items-center justify-between border-b border-border/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
          ← Back
        </Button>
        <h1 className="text-lg font-medium">Project Details</h1>
        <div className="w-16" />
      </header>

      <main className="flex flex-col items-center justify-center px-4 sm:px-6 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Project Description</CardTitle>
              <CardDescription>
                Provide a detailed description of your project to get personalized recommendations.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="description">Detailed Description</Label>
                <Textarea
                  id="description"
                  placeholder="e.g., A hand-woven cotton bedsheet with block-printed floral patterns."
                  value={detailedDescription}
                  onChange={handleDetailedDescriptionChange}
                  className="resize-none"
                />
              </div>
              <Button onClick={handleAnalyzeDescription} disabled={isAnalyzing}>
                {isAnalyzing ? "Analyzing..." : "Analyze Description"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Image Upload (Optional)</CardTitle>
              <CardDescription>
                Upload an image to help us understand your project better.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="picture">Upload Image</Label>
                <Input type="file" id="picture" accept="image/*" onChange={handleImageUpload} />
              </div>
              {selectedImageFile && (
                <Alert variant="default">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertTitle>Image Uploaded!</AlertTitle>
                  <AlertDescription>
                    {selectedImageFile.name} - {selectedImageFile.size} bytes
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Choose a Path</CardTitle>
              <CardDescription>Select a path to start building your project.</CardDescription>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              <Button variant="outline" onClick={() => handlePathSelection("materials")}>
                Start with Materials
              </Button>
              <Button variant="outline" onClick={() => handlePathSelection("crafts")}>
                Explore Crafts
              </Button>
              <Button variant="outline" onClick={() => handlePathSelection("techniques")}>
                Choose Techniques
              </Button>
              <Button variant="outline" onClick={() => handlePathSelection("visual")}>
                Visual Inspiration
              </Button>
              <Button variant="outline" onClick={() => handlePathSelection("text")}>
                Text Description
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default VisualUpload;
