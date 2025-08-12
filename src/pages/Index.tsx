import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";

import Benefits from "@/components/site/Benefits";
import FeaturedBooks from "@/components/site/FeaturedBooks";
import HowItWorks from "@/components/site/HowItWorks";
import BookSeriesBanner from "@/components/site/BookSeriesBanner";
import { Helmet } from "react-helmet-async";
import WhatsAppFloat from "@/components/site/WhatsAppFloat";

const Index = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Library",
    name: "WisdomWings",
    description:
      "Community kids library offering children's books for rent with refundable deposit in a residential society.",
    areaServed: "Local society community",
    url: "/",
  };

  return (
    <main>
      <Helmet>
        <title>WisdomWings | Kids Library Rentals</title>
        <meta name="description" content="Community kids library with refundable deposit and low weekly rent. Build reading habits with curated children's books." />
        <link rel="canonical" href="/" />
      </Helmet>
      <Header />
      <Hero />
      
      <Benefits />
      <FeaturedBooks />
      <HowItWorks />
      <BookSeriesBanner />
      <WhatsAppFloat />
      <section id="contact" className="container mx-auto px-4 py-12 md:py-16">
        <div className="rounded-lg border p-6 md:p-8 bg-card">
          <h3 className="text-2xl font-semibold mb-2">Get in touch</h3>
          <p className="text-muted-foreground">We’re starting within our society. Interested to rent or partner? Reach out and we’ll message you on WhatsApp.</p>
          <div className="mt-4 text-sm">
            <div>Email: <a className="text-primary underline-offset-4 hover:underline" href="mailto:hello@wisdomwings.local">hello@wisdomwings.local</a></div>
            <div>WhatsApp: <span className="text-muted-foreground">Share your flat no. and we’ll connect.</span></div>
          </div>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </main>
  );
};

export default Index;
