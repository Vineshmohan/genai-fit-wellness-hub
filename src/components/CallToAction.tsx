
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="py-20 hero-gradient text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Fitness Journey?
          </h2>
          <p className="text-xl mb-10 text-white/90">
            Start your personalized AI fitness experience today and achieve your goals faster than ever before.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button className="bg-white text-fitness-600 hover:bg-gray-100 px-8 py-6 rounded-xl text-lg font-medium">
                Get Started for Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 rounded-xl text-lg font-medium">
                View Pricing
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-sm text-white/70">
            No credit card required. Start with a 14-day free trial.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
