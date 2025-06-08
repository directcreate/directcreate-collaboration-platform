
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UseCaseProcessing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const vision = location.state?.vision || "";

  const steps = [
    { label: "Understanding your vision", completed: false },
    { label: "Analyzing requirements", completed: false },
    { label: "Finding matching crafts", completed: false }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            navigate('/collaborate/use-case/results', { 
              state: { vision } 
            });
          }, 1000);
          return 100;
        }
        return prev + 2;
      });
    }, 80);

    return () => clearInterval(timer);
  }, [navigate, vision]);

  useEffect(() => {
    if (progress >= 33 && currentStep < 1) setCurrentStep(1);
    if (progress >= 66 && currentStep < 2) setCurrentStep(2);
    if (progress >= 100 && currentStep < 3) setCurrentStep(3);
  }, [progress, currentStep]);

  return (
    <div className="h-screen bg-background flex items-center justify-center overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-foreground mb-12 sm:mb-16 leading-tight">
          Processing Your Vision
        </h1>
        
        <div className="mb-12 sm:mb-16">
          <div className="w-32 h-32 sm:w-40 sm:h-40 bg-card rounded-2xl sm:rounded-3xl mx-auto mb-8 sm:mb-12 flex items-center justify-center">
            <span className="text-5xl sm:text-6xl">💡</span>
          </div>
          
          {/* Progress Steps */}
          <div className="space-y-6 text-left max-w-lg mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center gap-4 sm:gap-6">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors ${
                  index < currentStep 
                    ? 'bg-green-500' 
                    : index === currentStep 
                      ? 'bg-primary animate-pulse' 
                      : 'bg-muted'
                }`}>
                  <span className="text-primary-foreground text-sm sm:text-base font-bold">
                    {index < currentStep ? '✓' : index === currentStep ? '•' : ''}
                  </span>
                </div>
                <span className={`transition-colors text-lg sm:text-xl font-medium ${
                  index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <p className="text-muted-foreground text-lg sm:text-xl font-light mb-8">
          Analyzing your creative vision...
        </p>
        
        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-3 sm:h-4">
          <div 
            className="bg-primary h-3 sm:h-4 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default UseCaseProcessing;
