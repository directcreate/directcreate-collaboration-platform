import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, PackageOpen, Hammer, Sparkles } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";

import APITester from "@/components/debug/APITester";
import ConnectionStatus from "@/components/debug/ConnectionStatus";

const Index = () => {
  const navigate = useNavigate();
  const [isMaterialFirst, setIsMaterialFirst] = useState(false);
  const [isCraftFirst, setIsCraftFirst] = useState(false);

  const handleMaterialFirst = () => {
    setIsMaterialFirst(true);
    navigate('/collaborate/material', { state: { materialFirst: true } });
  };

  const handleCraftFirst = () => {
    setIsCraftFirst(true);
    navigate('/collaborate/craft', { state: { craftFirst: true } });
  };

  return (
    <div className="min-h-screen bg-background">
      
      {/* Add connection status to header */}
      <header className="px-4 sm:px-6 py-4 flex items-center justify-between border-b border-border/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <a href="/" className="flex items-center gap-2 font-semibold">
          <Sparkles className="w-6 h-6" />
          DirectCreate
        </a>
        <div className="flex items-center gap-4">
          <ConnectionStatus />
          
        </div>
      </header>

      

      {/* Add API Tester section before the main content */}
      <section className="py-16 px-4 sm:px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">API Connection Testing</h2>
            <p className="text-lg text-muted-foreground">
              Test and verify DirectCreate API connectivity
            </p>
          </div>
          <APITester />
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-foreground mb-6 leading-tight">
              Start Your
              <br />
              Collaboration Journey
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground font-light">
              Connect with skilled artisans and bring your creative vision to life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Material First Card */}
            <Card className="bg-card text-card-foreground shadow-md overflow-hidden">
              <AspectRatio ratio={16 / 9}>
                <img
                  src="/images/material-first.webp"
                  alt="Material First"
                  className="object-cover rounded-t-md"
                />
              </AspectRatio>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Material First</h2>
                <p className="text-md text-muted-foreground mb-6">
                  Begin by selecting the perfect material for your project. Explore our
                  extensive DirectCreate database of sustainable and unique materials.
                </p>
                <Button
                  onClick={handleMaterialFirst}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Choose a Material
                  <ArrowRight className="ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Craft First Card */}
            <Card className="bg-card text-card-foreground shadow-md overflow-hidden">
              <AspectRatio ratio={16 / 9}>
                <img
                  src="/images/craft-first.webp"
                  alt="Craft First"
                  className="object-cover rounded-t-md"
                />
              </AspectRatio>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Craft First</h2>
                <p className="text-md text-muted-foreground mb-6">
                  Start with a specific craft in mind. Browse our curated collection of
                  traditional crafts and find inspiration for your next project.
                </p>
                <Button
                  onClick={handleCraftFirst}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Select a Craft
                  <ArrowRight className="ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 sm:px-6 bg-muted/50 text-center text-muted-foreground">
        <p className="text-sm">
          © {new Date().getFullYear()} DirectCreate. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Index;
