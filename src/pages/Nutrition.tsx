
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Apple, Coffee, ShoppingBag, Utensils, Plus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useFoodLog } from '@/hooks/useFoodLog';
import FoodLogForm from '@/components/FoodLogForm';

const NutritionPage = () => {
  const { toast } = useToast();
  const [showFoodLog, setShowFoodLog] = useState(false);
  const { foodItems, addFoodItem } = useFoodLog();
  
  // Real-time nutrition data for the day
  const [dailyNutrition, setDailyNutrition] = useState({
    calories: {
      consumed: 1350,
      goal: 2200
    },
    protein: {
      consumed: 85,
      goal: 120
    },
    carbs: {
      consumed: 160,
      goal: 240
    },
    fat: {
      consumed: 45,
      goal: 70
    }
  });

  // Update nutrition values when food is logged
  const handleAddFood = (food: any) => {
    addFoodItem(food);
    
    // Update nutrition data
    setDailyNutrition(prev => ({
      calories: {
        consumed: prev.calories.consumed + food.calories,
        goal: prev.calories.goal
      },
      protein: {
        consumed: prev.protein.consumed + food.protein,
        goal: prev.protein.goal
      },
      carbs: {
        consumed: prev.carbs.consumed + food.carbs,
        goal: prev.carbs.goal
      },
      fat: {
        consumed: prev.fat.consumed + food.fat,
        goal: prev.fat.goal
      }
    }));
    
    toast({
      title: "Food logged successfully",
      description: `Added ${food.name} to your nutrition log`,
    });
  };

  const recommendedMeals = [
    {
      title: "Greek Yogurt with Berries",
      calories: 250,
      protein: 20,
      carbs: 25,
      fat: 8,
      time: "Breakfast",
      ingredients: ["Greek yogurt", "Mixed berries", "Honey", "Almonds"]
    },
    {
      title: "Grilled Chicken Salad",
      calories: 380,
      protein: 40,
      carbs: 15,
      fat: 18,
      time: "Lunch",
      ingredients: ["Grilled chicken breast", "Mixed greens", "Cucumber", "Cherry tomatoes", "Olive oil", "Balsamic vinegar"]
    },
    {
      title: "Salmon with Roasted Vegetables",
      calories: 520,
      protein: 38,
      carbs: 25,
      fat: 28,
      time: "Dinner",
      ingredients: ["Salmon fillet", "Broccoli", "Bell peppers", "Carrots", "Olive oil", "Garlic", "Herbs"]
    },
    {
      title: "Protein Smoothie",
      calories: 220,
      protein: 25,
      carbs: 20,
      fat: 5,
      time: "Snack",
      ingredients: ["Protein powder", "Banana", "Almond milk", "Spinach", "Chia seeds"]
    }
  ];

  const groceryItems = [
    { name: "Chicken breast", category: "Protein", quantity: "1 lb" },
    { name: "Salmon fillets", category: "Protein", quantity: "2 fillets" },
    { name: "Greek yogurt", category: "Dairy", quantity: "32 oz" },
    { name: "Eggs", category: "Protein", quantity: "1 dozen" },
    { name: "Spinach", category: "Vegetables", quantity: "1 bag" },
    { name: "Sweet potatoes", category: "Vegetables", quantity: "3 medium" },
    { name: "Quinoa", category: "Grains", quantity: "1 cup" },
    { name: "Berries", category: "Fruits", quantity: "1 container" },
    { name: "Almonds", category: "Nuts", quantity: "1 cup" },
    { name: "Olive oil", category: "Oils", quantity: "As needed" }
  ];

  const getTodaysDate = () => {
    return new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const calculatePercentage = (consumed: number, goal: number) => {
    return Math.min(Math.round((consumed / goal) * 100), 100);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Nutrition Planner</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Personalized for your goals</p>
          </div>
          <Button 
            className="mt-4 sm:mt-0 bg-nutrition-500 hover:bg-nutrition-600"
            onClick={() => setShowFoodLog(true)}
          >
            <Plus className="mr-2 h-4 w-4" /> Log Food
          </Button>
        </div>

        {showFoodLog && (
          <div className="mb-8">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Log Your Food</CardTitle>
                <CardDescription>Track your nutrition intake</CardDescription>
              </CardHeader>
              <CardContent>
                <FoodLogForm onSubmit={handleAddFood} onClose={() => setShowFoodLog(false)} />
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-medium">Calories</CardTitle>
              <CardDescription>{dailyNutrition.calories.consumed} / {dailyNutrition.calories.goal} kcal</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress 
                value={calculatePercentage(dailyNutrition.calories.consumed, dailyNutrition.calories.goal)} 
                className="h-2 bg-gray-200" 
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {dailyNutrition.calories.goal - dailyNutrition.calories.consumed} kcal remaining
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-medium">Protein</CardTitle>
              <CardDescription>{dailyNutrition.protein.consumed} / {dailyNutrition.protein.goal} g</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress 
                value={calculatePercentage(dailyNutrition.protein.consumed, dailyNutrition.protein.goal)} 
                className="h-2 bg-gray-200" 
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {dailyNutrition.protein.goal - dailyNutrition.protein.consumed} g remaining
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-medium">Carbs</CardTitle>
              <CardDescription>{dailyNutrition.carbs.consumed} / {dailyNutrition.carbs.goal} g</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress 
                value={calculatePercentage(dailyNutrition.carbs.consumed, dailyNutrition.carbs.goal)} 
                className="h-2 bg-gray-200" 
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {dailyNutrition.carbs.goal - dailyNutrition.carbs.consumed} g remaining
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-medium">Fat</CardTitle>
              <CardDescription>{dailyNutrition.fat.consumed} / {dailyNutrition.fat.goal} g</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress 
                value={calculatePercentage(dailyNutrition.fat.consumed, dailyNutrition.fat.goal)} 
                className="h-2 bg-gray-200" 
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {dailyNutrition.fat.goal - dailyNutrition.fat.consumed} g remaining
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 shadow-md">
            <CardHeader>
              <CardTitle>Today's Meal Plan</CardTitle>
              <CardDescription>{getTodaysDate()}</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="recommended">
                <TabsList className="mb-4">
                  <TabsTrigger value="recommended">Recommended</TabsTrigger>
                  <TabsTrigger value="logged">Your Logged Food</TabsTrigger>
                </TabsList>
                
                <TabsContent value="recommended">
                  <div className="space-y-4">
                    {recommendedMeals.map((meal, index) => (
                      <div key={index} className="flex p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="rounded-full w-10 h-10 flex items-center justify-center mr-3 bg-nutrition-100 text-nutrition-600">
                          <Utensils className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white">{meal.title}</h4>
                              <span className="text-xs text-gray-500 dark:text-gray-400">{meal.time}</span>
                              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                {meal.ingredients.join(", ")}
                              </div>
                            </div>
                            <span className="font-medium text-gray-900 dark:text-white mt-2 sm:mt-0">{meal.calories} cal</span>
                          </div>
                          <div className="flex space-x-3 mt-2">
                            <div className="text-xs">
                              <span className="text-red-500 font-medium">{meal.protein}g</span>
                              <span className="text-gray-500 dark:text-gray-400"> protein</span>
                            </div>
                            <div className="text-xs">
                              <span className="text-blue-500 font-medium">{meal.carbs}g</span>
                              <span className="text-gray-500 dark:text-gray-400"> carbs</span>
                            </div>
                            <div className="text-xs">
                              <span className="text-yellow-500 font-medium">{meal.fat}g</span>
                              <span className="text-gray-500 dark:text-gray-400"> fat</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="logged">
                  {foodItems.length > 0 ? (
                    <div className="space-y-4">
                      {foodItems.map((item, idx) => (
                        <div key={idx} className="flex p-3 rounded-lg border border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-900/20">
                          <div className="rounded-full w-10 h-10 flex items-center justify-center mr-3 bg-green-100 text-green-600">
                            <Utensils className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <div>
                                <h4 className="font-medium text-gray-900 dark:text-white">{item.name}</h4>
                                <span className="text-xs text-gray-500 dark:text-gray-400">{item.mealType}</span>
                              </div>
                              <span className="font-medium text-gray-900 dark:text-white">{item.calories} cal</span>
                            </div>
                            <div className="flex space-x-3 mt-2">
                              <div className="text-xs">
                                <span className="text-red-500 font-medium">{item.protein}g</span>
                                <span className="text-gray-500 dark:text-gray-400"> protein</span>
                              </div>
                              <div className="text-xs">
                                <span className="text-blue-500 font-medium">{item.carbs}g</span>
                                <span className="text-gray-500 dark:text-gray-400"> carbs</span>
                              </div>
                              <div className="text-xs">
                                <span className="text-yellow-500 font-medium">{item.fat}g</span>
                                <span className="text-gray-500 dark:text-gray-400"> fat</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Utensils className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 dark:text-gray-400">No food logged today</p>
                      <Button 
                        className="mt-4 bg-nutrition-500 hover:bg-nutrition-600"
                        onClick={() => setShowFoodLog(true)}
                      >
                        Log Food Now
                      </Button>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Grocery List</span>
                <ShoppingBag className="h-5 w-5 text-nutrition-500" />
              </CardTitle>
              <CardDescription>Recommended items for your meal plan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["Protein", "Vegetables", "Fruits", "Other"].map((category) => (
                  <div key={category}>
                    <h3 className="text-sm font-semibold mb-2">{category}</h3>
                    <div className="space-y-2">
                      {groceryItems
                        .filter(item => item.category === category || (category === "Other" && !["Protein", "Vegetables", "Fruits"].includes(item.category)))
                        .map((item, index) => (
                          <div key={index} className="flex justify-between items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                            <div className="flex items-center">
                              <div className={`w-2 h-2 rounded-full mr-2 ${
                                item.category === "Protein" ? "bg-red-500" :
                                item.category === "Vegetables" ? "bg-green-500" :
                                item.category === "Fruits" ? "bg-yellow-500" :
                                item.category === "Dairy" ? "bg-blue-500" :
                                "bg-gray-500"
                              }`}></div>
                              <span className="text-sm">{item.name}</span>
                            </div>
                            <span className="text-xs text-gray-500">{item.quantity}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
                <Button className="w-full" variant="outline">Download Shopping List</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Weekly Meal Planner</CardTitle>
              <CardDescription>View and plan your meals for the week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Tomorrow</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Coffee className="h-4 w-4 mr-2 text-nutrition-500" />
                      <span className="text-sm">Protein Oatmeal with Blueberries</span>
                    </div>
                    <div className="flex items-center">
                      <Utensils className="h-4 w-4 mr-2 text-nutrition-500" />
                      <span className="text-sm">Turkey & Avocado Wrap</span>
                    </div>
                    <div className="flex items-center">
                      <Utensils className="h-4 w-4 mr-2 text-nutrition-500" />
                      <span className="text-sm">Baked Cod with Quinoa & Veggies</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Day After Tomorrow</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Coffee className="h-4 w-4 mr-2 text-nutrition-500" />
                      <span className="text-sm">Greek Yogurt Parfait</span>
                    </div>
                    <div className="flex items-center">
                      <Utensils className="h-4 w-4 mr-2 text-nutrition-500" />
                      <span className="text-sm">Chicken Caesar Salad</span>
                    </div>
                    <div className="flex items-center">
                      <Utensils className="h-4 w-4 mr-2 text-nutrition-500" />
                      <span className="text-sm">Stir-Fry Tofu with Brown Rice</span>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full" variant="outline">View Full Week</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Nutrition Tips</CardTitle>
              <CardDescription>Personalized for your goals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-nutrition-50 dark:bg-nutrition-900/20 border border-nutrition-100 dark:border-nutrition-900">
                  <h3 className="flex items-center font-medium text-nutrition-700 dark:text-nutrition-300 mb-1">
                    <Apple className="h-4 w-4 mr-2" />
                    Meal Timing
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Based on your workout schedule, try consuming a protein-rich meal within 30 minutes after your strength training sessions to maximize recovery.
                  </p>
                </div>
                
                <div className="p-3 rounded-lg bg-nutrition-50 dark:bg-nutrition-900/20 border border-nutrition-100 dark:border-nutrition-900">
                  <h3 className="flex items-center font-medium text-nutrition-700 dark:text-nutrition-300 mb-1">
                    <Apple className="h-4 w-4 mr-2" />
                    Hydration
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    You're currently averaging 5 glasses of water daily. Try increasing to 8 glasses to support your metabolism and workout performance.
                  </p>
                </div>
                
                <div className="p-3 rounded-lg bg-nutrition-50 dark:bg-nutrition-900/20 border border-nutrition-100 dark:border-nutrition-900">
                  <h3 className="flex items-center font-medium text-nutrition-700 dark:text-nutrition-300 mb-1">
                    <Apple className="h-4 w-4 mr-2" />
                    Macronutrient Balance
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Your current protein intake is slightly below your goal. Consider adding more lean protein sources like chicken, fish, or plant-based alternatives to support muscle recovery.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NutritionPage;
