"use client"

import { useEffect, useRef, useState } from "react"
import lottie, { type AnimationItem } from "lottie-web"
import { Play, Pause, RotateCcw } from "lucide-react"

export default function Preview({ file, title }: { file: File; title: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<AnimationItem | null>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!file || !containerRef.current) return

    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const result = e.target?.result
        if (typeof result !== "string") return
        const animationData = JSON.parse(result)

        if (animationRef.current) {
          animationRef.current.destroy()
        }

        if (!containerRef.current) return

        animationRef.current = lottie.loadAnimation({
          container: containerRef.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData,
        })

        setIsPlaying(true)
        setIsLoaded(true)
      } catch (err) {
        console.error("Error loading Lottie animation:", err)
        setIsLoaded(false)
      }
    }

    reader.readAsText(file)

    return () => {
      if (animationRef.current) {
        animationRef.current.destroy()
      }
    }
  }, [file])

  const togglePlay = () => {
    if (!animationRef.current) return

    if (isPlaying) {
      animationRef.current.pause()
    } else {
      animationRef.current.play()
    }

    setIsPlaying(!isPlaying)
  }

  const restart = () => {
    if (!animationRef.current) return
    animationRef.current.goToAndPlay(0)
    setIsPlaying(true)
  }

  return (
    <div className="border border-gray-200 rounded-xl bg-gray-50 overflow-hidden">
      <div className="bg-gray-100 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-medium text-gray-700">{title}</h3>
        {isLoaded && (
          <div className="flex space-x-2">
            <button
              onClick={togglePlay}
              className="p-1.5 rounded-full hover:bg-gray-200 transition-colors"
              aria-label={isPlaying ? "Pause animation" : "Play animation"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={restart}
              className="p-1.5 rounded-full hover:bg-gray-200 transition-colors"
              aria-label="Restart animation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
      <div className="aspect-square flex items-center justify-center p-4">
        <div ref={containerRef} className="w-full h-full"></div>
      </div>
    </div>
  )
}
