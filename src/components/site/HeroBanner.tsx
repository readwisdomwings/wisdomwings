import { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import bannerHabit from "@/assets/banner-reading-habit.jpg";
import bannerAffordable from "@/assets/banner-affordable.jpg";
import bannerNoScreen from "@/assets/banner-no-screen.jpg";
import bannerCommunity from "@/assets/banner-community.jpg";

const banners = [
  {
    id: 1,
    image: bannerHabit,
    title: "Build Daily Reading Habits",
    description: "Help your child develop a love for reading with our curated collection"
  },
  {
    id: 2,
    image: bannerAffordable,
    title: "Affordable for Every Family",
    description: "Quality books at pocket-friendly weekly rents with refundable deposits"
  },
  {
    id: 3,
    image: bannerNoScreen,
    title: "No Screen Time Needed",
    description: "Physical books that engage imagination without digital distractions"
  },
  {
    id: 4,
    image: bannerCommunity,
    title: "Community-Powered Library",
    description: "Building connections while sharing the joy of reading in your society"
  }
];

const HeroBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-hero-gradient/10">
      <Carousel className="w-full">
        <CarouselContent>
          {banners.map((banner, index) => (
            <CarouselItem key={banner.id}>
              <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                />
                
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
      
      {/* Indicator dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;