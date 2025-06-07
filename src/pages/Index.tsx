
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Palette, Package, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [intent, setIntent] = useState("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (intent.trim()) {
      navigate("/discover", { state: { intent } });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="pt-12 pb-8 text-center">
        <h1 className="text-2xl font-semibold text-foreground tracking-tight">
          Craft
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 max-w-2xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-6 leading-tight">
            What do you want
            <br />
            to create?
          </h2>
          <p className="text-xl text-muted-foreground font-light">
            Share your vision and connect with makers who can bring it to life.
          </p>
        </div>

        {/* Intent Input */}
        <div className="w-full mb-12">
          <textarea
            value={intent}
            onChange={(e) => setIntent(e.target.value)}
            placeholder="I want to create something beautiful..."
            className="w-full h-32 px-6 py-4 text-lg border border-border rounded-2xl bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 placeholder:text-muted-foreground"
            autoFocus
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <Button
            variant="outline"
            size="lg"
            className="h-14 px-6 rounded-full border-border hover:bg-accent transition-all duration-200"
            onClick={() => document.querySelector('input[type="file"]')?.click()}
          >
            <Camera className="w-5 h-5 mr-2" />
            Show us
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="h-14 px-6 rounded-full border-border hover:bg-accent transition-all duration-200"
          >
            <Palette className="w-5 h-5 mr-2" />
            Browse
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="h-14 px-6 rounded-full border-border hover:bg-accent transition-all duration-200"
          >
            <Package className="w-5 h-5 mr-2" />
            Products
          </Button>
        </div>

        {/* Hidden file input */}
        <input type="file" className="hidden" accept="image/*" />

        {/* Find Makers Button */}
        <Button
          onClick={handleContinue}
          disabled={!intent.trim()}
          size="lg"
          className="h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Users className="w-5 h-5 mr-2" />
          Find Makers
        </Button>
      </main>

      {/* Footer */}
      <footer className="pb-8 text-center">
        <p className="text-sm text-muted-foreground">
          Connecting visionaries with craftspeople
        </p>
      </footer>
    </div>
  );
};

export default Index;
