"use client";
import React, { useEffect, useRef, useState } from 'react';
import { ScrambleText } from './ScrambleText';

interface ScrambleParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  text: string;
  className?: string;
  wordStaggerMs?: number;
  trigger?: boolean;
}

export const ScrambleParagraph: React.FC<ScrambleParagraphProps> = ({
  text,
  className = '',
  wordStaggerMs = 60,
  trigger: externalTrigger,
  ...rest
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const words = useRef<string[]>([]);
  const [internalTrigger, setInternalTrigger] = useState(false);
  const [wordTriggers, setWordTriggers] = useState<boolean[]>([]);
  const timeouts = useRef<number[]>([]);

  const activeTrigger = externalTrigger !== undefined ? externalTrigger : internalTrigger;

  // Update words when text changes
  useEffect(() => {
    words.current = text.split(' ');
    setWordTriggers(Array(words.current.length).fill(false));
  }, [text]);

  // Set up internal intersection observer if no external trigger is provided
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
        threshold: 0.25, // Updated threshold to 0.25
        rootMargin: '0px',
      }
    );

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, [externalTrigger]);

  // Handle word trigger staggering based on activeTrigger state changes
  useEffect(() => {
    // Clear any pending timeouts
    timeouts.current.forEach((t) => window.clearTimeout(t));
    timeouts.current = [];

    const len = words.current.length;
    if (len === 0) return;

    if (activeTrigger) {
      // Decode (Entry): Stagger words from left to right (first to last)
      for (let idx = 0; idx < len; idx++) {
        const tId = window.setTimeout(() => {
          setWordTriggers((prev) => {
            const copy = [...prev];
            copy[idx] = true;
            return copy;
          });
        }, idx * wordStaggerMs);
        timeouts.current.push(tId);
      }
    } else {
      // Exit (Exit): Stagger words from right to left (last to first)
      for (let idx = 0; idx < len; idx++) {
        const reverseIdx = len - 1 - idx;
        const tId = window.setTimeout(() => {
          setWordTriggers((prev) => {
            const copy = [...prev];
            copy[reverseIdx] = false;
            return copy;
          });
        }, idx * wordStaggerMs);
        timeouts.current.push(tId);
      }
    }

    return () => {
      timeouts.current.forEach((t) => window.clearTimeout(t));
    };
  }, [activeTrigger, wordStaggerMs, words.current.length]);

  return (
    <p ref={containerRef} className={className} {...rest}>
      {words.current.map((word, idx) => (
        <React.Fragment key={idx}>
          <ScrambleText text={word} trigger={wordTriggers[idx]} />
          {idx < words.current.length - 1 && ' '}
        </React.Fragment>
      ))}
    </p>
  );
};
