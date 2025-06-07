
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const CollaborationRequest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState("");
  const [agreements, setAgreements] = useState({
    collaboration: false,
    guidance: false,
    pricing: false
  });

  const selectedMakers = location.state?.selectedMakers || [];
  const projectDetails = location.state?.projectDetails || {};

  const defaultMessage = selectedMakers.length > 0 ? `Dear ${selectedMakers[0].name},

I hope this message finds you well. I came across your beautiful work and was inspired by your craftsmanship and attention to detail.

I'm looking to create a custom piece that celebrates traditional techniques. I value the artistry and time that goes into handcrafted work.

I would be honored to collaborate with you on this project. I'm open to your creative guidance on materials, techniques, and timeline. Your expertise aligns perfectly with what I'm envisioning.

Would you be interested in discussing this collaboration? I'd love to hear your thoughts and learn about your approach to this type of project.

Looking forward to the possibility of creating something beautiful together.

With respect and anticipation,` : "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(agreements).every(Boolean)) {
      navigate('/collaborate/sent', { 
        state: { 
          ...location.state,
          message: message || defaultMessage
        } 
      });
    }
  };

  const handleAgreementChange = (key: keyof typeof agreements) => {
    setAgreements(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border/50 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="hover:bg-accent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <h1 className="text-lg font-semibold">Collaboration Request</h1>
          
          <div className="w-16" />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-foreground mb-6 leading-tight">
            Create Your Collaboration Request
          </h1>
          <p className="text-xl text-muted-foreground">
            Send a thoughtful invitation to begin your creative journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Project Summary */}
          <div className="bg-card rounded-3xl p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-6">🎯 Project Summary</h2>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-3">
                <div>
                  <span className="text-muted-foreground">Project:</span>
                  <span className="ml-2 font-medium">{projectDetails.title || "Custom Project"}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Timeline:</span>
                  <span className="ml-2 font-medium">{projectDetails.timeline || "To be discussed"}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-muted-foreground">Budget:</span>
                  <span className="ml-2 font-medium">{projectDetails.budget || "To be discussed"}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Selected Makers:</span>
                  <span className="ml-2 font-medium">{selectedMakers.length} craftsperson(s)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Selected Makers */}
          {selectedMakers.length > 0 && (
            <div className="bg-card rounded-3xl p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-6">👨‍🎨 Selected Craftspeople</h2>
              
              <div className="space-y-4">
                {selectedMakers.map((maker: any) => (
                  <div key={maker.id} className="flex items-center gap-6 p-4 bg-muted rounded-2xl">
                    <div className="w-16 h-16 bg-background rounded-xl flex items-center justify-center text-2xl">
                      {maker.profileImage}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{maker.name}</h3>
                      <p className="text-muted-foreground">{maker.specialty} • {maker.location}</p>
                      <p className="text-sm text-muted-foreground">🏆 {maker.experience} experience • ⭐ {maker.rating}/5 rating</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Collaboration Message */}
          <div className="bg-card rounded-3xl p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-6">✉️ Your Message</h2>
            
            <textarea 
              value={message || defaultMessage}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full h-64 text-lg border border-border rounded-2xl p-6 resize-none focus:outline-none focus:ring-2 focus:ring-primary leading-relaxed bg-background"
              placeholder="Write your collaboration message..."
            />
          </div>

          {/* Understanding Agreement */}
          <div className="bg-primary/5 rounded-3xl p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-6">🤝 Collaboration Understanding</h2>
            
            <div className="space-y-4 text-muted-foreground mb-6">
              <div className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>This is an invitation to explore a creative collaboration together</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>The maker may offer creative alternatives and suggestions to enhance your vision</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Pricing and final timeline will be discussed after the maker expresses interest</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Both parties can shape the creative direction through respectful collaboration</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="mt-1" 
                  checked={agreements.collaboration}
                  onChange={() => handleAgreementChange('collaboration')}
                  required 
                />
                <span className="text-foreground">I understand this is a collaboration invitation, not a binding order</span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="mt-1" 
                  checked={agreements.guidance}
                  onChange={() => handleAgreementChange('guidance')}
                  required 
                />
                <span className="text-foreground">I'm open to the maker's creative guidance and expertise</span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="mt-1" 
                  checked={agreements.pricing}
                  onChange={() => handleAgreementChange('pricing')}
                  required 
                />
                <span className="text-foreground">I understand pricing will be discussed after interest is expressed</span>
              </label>
            </div>
          </div>

          <div className="text-center">
            <Button
              type="submit"
              disabled={!Object.values(agreements).every(Boolean)}
              size="lg"
              className="h-14 px-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-lg disabled:opacity-30"
            >
              Send Collaboration Request
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CollaborationRequest;
