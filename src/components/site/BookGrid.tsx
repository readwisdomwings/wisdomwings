import { useState } from "react";
import { books, type Book } from "@/data/books";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const AvailabilityBadge = ({ available }: { available: boolean }) => (
  <Badge variant={available ? "success" : "destructive"}>
    {available ? "Available" : "Issued"}
  </Badge>
);

const TagBadges = ({ tags }: { tags: Book["tags"] }) => (
  <div className="flex flex-wrap gap-2">
    {tags.map((t) => {
      const lower = t.toLowerCase();
      const variant =
        lower.includes("popular") || lower.includes("favourite")
          ? ("info" as const)
          : lower.includes("frequently")
          ? ("warning" as const)
          : ("secondary" as const);
      return (
        <Badge key={t} variant={variant} aria-label={`Tag: ${t}`}>
          {t}
        </Badge>
      );
    })}
  </div>
);

const BookCard = ({ book, onOpen }: { book: Book; onOpen: () => void }) => (
  <Card className="group relative overflow-hidden transition-transform duration-300 hover:-translate-y-1">
    <CardContent className="p-0">
      <div className="aspect-[3/4] w-full overflow-hidden">
        <img
          src={book.cover}
          alt={`${book.title} by ${book.author} book cover`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-semibold truncate" title={book.title}>
            {book.title}
          </h3>
          <AvailabilityBadge available={book.available} />
        </div>
        <p className="text-sm text-muted-foreground">by {book.author} · Age {book.ageGroup}</p>
        <TagBadges tags={book.tags} />
        <div className="flex items-center justify-between pt-2">
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">₹{book.rentPerWeek}</span> / week · Deposit ₹{book.deposit}
          </div>
          <Button size="sm" onClick={onOpen} aria-label={`View details for ${book.title}`}>
            Details
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

const BookModal = ({ book, open, onOpenChange }: { book: Book; open: boolean; onOpenChange: (o: boolean) => void }) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="sm:max-w-xl">
      <DialogHeader>
        <DialogTitle>{book.title}</DialogTitle>
        <DialogDescription>
          {book.author} · Age {book.ageGroup}
        </DialogDescription>
      </DialogHeader>
      <div className="grid md:grid-cols-2 gap-4">
        <img src={book.cover} alt={`${book.title} large cover`} className="rounded-md border w-full" />
        <div className="flex flex-col gap-3">
          <AvailabilityBadge available={book.available} />
          <TagBadges tags={book.tags} />
          <p className="text-sm text-muted-foreground">{book.description}</p>
          <div className="mt-1 text-sm">
            <div>
              <span className="font-medium text-foreground">Deposit:</span> ₹{book.deposit} (100% refundable)
            </div>
            <div>
              <span className="font-medium text-foreground">Rent:</span> ₹{book.rentPerWeek}/week
            </div>
          </div>
          <div className="pt-2">
            <Button disabled={!book.available} aria-disabled={!book.available} className="w-full">
              {book.available ? "Request This Book" : "Currently Issued"}
            </Button>
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
);

const BookGrid = () => {
  const [active, setActive] = useState<Book | null>(null);

  return (
    <section id="books" className="container mx-auto px-4 py-12 md:py-16">
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold">Featured Books</h2>
          <p className="text-muted-foreground">A rotating shelf of community favourites and most-rented picks.</p>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {books.map((b) => (
          <div key={b.id}>
            <BookCard book={b} onOpen={() => setActive(b)} />
          </div>
        ))}
      </div>
      {active && (
        <BookModal book={active} open={!!active} onOpenChange={(o) => !o && setActive(null)} />
      )}
    </section>
  );
};

export default BookGrid;
