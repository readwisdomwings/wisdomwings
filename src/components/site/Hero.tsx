import heroImg from "@/assets/hero-library-illustration.jpg";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-gradient opacity-10 pointer-events-none" aria-hidden />
      <div className="container mx-auto grid md:grid-cols-2 gap-10 items-center px-4 py-12 md:py-16">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Build reading habits. Borrow delightful children’s books in your society.
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            A friendly, community-powered kids library. Small refundable deposit, low weekly rent, lots of joy.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#books"><Button variant="hero">Explore Collection</Button></a>
          </div>
        </div>
        <div className="relative">
          <img
            src={heroImg}
            alt="Parents and kids exchanging books in a friendly society library"
            className="w-full rounded-lg border shadow-glow animate-float"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
