import { useState, useEffect, useRef } from 'react';

const POOL = '!@#$%^&*<>[]{}|/\\~+=?ABCDEFabcdef0123456789ΔΩΞλπ';

/**
 * Sequential character scramble hook.
 * Resolves words one at a time and letters left-to-right within each word.
 * On exit, mirrors the exact timing right-to-left.
 * 
 * @param text The target string to scramble.
 * @param trigger true to decode, false to re-scramble and hide.
 * @param wordGap The stagger gap (ms) after a word finishes before the next starts.
 * @returns The scrambled or resolved string state.
 */
export const useScrambleText = (
  text: string,
  trigger: boolean,
  wordGap: number = 30
): string => {
  const [displayText, setDisplayText] = useState('');
  const intervalId = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    // Clear any active interval
    if (intervalId.current) {
      window.clearInterval(intervalId.current);
      intervalId.current = null;
    }

    if (!text) {
      setDisplayText('');
      return;
    }

    const len = text.length;

    // Pre-calculate timing timelines
    const startTimes = Array(len).fill(0);
    const resolveTimes = Array(len).fill(0);

    const letterStagger = 20; // Snappy 20ms stagger between starting consecutive letters
    const scrambleDuration = 80; // 80ms scramble duration per character (4 frames of 20ms)

    if (trigger) {
      // Decode (Entry): Process words sequentially, letters left-to-right (overlapped stagger)
      let currentTime = 0;
      for (let i = 0; i < len; i++) {
        const char = text[i];
        if (char === ' ') {
          startTimes[i] = currentTime;
          resolveTimes[i] = currentTime;
          currentTime += wordGap; // Snappy word transition gap
        } else {
          startTimes[i] = currentTime;
          resolveTimes[i] = currentTime + scrambleDuration;
          currentTime += letterStagger; // Stagger starting time of the next letter
        }
      }

      // Max time is the absolute final resolve time in the array
      let maxTime = 0;
      for (let i = 0; i < len; i++) {
        if (resolveTimes[i] > maxTime) {
          maxTime = resolveTimes[i];
        }
      }

      startTimeRef.current = Date.now();

      const tick = () => {
        const elapsed = Date.now() - startTimeRef.current;

        if (elapsed >= maxTime) {
          // Entire string resolved
          setDisplayText(text);
          if (intervalId.current) {
            window.clearInterval(intervalId.current);
            intervalId.current = null;
          }
          return;
        }

        let currentStr = '';
        for (let i = 0; i < len; i++) {
          const char = text[i];
          if (char === ' ') {
            currentStr += ' ';
            continue;
          }

          if (elapsed < startTimes[i]) {
            currentStr += ' '; // Hidden before it starts scrambling
          } else if (elapsed >= resolveTimes[i]) {
            currentStr += char; // Fully resolved to real character
          } else {
            // Actively scrambling
            const randomChar = POOL[Math.floor(Math.random() * POOL.length)];
            currentStr += randomChar;
          }
        }
        setDisplayText(currentStr);
      };

      intervalId.current = window.setInterval(tick, 20);
      tick(); // Immediate invocation
    } else {
      // Re-scramble (Exit): Mirror timing right-to-left (overlapped stagger)
      let currentTime = 0;
      const exitStartTimes = Array(len).fill(0);
      const exitResolveTimes = Array(len).fill(0);

      for (let i = len - 1; i >= 0; i--) {
        const char = text[i];
        if (char === ' ') {
          exitStartTimes[i] = currentTime;
          exitResolveTimes[i] = currentTime;
          currentTime += wordGap;
        } else {
          exitStartTimes[i] = currentTime;
          exitResolveTimes[i] = currentTime + scrambleDuration;
          currentTime += letterStagger;
        }
      }

      // Max time is the absolute final exit resolve time in the array
      let maxTime = 0;
      for (let i = 0; i < len; i++) {
        if (exitResolveTimes[i] > maxTime) {
          maxTime = exitResolveTimes[i];
        }
      }

      startTimeRef.current = Date.now();

      const tick = () => {
        const elapsed = Date.now() - startTimeRef.current;

        if (elapsed >= maxTime) {
          // Fully re-scrambled and hidden
          setDisplayText('');
          if (intervalId.current) {
            window.clearInterval(intervalId.current);
            intervalId.current = null;
          }
          return;
        }

        let currentStr = '';
        for (let i = 0; i < len; i++) {
          const char = text[i];
          if (char === ' ') {
            currentStr += ' ';
            continue;
          }

          if (elapsed < exitStartTimes[i]) {
            currentStr += char; // Remains resolved before scramble starts
          } else if (elapsed >= exitResolveTimes[i]) {
            currentStr += ' '; // Disappeared/Hidden after scramble finishes
          } else {
            // Actively scrambling on exit
            const randomChar = POOL[Math.floor(Math.random() * POOL.length)];
            currentStr += randomChar;
          }
        }
        setDisplayText(currentStr);
      };

      intervalId.current = window.setInterval(tick, 20);
      tick(); // Immediate invocation
    }

    return () => {
      if (intervalId.current) {
        window.clearInterval(intervalId.current);
        intervalId.current = null;
      }
    };
  }, [text, trigger, wordGap]);

  return displayText;
};
