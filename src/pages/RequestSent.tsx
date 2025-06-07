
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const RequestSent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedMakers = location.state?.selectedMakers || [];
  const makerName = selectedMakers.length > 0 ? selectedMakers[0].name : "the maker";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <div className="text-6xl mb-8">✨</div>
        <h1 className="text-4xl font-light text-foreground mb-6">
          Your collaboration request is on its way!
        </h1>
        
        <p className="text-xl text-muted-foreground mb-12">
          {makerName} will receive your thoughtful invitation and typically responds within 24-48 hours.
        </p>
        
        <div className="bg-card rounded-3xl p-8 mb-12">
          <h3 className="text-xl font-semibold text-foreground mb-6">What happens next?</h3>
          
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">1</div>
              <span className="text-foreground">{makerName} receives your collaboration invitation</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">2</div>
              <span className="text-foreground">If interested, they'll respond with thoughts and questions</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">3</div>
              <span className="text-foreground">You'll discuss the project details and approach together</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">4</div>
              <span className="text-foreground">If both excited, you'll begin the creative collaboration</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4 justify-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/")}
            className="px-8 py-4 rounded-2xl"
          >
            Start Another Project
          </Button>
          <Button
            size="lg"
            onClick={() => navigate("/dashboard")}
            className="px-8 py-4 rounded-2xl"
          >
            View Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RequestSent;
