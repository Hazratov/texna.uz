import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-primary">TechUzbek</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:flex sm:space-x-8">
            <Link to="/category/smartphones" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-primary">
              Smartfonlar
            </Link>
            <Link to="/category/computers" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-primary">
              Kompyuterlar
            </Link>
            <Link to="/category/software" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-primary">
              Dasturiy ta'minot
            </Link>
            <Link to="/reviews" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-primary">
              Sharhlar
            </Link>
            <Link to="/tips" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-primary">
              Maslahatlar
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
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
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Smartfonlar
            </Link>
            <Link
              to="/category/computers"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Kompyuterlar
            </Link>
            <Link
              to="/category/software"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Dasturiy ta'minot
            </Link>
            <Link
              to="/reviews"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Sharhlar
            </Link>
            <Link
              to="/tips"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Maslahatlar
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}