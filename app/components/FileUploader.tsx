"use client"

import { useState, useRef, type DragEvent, type ChangeEvent } from "react"
import { Upload, FileJson } from "lucide-react"

export default function FileUploader({ onUpload }: { onUpload: (file: File) => void }) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onUpload(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(e.target.files[0])
    }
  }

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div
      className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-200 ${
        isDragging ? "border-indigo-500 bg-indigo-50" : "border-gray-300 hover:border-indigo-400 hover:bg-indigo-50/50"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".json" className="hidden" />
      <div className="flex flex-col items-center justify-center">
        {isDragging ? (
          <Upload className="w-16 h-16 text-indigo-500 mb-4 animate-bounce" />
        ) : (
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
            <FileJson className="w-8 h-8 text-indigo-600" />
          </div>
        )}
        <p className="text-xl text-gray-800 font-medium">
          {isDragging ? "Drop your file here" : "Drag & drop your Lottie JSON file"}
        </p>
        <p className="text-sm text-gray-500 mt-2">or click to browse your files</p>
        <div className="mt-4 text-xs text-gray-400">Supports .json Lottie animation files</div>
      </div>
    </div>
  )
}
