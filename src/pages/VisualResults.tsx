
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

const VisualResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const file = location.state?.file;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border/50 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/collaborate/visual/analyzing")}
            className="hover:bg-accent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <h1 className="text-lg font-semibold">Analysis Results</h1>
          
          <div className="w-16" />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-light text-foreground mb-6 leading-tight">
            Here's what we discovered
          </h1>
          <p className="text-xl text-muted-foreground">
            AI analysis of your inspiration image
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Analyzed Image */}
          <div className="bg-card rounded-3xl p-8">
            <h3 className="text-xl font-semibold text-foreground mb-6">Your Image</h3>
            <div className="w-full h-48 bg-muted rounded-2xl mb-4 flex items-center justify-center">
              <Camera className="w-12 h-12 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                Table • 94% confidence
              </span>
              <p className="text-muted-foreground text-sm">Traditional Windsor style</p>
            </div>
          </div>
          
          {/* Color Palette */}
          <div className="bg-card rounded-3xl p-8">
            <h3 className="text-xl font-semibold text-foreground mb-6">Colors</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-amber-800 rounded-full"></div>
                <span className="text-foreground">Saddle Brown</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-600 rounded-full"></div>
                <span className="text-foreground">Gold Accent</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                <span className="text-foreground">Dark Slate</span>
              </div>
            </div>
          </div>
          
          {/* Craft Recommendations */}
          <div className="bg-card rounded-3xl p-8">
            <h3 className="text-xl font-semibold text-foreground mb-6">Recommended Crafts</h3>
            <div className="space-y-4">
              <div className="border border-green-200 bg-green-50 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Woodworking</span>
                  <span className="text-green-600 font-semibold">91%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '91%'}}></div>
                </div>
              </div>
              
              <div className="border border-blue-200 bg-blue-50 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Furniture</span>
                  <span className="text-blue-600 font-semibold">85%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '85%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <Button
            onClick={() => navigate('/collaborate/form', { state: { analysisData: { craft: 'Woodworking', confidence: 91 } } })}
            size="lg"
            className="h-14 px-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-lg"
          >
            Continue to Project Details
          </Button>
        </div>
      </main>
    </div>
  );
};

export default VisualResults;
