
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const VisualAnalyzing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { label: "Object detection complete", completed: false },
    { label: "Analyzing style and materials...", completed: false },
    { label: "Finding compatible crafts", completed: false }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            navigate('/collaborate/visual/results', { 
              state: { file: location.state?.file } 
            });
          }, 1000);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    return () => clearInterval(timer);
  }, [navigate, location.state?.file]);

  useEffect(() => {
    if (progress >= 33 && currentStep < 1) setCurrentStep(1);
    if (progress >= 66 && currentStep < 2) setCurrentStep(2);
    if (progress >= 100 && currentStep < 3) setCurrentStep(3);
  }, [progress, currentStep]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h1 className="text-4xl font-light text-foreground mb-12">
          Analyzing Your Vision
        </h1>
        
        <div className="mb-12">
          <div className="w-32 h-32 bg-card rounded-3xl mx-auto mb-6 flex items-center justify-center">
            <span className="text-4xl">🖼️</span>
          </div>
          
          {/* Progress Steps */}
          <div className="space-y-4 text-left max-w-md mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                  index < currentStep 
                    ? 'bg-green-500' 
                    : index === currentStep 
                      ? 'bg-primary animate-pulse' 
                      : 'bg-muted'
                }`}>
                  <span className="text-white text-xs">
                    {index < currentStep ? '✓' : index === currentStep ? '•' : ''}
                  </span>
                </div>
                <span className={`transition-colors ${
                  index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <p className="text-muted-foreground">
          This usually takes about 30 seconds
        </p>
        
        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2 mt-6">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default VisualAnalyzing;
