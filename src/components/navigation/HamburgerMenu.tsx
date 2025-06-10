
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Home, TestTube, Palette, Hammer, Users, Settings } from "lucide-react";

const HamburgerMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { 
      title: "Home", 
      path: "/", 
      icon: Home,
      description: "Start your collaboration journey"
    },
    { 
      title: "API Testing", 
      path: "/test", 
      icon: TestTube,
      description: "Test API connections and diagnostics"
    },
    { 
      title: "Discover", 
      path: "/discover", 
      icon: Palette,
      description: "Explore materials and crafts"
    },
    { 
      title: "Connect", 
      path: "/connect", 
      icon: Users,
      description: "Find and connect with artisans"
    },
    { 
      title: "Craft First", 
      path: "/collaborate/craft", 
      icon: Hammer,
      description: "Start with a specific craft"
    },
    { 
      title: "Dashboard", 
      path: "/dashboard", 
      icon: Settings,
      description: "View your projects and collaborations"
    }
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>DirectCreate Navigation</SheetTitle>
          <SheetDescription>
            Navigate to different sections of the application
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Button
                key={item.path}
                variant={isActive ? "default" : "ghost"}
                className="w-full justify-start gap-3 h-auto p-3"
                onClick={() => handleNavigate(item.path)}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <div className="text-left">
                  <div className="font-medium">{item.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {item.description}
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default HamburgerMenu;
