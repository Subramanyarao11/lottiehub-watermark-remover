import { Github } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <p className="text-gray-700 font-medium">&copy; {new Date().getFullYear()} Lottie Watermark Remover</p>
            <p className="text-gray-500 text-sm mt-1">
              This tool is for educational purposes. Always respect copyright and licensing.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="GitHub repository"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
