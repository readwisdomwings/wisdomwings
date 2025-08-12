import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full sticky top-0 z-30 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <Link to="/" className="flex items-center gap-2" aria-label="WisdomWings home">
          <div className="h-8 w-8 rounded-md bg-hero-gradient shadow-glow" />
          <span className="font-bold text-lg">WisdomWings</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `hover:text-primary transition-colors ${isActive ? 'text-primary font-medium' : ''}`
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/books" 
            className={({ isActive }) => 
              `hover:text-primary transition-colors ${isActive ? 'text-primary font-medium' : ''}`
            }
          >
            Books
          </NavLink>
          <NavLink 
            to="/faqs" 
            className={({ isActive }) => 
              `hover:text-primary transition-colors ${isActive ? 'text-primary font-medium' : ''}`
            }
          >
            FAQs
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => 
              `hover:text-primary transition-colors ${isActive ? 'text-primary font-medium' : ''}`
            }
          >
            About
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => 
              `hover:text-primary transition-colors ${isActive ? 'text-primary font-medium' : ''}`
            }
          >
            Contact
          </NavLink>
        </nav>
        <div className="flex items-center gap-3">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <nav className="mt-8 flex flex-col gap-4 text-base">
                  <NavLink to="/">Home</NavLink>
                  <NavLink to="/books">Books</NavLink>
                  <NavLink to="/faqs">FAQs</NavLink>
                  <NavLink to="/about">About</NavLink>
                  <NavLink to="/contact">Contact</NavLink>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
          <Link to="/books" className="hidden sm:block">
            <Button variant="ghost">Browse Books</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
