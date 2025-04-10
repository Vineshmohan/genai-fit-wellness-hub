
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Apple, Coffee, Utensils, ShoppingBag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface Meal {
  title: string;
  type: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
}

interface DayPlan {
  day: string;
  date: string;
  meals: Meal[];
}

const MealPlannerPage = () => {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  // Mock weekly meal plan data
  const [weeklyPlan, setWeeklyPlan] = useState<DayPlan[]>([
    {
      day: 'Monday',
      date: '2025-04-15',
      meals: [
        {
          title: 'Greek Yogurt with Berries',
          type: 'Breakfast',
          calories: 250,
          protein: 20,
          carbs: 25,
          fat: 8,
          ingredients: ['Greek yogurt', 'Mixed berries', 'Honey', 'Almonds']
        },
        {
          title: 'Grilled Chicken Salad',
          type: 'Lunch',
          calories: 380,
          protein: 40,
          carbs: 15,
          fat: 18,
          ingredients: ['Grilled chicken breast', 'Mixed greens', 'Cucumber', 'Cherry tomatoes', 'Olive oil', 'Balsamic vinegar']
        },
        {
          title: 'Salmon with Roasted Vegetables',
          type: 'Dinner',
          calories: 520,
          protein: 38,
          carbs: 25,
          fat: 28,
          ingredients: ['Salmon fillet', 'Broccoli', 'Bell peppers', 'Carrots', 'Olive oil', 'Garlic', 'Herbs']
        },
        {
          title: 'Protein Smoothie',
          type: 'Snack',
          calories: 220,
          protein: 25,
          carbs: 20,
          fat: 5,
          ingredients: ['Protein powder', 'Banana', 'Almond milk', 'Spinach', 'Chia seeds']
        }
      ]
    },
    {
      day: 'Tuesday',
      date: '2025-04-16',
      meals: [
        {
          title: 'Protein Oatmeal with Blueberries',
          type: 'Breakfast',
          calories: 320,
          protein: 18,
          carbs: 45,
          fat: 10,
          ingredients: ['Oats', 'Protein powder', 'Blueberries', 'Almond milk', 'Cinnamon']
        },
        {
          title: 'Turkey & Avocado Wrap',
          type: 'Lunch',
          calories: 410,
          protein: 35,
          carbs: 30,
          fat: 22,
          ingredients: ['Turkey breast', 'Avocado', 'Whole wheat wrap', 'Spinach', 'Tomato', 'Greek yogurt sauce']
        },
        {
          title: 'Baked Cod with Quinoa & Veggies',
          type: 'Dinner',
          calories: 480,
          protein: 42,
          carbs: 35,
          fat: 18,
          ingredients: ['Cod fillet', 'Quinoa', 'Asparagus', 'Zucchini', 'Lemon', 'Olive oil', 'Herbs']
        },
        {
          title: 'Greek Yogurt with Honey',
          type: 'Snack',
          calories: 150,
          protein: 18,
          carbs: 12,
          fat: 3,
          ingredients: ['Greek yogurt', 'Honey', 'Cinnamon']
        }
      ]
    },
    {
      day: 'Wednesday',
      date: '2025-04-17',
      meals: [
        {
          title: 'Greek Yogurt Parfait',
          type: 'Breakfast',
          calories: 290,
          protein: 22,
          carbs: 28,
          fat: 9,
          ingredients: ['Greek yogurt', 'Granola', 'Banana', 'Honey']
        },
        {
          title: 'Chicken Caesar Salad',
          type: 'Lunch',
          calories: 420,
          protein: 38,
          carbs: 18,
          fat: 24,
          ingredients: ['Grilled chicken breast', 'Romaine lettuce', 'Parmesan cheese', 'Caesar dressing', 'Whole grain croutons']
        },
        {
          title: 'Stir-Fry Tofu with Brown Rice',
          type: 'Dinner',
          calories: 430,
          protein: 25,
          carbs: 50,
          fat: 15,
          ingredients: ['Tofu', 'Brown rice', 'Broccoli', 'Bell peppers', 'Carrots', 'Soy sauce', 'Ginger', 'Garlic']
        },
        {
          title: 'Apple with Almond Butter',
          type: 'Snack',
          calories: 210,
          protein: 6,
          carbs: 25,
          fat: 12,
          ingredients: ['Apple', 'Almond butter']
        }
      ]
    },
    {
      day: 'Thursday',
      date: '2025-04-18',
      meals: [
        {
          title: 'Scrambled Eggs on Toast',
          type: 'Breakfast',
          calories: 340,
          protein: 24,
          carbs: 30,
          fat: 15,
          ingredients: ['Eggs', 'Whole grain toast', 'Spinach', 'Avocado', 'Tomato']
        },
        {
          title: 'Tuna Salad Sandwich',
          type: 'Lunch',
          calories: 390,
          protein: 32,
          carbs: 35,
          fat: 16,
          ingredients: ['Tuna', 'Whole grain bread', 'Greek yogurt', 'Celery', 'Red onion', 'Lettuce']
        },
        {
          title: 'Lean Beef Stir-Fry',
          type: 'Dinner',
          calories: 450,
          protein: 40,
          carbs: 30,
          fat: 20,
          ingredients: ['Lean beef strips', 'Brown rice', 'Broccoli', 'Mushrooms', 'Bell peppers', 'Low-sodium soy sauce']
        },
        {
          title: 'Cottage Cheese with Berries',
          type: 'Snack',
          calories: 180,
          protein: 22,
          carbs: 14,
          fat: 5,
          ingredients: ['Cottage cheese', 'Mixed berries', 'Cinnamon']
        }
      ]
    },
    {
      day: 'Friday',
      date: '2025-04-19',
      meals: [
        {
          title: 'Smoothie Bowl',
          type: 'Breakfast',
          calories: 310,
          protein: 18,
          carbs: 40,
          fat: 10,
          ingredients: ['Protein powder', 'Banana', 'Berries', 'Almond milk', 'Chia seeds', 'Granola']
        },
        {
          title: 'Mediterranean Bowl',
          type: 'Lunch',
          calories: 430,
          protein: 25,
          carbs: 45,
          fat: 20,
          ingredients: ['Falafel', 'Quinoa', 'Cucumber', 'Tomato', 'Red onion', 'Hummus', 'Tzatziki']
        },
        {
          title: 'Grilled Shrimp with Sweet Potato',
          type: 'Dinner',
          calories: 410,
          protein: 35,
          carbs: 40,
          fat: 12,
          ingredients: ['Shrimp', 'Sweet potato', 'Asparagus', 'Olive oil', 'Lemon', 'Garlic', 'Herbs']
        },
        {
          title: 'Protein Bar',
          type: 'Snack',
          calories: 200,
          protein: 20,
          carbs: 18,
          fat: 8,
          ingredients: ['Protein bar (read label)']
        }
      ]
    },
    {
      day: 'Saturday',
      date: '2025-04-20',
      meals: [
        {
          title: 'Avocado Toast with Eggs',
          type: 'Breakfast',
          calories: 380,
          protein: 20,
          carbs: 30,
          fat: 22,
          ingredients: ['Whole grain bread', 'Avocado', 'Eggs', 'Cherry tomatoes', 'Red pepper flakes']
        },
        {
          title: 'Quinoa Salad with Chickpeas',
          type: 'Lunch',
          calories: 360,
          protein: 15,
          carbs: 45,
          fat: 15,
          ingredients: ['Quinoa', 'Chickpeas', 'Cucumber', 'Cherry tomatoes', 'Red onion', 'Feta cheese', 'Olive oil', 'Lemon juice']
        },
        {
          title: 'Grilled Chicken with Roasted Vegetables',
          type: 'Dinner',
          calories: 420,
          protein: 40,
          carbs: 25,
          fat: 18,
          ingredients: ['Chicken breast', 'Sweet potato', 'Brussels sprouts', 'Bell peppers', 'Olive oil', 'Herbs']
        },
        {
          title: 'Yogurt Parfait',
          type: 'Snack',
          calories: 210,
          protein: 15,
          carbs: 25,
          fat: 5,
          ingredients: ['Greek yogurt', 'Berries', 'Granola', 'Honey']
        }
      ]
    },
    {
      day: 'Sunday',
      date: '2025-04-21',
      meals: [
        {
          title: 'Protein Pancakes',
          type: 'Breakfast',
          calories: 350,
          protein: 25,
          carbs: 35,
          fat: 12,
          ingredients: ['Protein pancake mix', 'Banana', 'Eggs', 'Blueberries', 'Maple syrup']
        },
        {
          title: 'Chicken Wrap',
          type: 'Lunch',
          calories: 420,
          protein: 35,
          carbs: 40,
          fat: 15,
          ingredients: ['Grilled chicken', 'Whole wheat wrap', 'Lettuce', 'Tomato', 'Cucumber', 'Greek yogurt sauce']
        },
        {
          title: 'Baked Salmon with Asparagus',
          type: 'Dinner',
          calories: 440,
          protein: 40,
          carbs: 20,
          fat: 25,
          ingredients: ['Salmon fillet', 'Asparagus', 'Brown rice', 'Lemon', 'Dill', 'Olive oil']
        },
        {
          title: 'Mixed Nuts',
          type: 'Snack',
          calories: 180,
          protein: 6,
          carbs: 8,
          fat: 16,
          ingredients: ['Almonds', 'Walnuts', 'Pistachios']
        }
      ]
    }
  ]);

  // Function to format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Calculate total macros for a day
  const calculateDailyMacros = (meals: Meal[]) => {
    return meals.reduce(
      (acc, meal) => {
        acc.calories += meal.calories;
        acc.protein += meal.protein;
        acc.carbs += meal.carbs;
        acc.fat += meal.fat;
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="container px-4 py-20 mx-auto max-w-7xl">
        <Card className="border-light bg-yellow-50">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>Please log in to access your meal planner</CardDescription>
          </CardHeader>
          <CardContent>
            <p>You need to be logged in to view and manage your meal plans.</p>
          </CardContent>
          <CardFooter>
            <Button variant="default" className="bg-nutrition-500 hover:bg-nutrition-600" onClick={() => window.location.href = '/login'}>
              Go to Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Weekly Meal Planner</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">View and plan your meals for the entire week</p>
          </div>
          <Button 
            className="mt-4 sm:mt-0 bg-nutrition-500 hover:bg-nutrition-600"
            onClick={() => window.location.href = '/nutrition'}
          >
            Back to Nutrition
          </Button>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">Full Week</TabsTrigger>
            {weeklyPlan.map((day) => (
              <TabsTrigger key={day.day} value={day.day}>
                {day.day.substring(0, 3)}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {weeklyPlan.map((day) => (
                <Card key={day.day} className="shadow-md">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl">{day.day}</CardTitle>
                      <span className="text-sm text-gray-500">{formatDate(day.date)}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm mt-2">
                      <div>
                        <span className="font-medium">{calculateDailyMacros(day.meals).calories}</span>
                        <span className="text-gray-500 ml-1">cal</span>
                      </div>
                      <div>
                        <span className="font-medium text-red-500">{calculateDailyMacros(day.meals).protein}g</span>
                        <span className="text-gray-500 ml-1">protein</span>
                      </div>
                      <div>
                        <span className="font-medium text-blue-500">{calculateDailyMacros(day.meals).carbs}g</span>
                        <span className="text-gray-500 ml-1">carbs</span>
                      </div>
                      <div>
                        <span className="font-medium text-yellow-500">{calculateDailyMacros(day.meals).fat}g</span>
                        <span className="text-gray-500 ml-1">fat</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {day.meals.map((meal, index) => (
                        <div key={index} className="p-2 rounded-lg border border-gray-200 dark:border-gray-700">
                          <div className="flex items-center mb-1">
                            {meal.type === 'Breakfast' && <Coffee className="h-4 w-4 mr-2 text-nutrition-500" />}
                            {meal.type === 'Lunch' && <Utensils className="h-4 w-4 mr-2 text-nutrition-500" />}
                            {meal.type === 'Dinner' && <Utensils className="h-4 w-4 mr-2 text-nutrition-500" />}
                            {meal.type === 'Snack' && <Apple className="h-4 w-4 mr-2 text-nutrition-500" />}
                            <span className="font-medium">{meal.title}</span>
                          </div>
                          
                          <div className="text-xs text-gray-500 ml-6">
                            {meal.ingredients.join(", ")}
                          </div>
                          
                          <div className="flex space-x-3 mt-1 ml-6 text-xs">
                            <span>{meal.calories} cal</span>
                            <span className="text-red-500">{meal.protein}g protein</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {weeklyPlan.map((day) => (
            <TabsContent key={day.day} value={day.day}>
              <Card className="shadow-md">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>{day.day}</CardTitle>
                    <span className="text-sm text-gray-500">{formatDate(day.date)}</span>
                  </div>
                  <CardDescription>
                    <div className="flex justify-between text-sm mt-2">
                      <div>
                        <span className="font-medium">{calculateDailyMacros(day.meals).calories}</span>
                        <span className="text-gray-500 ml-1">cal</span>
                      </div>
                      <div>
                        <span className="font-medium text-red-500">{calculateDailyMacros(day.meals).protein}g</span>
                        <span className="text-gray-500 ml-1">protein</span>
                      </div>
                      <div>
                        <span className="font-medium text-blue-500">{calculateDailyMacros(day.meals).carbs}g</span>
                        <span className="text-gray-500 ml-1">carbs</span>
                      </div>
                      <div>
                        <span className="font-medium text-yellow-500">{calculateDailyMacros(day.meals).fat}g</span>
                        <span className="text-gray-500 ml-1">fat</span>
                      </div>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {['Breakfast', 'Lunch', 'Dinner', 'Snack'].map((mealType) => {
                      const meal = day.meals.find(m => m.type === mealType);
                      
                      return (
                        <div key={mealType}>
                          <h3 className="text-lg font-medium mb-3 flex items-center">
                            {mealType === 'Breakfast' && <Coffee className="h-5 w-5 mr-2 text-nutrition-500" />}
                            {mealType === 'Lunch' && <Utensils className="h-5 w-5 mr-2 text-nutrition-500" />}
                            {mealType === 'Dinner' && <Utensils className="h-5 w-5 mr-2 text-nutrition-500" />}
                            {mealType === 'Snack' && <Apple className="h-5 w-5 mr-2 text-nutrition-500" />}
                            {mealType}
                          </h3>
                          
                          {meal ? (
                            <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                              <div className="flex justify-between mb-2">
                                <h4 className="font-medium">{meal.title}</h4>
                                <span>{meal.calories} calories</span>
                              </div>
                              
                              <div className="flex space-x-4 mb-3 text-sm">
                                <div>
                                  <span className="text-red-500 font-medium">{meal.protein}g</span>
                                  <span className="text-gray-500 dark:text-gray-400"> protein</span>
                                </div>
                                <div>
                                  <span className="text-blue-500 font-medium">{meal.carbs}g</span>
                                  <span className="text-gray-500 dark:text-gray-400"> carbs</span>
                                </div>
                                <div>
                                  <span className="text-yellow-500 font-medium">{meal.fat}g</span>
                                  <span className="text-gray-500 dark:text-gray-400"> fat</span>
                                </div>
                              </div>
                              
                              <div>
                                <h5 className="text-sm font-medium mb-1">Ingredients:</h5>
                                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                                  {meal.ingredients.map((ingredient, i) => (
                                    <li key={i}>{ingredient}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ) : (
                            <div className="p-4 rounded-lg border border-dashed border-gray-300 dark:border-gray-700 text-center">
                              <p className="text-gray-500 dark:text-gray-400">No {mealType.toLowerCase()} planned</p>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="mt-2"
                                onClick={() => {
                                  toast({
                                    title: "Coming Soon",
                                    description: "Meal customization will be available in the next update",
                                  });
                                }}
                              >
                                Add {mealType}
                              </Button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      toast({
                        title: "Coming Soon",
                        description: "Meal editing will be available in the next update",
                      });
                    }}
                  >
                    Edit Meal Plan
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default MealPlannerPage;
