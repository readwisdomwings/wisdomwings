import { useState } from "react";
import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import Benefits from "@/components/site/Benefits";
import FeaturedBooks from "@/components/site/FeaturedBooks";
import HowItWorks from "@/components/site/HowItWorks";
import BookSeriesBanner from "@/components/site/BookSeriesBanner";
import { Helmet } from "react-helmet-async";
import WhatsAppFloat from "@/components/site/WhatsAppFloat";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ImageViewer } from "@/components/ui/image-viewer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type Book } from "@/data/books";
import innerPageSample from "@/assets/book-inner-page-sample.jpg";

const AvailabilityBadge = ({ available }: { available: boolean }) => (
  <Badge 
    className={`mb-2 inline-flex w-fit rounded-full px-2 py-1 ${available ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'}`}
  >
    {available ? "Available" : "Unavailable"}
  </Badge>
);

const TagBadges = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-wrap gap-1 mb-2">
    {tags.map((tag, idx) => (
      <Badge
        key={idx}
        className="text-xs bg-white text-gray-700 border border-gray-300 rounded-full px-2 py-1"
      >
        {tag}
      </Badge>
    ))}
  </div>
);

const BookModal = ({ book, isOpen, onClose }: { book: Book | null; isOpen: boolean; onClose: () => void }) => {
  const [viewMode, setViewMode] = useState<'cover' | 'inner'>('cover');
  
  const handleContactForRent = () => {
    if (!book) return;
    
    const phoneNumber = "1234567890"; // Replace with actual number
    const message = `I am interested in renting this book: "${book.title}". Can you pls help me with the request?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!book) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{book.title}</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            by {book.author} • {book.ageGroup}
          </DialogDescription>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex gap-2 mb-3">
              <button 
                className={`px-3 py-1 text-xs border rounded ${viewMode === 'cover' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
                onClick={() => setViewMode('cover')}
              >
                Cover
              </button>
              <button 
                className={`px-3 py-1 text-xs border rounded ${viewMode === 'inner' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
                onClick={() => setViewMode('inner')}
              >
                Inner Page
              </button>
            </div>
            <ImageViewer 
              images={[viewMode === 'cover' ? book.cover : innerPageSample]} 
              alt={viewMode === 'cover' ? `Cover of ${book.title}` : `Inner page of ${book.title}`} 
            />
          </div>
          <div className="space-y-4">
            <div>
              <AvailabilityBadge available={book.available} />
              <TagBadges tags={book.tags} />
            </div>
            <p className="text-sm leading-relaxed">{book.description}</p>
            <div className="text-xs text-muted-foreground mb-2">Age Range: {book.ageGroup}</div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-foreground">Rent: <span className="font-bold">₹{book.rentPerWeek}/week</span></span>
              <span className="text-xs text-muted-foreground">Deposit: ₹{book.deposit}</span>
            </div>
            <Button 
              className="w-full" 
              onClick={handleContactForRent}
              aria-label={`Contact for rent of ${book.title}`}
            >
              Contact for rent
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Index = () => {
  const [activeBook, setActiveBook] = useState<Book | null>(null);
  
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
      <FeaturedBooks onViewDetails={setActiveBook} />
      <HowItWorks />
      <BookSeriesBanner />
      <WhatsAppFloat />
      <BookModal
        book={activeBook}
        isOpen={!!activeBook}
        onClose={() => setActiveBook(null)}
      />
      <section id="contact" className="container mx-auto px-4 py-12 md:py-16">
        <div className="rounded-lg border p-6 md:p-8 bg-card">
          <h3 className="text-2xl font-semibold mb-2">Get in touch</h3>
          <p className="text-muted-foreground">We're starting within our society. Interested to rent? Reach out and we'll message you on WhatsApp.</p>
          <div className="mt-4 text-sm">
            <div>Email: <a className="text-primary underline-offset-4 hover:underline" href="mailto:hello@wisdomwings.local">hello@wisdomwings.local</a></div>
            <div>WhatsApp: <span className="text-muted-foreground">Share your flat no. and we'll connect.</span></div>
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
