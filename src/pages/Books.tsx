import { useMemo, useState } from "react";
import Header from "@/components/site/Header";
import BookGrid from "@/components/site/BookGrid";
import { books, type Book, type BookTag } from "@/data/books";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";

const CATEGORY_TAGS: BookTag[] = ["STEM", "Fantasy", "Adventure", "Animals"];

const Books = () => {
  const availableCategories = CATEGORY_TAGS.filter((t) => books.some((b) => b.tags.includes(t)));
  const ageOptions = Array.from(new Set(books.map((b) => b.ageGroup)));
  const maxRentAll = Math.max(...books.map((b) => b.rentPerWeek));

  const [category, setCategory] = useState<string>("All");
  const [age, setAge] = useState<string>("All Ages");
  const [maxRent, setMaxRent] = useState<number>(maxRentAll);

  const filtered: Book[] = useMemo(() => {
    return books.filter((b) => {
      const catOk = category === "All" || b.tags.includes(category as BookTag);
      const ageOk = age === "All Ages" || b.ageGroup === age;
      const rentOk = b.rentPerWeek <= maxRent;
      return catOk && ageOk && rentOk;
    });
  }, [category, age, maxRent]);

  const reset = () => {
    setCategory("All");
    setAge("All Ages");
    setMaxRent(maxRentAll);
  };

  return (
    <>
      <Helmet>
        <title>Books | Book Buddy Loop</title>
        <meta name="description" content="Browse all children's books. Filter by category, age group and weekly rent. Kid-friendly, mobile-first library." />
        <link rel="canonical" href="/books" />
      </Helmet>
      <main>
        <Header />
        <section className="container mx-auto px-4 py-6 md:py-8">
          <h1 className="sr-only">All Books</h1>
          <div className="rounded-lg border bg-card p-4 md:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 items-end">
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    {availableCategories.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Age Group</label>
                <Select value={age} onValueChange={setAge}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Ages" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Ages">All Ages</SelectItem>
                    {ageOptions.map((a) => (
                      <SelectItem key={a} value={a}>{a}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Max Rent / week: ₹{maxRent}</label>
                <Slider value={[maxRent]} onValueChange={(v) => setMaxRent(v[0] ?? maxRent)} max={maxRentAll} min={Math.min(...books.map((b) => b.rentPerWeek))} step={5} />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button variant="outline" onClick={reset}>Reset Filters</Button>
            </div>
          </div>
        </section>
        <BookGrid items={filtered} title="All Books" />
      </main>
    </>
  );
};

export default Books;
