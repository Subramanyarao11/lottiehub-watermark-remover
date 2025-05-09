'use client';

import { useEffect, useRef } from 'react';
import lottie, { AnimationItem } from 'lottie-web';

export default function Preview({ file }: { file: File }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<AnimationItem | null>(null);

  useEffect(() => {
    if (!file || !containerRef.current) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const result = e.target?.result;
        if (typeof result !== 'string') return;
        const animationData = JSON.parse(result);

        if (animationRef.current) {
          animationRef.current.destroy();
        }

        if (!containerRef.current) return;

        animationRef.current = lottie.loadAnimation({
          container: containerRef.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData
        });
      } catch (err) {
        console.error('Error loading Lottie animation:', err);
      }
    };

    reader.readAsText(file);

    return () => {
      if (animationRef.current) {
        animationRef.current.destroy();
      }
    };
  }, [file]);

  return (
    <div className="border border-gray-200 rounded-lg bg-gray-50 aspect-square flex items-center justify-center">
      <div ref={containerRef} className="w-full h-full"></div>
    </div>
  );
}
