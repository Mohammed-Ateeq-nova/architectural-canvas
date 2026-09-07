"use client";
import React, { useRef, useState, useEffect } from 'react';

interface SectionWrapperProps {
  children: React.ReactNode;
  minHeight?: string;
  rootMargin?: string;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  minHeight = '100px',
  rootMargin = '300px',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If already in or near viewport on mount
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 300) {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} style={{ minHeight: shouldRender ? undefined : minHeight }}>
      {shouldRender ? children : null}
    </div>
  );
};

export default SectionWrapper;
