"use client";
import { useState } from "react";
import { SiteLoader } from "@/components/SiteLoader";
import { Navigation } from "@/components/Navigation";

export default function LayoutClientWrapper({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && (
        <SiteLoader 
          onLoadComplete={() => setIsLoaded(true)}
          minDisplayTime={8000}
        />
      )}
      {isLoaded && <Navigation />}
      {children}
    </>
  );
}
