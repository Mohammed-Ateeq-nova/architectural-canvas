 import { useState, useEffect } from "react";
 import { Toaster } from "@/components/ui/toaster";
 import { Toaster as Sonner } from "@/components/ui/sonner";
 import { TooltipProvider } from "@/components/ui/tooltip";
 import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
 import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
 import { AnimatePresence } from "framer-motion";
 
 import { ThemeProvider } from "@/components/ThemeProvider";
 import { SiteLoader } from "@/components/SiteLoader";
 import { Navigation } from "@/components/Navigation";
 
 import Home from "./pages/Home";
 import About from "./pages/About";
 import Projects from "./pages/Projects";
 import ProjectDetail from "./pages/ProjectDetail";
 import Experience from "./pages/Experience";
 import Resume from "./pages/Resume";
 import Contact from "./pages/Contact";
 import NotFound from "./pages/NotFound";
 
 const queryClient = new QueryClient();
 
 const AnimatedRoutes = () => {
   const location = useLocation();
   
   return (
     <AnimatePresence mode="wait">
       <Routes location={location} key={location.pathname}>
         <Route path="/" element={<Home />} />
         <Route path="/about" element={<About />} />
         <Route path="/projects" element={<Projects />} />
         <Route path="/projects/:id" element={<ProjectDetail />} />
         <Route path="/experience" element={<Experience />} />
         <Route path="/resume" element={<Resume />} />
         <Route path="/contact" element={<Contact />} />
         <Route path="*" element={<NotFound />} />
       </Routes>
     </AnimatePresence>
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
               minDisplayTime={2500}
             />
           )}
           
           <BrowserRouter>
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
