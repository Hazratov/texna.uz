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
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                <Linkedin className="w-6 h-6" />
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