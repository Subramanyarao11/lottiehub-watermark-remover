'use client';

import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

export default function Preview({ file }) {
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!file || !containerRef.current) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const animationData = JSON.parse(e.target.result);

        // Destroy previous animation if exists
        if (animationRef.current) {
          animationRef.current.destroy();
        }

        // Create new animation
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

    // Cleanup
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
