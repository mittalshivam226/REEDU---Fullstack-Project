import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold text-white">REEDU</span>
            </div>
            <p className="text-sm">
              Your trusted marketplace for second-hand competitive exam books.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/browse" className="hover:text-white transition">
                  Browse Books
                </Link>
              </li>
              <li>
                <Link to="/sell" className="hover:text-white transition">
                  Sell Your Books
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Popular Exams</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/browse?exam=neet" className="hover:text-white transition">
                  NEET
                </Link>
              </li>
              <li>
                <Link to="/browse?exam=jee" className="hover:text-white transition">
                  JEE
                </Link>
              </li>
              <li>
                <Link to="/browse?exam=upsc" className="hover:text-white transition">
                  UPSC
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} REEDU. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
