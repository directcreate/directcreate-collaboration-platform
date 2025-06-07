
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

const VisualUpload = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleAnalyze = () => {
    if (selectedFile) {
      navigate('/collaborate/visual/analyzing', { 
        state: { file: selectedFile } 
      });
    }
  };

  const sampleImages = [
    { icon: '🪑', label: 'Furniture' },
    { icon: '🏺', label: 'Pottery' },
    { icon: '💍', label: 'Jewelry' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border/50 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="hover:bg-accent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <h1 className="text-lg font-semibold">Visual Intelligence</h1>
          
          <div className="w-16" />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-foreground mb-6 leading-tight">
            Upload Your Inspiration
          </h1>
          <p className="text-xl text-muted-foreground">
            Share what you envision, and we'll find the perfect craftspeople
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Upload Area */}
          <div 
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            className={`border-2 border-dashed rounded-3xl p-12 text-center transition-colors cursor-pointer ${
              dragActive 
                ? 'border-primary bg-primary/5' 
                : selectedFile 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-border hover:border-primary'
            }`}
          >
            {selectedFile ? (
              <div>
                <div className="text-6xl mb-6">✅</div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {selectedFile.name}
                </h3>
                <p className="text-muted-foreground mb-6">
                  Ready to analyze
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSelectedFile(null)}
                  className="rounded-xl"
                >
                  Choose Different File
                </Button>
              </div>
            ) : (
              <div>
                <div className="text-6xl mb-6">📷</div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Drop image here
                </h3>
                <p className="text-muted-foreground mb-6">or click to browse</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                  className="hidden"
                  id="file-upload"
                />
                <Button
                  onClick={() => document.getElementById('file-upload')?.click()}
                  className="rounded-xl"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Browse Files
                </Button>
              </div>
            )}
          </div>
          
          {/* Tips */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                💡 For best results
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Clear, well-lit images</li>
                <li>• Focus on the main object</li>
                <li>• JPG, PNG, WEBP formats</li>
                <li>• Maximum 10MB file size</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                🖼️ Try sample images
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {sampleImages.map((sample, i) => (
                  <button 
                    key={i} 
                    className="p-4 bg-card rounded-xl hover:bg-accent transition-colors"
                  >
                    <span className="text-2xl block mb-1">{sample.icon}</span>
                    <span className="text-sm text-muted-foreground">{sample.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Button
            onClick={handleAnalyze}
            disabled={!selectedFile}
            size="lg"
            className="h-14 px-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-lg disabled:opacity-30"
          >
            <Camera className="w-5 h-5 mr-2" />
            Analyze Image
          </Button>
        </div>
      </main>
    </div>
  );
};

export default VisualUpload;
