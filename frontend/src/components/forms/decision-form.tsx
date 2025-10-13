import { Button } from '../ui/button'
import { useState } from 'react'

const DecisionForm = ({ setUserType }: { setUserType: (userType: 'tenant' | 'landlord') => void }) => {
  const [selectedType, setSelectedType] = useState<'tenant' | 'landlord' | null>(null)

  const handleProceed = () => {
    if (selectedType) {
      setUserType(selectedType)
    }
  }

  return (
    <div className="flex flex-col w-full h-full">
      {/* Create Account Link */}
      <div className="text-right mb-8">
        <span className="text-gray-600">I don't have an account? </span>
        <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Create Account</a>
      </div>

      {/* Main Heading */}
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Letvana Homes</h1>
      <p className="text-gray-600 mb-8">Select the one that fits your needs and proceed</p>

      {/* Account Type Selection Cards */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {/* Tenant Account Card */}
        <div 
          className={`relative p-6 border-2 rounded-lg cursor-pointer transition-all ${
            selectedType === 'tenant' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => setSelectedType('tenant')}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 ${
              selectedType === 'tenant' 
                ? 'border-blue-500 bg-blue-500' 
                : 'border-gray-300'
            }`}>
              {selectedType === 'tenant' && (
                <div className="w-full h-full rounded-full bg-white scale-75"></div>
              )}
            </div>
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Tenant Account</h3>
          <p className="text-sm text-gray-600">I want to rent property on this platform.</p>
        </div>

        {/* Landlord/Agent Account Card */}
        <div 
          className={`relative p-6 border-2 rounded-lg cursor-pointer transition-all ${
            selectedType === 'landlord' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => setSelectedType('landlord')}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
              </svg>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 ${
              selectedType === 'landlord' 
                ? 'border-blue-500 bg-blue-500' 
                : 'border-gray-300'
            }`}>
              {selectedType === 'landlord' && (
                <div className="w-full h-full rounded-full bg-white scale-75"></div>
              )}
            </div>
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Landlord/ Agent Account</h3>
          <p className="text-sm text-gray-600">I have property or properties I want to rent out.</p>
        </div>
      </div>

      {/* Proceed Button */}
      <Button 
        onClick={handleProceed}
        disabled={!selectedType}
        className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-semibold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        Proceed
      </Button>
    </div>
  )
}

export default DecisionForm