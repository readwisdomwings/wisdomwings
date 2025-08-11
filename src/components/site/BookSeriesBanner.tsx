const BookSeriesBanner = () => {
  const series = [
    { name: "Diary of a Wimpy Kid", logo: "WIMPY KID" },
    { name: "Captain Underpants", logo: "CAPTAIN UNDERPANTS" },
    { name: "The Adventures of Tintin", logo: "TINTIN" },
    { name: "Dog Man", logo: "DOG MAN" },
    { name: "Geronimo Stilton", logo: "GERONIMO" },
    { name: "Magic Tree House", logo: "MAGIC TREE" }
  ];

  return (
    <section className="bg-muted/30 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Popular Book Series</h2>
          <p className="text-muted-foreground">
            Find your child's favorite characters and series in our collection
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {series.map((serie, index) => (
            <div
              key={index}
              className="bg-white dark:bg-card rounded-lg p-4 md:p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-300 border"
            >
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center mb-3">
                <span className="text-xs md:text-sm font-bold text-center leading-tight px-2">
                  {serie.logo}
                </span>
              </div>
              <p className="text-xs text-muted-foreground font-medium">
                {serie.name}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground mb-4">
            Can't find your favorite series? Let us know and we'll try to add it!
          </p>
          <a
            href="/books"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Browse All Books
          </a>
        </div>
      </div>
    </section>
  );
};

export default BookSeriesBanner;