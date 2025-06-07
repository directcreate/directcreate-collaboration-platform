
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
import VisualResults from "./pages/VisualResults";
import UseCaseAnalysis from "./pages/UseCaseAnalysis";
import UseCaseProcessing from "./pages/UseCaseProcessing";
import UseCaseResults from "./pages/UseCaseResults";
import CraftFirst from "./pages/CraftFirst";
import MaterialFirst from "./pages/MaterialFirst";
import TechniqueFirst from "./pages/TechniqueFirst";
import ProductBrowser from "./pages/ProductBrowser";
import ProjectForm from "./pages/ProjectForm";
import MakerMatching from "./pages/MakerMatching";
import CollaborationRequest from "./pages/CollaborationRequest";
import RequestSent from "./pages/RequestSent";
import Dashboard from "./pages/Dashboard";
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
          <Route path="/collaborate/visual/results" element={<VisualResults />} />
          <Route path="/collaborate/use-case" element={<UseCaseAnalysis />} />
          <Route path="/collaborate/use-case/processing" element={<UseCaseProcessing />} />
          <Route path="/collaborate/use-case/results" element={<UseCaseResults />} />
          <Route path="/collaborate/craft" element={<CraftFirst />} />
          <Route path="/collaborate/material" element={<MaterialFirst />} />
          <Route path="/collaborate/technique" element={<TechniqueFirst />} />
          <Route path="/collaborate/product" element={<ProductBrowser />} />
          <Route path="/collaborate/form" element={<ProjectForm />} />
          <Route path="/collaborate/makers" element={<MakerMatching />} />
          <Route path="/collaborate/request" element={<CollaborationRequest />} />
          <Route path="/collaborate/sent" element={<RequestSent />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
