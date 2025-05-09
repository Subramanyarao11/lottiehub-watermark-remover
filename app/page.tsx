'use client';

import { useState } from 'react';
import Header from './components/Header';
import FileUploader from './components/FileUploader';
import Preview from './components/Preview';
import Footer from './components/Footer';
;

export default function Home() {
  const [originalFile, setOriginalFile] = useState(null);
  const [cleanedFile, setCleanedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = async (file) => {
    if (!file) return;

    setOriginalFile(file);
    setCleanedFile(null);
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/clean-lottie', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to clean the file');
      }

      const data = await response.json();

      // Create a new file from the cleaned data
      const cleanedFileBlob = new Blob([JSON.stringify(data.cleanedData)], {
        type: 'application/json'
      });

      const cleanedFileObj = new File(
        [cleanedFileBlob],
        file.name.replace('.json', '_cleaned.json'),
        { type: 'application/json' }
      );

      setCleanedFile(cleanedFileObj);
    } catch (err) {
      console.error('Error cleaning file:', err);
      setError(err.message || 'Failed to process the file');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!cleanedFile) return;

    const url = URL.createObjectURL(cleanedFile);
    const a = document.createElement('a');
    a.href = url;
    a.download = cleanedFile.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Upload your Lottie JSON file</h2>
            <FileUploader onUpload={handleFileUpload} />

            {isLoading && (
              <div className="mt-4 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                <p className="mt-2">Processing your file...</p>
              </div>
            )}

            {error && (
              <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
                <p className="font-bold">Error</p>
                <p>{error}</p>
              </div>
            )}

            {cleanedFile && (
              <div className="mt-6 p-4 bg-green-100 rounded-md">
                <h3 className="text-xl font-bold text-green-800 mb-2">Success!</h3>
                <p className="mb-4">Your Lottie file has been cleaned successfully.</p>
                <button
                  onClick={handleDownload}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Download Cleaned File
                </button>
              </div>
            )}
          </div>

          {(originalFile || cleanedFile) && (
            <div className="grid md:grid-cols-2 gap-6">
              {originalFile && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold mb-4">Original</h3>
                  <Preview file={originalFile} />
                </div>
              )}

              {cleanedFile && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold mb-4">Cleaned (No Watermark)</h3>
                  <Preview file={cleanedFile} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
