import React, { useEffect, useRef, useState } from 'react';
import { useScrambleText } from '../hooks/useScrambleText';

interface ScrambleTextProps extends React.HTMLAttributes<HTMLElement> {
  text: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  trigger?: boolean;
  delay?: number;
  wordGap?: number;
}

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className = '',
  as = 'span',
  trigger: externalTrigger,
  delay = 0,
  wordGap = 30,
  ...rest
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const [internalTrigger, setInternalTrigger] = useState(false);
  const [delayedTrigger, setDelayedTrigger] = useState(false);

  const activeTrigger = externalTrigger !== undefined ? externalTrigger : internalTrigger;

  // Track viewport intersection if no external trigger is provided
  useEffect(() => {
    if (externalTrigger !== undefined) return;

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInternalTrigger(true);
          } else {
            setInternalTrigger(false);
          }
        });
      },
      {
        threshold: 0.25, // 25% visibility threshold
        rootMargin: '0px',
      }
    );

    observer.observe(el);

    // Fallback: if element is already in viewport on mount, trigger immediately
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setInternalTrigger(true);
    }

    return () => {
      observer.unobserve(el);
    };
  }, [externalTrigger]);

  // Handle delayed trigger for entry decode
  useEffect(() => {
    if (activeTrigger) {
      if (delay > 0) {
        const tId = window.setTimeout(() => {
          setDelayedTrigger(true);
        }, delay);
        return () => window.clearTimeout(tId);
      } else {
        setDelayedTrigger(true);
      }
    } else {
      setDelayedTrigger(false);
    }
  }, [activeTrigger, delay]);

  const displayText = useScrambleText(text, delayedTrigger, wordGap);

  const Component = as as any;

  // If fully re-scrambled on exit, displayText is empty
  if (!displayText) {
    return <Component ref={containerRef} className={className} {...rest} />;
  }

  return (
    <Component ref={containerRef} className={className} {...rest}>
      {displayText.split('').map((char, index) => {
        const originalChar = text[index] || ' ';
        const isSpace = originalChar === ' ';
        const isScrambled = !isSpace && char !== originalChar;

        return (
          <span
            key={index}
            className={isScrambled ? 'text-[#00e5ff] transition-colors duration-200' : ''}
            style={isScrambled ? { color: '#00e5ff' } : undefined}
          >
            {isSpace ? ' ' : char}
          </span>
        );
      })}
    </Component>
  );
};
