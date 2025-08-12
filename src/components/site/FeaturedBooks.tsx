import { useState } from "react";
import { books, type Book } from "@/data/books";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const CarouselSection = ({ title, books, category }: { title: string; books: Book[]; category: string }) => {
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
          <FeaturedBookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

const FeaturedBookCard = ({ book }: { book: Book }) => (
  <Card className="group relative cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
    <CardHeader className="p-3">
      <img
        src={book.cover}
        alt={`Cover of ${book.title}`}
        className="w-full aspect-[3/4] object-cover rounded-md mb-2"
        loading="lazy"
      />
      <div className="flex flex-wrap gap-1 mb-1">
        {book.tags.slice(0, 2).map((tag, idx) => (
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
      <CardTitle className="text-sm font-semibold line-clamp-2">{book.title}</CardTitle>
      <p className="text-xs text-muted-foreground">by {book.author}</p>
    </CardHeader>
    <CardContent className="p-3 pt-0">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">₹{book.rentPerWeek}/week</span>
      </div>
    </CardContent>
  </Card>
);

const FeaturedBooks = () => {
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
        />
        
        <CarouselSection 
          title="Staff Favourite" 
          books={staffFavouriteBooks} 
          category="staff-favourite" 
        />
        
        <CarouselSection 
          title="Most Favourite" 
          books={mostFavouriteBooks} 
          category="most-favourite" 
        />
      </div>
    </section>
  );
};

export default FeaturedBooks;