"use client";
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
  externalReady?: boolean;
  preloadProgress?: number;
}

export const SiteLoader = ({ 
  onLoadComplete, 
  minDisplayTime = 8000,
  externalReady = true,
  preloadProgress = 100
}: SiteLoaderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [displayProgress, setDisplayProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{ destroy: () => void } | null>(null);
  
  // Track readiness states with refs for timer and external ready
  const timerReadyRef = useRef(false);
  const externalReadyRef = useRef(externalReady);
  const isDismissingRef = useRef(false);
  const onLoadCompleteRef = useRef(onLoadComplete);

  externalReadyRef.current = externalReady;
  onLoadCompleteRef.current = onLoadComplete;

  // Unicorn Studio SDK initialization
  useEffect(() => {
    let mounted = true;

    const loadUnicornStudio = async () => {
      try {
        if (!window.UnicornStudio) {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.12/dist/unicornStudio.umd.js';
          script.async = true;
          
          await new Promise<void>((resolve, reject) => {
            script.onload = () => resolve();
            script.onerror = reject;
            document.head.appendChild(script);
          });
        }

        await new Promise<void>((resolve) => {
          const checkSDK = () => {
            if (!mounted) return;
            if (window.UnicornStudio) {
              resolve();
            } else {
              setTimeout(checkSDK, 50);
            }
          };
          checkSDK();
        });

        if (mounted && window.UnicornStudio && containerRef.current) {
          const scenes = await window.UnicornStudio.init();
          if (scenes && scenes[0]) {
            sceneRef.current = scenes[0];
          }
        }
      } catch (error) {
        console.log('Unicorn Studio loader skipped:', error);
      }
    };

    loadUnicornStudio();

    return () => {
      mounted = false;
      if (sceneRef.current) {
        sceneRef.current.destroy();
      }
    };
  }, []);

  // Timer & progress calculation: 70% loader timer, 30% image preload
  useEffect(() => {
    const startTime = Date.now();

    const triggerDismiss = () => {
      if (isDismissingRef.current) return;
      isDismissingRef.current = true;
      setIsLoading(false);
      
      setTimeout(() => {
        setIsVisible(false);
        onLoadCompleteRef.current?.();
        if (sceneRef.current) {
          sceneRef.current.destroy();
        }
      }, 800);
    };

    const intervalId = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const timerFraction = Math.min(1, elapsed / minDisplayTime);
      const timerPercent = timerFraction * 100;
      
      if (elapsed >= minDisplayTime) {
        timerReadyRef.current = true;
      }

      // Weight: 70% timer, 30% preload
      const currentImageProgress = Math.min(100, Math.max(0, preloadProgress));
      const calculatedTotal = Math.min(
        100,
        Math.round(timerPercent * 0.7 + currentImageProgress * 0.3)
      );

      // Only reach 100% when both timer is ready AND externalReady is true
      if (timerReadyRef.current && externalReadyRef.current && currentImageProgress >= 100) {
        setDisplayProgress(100);
        clearInterval(intervalId);
        triggerDismiss();
      } else {
        // Cap display progress at 99% until both conditions are met
        setDisplayProgress(Math.min(99, calculatedTotal));
      }
    }, 40);

    return () => clearInterval(intervalId);
  }, [minDisplayTime, preloadProgress]);

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
          
          {/* Loading indicator */}
          <motion.div 
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="w-48 h-[2px] bg-muted overflow-hidden rounded-full relative">
              <motion.div 
                className="h-full bg-foreground dark:bg-neon-cyan transition-all duration-150 ease-out"
                style={{ width: `${displayProgress}%` }}
              />
            </div>
            <span className="text-xs font-display uppercase tracking-[0.3em] text-muted-foreground">
              Loading Experience {displayProgress > 0 ? `${displayProgress}%` : ''}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SiteLoader;