import React, { useState } from 'react'
import { MapPin, Home, DollarSign, Bed } from 'lucide-react'
import { Header } from './Header'

interface PropertyType {
  id: string
  name: string
  active: boolean
}

export const HeroSection: React.FC = () => {
  const [propertyTypes, setPropertyTypes] = useState<PropertyType[]>([
    { id: 'apartment', name: 'Apartment', active: false },
    { id: 'event-hall', name: 'Event Hall', active: false },
    { id: 'house', name: 'House', active: false },
    { id: 'office-space', name: 'Office Space', active: false },
    { id: 'residential', name: 'Residential', active: false },
  ])

  const [searchForm, setSearchForm] = useState({
    location: '',
    propertyType: '',
    budget: '',
    rooms: '',
  })

  const handleSearchClick = () => {
    // Scroll to search form or open search modal
    console.log('Search clicked')
  }

  const togglePropertyType = (id: string) => {
    setPropertyTypes(prev => 
      prev.map(type => 
        type.id === id ? { ...type, active: !type.active } : type
      )
    )
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Search:', searchForm)
  }

  return (
    <section className="relative min-h-screen flex items-center w-[98vw] overflow-x-hidden m-x-auto">
       <Header />
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full rounded-lg"
        style={{
          backgroundImage: 'url("./landing-page.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-2 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Property rental made easy with Letvana homes
            </h1>
            <p className="text-xl lg:text-2xl text-gray-200 mb-8 max-w-2xl">
              Stay in the loop with personalised alerts on new listing that matches your criteria. Never miss out on your dream home.
            </p>
            
            {/* Property Type Filters */}
            <div className="flex flex-wrap gap-3">
              {propertyTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => togglePropertyType(type.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                    type.active
                      ? 'bg-letvana-primary text-white shadow-lg'
                      : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                  }`}
                >
                  {type.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right Content - Search Form */}
          <div className="lg:ml-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Find a home that suits your budget.
              </h3>
              
              <form onSubmit={handleSearch} className="space-y-4">
                {/* Location */}
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by location or address"
                    value={searchForm.location}
                    onChange={(e) => setSearchForm(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-letvana-primary focus:border-transparent"
                  />
                </div>

                {/* Property Type */}
                <div className="relative">
                  <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={searchForm.propertyType}
                    onChange={(e) => setSearchForm(prev => ({ ...prev, propertyType: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-letvana-primary focus:border-transparent"
                  >
                    <option value="">Search by property type</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="office">Office Space</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>

                {/* Budget */}
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Over your budget"
                    value={searchForm.budget}
                    onChange={(e) => setSearchForm(prev => ({ ...prev, budget: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-letvana-primary focus:border-transparent"
                  />
                </div>

                {/* Number of Rooms */}
                <div className="relative">
                  <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Number of room"
                    value={searchForm.rooms}
                    onChange={(e) => setSearchForm(prev => ({ ...prev, rooms: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-letvana-primary focus:border-transparent"
                  />
                </div>

                {/* Search Button */}
                <button
                  type="submit"
                  className="w-full bg-letvana-primary hover:bg-letvana-primary/90 text-white font-bold py-4 px-6 rounded-lg text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Search Property
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
