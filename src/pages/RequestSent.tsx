
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const RequestSent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedMakers = location.state?.selectedMakers || [];
  const makerName = selectedMakers.length > 0 ? selectedMakers[0].name : "the maker";

  return (
    <div className="h-screen bg-background flex items-center justify-center overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="text-6xl sm:text-8xl mb-8">✨</div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-foreground mb-6 sm:mb-8 leading-tight">
          Your collaboration request
          <br />
          is on its way!
        </h1>
        
        <p className="text-xl sm:text-2xl text-muted-foreground mb-12 sm:mb-16 font-light">
          {makerName} will receive your thoughtful invitation and typically responds within 24-48 hours.
        </p>
        
        <div className="bg-card rounded-2xl sm:rounded-3xl p-8 sm:p-12 mb-12 sm:mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">What happens next?</h3>
          
          <div className="space-y-6 text-left max-w-2xl mx-auto">
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg sm:text-xl font-bold">1</div>
              <span className="text-foreground text-lg sm:text-xl font-medium">{makerName} receives your collaboration invitation</span>
            </div>
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg sm:text-xl font-bold">2</div>
              <span className="text-foreground text-lg sm:text-xl font-medium">If interested, they'll respond with thoughts and questions</span>
            </div>
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg sm:text-xl font-bold">3</div>
              <span className="text-foreground text-lg sm:text-xl font-medium">You'll discuss the project details and approach together</span>
            </div>
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg sm:text-xl font-bold">4</div>
              <span className="text-foreground text-lg sm:text-xl font-medium">If both excited, you'll begin the creative collaboration</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/")}
            className="h-12 sm:h-14 px-8 sm:px-12 rounded-2xl text-base sm:text-lg font-bold"
          >
            Start Another Project
          </Button>
          <Button
            size="lg"
            onClick={() => navigate("/dashboard")}
            className="h-12 sm:h-14 px-8 sm:px-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base sm:text-lg"
          >
            View Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RequestSent;
