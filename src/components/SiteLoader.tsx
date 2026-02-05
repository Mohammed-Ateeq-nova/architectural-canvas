 import { useEffect, useState, useRef } from 'react';
 import { motion, AnimatePresence } from 'framer-motion';
 
 declare global {
   interface Window {
     UnicornStudio?: {
       init: () => Promise<{ element: HTMLElement; destroy: () => void }[]>;
       destroy: () => void;
     };
   }
 }
 
 interface SiteLoaderProps {
   onLoadComplete?: () => void;
   minDisplayTime?: number;
 }
 
 export const SiteLoader = ({ 
   onLoadComplete, 
   minDisplayTime = 3000 
 }: SiteLoaderProps) => {
   const [isLoading, setIsLoading] = useState(true);
   const [isVisible, setIsVisible] = useState(true);
   const containerRef = useRef<HTMLDivElement>(null);
   const sceneRef = useRef<{ destroy: () => void } | null>(null);
 
   useEffect(() => {
     const loadUnicornStudio = async () => {
       const startTime = Date.now();
       
       try {
         // Load Unicorn Studio SDK
         const script = document.createElement('script');
         script.src = 'https://cdn.jsdelivr.net/gh/AidenMaxwell/unicornstudio.js@v2.0.5/dist/unicornStudio.umd.js';
         script.async = true;
         
         await new Promise<void>((resolve, reject) => {
           script.onload = () => resolve();
           script.onerror = reject;
           document.head.appendChild(script);
         });
 
         // Wait for SDK to be available
         await new Promise<void>((resolve) => {
           const checkSDK = () => {
             if (window.UnicornStudio) {
               resolve();
             } else {
               setTimeout(checkSDK, 50);
             }
           };
           checkSDK();
         });
 
         // Initialize the scene
         if (window.UnicornStudio && containerRef.current) {
           const scenes = await window.UnicornStudio.init();
           if (scenes && scenes[0]) {
             sceneRef.current = scenes[0];
           }
         }
       } catch (error) {
         console.log('Unicorn Studio loader skipped:', error);
       }
 
       // Ensure minimum display time
       const elapsed = Date.now() - startTime;
       const remaining = Math.max(0, minDisplayTime - elapsed);
       
       setTimeout(() => {
         setIsLoading(false);
         setTimeout(() => {
           setIsVisible(false);
           onLoadComplete?.();
           // Cleanup
           if (sceneRef.current) {
             sceneRef.current.destroy();
           }
         }, 800);
       }, remaining);
     };
 
     loadUnicornStudio();
 
     return () => {
       if (sceneRef.current) {
         sceneRef.current.destroy();
       }
     };
   }, [minDisplayTime, onLoadComplete]);
 
   if (!isVisible) return null;
 
   return (
     <AnimatePresence>
       {isVisible && (
         <motion.div
           initial={{ opacity: 1 }}
           animate={{ opacity: isLoading ? 1 : 0 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
           className="fixed inset-0 z-[9999] bg-background"
           ref={containerRef}
         >
           {/* Unicorn Studio Scene Container */}
           <div
             data-us-project="0GWKMigZZ0KmT4io8y7k"
             className="w-full h-full"
             style={{ width: '100%', height: '100%' }}
           />
           
           {/* Fallback loading indicator */}
           <motion.div 
             className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.5, duration: 0.6 }}
           >
             <div className="w-48 h-[2px] bg-muted overflow-hidden rounded-full">
               <motion.div 
                 className="h-full bg-foreground dark:bg-neon-cyan"
                 initial={{ x: '-100%' }}
                 animate={{ x: '100%' }}
                 transition={{ 
                   repeat: Infinity, 
                   duration: 1.5, 
                   ease: 'easeInOut' 
                 }}
               />
             </div>
             <span className="text-xs font-display uppercase tracking-[0.3em] text-muted-foreground">
               Loading Experience
             </span>
           </motion.div>
         </motion.div>
       )}
     </AnimatePresence>
   );
 };
 
 export default SiteLoader;