import React from 'react'
import { Heart, Star, MapPin, Bed, Bath, Users } from 'lucide-react'

interface Property {
  id: string
  name: string
  location: string
  price: string
  bedrooms: number
  bathrooms: number
  guestrooms: number
  rating: number
  reviewCount: number
  image: string
  isFavorite: boolean
}

export const FeaturedProperties: React.FC = () => {
  const properties: Property[] = [
    {
      id: '1',
      name: 'Parkview Luxury Home',
      location: 'Banana Island, Lagos, Nigeria',
      price: 'N50,000,000',
      bedrooms: 12,
      bathrooms: 12,
      guestrooms: 12,
      rating: 5,
      reviewCount: 1000,
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      isFavorite: false,
    },
    {
      id: '2',
      name: 'Modern Downtown Apartment',
      location: 'Victoria Island, Lagos, Nigeria',
      price: 'N25,000,000',
      bedrooms: 3,
      bathrooms: 2,
      guestrooms: 1,
      rating: 4,
      reviewCount: 250,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      isFavorite: true,
    },
    {
      id: '3',
      name: 'Executive Office Space',
      location: 'Ikeja, Lagos, Nigeria',
      price: 'N15,000,000',
      bedrooms: 0,
      bathrooms: 2,
      guestrooms: 0,
      rating: 5,
      reviewCount: 180,
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      isFavorite: false,
    },
    {
      id: '4',
      name: 'Luxury Villa Complex',
      location: 'Lekki, Lagos, Nigeria',
      price: 'N75,000,000',
      bedrooms: 8,
      bathrooms: 6,
      guestrooms: 4,
      rating: 5,
      reviewCount: 320,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      isFavorite: false,
    },
    {
      id: '5',
      name: 'Premium Penthouse',
      location: 'Ikoyi, Lagos, Nigeria',
      price: 'N120,000,000',
      bedrooms: 5,
      bathrooms: 4,
      guestrooms: 2,
      rating: 5,
      reviewCount: 450,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      isFavorite: true,
    },
    {
      id: '6',
      name: 'Corporate Headquarters',
      location: 'Victoria Island, Lagos, Nigeria',
      price: 'N200,000,000',
      bedrooms: 0,
      bathrooms: 8,
      guestrooms: 0,
      rating: 4,
      reviewCount: 120,
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      isFavorite: false,
    },
    {
      id: '7',
      name: 'Garden Estate House',
      location: 'Surulere, Lagos, Nigeria',
      price: 'N35,000,000',
      bedrooms: 4,
      bathrooms: 3,
      guestrooms: 1,
      rating: 4,
      reviewCount: 280,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      isFavorite: false,
    },
    {
      id: '8',
      name: 'Waterfront Residence',
      location: 'Elegushi, Lagos, Nigeria',
      price: 'N90,000,000',
      bedrooms: 6,
      bathrooms: 5,
      guestrooms: 3,
      rating: 5,
      reviewCount: 380,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      isFavorite: false,
    },
  ]

  const toggleFavorite = (id: string) => {
    // In a real app, this would update the backend
    console.log('Toggle favorite:', id)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-letvana-accent fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Our Feature Property
          </h2>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {properties.map((property) => (
            <div key={property.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Property Image */}
              <div className="relative h-48">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(property.id)}
                  className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      property.isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'
                    }`}
                  />
                </button>
                
                {/* Price Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-3">
                  <p className="font-bold text-lg">{property.price}</p>
                </div>
              </div>

              {/* Property Details */}
              <div className="p-4">
                {/* Property Name */}
                <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">
                  {property.name}
                </h3>
                
                {/* Location */}
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm line-clamp-1">{property.location}</span>
                </div>
                
                {/* Property Details */}
                <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
                  {property.bedrooms > 0 && (
                    <div className="flex items-center">
                      <Bed className="w-4 h-4 mr-1" />
                      <span>{property.bedrooms} Bed</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <Bath className="w-4 h-4 mr-1" />
                    <span>{property.bathrooms} Bath</span>
                  </div>
                  {property.guestrooms > 0 && (
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{property.guestrooms} Guest</span>
                    </div>
                  )}
                </div>
                
                {/* Rating */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="flex mr-2">
                      {renderStars(property.rating)}
                    </div>
                    <span className="text-sm text-gray-600">
                      {property.reviewCount.toLocaleString()} ratings
                    </span>
                  </div>
                </div>
                
                {/* View More Button */}
                <button className="w-full bg-letvana-primary hover:bg-letvana-primary/90 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                  View More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
