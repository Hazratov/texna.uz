import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-primary">TechUzbek</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/category/smartphones" className="inline-flex items-center px-1 pt-1 text-sm font-medium">
                Smartfonlar
              </Link>
              <Link to="/category/computers" className="inline-flex items-center px-1 pt-1 text-sm font-medium">
                Kompyuterlar
              </Link>
              <Link to="/category/software" className="inline-flex items-center px-1 pt-1 text-sm font-medium">
                Dasturiy ta'minot
              </Link>
              <Link to="/reviews" className="inline-flex items-center px-1 pt-1 text-sm font-medium">
                Sharhlar
              </Link>
              <Link to="/tips" className="inline-flex items-center px-1 pt-1 text-sm font-medium">
                Maslahatlar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}