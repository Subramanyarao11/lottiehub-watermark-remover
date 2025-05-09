import Link from "next/link"
import { CloudLightningIcon as LucideAnimation } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LucideAnimation className="h-8 w-8" />
            <div>
              <h1 className="text-3xl font-bold">Lottie Watermark Remover</h1>
              <p className="mt-1 text-indigo-100">Clean your Lottie animations in seconds</p>
            </div>
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="text-white hover:text-indigo-200 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="text-white hover:text-indigo-200 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-white hover:text-indigo-200 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
