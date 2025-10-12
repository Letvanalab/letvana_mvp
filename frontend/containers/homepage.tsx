import Hero from "@/components/hero";
import Navbar from "@/components/shared/navbar";

export default function Homepage() {
  return (
    <div className="w-full">
      <Navbar />
      <Hero />
    </div>
  );
}
