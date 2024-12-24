import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold">TEXNA.UZ</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link
            to="/"
            className="transition-colors hover:text-foreground/80 text-foreground"
          >
            Asosiy
          </Link>
          <Link
            to="/daily-news"
            className="transition-colors hover:text-foreground/80 text-foreground"
          >
            Kunlik Yangiliklar
          </Link>
          <Link
            to="/tech-personalities"
            className="transition-colors hover:text-foreground/80 text-foreground"
          >
            Tech Shaxslar
          </Link>
          <Link
            to="/admin"
            className="transition-colors hover:text-foreground/80 text-foreground"
          >
            Admin
          </Link>
        </nav>
        <div className="flex-1" />
        <ThemeToggle />
      </div>
    </header>
  );
}