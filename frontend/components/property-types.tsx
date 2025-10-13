import Image from "next/image";
import Container from "@/components/container";
import propertyTypesData from "@/data/propertyTypes.json";

export default function PropertyTypes() {
    return (
        <Container>
            <section className="py-16 pt-28">
                {/* Header */}
                <div className="mb-8">
                    <p className="text-sm text-gray-600 mb-2">Property Type</p>
                    <h2 className="text-4xl md:text-5xl font-bold">Try Searching For</h2>
                </div>

                {/* Property Cards Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
                    {propertyTypesData.map((property) => (
                        <div
                            key={property.id}
                            className="flex flex-col items-center justify-center p-6 border border-gray-200 rounded-xl hover:border-gray-400 hover:shadow-lg transition-all cursor-pointer bg-white"
                        >
                            {/* Property Image */}
                            <div className="w-24 h-24 mb-4 relative">
                                <Image
                                    src={property.image}
                                    alt={property.title}
                                    fill
                                    className="object-contain"
                                />
                            </div>

                            {/* Property Title */}
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                {property.title}
                            </h3>

                            {/* Property Count */}
                            <p className="text-sm text-gray-600">{property.subtext}</p>
                        </div>
                    ))}
                </div>
            </section>
        </Container>
    );
}