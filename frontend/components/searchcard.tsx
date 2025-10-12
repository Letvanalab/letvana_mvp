'use client';

import { MapPin, Home, DollarSign, BedDouble } from 'lucide-react';
import { useState } from 'react';

export default function SearchCard() {
    const [formData, setFormData] = useState({
        location: '',
        propertyType: '',
        budget: '',
        rooms: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Search submitted:', formData);
        // Add your search logic here
    };

    return (
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Find a home that suits your budget
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Location Input */}
                <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-black/50 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search by city or address"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full text-sm pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7DD3C0] focus:border-transparent"
                    />
                </div>

                {/* Property Type Input */}
                <div className="relative">
                    <Home className="absolute left-4 top-1/2 -translate-y-1/2 text-black/50 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search by property type"
                        value={formData.propertyType}
                        onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                        className="w-full text-sm pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7DD3C0] focus:border-transparent"
                    />
                </div>

                {/* Budget and Rooms Row */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Budget Input */}
                    <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-black/50 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Enter your Budget"
                            value={formData.budget}
                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                            className="w-full text-sm pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7DD3C0] focus:border-transparent"
                        />
                    </div>

                    {/* Number of Rooms Input */}
                    <div className="relative">
                        <BedDouble className="absolute left-4 top-1/2 -translate-y-1/2 text-black/50 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Number of room"
                            value={formData.rooms}
                            onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
                            className="w-full text-sm pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7DD3C0] focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Search Button */}
                <button
                    type="submit"
                    className="w-full bg-main hover:bg-[#6BC4B1] text-gray-900 font-semibold py-4 rounded-lg transition-colors shadow-md cursor-pointer"
                >
                    Search Property
                </button>
            </form>
        </div>
    );
}