import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import { ThemeProvider } from "@/components/ThemeProvider";
import { SiteLoader } from "@/components/SiteLoader";
import { Navigation } from "@/components/Navigation";
import { ScrollToTop } from "@/components/ScrollToTop";

import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import ExperienceDetail from "./pages/ExperienceDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProjectDetailWrapper = () => {
  const { id } = useParams<{ id: string }>();
  return <ProjectDetail key={id} />;
};

const ExperienceDetailWrapper = () => {
  const { id } = useParams<{ id: string }>();
  return <ExperienceDetail key={id} />;
};

const AnimatedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects/:id" element={<ProjectDetailWrapper />} />
      <Route path="/experience/:id" element={<ExperienceDetailWrapper />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          
          {/* Site Loader */}
          {!isLoaded && (
            <SiteLoader 
              onLoadComplete={() => setIsLoaded(true)}
              minDisplayTime={5000}
            />
          )}
          
          <BrowserRouter>
            {/* Scroll reset and hash navigation behavior */}
            <ScrollToTop />
            
            {/* Navigation */}
            {isLoaded && <Navigation />}
            
            {/* Routes */}
            <AnimatedRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
