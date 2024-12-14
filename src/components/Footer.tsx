import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">TexnaUzb</h3>
            <p className="text-gray-400">
              O'zbekistondagi eng so'nggi texnologik yangiliklar va sharhlar
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Asosiy bo'limlar</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/smartphones" className="text-gray-400 hover:text-white">
                  Smartfonlar
                </Link>
              </li>
              <li>
                <Link to="/category/computers" className="text-gray-400 hover:text-white">
                  Kompyuterlar
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-gray-400 hover:text-white">
                  Sharhlar
                </Link>
              </li>
              <li>
                <Link to="/tips" className="text-gray-400 hover:text-white">
                  Maslahatlar
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Ijtimoiy tarmoqlar</h3>
            <div className="flex space-x-4">
              <a 
                href="https://t.me/texna_uzb" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-primary transition-colors"
                aria-label="Telegram"
              >
                <svg 
                  className="w-6 h-6" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                </svg>
              </a>
              <a 
                href="https://instagram.com/texna_uzb" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-primary transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a 
                href="https://twitter.com/texna_uzb" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-primary transition-colors"
              >
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 TexnaUzb. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>
    </footer>
  );
}