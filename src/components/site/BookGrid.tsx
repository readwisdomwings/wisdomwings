import { useState } from "react";
import { books, type Book } from "@/data/books";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ImageViewer } from "@/components/ui/image-viewer";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const AvailabilityBadge = ({ available }: { available: boolean }) => (
  <Badge 
    className={`mb-2 inline-flex w-fit ${available ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'}`}
  >
    {available ? "Available" : "Unavailable"}
  </Badge>
);

const TagBadges = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-wrap gap-1 mb-2">
    {tags.map((tag, idx) => (
      <Badge
        key={idx}
        className="text-xs bg-white text-gray-700 border border-gray-300"
      >
        {tag}
      </Badge>
    ))}
  </div>
);

const BookCard = ({ book, onViewDetails }: { book: Book; onViewDetails: (book: Book) => void }) => (
  <Card 
    className="group relative cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    onClick={() => onViewDetails(book)}
  >
    <CardHeader className="p-3 sm:p-4">
      <img
        src={book.cover}
        alt={`Cover of ${book.title}`}
        className="w-full aspect-[3/4] object-cover rounded-md mb-2"
        loading="lazy"
      />
      <CardTitle className="text-sm font-semibold line-clamp-2 mb-2">{book.title}</CardTitle>
      <AvailabilityBadge available={book.available} />
      <TagBadges tags={book.tags} />
    </CardHeader>
    <CardContent className="p-3 sm:p-4 pt-0">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-foreground">Rent: <span className="font-bold">₹{book.rentPerWeek}/week</span></span>
        <span className="text-xs text-muted-foreground">Deposit: ₹{book.deposit}</span>
      </div>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          onViewDetails(book);
        }}
        className="w-full text-xs h-8 border border-gray-300"
        variant="secondary"
        aria-label={`View details for ${book.title}`}
      >
        Details
      </Button>
    </CardContent>
  </Card>
);

const BookModal = ({ book, isOpen, onClose }: { book: Book | null; isOpen: boolean; onClose: () => void }) => {
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
                className="px-3 py-1 text-xs border rounded bg-primary text-primary-foreground"
                onClick={() => {/* Handle cover view */}}
              >
                Cover
              </button>
              <button 
                className="px-3 py-1 text-xs border rounded bg-muted text-muted-foreground"
                onClick={() => {/* Handle inner page view */}}
              >
                Inner Page
              </button>
            </div>
            <ImageViewer images={[book.cover]} alt={`Cover of ${book.title}`} />
          </div>
          <div className="space-y-4">
            <div>
              <AvailabilityBadge available={book.available} />
              <TagBadges tags={book.tags} />
            </div>
            <p className="text-sm leading-relaxed">{book.description}</p>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Age Range: {book.ageGroup}</div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Rent: <span className="font-bold">₹{book.rentPerWeek}/week</span></span>
                <span className="text-xs text-muted-foreground">Deposit: ₹{book.deposit}</span>
              </div>
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

interface BookGridProps {
  items?: Book[];
  title?: string;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  showPagination?: boolean;
}

const BookGrid = ({ 
  items = books, 
  title = "Featured Books", 
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  showPagination = false
}: BookGridProps) => {
  const [activeBook, setActiveBook] = useState<Book | null>(null);

  return (
    <section className="container mx-auto px-4 py-8" id="books">
      <h2 className="text-2xl font-bold text-center mb-8">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {items.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onViewDetails={setActiveBook}
          />
        ))}
      </div>
      
      {showPagination && totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination>
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      onPageChange?.(currentPage - 1);
                    }}
                    aria-label="Go to previous page"
                  />
                </PaginationItem>
              )}
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onPageChange?.(page);
                    }}
                    isActive={page === currentPage}
                    aria-label={`Go to page ${page}`}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      onPageChange?.(currentPage + 1);
                    }}
                    aria-label="Go to next page"
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      )}
      
      <BookModal
        book={activeBook}
        isOpen={!!activeBook}
        onClose={() => setActiveBook(null)}
      />
    </section>
  );
};

export default BookGrid;