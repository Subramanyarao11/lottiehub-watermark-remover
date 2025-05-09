"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

type FAQItem = {
  question: string
  answer: string
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqItems: FAQItem[] = [
    {
      question: "What is a Lottie animation?",
      answer:
        "Lottie is an open-source animation file format that's small, high quality, interactive, and can be manipulated at runtime. It renders animations in real-time, allowing them to scale without pixelation.",
    },
    {
      question: "Is this tool free to use?",
      answer:
        "Yes, this tool is completely free to use. We built it to help designers and developers work with Lottie animations more easily.",
    },
    {
      question: "Does this tool work with all Lottie files?",
      answer:
        "This tool is specifically designed to remove LottieLab watermarks. It may not work with other types of watermarks or modified Lottie files.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes, all processing happens in your browser. Your Lottie files are never uploaded to our servers, ensuring complete privacy and security.",
    },
  ]

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl text-black font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <div key={index} className="mb-4">
              <button
                className={`w-full text-left p-4 flex justify-between items-center rounded-lg cursor-pointer transition-colors ${
                  openIndex === index ? "bg-indigo-50" : "bg-white hover:bg-gray-50"
                } border border-gray-200 transition-colors`}
                onClick={() => toggleItem(index)}
              >
                <span className="font-medium text-gray-800">{item.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-indigo-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                )}
              </button>
              {openIndex === index && (
                <div className="p-4 bg-white border border-t-0 border-gray-200 rounded-b-lg">
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
