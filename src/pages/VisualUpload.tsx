
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";
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
        
        <h1 className="text-2xl font-semibold">Visual Intelligence</h1>
        
        <div className="w-20" />
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl lg:text-7xl font-light text-foreground mb-6 leading-tight">
              Upload Your Inspiration
            </h1>
            <p className="text-2xl lg:text-3xl text-muted-foreground font-light">
              Share what you envision, and we'll find the perfect craftspeople
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Upload Area */}
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
                    <svg className="w-10 h-10 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    Drop image here
                  </h3>
                  <p className="text-xl text-muted-foreground mb-6">or click to browse</p>
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
              
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    Try sample images
                  </h3>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {sampleImages.map((sample, i) => (
                    <button 
                      key={i} 
                      className="p-6 bg-card rounded-2xl hover:bg-accent transition-colors"
                    >
                      <span className="text-3xl block mb-2">{sample.icon}</span>
                      <span className="text-lg text-muted-foreground font-medium">{sample.label}</span>
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
              className="h-16 px-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xl disabled:opacity-30"
            >
              <svg className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Analyze Image
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualUpload;
