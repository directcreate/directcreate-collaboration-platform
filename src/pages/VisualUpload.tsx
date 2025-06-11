
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, MessageSquare, Package, Camera, FileText, Hammer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const VisualUpload = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedPath, setSelectedPath] = useState<'visual' | 'text' | 'materials' | null>(null);
  const [textDescription, setTextDescription] = useState("");
  const [projectStyle, setProjectStyle] = useState("");
  const [projectColors, setProjectColors] = useState("");
  const [projectUse, setProjectUse] = useState("");

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setSelectedPath('visual');
  };

  const handleSampleSelect = (sampleType: string, description: string) => {
    setSelectedPath('visual');
    // Simulate sample selection
    console.log(`Selected sample: ${sampleType} - ${description}`);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleContinue = () => {
    const projectData = {
      path: selectedPath,
      file: selectedFile,
      textDescription,
      style: projectStyle,
      colors: projectColors,
      use: projectUse
    };

    if (selectedPath === 'visual' && selectedFile) {
      navigate('/collaborate/visual/analyzing', { 
        state: { ...projectData } 
      });
    } else if (selectedPath === 'text') {
      navigate('/collaborate/use-case/processing', { 
        state: { 
          description: `${textDescription}. Style: ${projectStyle}. Colors: ${projectColors}. Use: ${projectUse}`,
          ...projectData 
        } 
      });
    } else if (selectedPath === 'materials') {
      navigate('/collaborate/material', { 
        state: { ...projectData } 
      });
    }
  };

  const sampleImages = [
    { 
      id: 'cotton-block-print',
      icon: '🌸', 
      title: 'Cotton Block Print Style',
      description: 'Traditional hand-blocked patterns on organic cotton',
      category: 'Textile'
    },
    { 
      id: 'silk-embroidered',
      icon: '✨', 
      title: 'Silk Embroidered Bedding',
      description: 'Luxurious silk with intricate hand embroidery',
      category: 'Textile'
    },
    { 
      id: 'handwoven-organic',
      icon: '🌿', 
      title: 'Handwoven Organic Cotton',
      description: 'Sustainable handwoven cotton with natural dyes',
      category: 'Textile'
    }
  ];

  const canContinue = () => {
    if (selectedPath === 'visual') return selectedFile !== null;
    if (selectedPath === 'text') return textDescription.trim().length > 0;
    if (selectedPath === 'materials') return true;
    return false;
  };

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between p-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/")}
          className="hover:bg-accent text-lg"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>
        
        <h1 className="text-2xl font-semibold">Express Your Vision</h1>
        
        <div className="w-20" />
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-light text-foreground mb-6 leading-tight">
              Choose Your Path
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground font-light">
              Multiple ways to bring your vision to life
            </p>
          </div>
          
          {!selectedPath ? (
            /* Path Selection */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Visual Inspiration Path */}
              <button
                onClick={() => setSelectedPath('visual')}
                className="p-8 bg-card rounded-3xl border border-border/20 hover:border-primary/50 hover:shadow-lg transition-all group text-left"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Camera className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Visual Inspiration</h3>
                <p className="text-lg text-muted-foreground">
                  Upload an image or choose from our sample styles
                </p>
              </button>

              {/* Text Description Path */}
              <button
                onClick={() => setSelectedPath('text')}
                className="p-8 bg-card rounded-3xl border border-border/20 hover:border-primary/50 hover:shadow-lg transition-all group text-left"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Describe Your Vision</h3>
                <p className="text-lg text-muted-foreground">
                  Tell us about your project in words
                </p>
              </button>

              {/* Materials First Path */}
              <button
                onClick={() => setSelectedPath('materials')}
                className="p-8 bg-card rounded-3xl border border-border/20 hover:border-primary/50 hover:shadow-lg transition-all group text-left"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Package className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Start with Materials</h3>
                <p className="text-lg text-muted-foreground">
                  Browse materials and crafts directly
                </p>
              </button>
            </div>
          ) : selectedPath === 'visual' ? (
            /* Visual Path Content */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Upload Area */}
              <div className="space-y-8">
                <div 
                  onDrop={handleDrop}
                  onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                  onDragLeave={() => setDragActive(false)}
                  className={`border-2 border-dashed rounded-3xl p-12 text-center transition-all cursor-pointer ${
                    dragActive 
                      ? 'border-primary bg-primary/5' 
                      : selectedFile 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-border hover:border-primary'
                  }`}
                >
                  {selectedFile ? (
                    <div>
                      <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-2xl flex items-center justify-center">
                        <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-3">
                        {selectedFile.name}
                      </h3>
                      <p className="text-xl text-muted-foreground mb-6">
                        Ready to analyze
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedFile(null)}
                        className="rounded-xl text-lg px-6 py-3"
                      >
                        Choose Different File
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <div className="w-20 h-20 mx-auto mb-6 bg-card rounded-2xl flex items-center justify-center">
                        <Upload className="w-10 h-10 text-muted-foreground" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-3">
                        Upload Your Image
                      </h3>
                      <p className="text-xl text-muted-foreground mb-6">or drag and drop here</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                        className="hidden"
                        id="file-upload"
                      />
                      <Button
                        onClick={() => document.getElementById('file-upload')?.click()}
                        className="rounded-xl text-lg px-8 py-3"
                      >
                        <Upload className="w-5 h-5 mr-2" />
                        Browse Files
                      </Button>
                    </div>
                  )}
                </div>

                {/* Sample Images */}
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-4">Or choose a sample style:</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {sampleImages.map((sample) => (
                      <button 
                        key={sample.id}
                        onClick={() => handleSampleSelect(sample.id, sample.description)}
                        className="p-6 bg-card rounded-2xl border border-border/20 hover:border-primary/50 hover:shadow-md transition-all text-left group"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-3xl">{sample.icon}</span>
                          <div>
                            <h4 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                              {sample.title}
                            </h4>
                            <p className="text-sm text-muted-foreground">{sample.description}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Tips */}
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">
                      For best results
                    </h3>
                  </div>
                  <ul className="space-y-3 text-xl text-muted-foreground">
                    <li>• Clear, well-lit images</li>
                    <li>• Focus on the main object</li>
                    <li>• JPG, PNG, WEBP formats</li>
                    <li>• Maximum 10MB file size</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : selectedPath === 'text' ? (
            /* Text Description Path */
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="bg-card rounded-3xl p-8 border border-border/20">
                <h3 className="text-2xl font-bold text-foreground mb-6">Describe Your Project</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-foreground font-medium mb-2">Project Description</label>
                    <Textarea 
                      value={textDescription}
                      onChange={(e) => setTextDescription(e.target.value)}
                      placeholder="Describe what you want to create in detail..."
                      className="min-h-[120px] text-base"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-foreground font-medium mb-2">Style Preference</label>
                      <input 
                        type="text"
                        value={projectStyle}
                        onChange={(e) => setProjectStyle(e.target.value)}
                        placeholder="e.g., traditional, modern, minimalist"
                        className="w-full border border-border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-foreground font-medium mb-2">Colors & Patterns</label>
                      <input 
                        type="text"
                        value={projectColors}
                        onChange={(e) => setProjectColors(e.target.value)}
                        placeholder="e.g., earth tones, floral patterns"
                        className="w-full border border-border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-foreground font-medium mb-2">Intended Use</label>
                      <input 
                        type="text"
                        value={projectUse}
                        onChange={(e) => setProjectUse(e.target.value)}
                        placeholder="e.g., daily use, special occasions"
                        className="w-full border border-border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : selectedPath === 'materials' ? (
            /* Materials First Path */
            <div className="text-center max-w-2xl mx-auto">
              <div className="bg-card rounded-3xl p-8 border border-border/20">
                <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Hammer className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Start with Materials & Crafts
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Browse our collection of traditional materials and crafts to find the perfect match for your project
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">197 Materials</span>
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">528 Crafts</span>
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">136 Techniques</span>
                </div>
              </div>
            </div>
          ) : null}
          
          {/* Action Buttons */}
          {selectedPath && (
            <div className="flex justify-center gap-4 mt-12">
              <Button
                variant="outline"
                onClick={() => setSelectedPath(null)}
                size="lg"
                className="h-14 px-8 rounded-2xl text-lg"
              >
                Back to Options
              </Button>
              
              <Button
                onClick={handleContinue}
                disabled={!canContinue()}
                size="lg"
                className="h-14 px-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-lg disabled:opacity-50"
              >
                {selectedPath === 'visual' ? 'Analyze Image' : 
                 selectedPath === 'text' ? 'Process Description' : 
                 'Browse Materials'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisualUpload;
