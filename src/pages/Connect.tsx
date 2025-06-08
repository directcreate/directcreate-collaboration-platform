
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
    console.log("Sending message to makers:", selectedMakers);
    console.log("Message:", message);
    
    navigate("/", { 
      state: { 
        messageSent: true,
        makers: selectedMakers.map(maker => maker.name).join(', ')
      } 
    });
  };

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <header className="px-4 sm:px-6 py-4 flex items-center justify-between border-b border-border/20 flex-shrink-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/discover")}
          className="hover:bg-accent rounded-xl"
        >
          <ArrowLeft className="w-4 h-4 mr-2 stroke-[1.5]" />
          Back
        </Button>
        
        <h1 className="text-lg font-medium">Connect with Makers</h1>
        
        <div className="w-16" />
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-6 py-6 sm:py-8 max-w-5xl mx-auto w-full flex flex-col min-h-0">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-foreground mb-3 sm:mb-4 leading-tight">
            Ready to start your
            <br />
            collaboration?
          </h2>
          {selectedMakers.length > 0 && (
            <p className="text-lg sm:text-xl text-muted-foreground font-light">
              Your message to {selectedMakers.length} selected maker{selectedMakers.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        <div className="flex-1 flex flex-col lg:flex-row gap-6 sm:gap-8 min-h-0">
          {/* Selected Makers */}
          {selectedMakers.length > 0 && (
            <div className="bg-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:w-1/3 flex-shrink-0">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">
                Selected Makers
              </h3>
              <div className="space-y-4 sm:space-y-6">
                {selectedMakers.map((maker) => (
                  <div key={maker.id} className="flex items-center gap-3 sm:gap-4">
                    <img
                      src={maker.image}
                      alt={maker.name}
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-foreground text-lg sm:text-xl">
                        {maker.name}
                      </h4>
                      <p className="text-sm sm:text-base text-muted-foreground font-medium">
                        {maker.specialty} • {maker.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Message Composer */}
          <div className="bg-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex-1 flex flex-col min-h-0">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">
              Your Message
            </h3>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 text-base sm:text-lg leading-relaxed resize-none border-border/30 rounded-2xl bg-background/50 min-h-0"
              placeholder="Write a thoughtful message to introduce yourself and your project..."
            />
          </div>
        </div>

        {/* Send Button */}
        <div className="text-center mt-6 sm:mt-8 flex-shrink-0">
          <Button
            onClick={handleSend}
            disabled={!message.trim() || selectedMakers.length === 0}
            size="lg"
            className="h-12 sm:h-14 px-8 sm:px-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base sm:text-lg transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5 mr-2 stroke-[1.5]" />
            Send Messages
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Connect;
