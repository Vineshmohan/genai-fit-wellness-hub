
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <span className="text-2xl font-heading font-bold bg-gradient-to-r from-fitness-400 to-nutrition-400 bg-clip-text text-transparent">
                GenAI-Fit
              </span>
            </Link>
            <p className="text-sm mb-6 text-gray-400">
              Personalized AI-powered fitness platform for your wellness journey.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-fitness-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-fitness-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-fitness-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-fitness-400 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Features</h3>
            <ul className="space-y-2">
              <li><Link to="/workouts" className="text-gray-400 hover:text-fitness-400 transition-colors">Workouts</Link></li>
              <li><Link to="/nutrition" className="text-gray-400 hover:text-fitness-400 transition-colors">Nutrition</Link></li>
              <li><Link to="/progress" className="text-gray-400 hover:text-fitness-400 transition-colors">Progress Tracking</Link></li>
              <li><Link to="/community" className="text-gray-400 hover:text-fitness-400 transition-colors">Community</Link></li>
              <li><Link to="/ai-assistant" className="text-gray-400 hover:text-fitness-400 transition-colors">AI Assistant</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/blog" className="text-gray-400 hover:text-fitness-400 transition-colors">Blog</Link></li>
              <li><Link to="/guides" className="text-gray-400 hover:text-fitness-400 transition-colors">Fitness Guides</Link></li>
              <li><Link to="/recipes" className="text-gray-400 hover:text-fitness-400 transition-colors">Healthy Recipes</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-fitness-400 transition-colors">FAQs</Link></li>
              <li><Link to="/support" className="text-gray-400 hover:text-fitness-400 transition-colors">Support</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-fitness-400 transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-fitness-400 transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-fitness-400 transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-fitness-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-fitness-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} GenAI-Fit. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li><Link to="/privacy" className="text-sm text-gray-400 hover:text-fitness-400 transition-colors">Privacy</Link></li>
              <li><Link to="/terms" className="text-sm text-gray-400 hover:text-fitness-400 transition-colors">Terms</Link></li>
              <li><Link to="/cookies" className="text-sm text-gray-400 hover:text-fitness-400 transition-colors">Cookies</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
