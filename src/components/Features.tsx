
import { 
  Activity, 
  Brain, 
  Calendar, 
  LineChart, 
  Utensils, 
  Users 
} from 'lucide-react';

const features = [
  {
    title: "AI-Powered Fitness Plans",
    description: "Get personalized workout routines created by our advanced AI that adapts to your progress and goals.",
    icon: Brain,
    color: "bg-fitness-100 text-fitness-600",
  },
  {
    title: "Smart Nutrition Tracking",
    description: "Track your meals with intelligent calorie and macronutrient breakdowns to optimize your diet.",
    icon: Utensils,
    color: "bg-nutrition-100 text-nutrition-600",
  },
  {
    title: "Progress Analytics",
    description: "Visualize your fitness journey with detailed charts and metrics to see your improvements.",
    icon: LineChart,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Daily Activity Monitoring",
    description: "Track steps, workouts, and all physical activities to maintain consistency in your routine.",
    icon: Activity,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Customized Schedules",
    description: "Get workout and meal plans that fit your lifestyle and personal schedule.",
    icon: Calendar,
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "Community Support",
    description: "Connect with like-minded fitness enthusiasts for motivation and shared experiences.",
    icon: Users,
    color: "bg-pink-100 text-pink-600",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-fitness-500 to-nutrition-600 bg-clip-text text-transparent">
              Intelligent Features
            </span> for Your Fitness Journey
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            GenAI-Fit combines cutting-edge AI technology with proven fitness principles to help you reach your health goals faster.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 card-hover"
            >
              <div className={`p-3 rounded-full w-12 h-12 flex items-center justify-center mb-5 ${feature.color}`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
