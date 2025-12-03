import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Heart, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export function Header() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">REEDU</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/browse" className="text-gray-700 hover:text-blue-600 transition">
              Browse Books
            </Link>
            <Link to="/sell" className="text-gray-700 hover:text-blue-600 transition">
              Sell Books
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/saved"
                  className="p-2 text-gray-700 hover:text-blue-600 transition"
                  title="Saved Books"
                >
                  <Heart className="h-5 w-5" />
                </Link>
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline">{profile?.display_name}</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="p-2 text-gray-700 hover:text-red-600 transition"
                  title="Sign Out"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
