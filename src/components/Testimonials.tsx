
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    quote: "GenAI-Fit transformed my approach to fitness. The personalized workouts and meal plans helped me lose 20 pounds in just 3 months!",
    name: "Sarah Johnson",
    role: "Marketing Executive",
    image: "/placeholder.svg"
  },
  {
    quote: "As someone who travels frequently, I needed a flexible fitness solution. GenAI-Fit adapted my workouts to my changing schedule and available equipment.",
    name: "Michael Chen",
    role: "Software Engineer",
    image: "/placeholder.svg"
  },
  {
    quote: "The AI nutritionist feature is like having a dietitian in my pocket. It helped me discover new healthy recipes that actually taste amazing.",
    name: "Priya Patel",
    role: "Healthcare Professional",
    image: "/placeholder.svg"
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-fitness-500 to-nutrition-600 bg-clip-text text-transparent">
              Success Stories
            </span> from Our Community
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Hear from members who have transformed their lives with GenAI-Fit's personalized approach.
          </p>
        </div>

        <div className="relative bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-lg">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/3">
              <div className="relative w-32 h-32 mx-auto md:mx-0 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-fitness-300">
                <img 
                  src={testimonials[activeIndex].image} 
                  alt={testimonials[activeIndex].name} 
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="md:w-2/3">
              <div className="mb-6">
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-xl md:text-2xl italic text-gray-800 dark:text-gray-200 leading-relaxed mb-6">
                  "{testimonials[activeIndex].quote}"
                </blockquote>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">
                    {testimonials[activeIndex].name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonials[activeIndex].role}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center md:justify-end mt-6 gap-2">
            <button 
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-white dark:bg-gray-700 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
            <button 
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-white dark:bg-gray-700 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
