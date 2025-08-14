import stepBrowse from "@/assets/step-browse.jpg";
import stepWhatsapp from "@/assets/step-whatsapp.jpg";
import stepPayment from "@/assets/step-payment.jpg";
import stepPickup from "@/assets/step-pickup.jpg";
import { MessageCircle, CreditCard, BookOpen, Package } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Browse Collection",
    description: "Explore our curated selection of children's books online or ask for recommendations",
    image: stepBrowse,
    icon: BookOpen,
    color: "text-blue-600"
  },
  {
    id: 2,
    title: "WhatsApp Enquiry",
    description: "Send us a message with your flat number and book preferences. We'll respond quickly!",
    image: stepWhatsapp,
    icon: MessageCircle,
    color: "text-green-600"
  },
  {
    id: 3,
    title: "Pay Weekly Rent",
    description: "Simple payment for weekly rental plus refundable deposit. No hidden charges!",
    image: stepPayment,
    icon: CreditCard,
    color: "text-purple-600"
  },
  {
    id: 4,
    title: "Book Pickup",
    description: "Collect your books from our society coordinator or arrange doorstep delivery",
    image: stepPickup,
    icon: Package,
    color: "text-orange-600"
  }
];

const HowItWorks = () => {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Getting books for your kids is as easy as 1-2-3-4! Simple process, happy reading.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div key={step.id} className="relative">
            
            <div className="relative z-10 text-center">
              {/* Icon */}
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <step.icon className="w-8 h-8 text-primary" aria-label={step.title} />
              </div>
              
              {/* Arrow connector for larger screens */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[calc(100%+2rem)] w-8 h-0.5 bg-gradient-to-r from-primary to-transparent" />
              )}
              
              {/* Content */}
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <div className="inline-flex flex-col sm:flex-row gap-3">
          <a
            href="/books"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Explore Collection
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;