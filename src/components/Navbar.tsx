
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-heading font-bold bg-gradient-to-r from-fitness-500 to-nutrition-600 bg-clip-text text-transparent">
                GenAI-Fit
              </span>
            </Link>
          </div>
          
          {!isMobile && (
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-fitness-500 dark:hover:text-fitness-400 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link to="/workouts" className="text-gray-700 dark:text-gray-200 hover:text-fitness-500 dark:hover:text-fitness-400 px-3 py-2 rounded-md text-sm font-medium">
                Workouts
              </Link>
              <Link to="/nutrition" className="text-gray-700 dark:text-gray-200 hover:text-fitness-500 dark:hover:text-fitness-400 px-3 py-2 rounded-md text-sm font-medium">
                Nutrition
              </Link>
              <Link to="/dashboard" className="text-gray-700 dark:text-gray-200 hover:text-fitness-500 dark:hover:text-fitness-400 px-3 py-2 rounded-md text-sm font-medium">
                Dashboard
              </Link>
              <div className="ml-4 flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="outline" className="text-sm">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-fitness-500 hover:bg-fitness-600 text-sm">
                    Sign Up
                  </Button>
                </Link>
                <button 
                  onClick={toggleDarkMode} 
                  className="p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>
            </div>
          )}
          
          {isMobile && (
            <div className="md:hidden flex items-center">
              <button 
                onClick={toggleDarkMode} 
                className="p-2 mr-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={toggleMenu}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          )}
        </div>
      </div>
      
      {isMobile && isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 animate-slide-in-right">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
              Home
            </Link>
            <Link to="/workouts" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
              Workouts
            </Link>
            <Link to="/nutrition" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
              Nutrition
            </Link>
            <Link to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
              Dashboard
            </Link>
            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center px-3">
                <Link to="/login" className="w-full">
                  <Button variant="outline" className="w-full justify-center">
                    Login
                  </Button>
                </Link>
              </div>
              <div className="mt-3 px-3">
                <Link to="/signup" className="w-full">
                  <Button className="w-full justify-center bg-fitness-500 hover:bg-fitness-600">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
