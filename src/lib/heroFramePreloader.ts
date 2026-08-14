// Module-level hero frame preloader with idempotency guard
const TOTAL_FRAMES = 59;
const FRAME_PATH = (i: number) =>
  `/Hero_Frames/ezgif-frame-${String(i).padStart(3, '0')}.png`;

let preloadPromise: Promise<HTMLImageElement[]> | null = null;
let preloadedFrames: HTMLImageElement[] = [];
let preloadProgress = 0;
let isReady = false;

type ProgressListener = (progress: number, ready: boolean) => void;
const listeners = new Set<ProgressListener>();

function notifyListeners() {
  listeners.forEach((listener) => {
    try {
      listener(preloadProgress, isReady);
    } catch (e) {
      console.error('Error in hero preload listener:', e);
    }
  });
}

export function subscribeHeroPreload(listener: ProgressListener): () => void {
  listeners.add(listener);
  // Initial callback with current state
  listener(preloadProgress, isReady);
  return () => {
    listeners.delete(listener);
  };
}

export function getHeroFrames(): HTMLImageElement[] {
  return preloadedFrames;
}

export function isHeroPreloaded(): boolean {
  return isReady;
}

export function getHeroPreloadProgress(): number {
  return preloadProgress;
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

  preloadPromise = new Promise<HTMLImageElement[]>((resolve) => {
    let loadedCount = 0;
    const imgs: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    const handleItemDone = () => {
      loadedCount++;
      preloadProgress = Math.round((loadedCount / TOTAL_FRAMES) * 100);
      if (loadedCount >= TOTAL_FRAMES) {
        isReady = true;
        preloadedFrames = imgs;
        notifyListeners();
        resolve(imgs);
      } else {
        notifyListeners();
      }
    };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i + 1);
      img.onload = handleItemDone;
      img.onerror = handleItemDone;
      imgs[i] = img;
    }
  });

  return preloadPromise;
}
