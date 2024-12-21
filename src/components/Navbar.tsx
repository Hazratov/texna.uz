import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToFooter = () => {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-primary">Texna.uz</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link to="/category/smartphones" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-foreground hover:text-primary">
              Smartfonlar
            </Link>
            <Link to="/category/computers" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-foreground hover:text-primary">
              Kompyuterlar
            </Link>
            <Link to="/category/software" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-foreground hover:text-primary">
              Dasturiy ta'minot
            </Link>
            <Link to="/reviews" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-foreground hover:text-primary">
              Sharhlar
            </Link>
            <button
              onClick={scrollToFooter}
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-foreground hover:text-primary"
            >
              Bog'lanish
            </button>
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/category/smartphones"
              className="block pl-3 pr-4 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-accent"
              onClick={() => setIsOpen(false)}
            >
              Smartfonlar
            </Link>
            <Link
              to="/category/computers"
              className="block pl-3 pr-4 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-accent"
              onClick={() => setIsOpen(false)}
            >
              Kompyuterlar
            </Link>
            <Link
              to="/category/software"
              className="block pl-3 pr-4 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-accent"
              onClick={() => setIsOpen(false)}
            >
              Dasturiy ta'minot
            </Link>
            <Link
              to="/reviews"
              className="block pl-3 pr-4 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-accent"
              onClick={() => setIsOpen(false)}
            >
              Sharhlar
            </Link>
            <button
              onClick={scrollToFooter}
              className="block w-full text-left pl-3 pr-4 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-accent"
            >
              Bog'lanish
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}