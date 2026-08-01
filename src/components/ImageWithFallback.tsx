import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Perfume } from '../types';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  perfume?: Perfume;
  onLoadComplete?: () => void;
}

const CACHE_KEY = 'perfume_image_cache_v6';
export const DEFAULT_PLACEHOLDER = 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&h=800&q=85';

// Memory cache of proven successful image URLs
const memoryCache = new Map<string, string>();

const getCachedImages = (): Record<string, string> => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    return cached ? JSON.parse(cached) : {};
  } catch (e) {
    return {};
  }
};

const setCachedImage = (perfumeId: string, url: string) => {
  try {
    const cached = getCachedImages();
    cached[perfumeId] = url;
    localStorage.setItem(CACHE_KEY, JSON.stringify(cached));
  } catch (e) {
    // Ignore storage quota errors
  }
};

const getCachedUrl = (perfumeId: string): string | null => {
  if (memoryCache.has(perfumeId)) {
    return memoryCache.get(perfumeId)!;
  }
  const local = getCachedImages();
  if (local[perfumeId]) {
    memoryCache.set(perfumeId, local[perfumeId]);
    return local[perfumeId];
  }
  return null;
};

const cacheUrl = (perfumeId: string, url: string) => {
  memoryCache.set(perfumeId, url);
  setCachedImage(perfumeId, url);
};

export function getPerfumeImageCandidates(perfume?: Perfume, srcProp?: string): string[] {
  const candidates: string[] = [];
  if (srcProp) {
    candidates.push(srcProp);
  }
  if (!perfume) {
    candidates.push(DEFAULT_PLACEHOLDER);
    return Array.from(new Set(candidates)).filter(Boolean);
  }
  const id = perfume.id;
  const isRemote = (url?: string) => Boolean(url && (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//')));

  // 1. Memory/local cached URL if available
  if (id) {
    const cached = getCachedUrl(id);
    if (cached) {
      candidates.push(cached);
    }
  }

  // 2. Primary fallbackImage if remote
  if (isRemote(perfume.fallbackImage)) {
    candidates.push(perfume.fallbackImage!);
  }

  // 3. Main image if remote
  if (isRemote(perfume.image)) {
    candidates.push(perfume.image!);
  }

  // 4. Local fallback paths for offline / static images
  if (id) {
    candidates.push(`/images/${id}.png`);
    candidates.push(`/images/${id}.webp`);
  }

  // 5. Guaranteed high quality luxury placeholder
  candidates.push(DEFAULT_PLACEHOLDER);

  // Filter out duplicates and empty values
  return Array.from(new Set(candidates)).filter(Boolean);
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  perfume,
  src,
  className,
  alt,
  referrerPolicy = 'no-referrer',
  onLoadComplete,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const cachedUrlOnMount = useMemo(() => {
    return perfume?.id ? getCachedUrl(perfume.id) : null;
  }, [perfume?.id]);

  const candidates = useMemo(() => getPerfumeImageCandidates(perfume, src as string | undefined), [perfume, src]);
  const initialSrc = cachedUrlOnMount || candidates[0] || DEFAULT_PLACEHOLDER;

  const [displaySrc, setDisplaySrc] = useState<string>(initialSrc);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isInViewport, setIsInViewport] = useState<boolean>(() => !!cachedUrlOnMount);

  // Lazy load observer
  useEffect(() => {
    if (isInViewport) return;
    if (typeof IntersectionObserver === 'undefined') {
      setIsInViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    const currentElement = containerRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      observer.disconnect();
    };
  }, [isInViewport]);

  // Candidate Preloader & Safety Logic
  useEffect(() => {
    if (!isInViewport) return;

    let isMounted = true;
    let candidateIndex = 0;
    let activePreloadImg: HTMLImageElement | null = null;
    let candidateTimeout: NodeJS.Timeout | null = null;
    let safetyFallbackTimeout: NodeJS.Timeout | null = null;

    // Safety net: Guarantee skeleton loader resolves within 2.5 seconds max
    safetyFallbackTimeout = setTimeout(() => {
      if (!isMounted) return;
      setDisplaySrc((prev) => prev || DEFAULT_PLACEHOLDER);
      setIsLoading(false);
      if (onLoadComplete) onLoadComplete();
    }, 2500);

    const tryNextCandidate = () => {
      if (!isMounted) return;

      if (candidateIndex >= candidates.length) {
        setDisplaySrc(DEFAULT_PLACEHOLDER);
        setIsLoading(false);
        if (onLoadComplete) onLoadComplete();
        if (safetyFallbackTimeout) clearTimeout(safetyFallbackTimeout);
        return;
      }

      const candidateUrl = candidates[candidateIndex];

      activePreloadImg = new Image();
      activePreloadImg.referrerPolicy = referrerPolicy as any;
      activePreloadImg.src = candidateUrl;

      // 1.2s timeout per candidate
      candidateTimeout = setTimeout(() => {
        if (!isMounted) return;
        advance();
      }, 1200);

      const advance = () => {
        if (candidateTimeout) {
          clearTimeout(candidateTimeout);
          candidateTimeout = null;
        }
        if (activePreloadImg) {
          activePreloadImg.onload = null;
          activePreloadImg.onerror = null;
        }
        candidateIndex++;
        tryNextCandidate();
      };

      activePreloadImg.onload = () => {
        if (!isMounted) return;
        if (candidateTimeout) clearTimeout(candidateTimeout);
        if (safetyFallbackTimeout) clearTimeout(safetyFallbackTimeout);

        if (perfume?.id && candidateUrl !== DEFAULT_PLACEHOLDER) {
          cacheUrl(perfume.id, candidateUrl);
        }

        setDisplaySrc(candidateUrl);
        setIsLoading(false);
        if (onLoadComplete) onLoadComplete();
      };

      activePreloadImg.onerror = () => {
        if (!isMounted) return;
        advance();
      };
    };

    tryNextCandidate();

    return () => {
      isMounted = false;
      if (activePreloadImg) {
        activePreloadImg.onload = null;
        activePreloadImg.onerror = null;
      }
      if (candidateTimeout) clearTimeout(candidateTimeout);
      if (safetyFallbackTimeout) clearTimeout(safetyFallbackTimeout);
    };
  }, [isInViewport, candidates, perfume?.id, onLoadComplete, referrerPolicy]);

  const handleImgError = () => {
    // Immediate fallback if rendered img fails in browser DOM
    if (displaySrc !== DEFAULT_PLACEHOLDER) {
      setDisplaySrc(DEFAULT_PLACEHOLDER);
    }
    setIsLoading(false);
    if (onLoadComplete) onLoadComplete();
  };

  const handleImgLoad = () => {
    setIsLoading(false);
    if (onLoadComplete) onLoadComplete();
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden flex items-center justify-center bg-[#070707]/60 select-none"
    >
      {/* Image element */}
      {displaySrc && (
        <img
          src={displaySrc}
          alt={alt || `${perfume.brand} ${perfume.name}`}
          referrerPolicy={referrerPolicy}
          onLoad={handleImgLoad}
          onError={handleImgError}
          className={`${className} ${
            isLoading
              ? 'opacity-0 scale-105 blur-xs'
              : 'opacity-100 scale-100 blur-none'
          } transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] gpu-layer`}
          {...props}
        />
      )}

      {/* Internal image frame loading spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0d0d0d] text-center p-4 z-10 animate-pulse">
          <div className="w-8 h-8 rounded-full border border-[#C8A96A]/20 border-t-[#C8A96A] animate-spin" />
        </div>
      )}
    </div>
  );
};
