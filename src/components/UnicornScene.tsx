 import { useEffect, useRef } from 'react';
 
 declare global {
   interface Window {
     UnicornStudio?: {
       init: () => Promise<{ element: HTMLElement; destroy: () => void }[]>;
       destroy: () => void;
     };
   }
 }
 
 interface UnicornSceneProps {
   projectId: string;
   className?: string;
   style?: React.CSSProperties;
 }
 
 export const UnicornScene = ({ 
   projectId, 
   className = '',
   style 
 }: UnicornSceneProps) => {
   const containerRef = useRef<HTMLDivElement>(null);
   const sceneRef = useRef<{ destroy: () => void } | null>(null);
   const initializedRef = useRef(false);
 
   useEffect(() => {
     if (initializedRef.current) return;
     
     const initScene = async () => {
       try {
         // Check if SDK already loaded
         if (!window.UnicornStudio) {
           const script = document.createElement('script');
           script.src = 'https://cdn.jsdelivr.net/gh/AidenMaxwell/unicornstudio.js@v2.0.5/dist/unicornStudio.umd.js';
           script.async = true;
           
           await new Promise<void>((resolve, reject) => {
             script.onload = () => resolve();
             script.onerror = reject;
             document.head.appendChild(script);
           });
 
           // Wait for SDK
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
         }
 
         // Initialize scene
         if (window.UnicornStudio && containerRef.current) {
           const scenes = await window.UnicornStudio.init();
           if (scenes && scenes.length > 0) {
             // Find the scene that matches our container
             const scene = scenes.find(s => 
               containerRef.current?.contains(s.element)
             );
             if (scene) {
               sceneRef.current = scene;
               initializedRef.current = true;
             }
           }
         }
       } catch (error) {
         console.log('Unicorn scene initialization skipped:', error);
       }
     };
 
     initScene();
 
     return () => {
       if (sceneRef.current) {
         sceneRef.current.destroy();
         sceneRef.current = null;
         initializedRef.current = false;
       }
     };
   }, [projectId]);
 
   return (
     <div 
       ref={containerRef}
       className={`relative overflow-hidden ${className}`}
       style={style}
     >
       <div
         data-us-project={projectId}
         className="w-full h-full absolute inset-0"
       />
     </div>
   );
 };
 
 export default UnicornScene;