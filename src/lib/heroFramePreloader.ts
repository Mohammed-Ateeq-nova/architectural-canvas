// Module-level hero frame preloader with progressive two-pass loading & WebP support
const TOTAL_FRAMES = 59;
const PRIORITY_FRAME_COUNT = 20; // Pass 1 covers initial viewport & intro

const WEBP_FRAME_PATH = (i: number) =>
  `/Hero_Frames/ezgif-frame-${String(i).padStart(3, '0')}.webp`;
const PNG_FRAME_PATH = (i: number) =>
  `/Hero_Frames/ezgif-frame-${String(i).padStart(3, '0')}.png`;

let preloadPromise: Promise<HTMLImageElement[]> | null = null;
const preloadedFrames: HTMLImageElement[] = new Array(TOTAL_FRAMES);
let priorityLoadedCount = 0;
let totalLoadedCount = 0;
let isPriorityReady = false;
let isAllReady = false;

type ProgressListener = (progress: number, priorityReady: boolean, allReady: boolean) => void;
const listeners = new Set<ProgressListener>();

function notifyListeners() {
  // Progress reflects priority loading (0-100%) for loader gate
  const progress = Math.min(100, Math.round((priorityLoadedCount / PRIORITY_FRAME_COUNT) * 100));
  listeners.forEach((listener) => {
    try {
      listener(progress, isPriorityReady, isAllReady);
    } catch (e) {
      console.error('Error in hero preload listener:', e);
    }
  });
}

export function subscribeHeroPreload(listener: ProgressListener): () => void {
  listeners.add(listener);
  const progress = Math.min(100, Math.round((priorityLoadedCount / PRIORITY_FRAME_COUNT) * 100));
  listener(progress, isPriorityReady, isAllReady);
  return () => {
    listeners.delete(listener);
  };
}

export function getHeroFrames(): HTMLImageElement[] {
  return preloadedFrames;
}

export function isHeroPriorityReady(): boolean {
  return isPriorityReady;
}

export function isHeroPreloaded(): boolean {
  return isPriorityReady;
}

export function isHeroAllReady(): boolean {
  return isAllReady;
}

export function getMaxLoadedFrameIndex(): number {
  for (let i = TOTAL_FRAMES - 1; i >= 0; i--) {
    const img = preloadedFrames[i];
    if (img && img.complete && img.naturalWidth > 0) {
      return i;
    }
  }
  return 0;
}

function loadSingleFrame(index: number): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = 'async';
    img.src = WEBP_FRAME_PATH(index + 1);

    const onDone = () => {
      preloadedFrames[index] = img;
      resolve(img);
    };

    img.onload = onDone;
    img.onerror = () => {
      // Fallback to PNG if WebP fails
      img.onerror = onDone;
      img.onload = onDone;
      img.src = PNG_FRAME_PATH(index + 1);
    };
  });
}

export function startHeroPreload(onProgress?: (progress: number) => void): Promise<HTMLImageElement[]> {
  if (onProgress) {
    subscribeHeroPreload((progress) => onProgress(progress));
  }

  if (preloadPromise) {
    return preloadPromise;
  }

  if (typeof window === 'undefined') {
    return Promise.resolve([]);
  }

  preloadPromise = new Promise<HTMLImageElement[]>(async (resolve) => {
    // Pass 1: High Priority (Frames 1-20)
    const priorityPromises = [];
    for (let i = 0; i < PRIORITY_FRAME_COUNT; i++) {
      const p = loadSingleFrame(i).then(() => {
        priorityLoadedCount++;
        totalLoadedCount++;
        if (priorityLoadedCount >= PRIORITY_FRAME_COUNT) {
          isPriorityReady = true;
        }
        notifyListeners();
      });
      priorityPromises.push(p);
    }

    await Promise.all(priorityPromises);
    isPriorityReady = true;
    notifyListeners();

    // Pass 2: Background Loading (Frames 21-59)
    const backgroundPromises = [];
    for (let i = PRIORITY_FRAME_COUNT; i < TOTAL_FRAMES; i++) {
      const p = loadSingleFrame(i).then(() => {
        totalLoadedCount++;
        if (totalLoadedCount >= TOTAL_FRAMES) {
          isAllReady = true;
        }
        notifyListeners();
      });
      backgroundPromises.push(p);
    }

    Promise.all(backgroundPromises).then(() => {
      isAllReady = true;
      notifyListeners();
      resolve(preloadedFrames);
    });
  });

  return preloadPromise;
}
