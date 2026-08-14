"use client";
import { useState, useEffect } from "react";
import { SiteLoader } from "@/components/SiteLoader";
import { Navigation } from "@/components/Navigation";
import { startHeroPreload, subscribeHeroPreload } from "@/lib/heroFramePreloader";

export default function LayoutClientWrapper({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [heroReady, setHeroReady] = useState(false);
  const [heroProgress, setHeroProgress] = useState(0);

  useEffect(() => {
    // Start preloading hero frames at app mount
    startHeroPreload();
    const unsubscribe = subscribeHeroPreload((progress, ready) => {
      setHeroProgress(progress);
      if (ready) {
        setHeroReady(true);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <>
      {!isLoaded && (
        <SiteLoader 
          onLoadComplete={() => setIsLoaded(true)}
          minDisplayTime={8000}
          externalReady={heroReady}
          preloadProgress={heroProgress}
        />
      )}
      {isLoaded && <Navigation />}
      {children}
    </>
  );
}
