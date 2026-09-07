import { useState, useEffect, useRef } from 'react';

const POOL = '!@#$%^&*<>[]{}|/\\~+=?ABCDEFabcdef0123456789ΔΩΞλπ';

// Global shared scheduler singleton for ScrambleText
type TickCallback = () => void;
const subscribers = new Set<TickCallback>();
let schedulerInterval: ReturnType<typeof setInterval> | null = null;

function addSchedulerSubscriber(tick: TickCallback): void {
  subscribers.add(tick);
  if (!schedulerInterval && typeof window !== 'undefined') {
    schedulerInterval = setInterval(() => {
      subscribers.forEach((fn) => {
        try {
          fn();
        } catch (e) {
          console.error('Error in ScrambleText scheduler tick:', e);
        }
      });
    }, 20);
  }
}

function removeSchedulerSubscriber(tick: TickCallback): void {
  subscribers.delete(tick);
  if (subscribers.size === 0 && schedulerInterval) {
    clearInterval(schedulerInterval);
    schedulerInterval = null;
  }
}

/**
 * Sequential character scramble hook.
 * Resolves words one at a time and letters left-to-right within each word.
 * On exit, mirrors the exact timing right-to-left.
 * 
 * Powered by a global singleton scheduler to prevent hundreds of simultaneous timers.
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
  const startTimeRef = useRef<number>(0);
  const activeTickRef = useRef<TickCallback | null>(null);

  useEffect(() => {
    // Clean up any existing subscription
    if (activeTickRef.current) {
      removeSchedulerSubscriber(activeTickRef.current);
      activeTickRef.current = null;
    }

    if (!text) {
      setDisplayText('');
      return;
    }

    const len = text.length;
    const startTimes = new Array(len).fill(0);
    const resolveTimes = new Array(len).fill(0);
    const letterStagger = 20; // 20ms stagger between consecutive letters
    const scrambleDuration = 80; // 80ms scramble duration per character

    let maxTime = 0;

    if (trigger) {
      // Decode (Entry): Process words sequentially, letters left-to-right
      let currentTime = 0;
      for (let i = 0; i < len; i++) {
        const char = text[i];
        if (char === ' ') {
          startTimes[i] = currentTime;
          resolveTimes[i] = currentTime;
          currentTime += wordGap;
        } else {
          startTimes[i] = currentTime;
          resolveTimes[i] = currentTime + scrambleDuration;
          currentTime += letterStagger;
        }
      }

      for (let i = 0; i < len; i++) {
        if (resolveTimes[i] > maxTime) {
          maxTime = resolveTimes[i];
        }
      }

      startTimeRef.current = Date.now();

      const tick: TickCallback = () => {
        const elapsed = Date.now() - startTimeRef.current;

        if (elapsed >= maxTime) {
          setDisplayText(text);
          if (activeTickRef.current) {
            removeSchedulerSubscriber(activeTickRef.current);
            activeTickRef.current = null;
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
            currentStr += ' ';
          } else if (elapsed >= resolveTimes[i]) {
            currentStr += char;
          } else {
            const randomChar = POOL[Math.floor(Math.random() * POOL.length)];
            currentStr += randomChar;
          }
        }
        setDisplayText(currentStr);
      };

      activeTickRef.current = tick;
      addSchedulerSubscriber(tick);
      tick(); // Immediate first frame execution
    } else {
      // Re-scramble (Exit): Mirror timing right-to-left
      let currentTime = 0;
      const exitStartTimes = new Array(len).fill(0);
      const exitResolveTimes = new Array(len).fill(0);

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

      for (let i = 0; i < len; i++) {
        if (exitResolveTimes[i] > maxTime) {
          maxTime = exitResolveTimes[i];
        }
      }

      startTimeRef.current = Date.now();

      const tick: TickCallback = () => {
        const elapsed = Date.now() - startTimeRef.current;

        if (elapsed >= maxTime) {
          setDisplayText('');
          if (activeTickRef.current) {
            removeSchedulerSubscriber(activeTickRef.current);
            activeTickRef.current = null;
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
            currentStr += char;
          } else if (elapsed >= exitResolveTimes[i]) {
            currentStr += ' ';
          } else {
            const randomChar = POOL[Math.floor(Math.random() * POOL.length)];
            currentStr += randomChar;
          }
        }
        setDisplayText(currentStr);
      };

      activeTickRef.current = tick;
      addSchedulerSubscriber(tick);
      tick(); // Immediate first frame execution
    }

    return () => {
      if (activeTickRef.current) {
        removeSchedulerSubscriber(activeTickRef.current);
        activeTickRef.current = null;
      }
    };
  }, [text, trigger, wordGap]);

  return displayText;
};
