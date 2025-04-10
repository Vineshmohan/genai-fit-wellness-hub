
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div className="absolute inset-0 z-0 bg-[url('/hero-pattern.svg')] opacity-10"></div>
      <div 
        className="absolute inset-0 z-0 bg-gradient-to-br from-fitness-500/20 via-transparent to-nutrition-500/20"
      ></div>
      <div className="relative pt-28 pb-20 md:pt-36 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
              <span className="block text-gray-900 dark:text-white">Your Journey to</span>
              <span className="block mt-2 bg-gradient-to-r from-fitness-500 to-nutrition-600 bg-clip-text text-transparent">
                Better Fitness
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0">
              Personalized AI-powered fitness plans, nutrition tracking, and wellness recommendations tailored to your unique body and goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/signup">
                <Button className="bg-fitness-500 hover:bg-fitness-600 text-white px-8 py-6 rounded-xl text-lg font-medium">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" className="px-8 py-6 rounded-xl text-lg font-medium">
                  Learn More
                </Button>
              </Link>
            </div>
            <div className="pt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Join 10,000+ users transforming their fitness journey with AI
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="relative h-[400px] lg:h-[500px] w-full lg:w-[500px] mx-auto">
              <img 
                src="/placeholder.svg" 
                alt="GenAI-Fit Dashboard Preview" 
                className="rounded-xl shadow-2xl object-cover w-full h-full animate-float"
              />
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg animate-pulse-subtle">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-fitness-500 flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Goal Achieved!</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Ran 5 miles this week</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
