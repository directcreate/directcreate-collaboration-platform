
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Discover from "./pages/Discover";
import Connect from "./pages/Connect";
import VisualUpload from "./pages/VisualUpload";
import VisualAnalyzing from "./pages/VisualAnalyzing";
import UseCaseAnalysis from "./pages/UseCaseAnalysis";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/collaborate/visual/upload" element={<VisualUpload />} />
          <Route path="/collaborate/visual/analyzing" element={<VisualAnalyzing />} />
          <Route path="/collaborate/use-case" element={<UseCaseAnalysis />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
