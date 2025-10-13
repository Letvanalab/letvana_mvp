import React, { useState } from 'react'
import { HelpCircle, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react'

interface FAQItem {
  id: string
  question: string
  answer: string
  isExpanded: boolean
}

export const FAQSection: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>([
    {
      id: '1',
      question: 'How do I search for properties on Letvana Homes?',
      answer: 'You can search for properties using our advanced search form. Simply enter your preferred location, property type, budget, and number of rooms. Our system will show you all matching properties.',
      isExpanded: false,
    },
    {
      id: '2',
      question: 'What types of properties are available for rent?',
      answer: 'We offer a wide range of properties including apartments, houses, office spaces, commercial buildings, event halls, and more. Each property type has detailed information and photos.',
      isExpanded: false,
    },
    {
      id: '3',
      question: 'How can I schedule a property viewing?',
      answer: 'To schedule a viewing, simply click on the "View More" button on any property card. You can then contact the property owner or our team to arrange a convenient viewing time.',
      isExpanded: false,
    },
    {
      id: '4',
      question: 'What payment options are available?',
      answer: 'We offer flexible payment options including monthly rent, upfront payments, and installment plans. All payments are processed securely through our platform.',
      isExpanded: false,
    },
    {
      id: '5',
      question: 'How do I get personalized property alerts?',
      answer: 'Create an account and set your property preferences. We\'ll send you notifications whenever new properties matching your criteria become available.',
      isExpanded: false,
    },
  ])

  const toggleFAQ = (id: string) => {
    setFaqs(prev => 
      prev.map(faq => 
        faq.id === id ? { ...faq, isExpanded: !faq.isExpanded } : faq
      )
    )
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <HelpCircle className="w-8 h-8 text-letvana-primary mr-3" />
            <h2 className="text-4xl font-bold text-gray-900">
              Frequently asked Question
            </h2>
          </div>
          <p className="text-lg text-gray-600">
            Lorem ipsum dolor sit amet consectetur.
          </p>
          <button className="inline-flex items-center mt-6 text-letvana-primary hover:text-letvana-primary/80 font-semibold group">
            Learn More
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              {/* Question Header */}
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-letvana-primary/10 rounded-full flex items-center justify-center mr-3">
                    <span className="text-letvana-primary text-sm font-bold">i</span>
                  </div>
                  {faq.isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </div>
              </button>

              {/* Answer */}
              {faq.isExpanded && (
                <div className="px-6 pb-4">
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
