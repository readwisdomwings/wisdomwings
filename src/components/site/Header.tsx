import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="w-full sticky top-0 z-30 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <a href="/" className="flex items-center gap-2" aria-label="Book Buddy Loop home">
          <div className="h-8 w-8 rounded-md bg-hero-gradient shadow-glow" />
          <span className="font-bold text-lg">Book Buddy Loop</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#books" className="hover:text-primary transition-colors">Books</a>
          <a href="#benefits" className="hover:text-primary transition-colors">Why Reading</a>
          <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
        </nav>
        <div className="flex items-center gap-3">
          <a href="#books" className="hidden sm:block">
            <Button variant="ghost">Browse Books</Button>
          </a>
          <a href="#contact">
            <Button variant="hero">Join Waitlist</Button>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
