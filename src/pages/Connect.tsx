
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Maker {
  id: string;
  name: string;
  specialty: string;
  image: string;
  rating: number;
  location: string;
}

const Connect = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const intent = location.state?.intent || "";
  const selectedMakers: Maker[] = location.state?.selectedMakers || [];
  
  const [message, setMessage] = useState(`Dear ${selectedMakers.map(maker => maker.name).join(', ')},

I hope this message finds you well. I came across your beautiful work and was inspired by your craftsmanship and attention to detail.

${intent ? `I'm looking to create: "${intent}"` : 'I have a creative project in mind that I believe would benefit from your expertise.'}

I would be honored to collaborate with you on this project. I'm open to your creative guidance on materials, techniques, and timeline. Your expertise aligns perfectly with what I'm envisioning.

Would you be interested in discussing this collaboration? I'd love to hear your thoughts and learn about your approach to this type of project.

Looking forward to the possibility of creating something beautiful together.

With respect and anticipation,`);

  const handleSend = () => {
    // In a real app, this would send the message to the selected makers
    console.log("Sending message to makers:", selectedMakers);
    console.log("Message:", message);
    
    // Navigate to confirmation page
    navigate("/", { 
      state: { 
        messageSent: true,
        makers: selectedMakers.map(maker => maker.name).join(', ')
      } 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border/50 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/discover")}
            className="hover:bg-accent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <h1 className="text-lg font-semibold">Connect with Makers</h1>
          
          <div className="w-16" /> {/* Spacer for center alignment */}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
            Ready to start your
            <br />
            collaboration?
          </h2>
          {selectedMakers.length > 0 && (
            <p className="text-lg text-muted-foreground">
              Your message to {selectedMakers.length} selected maker{selectedMakers.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Selected Makers */}
        {selectedMakers.length > 0 && (
          <div className="bg-card rounded-3xl p-8 mb-8">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Selected Makers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedMakers.map((maker) => (
                <div key={maker.id} className="flex items-center gap-4">
                  <img
                    src={maker.image}
                    alt={maker.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {maker.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {maker.specialty} • {maker.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Message Composer */}
        <div className="bg-card rounded-3xl p-8 mb-8">
          <h3 className="text-xl font-semibold text-foreground mb-6">
            Your Message
          </h3>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[400px] text-base leading-relaxed resize-none border-border rounded-2xl"
            placeholder="Write a thoughtful message to introduce yourself and your project..."
          />
        </div>

        {/* Collaboration Understanding */}
        <div className="bg-accent/30 rounded-3xl p-8 mb-8">
          <h3 className="text-xl font-semibold text-foreground mb-6">
            🤝 Collaboration Understanding
          </h3>
          
          <div className="space-y-4 text-muted-foreground">
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
        </div>

        {/* Send Button */}
        <div className="text-center">
          <Button
            onClick={handleSend}
            disabled={!message.trim() || selectedMakers.length === 0}
            size="lg"
            className="h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5 mr-2" />
            Send Messages
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Connect;
