import React from 'react'
import { Network, Crown, DollarSign } from 'lucide-react'

interface Benefit {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  iconColor: string
}

export const BenefitsSection: React.FC = () => {
  const benefits: Benefit[] = [
    {
      id: 'trusted',
      title: 'Trusted By Thousands',
      description: 'Our platform has earned the trust of thousands of satisfied customers who have found their perfect properties through Letvana Homes. We maintain the highest standards of reliability and customer satisfaction.',
      icon: Network,
      iconColor: 'text-letvana-primary',
    },
    {
      id: 'wide-range',
      title: 'Wide Range of Properties',
      description: 'From luxurious apartments to spacious family homes, commercial spaces to event venues, we offer an extensive selection of properties to meet every need and preference.',
      icon: Crown,
      iconColor: 'text-letvana-primary',
    },
    {
      id: 'financially-easy',
      title: 'Financially Made Easy',
      description: 'We simplify the financial aspects of property rental and purchase with transparent pricing, flexible payment options, and expert guidance throughout the entire process.',
      icon: DollarSign,
      iconColor: 'text-orange-500',
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-lg text-gray-600 mb-2">Why Choose us</p>
          <h2 className="text-4xl font-bold text-gray-900">
            Benefit of using Letvana Home's
          </h2>
          <p className="text-lg text-gray-600 mt-6 max-w-3xl mx-auto">
            We provide comprehensive business solutions that make property rental and purchase seamless, 
            secure, and satisfying for all our customers.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit) => {
            const IconComponent = benefit.icon
            return (
              <div
                key={benefit.id}
                className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 group"
              >
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className={`w-10 h-10 ${benefit.iconColor}`} />
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {benefit.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
