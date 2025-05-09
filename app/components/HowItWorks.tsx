import { FileJson, Wand2, Download } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      icon: <FileJson className="w-8 h-8 text-indigo-600" />,
      title: "Upload Your File",
      description: "Drag and drop your Lottie JSON file or click to browse your files.",
    },
    {
      icon: <Wand2 className="w-8 h-8 text-indigo-600" />,
      title: "Remove Watermark",
      description: "Our tool automatically detects and removes the LottieLab watermark from your animation.",
    },
    {
      icon: <Download className="w-8 h-8 text-indigo-600" />,
      title: "Download Clean File",
      description: "Download your watermark-free Lottie animation and use it in your projects.",
    },
  ]

  return (
    <section id="how-it-works" className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl text-black font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                {step.icon}
              </div>
              <h3 className="text-xl text-black font-semibold text-center mb-2">{step.title}</h3>
              <p className="text-gray-600 text-center">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
