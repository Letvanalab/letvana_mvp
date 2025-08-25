import React from 'react'
import { Header } from '../components/Header'
import { HeroSection } from '../components/HeroSection'
import { PropertyTypeSection } from '../components/PropertyTypeSection'
import { FeaturedProperties } from '../components/FeaturedProperties'
import { BenefitsSection } from '../components/BenefitsSection'
import { FAQSection } from '../components/FAQSection'
import { Footer } from '../components/Footer'

const Landing = () => {
  const handleSearchClick = () => {
    // Scroll to search form or open search modal
    console.log('Search clicked')
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header onSearchClick={handleSearchClick} />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Property Type Section */}
      <PropertyTypeSection />
      
      {/* Featured Properties */}
      <FeaturedProperties />
      
      {/* Benefits Section */}
      <BenefitsSection />
      
      {/* FAQ Section */}
      <FAQSection />
      
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Landing