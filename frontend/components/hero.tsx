import Image from "next/image";
import SearchCard from "@/components/searchcard";
import Container from "@/components/container";

export default function Hero() {
  const propertyTypes = [
    "Apartment",
    "Event Hall",
    "House",
    "Office Space",
    "Residential",
  ];

  return (
    <Container>
      <section className="relative w-full h-[calc(100vh-80px)] min-h-[600px]">
        {/* Background Image */}
        <div className="absolute rounded-2xl inset-0 z-0">
          <Image
            src="/assets/heroImage.jpg"
            alt="Letvana Homes Property"
            fill
            className="object-cover rounded-2xl"
            priority
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40 rounded-2xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full items-center">
            {/* Left Side - Text Content */}
            <div className="text-white space-y-8 pt-24 md:pt-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight">
                Property rental made easy with Letvana homes
              </h1>

              <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
                Stay in the loop with personalised alerts on new listing that
                matches your criteria. Never miss out on your dream home
              </p>

              {/* Property Type Buttons */}
              <div className="flex flex-wrap gap-3">
                {propertyTypes.map((type) => (
                  <button
                    key={type}
                    className="px-6 py-3 bg-white/90 hover:bg-white text-gray-900 font-medium rounded-full transition-all hover:scale-105 shadow-lg"
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Side - Search Card */}
            <div className="flex justify-center lg:justify-end">
              <SearchCard />
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
