import Hero from "@/components/hero";
import Navbar from "@/components/shared/navbar";
import PropertyTypes from "@/components/property-types";

export default function Homepage() {
  return (
    <div className="w-full">
      <Navbar />
      <Hero />
        <PropertyTypes />
    </div>
  );
}
