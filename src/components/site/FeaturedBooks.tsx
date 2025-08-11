import { books } from "@/data/books";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ShareButton = ({ book }: { book: any }) => {
  const handleShare = async () => {
    const shareData = {
      title: `${book.title} - Book Buddy Loop`,
      text: `Check out "${book.title}" by ${book.author} at Book Buddy Loop!`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback to clipboard
      await navigator.clipboard.writeText(
        `${shareData.title}\n${shareData.text}\n${shareData.url}`
      );
      toast({
        title: "Link copied!",
        description: "Book link copied to clipboard",
      });
    }
  };

  return (
    <Button 
      size="sm" 
      variant="outline" 
      onClick={handleShare}
      className="h-8 w-8 p-0"
      aria-label={`Share ${book.title}`}
    >
      <Share2 className="h-4 w-4" />
    </Button>
  );
};

const FeaturedBookCard = ({ book }: { book: any }) => (
  <Card className="group transition-transform duration-300 hover:-translate-y-1 overflow-hidden">
    <CardContent className="p-0">
      <div className="aspect-[2/3] w-full overflow-hidden bg-muted/40">
        <div className="flex h-full w-full items-center justify-center p-2">
          <img
            src={book.cover}
            alt={`${book.title} book cover`}
            className="max-h-full max-w-full object-contain drop-shadow-sm"
            loading="lazy"
          />
        </div>
      </div>
      <div className="p-3 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-sm leading-tight line-clamp-2" title={book.title}>
            {book.title}
          </h3>
          <ShareButton book={book} />
        </div>
        <p className="text-xs text-muted-foreground">by {book.author}</p>
        <div className="flex flex-wrap gap-1">
          {book.tags.slice(0, 2).map((tag: string) => (
            <Badge key={tag} variant="secondary" className="text-xs py-0">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="text-xs text-muted-foreground">
          <span className="font-medium text-foreground">₹{book.rentPerWeek}</span>/week
        </div>
      </div>
    </CardContent>
  </Card>
);

const FeaturedBooks = () => {
  const mostFavourite = books.filter(book => 
    book.tags.includes("Most Favourite")
  ).slice(0, 4);
  
  const mostPopular = books.filter(book => 
    book.tags.includes("Most Popular")
  ).slice(0, 4);
  
  const frequentlyRented = books.filter(book => 
    book.tags.includes("Frequently Rented")
  ).slice(0, 4);

  return (
    <section className="container mx-auto px-4 py-8 md:py-12">
      <div className="space-y-8">
        {/* Most Favourite */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Community Favourites</h2>
            <Button variant="outline" size="sm" asChild>
              <a href="/books">View All</a>
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
            {mostFavourite.map((book) => (
              <FeaturedBookCard key={book.id} book={book} />
            ))}
          </div>
        </div>

        {/* Most Popular */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Most Popular</h2>
            <Button variant="outline" size="sm" asChild>
              <a href="/books">View All</a>
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
            {mostPopular.map((book) => (
              <FeaturedBookCard key={book.id} book={book} />
            ))}
          </div>
        </div>

        {/* Frequently Rented */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Frequently Rented</h2>
            <Button variant="outline" size="sm" asChild>
              <a href="/books">View All</a>
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
            {frequentlyRented.map((book) => (
              <FeaturedBookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;