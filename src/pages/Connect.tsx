
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  
  const { intent = "", selectedMakers = [] } = location.state || {};

  // Generate personalized message based on intent and selected makers
  const generateMessage = () => {
    const makerNames = selectedMakers.map((maker: Maker) => maker.name).join(", ");
    const specialties = [...new Set(selectedMakers.map((maker: Maker) => maker.specialty))];
    
    let personalizedMessage = `Hi ${makerNames},\n\n`;
    personalizedMessage += `I came across your work and I'm really impressed by your craftsmanship. `;
    
    if (intent) {
      personalizedMessage += `I have a project in mind: ${intent}\n\n`;
    }
    
    if (specialties.length === 1) {
      personalizedMessage += `Your expertise in ${specialties[0].toLowerCase()} seems like a perfect fit for what I'm envisioning. `;
    } else {
      personalizedMessage += `Your combined expertise would be perfect for bringing this vision to life. `;
    }
    
    personalizedMessage += `I'd love to discuss this project with you and see if we might collaborate.\n\n`;
    personalizedMessage += `Looking forward to hearing from you!\n\nBest regards`;
    
    return personalizedMessage;
  };

  useState(() => {
    setMessage(generateMessage());
  });

  const handleSend = async () => {
    if (!message.trim()) return;
    
    setIsSending(true);
    
    // Simulate sending message
    setTimeout(() => {
      setIsSending(false);
      toast({
        title: "Messages sent!",
        description: `Your message has been sent to ${selectedMakers.length} maker${selectedMakers.length !== 1 ? "s" : ""}.`,
      });
      
      // Navigate back to home after success
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }, 2000);
  };

  if (selectedMakers.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-light text-foreground mb-4">
            No makers selected
          </h2>
          <Button onClick={() => navigate("/discover")} variant="outline">
            Choose Makers
          </Button>
        </div>
      </div>
    );
  }

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
          
          <h1 className="text-lg font-semibold">Connect</h1>
          
          <div className="w-16" /> {/* Spacer for center alignment */}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-foreground mb-6">
            Ready to start
            <br />
            your collaboration?
          </h2>
        </div>

        {/* Selected Makers */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-foreground mb-4">
            Your message to:
          </h3>
          <div className="flex flex-wrap gap-4">
            {selectedMakers.map((maker: Maker) => (
              <div
                key={maker.id}
                className="flex items-center bg-accent rounded-full py-2 px-4"
              >
                <img
                  src={maker.image}
                  alt={maker.name}
                  className="w-8 h-8 rounded-full mr-3 object-cover"
                />
                <div className="text-left">
                  <p className="font-medium text-sm text-foreground">
                    {maker.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {maker.specialty}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Compose */}
        <div className="bg-card rounded-3xl p-8 mb-8">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message..."
            className="w-full h-80 text-base border-none bg-transparent resize-none focus:outline-none placeholder:text-muted-foreground leading-relaxed"
            autoFocus
          />
        </div>

        {/* Send Button */}
        <div className="text-center">
          <Button
            onClick={handleSend}
            disabled={!message.trim() || isSending}
            size="lg"
            className="h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {isSending ? (
              <>
                <div className="w-5 h-5 mr-2 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Send Messages
              </>
            )}
          </Button>
        </div>

        {/* Intent Reminder */}
        {intent && (
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground italic">
              Your vision: "{intent}"
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Connect;
