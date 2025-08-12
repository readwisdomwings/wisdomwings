import { useState } from "react";
import { books, type Book } from "@/data/books";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const CarouselSection = ({ title, books, category, onViewDetails }: { title: string; books: Book[]; category: string; onViewDetails: (book: Book) => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const booksPerView = 4;
  const maxIndex = Math.max(0, books.length - booksPerView);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const visibleBooks = books.slice(currentIndex, currentIndex + booksPerView);

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">{title}</h3>
        <div className="flex items-center gap-2">
          {books.length > booksPerView && (
            <>
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className="h-8 w-8"
                aria-label="Previous books"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                disabled={currentIndex >= maxIndex}
                className="h-8 w-8"
                aria-label="Next books"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}
          <Link to="/books">
            <Button variant="outline" size="sm">View All</Button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {visibleBooks.map((book) => (
          <FeaturedBookCard key={book.id} book={book} onViewDetails={onViewDetails} />
        ))}
      </div>
    </div>
  );
};

const AvailabilityBadge = ({ available }: { available: boolean }) => (
  <Badge 
    variant="outline" 
    className={`mb-2 ${available ? 'bg-green-100 text-green-800 border-green-300' : 'bg-orange-100 text-orange-800 border-orange-300'}`}
  >
    {available ? "Available" : "Unavailable"}
  </Badge>
);

const TagBadges = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-wrap gap-1 mb-2">
    {tags.map((tag, idx) => (
      <Badge
        key={idx}
        variant={
          tag === "Most Favourite"
            ? "default"
            : tag === "Popular"
            ? "secondary"
            : tag === "New"
            ? "outline"
            : "outline"
        }
        className="text-xs"
      >
        {tag}
      </Badge>
    ))}
  </div>
);

const FeaturedBookCard = ({ book, onViewDetails }: { book: Book; onViewDetails: (book: Book) => void }) => (
  <Card 
    className="group relative cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    onClick={() => onViewDetails(book)}
  >
    <CardHeader className="p-3">
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
    <CardContent className="p-3 pt-0">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-bold text-foreground">₹{book.rentPerWeek}/week</span>
        <span className="text-xs text-muted-foreground">Deposit: ₹{book.deposit}</span>
      </div>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          onViewDetails(book);
        }}
        className="w-full text-xs h-8"
        variant="secondary"
        aria-label={`View details for ${book.title}`}
      >
        Details
      </Button>
    </CardContent>
  </Card>
);

const FeaturedBooks = ({ onViewDetails }: { onViewDetails: (book: Book) => void }) => {
  const mostFavouriteBooks = books.filter(book => 
    book.tags.includes("Most Favourite")
  );

  const popularBooks = books.filter(book => 
    book.tags.includes("Popular")
  );

  const staffFavouriteBooks = books.filter(book => 
    book.tags.includes("Staff Favourite")
  );

  return (
    <section className="container mx-auto px-4 py-8 md:py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Featured Books</h2>
      
      <div className="space-y-12">
        <CarouselSection 
          title="Most Popular" 
          books={popularBooks} 
          category="popular"
          onViewDetails={onViewDetails}
        />
        
        <CarouselSection 
          title="Staff Favourite" 
          books={staffFavouriteBooks} 
          category="staff-favourite"
          onViewDetails={onViewDetails}
        />
        
        <CarouselSection 
          title="Most Favourite" 
          books={mostFavouriteBooks} 
          category="most-favourite"
          onViewDetails={onViewDetails}
        />
      </div>
    </section>
  );
};

export default FeaturedBooks;