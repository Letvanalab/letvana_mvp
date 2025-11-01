import React from 'react'
import { 
  Home, 
  Building2, 
  Castle, 
  Warehouse, 
  Store, 
  Hotel, 
  Building, 
  Factory, 
  House,
 } from 'lucide-react'
 import { 
  PiBuildingOffice as Office 
} from "react-icons/pi";
import { Icons } from '@/src/lib/Icons';

const icons = Icons();

interface PropertyTypeIcon {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
}

export const PropertyTypeSection: React.FC = () => {
  const propertyTypes: PropertyTypeIcon[] = [
    { id: 'apartment', name: 'Apartment', icon: icons.apartment },
    { id: 'office', name: 'Office', icon: icons.office },
    { id: 'duplex', name: 'Duplex', icon: icons.duplex },
    { id: 'bungalow', name: 'Bungalow', icon: icons.bungalow },
    { id: 'commercial', name: 'Commercial', icon: icons.commercial },
    { id: 'villa', name: 'Villa', icon: icons.villa },
    { id: 'office-space', name: 'Office Space', icon: icons.office2 },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Property Type
          </h2>
          <p className="text-xl text-gray-600">
            Try Searching For
          </p>
        </div>

        {/* Property Type Icons */}
        <div className="relative">
          {/* Left Shadow */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          
          {/* Right Shadow */}
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
          
          {/* Scrollable Container */}
          <div className="flex gap-8 overflow-x-auto scrollbar-hide pb-4 px-4">
            {propertyTypes.map((propertyType) => {
              const IconComponent = propertyType.icon
              return (
                <div
                  key={propertyType.id}
                  className="flex flex-col items-center min-w-[120px] group cursor-pointer"
                >
                  {/* Icon Circle */}
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-letvana-primary/10 transition-all duration-200">
                    <IconComponent className="w-10 h-10 text-gray-600 group-hover:text-letvana-primary transition-colors" />
                  </div>
                  
                  {/* Property Type Name */}
                  <span className="text-sm font-medium text-gray-700 text-center group-hover:text-letvana-primary transition-colors">
                    {propertyType.name}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
