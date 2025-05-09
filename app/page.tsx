"use client"

import { useState } from "react"
import Header from "./components/Header"
import FileUploader from "./components/FileUploader"
import Preview from "./components/Preview"
import Footer from "./components/Footer"
import HowItWorks from "./components/HowItWorks"
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import FAQ from "./components/FAQ"

export default function Home() {
  const [originalFile, setOriginalFile] = useState<File | null>(null)
  const [cleanedFile, setCleanedFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = async (file: File) => {
    if (!file) return

    setOriginalFile(file)
    setCleanedFile(null)
    setIsLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("/api/clean-lottie", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to clean the file")
      }
      const data = await response.json()
      const cleanedFileBlob = new Blob([JSON.stringify(data.cleanedData)], {
        type: "application/json",
      })

      const cleanedFileObj = new File([cleanedFileBlob], file.name.replace(".json", "_cleaned.json"), {
        type: "application/json",
      })

      setCleanedFile(cleanedFileObj)
    } catch (err) {
      console.error("Error cleaning file:", err)
      setError(err instanceof Error ? err.message : "Failed to process the file")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = () => {
    if (!cleanedFile) return

    const url = URL.createObjectURL(cleanedFile)
    const a = document.createElement("a")
    a.href = url
    a.download = cleanedFile.name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <div className="flex-1">
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Upload your Lottie JSON file</h2>
                <FileUploader onUpload={handleFileUpload} />

                {isLoading && (
                  <div className="mt-6 flex items-center justify-center">
                    <div className="bg-indigo-50 text-indigo-700 px-6 py-4 rounded-lg flex items-center w-full">
                      <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                      <p>Processing your file...</p>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="mt-6 bg-red-50 text-red-700 px-6 py-4 rounded-lg flex items-start">
                    <AlertCircle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Error processing file</p>
                      <p className="mt-1 text-sm">{error}</p>
                    </div>
                  </div>
                )}

                {cleanedFile && (
                  <div className="mt-6 bg-green-50 text-green-700 px-6 py-4 rounded-lg flex items-start">
                    <CheckCircle2 className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Success!</p>
                      <p className="mt-1">Your Lottie file has been cleaned successfully.</p>
                      <button
                        onClick={handleDownload}
                        className="mt-3 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 cursor-pointer"
                      >
                        Download Cleaned File
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {(originalFile || cleanedFile) && (
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  {originalFile && <Preview file={originalFile} title="Original" />}

                  {cleanedFile && <Preview file={cleanedFile} title="Cleaned (No Watermark)" />}
                </div>
              )}
            </div>
          </div>
        </section>

        <HowItWorks />
        <FAQ />
      </div>

      <Footer />
    </main>
  )
}
