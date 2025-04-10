import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Activity, Award, Database, Download, Dumbbell, FileText, MessageSquare, Plus, Utensils, Zap } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import FoodLogForm from '@/components/FoodLogForm';
import { useFoodLog } from '@/hooks/useFoodLog';

const mockWeightData = [
  { day: 'Mon', weight: 85.3 },
  { day: 'Tue', weight: 85.1 },
  { day: 'Wed', weight: 84.9 },
  { day: 'Thu', weight: 84.7 },
  { day: 'Fri', weight: 84.5 },
  { day: 'Sat', weight: 84.3 },
  { day: 'Sun', weight: 84.2 },
];

const mockStepsData = [
  { day: 'Mon', steps: 5830 },
  { day: 'Tue', steps: 7244 },
  { day: 'Wed', steps: 8362 },
  { day: 'Thu', steps: 6251 },
  { day: 'Fri', steps: 9125 },
  { day: 'Sat', steps: 11532 },
  { day: 'Sun', steps: 8745 },
];

const mockWorkouts = [
  {
    title: "Full Body HIIT",
    duration: "30 min",
    calories: 320,
    completed: true,
    type: "HIIT"
  },
  {
    title: "Upper Body Strength",
    duration: "45 min",
    calories: 280,
    completed: false,
    type: "Strength"
  },
  {
    title: "Morning Yoga Flow",
    duration: "20 min",
    calories: 150,
    completed: false,
    type: "Yoga"
  }
];

const mockMeals = [
  {
    title: "Protein Breakfast Bowl",
    calories: 450,
    protein: 35,
    carbs: 30,
    fat: 20,
    time: "Breakfast"
  },
  {
    title: "Grilled Chicken Salad",
    calories: 380,
    protein: 40,
    carbs: 15,
    fat: 18,
    time: "Lunch"
  },
  {
    title: "Salmon with Roasted Vegetables",
    calories: 520,
    protein: 38,
    carbs: 25,
    fat: 28,
    time: "Dinner"
  }
];

const Dashboard = () => {
  const [waterIntake, setWaterIntake] = useState<number>(3);
  const waterGoal = 8;
  const { toast } = useToast();
  const [chatMessage, setChatMessage] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<Array<{text: string, isUser: boolean}>>([
    {text: "Hello! I'm your AI fitness coach. How can I help you today?", isUser: false}
  ]);
  const [showFoodLog, setShowFoodLog] = useState<boolean>(false);
  const { foodItems, addFoodItem } = useFoodLog();

  const increaseWaterIntake = () => {
    if (waterIntake < waterGoal) {
      setWaterIntake(waterIntake + 1);
      toast({
        title: "Water intake logged",
        description: `${waterIntake + 1} of ${waterGoal} glasses completed`,
      });
    }
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    
    const newUserMessage = {text: chatMessage, isUser: true};
    setChatMessages(prev => [...prev, newUserMessage]);
    
    setTimeout(() => {
      let response = "";
      
      if (chatMessage.toLowerCase().includes("tired")) {
        response = "Post-workout fatigue could be due to several factors: nutrition, hydration, sleep quality, or overtraining. I notice your protein intake has been below target for the past week, and your sleep data shows less than 7 hours on average. Try increasing protein and aiming for 7-8 hours of sleep.";
      } else if (chatMessage.toLowerCase().includes("diet") || chatMessage.toLowerCase().includes("nutrition")) {
        response = "Based on your goals and activity level, I recommend focusing on protein-rich foods and complex carbohydrates. Your current macro split looks good, but you could increase protein intake by about 10g per day for better muscle recovery.";
      } else if (chatMessage.toLowerCase().includes("workout") || chatMessage.toLowerCase().includes("exercise")) {
        response = "Your current workout plan is well-balanced. I notice you've been consistent with your strength training. Consider adding one more day of mobility work to improve recovery and prevent injuries.";
      } else {
        response = "Thanks for your question. Based on your recent activity and goals, I'd recommend focusing on consistency with your workouts and ensuring adequate protein intake. What specific aspect of your fitness journey would you like more guidance on?";
      }
      
      setChatMessages(prev => [...prev, {text: response, isUser: false}]);
    }, 1000);
    
    setChatMessage("");
  };

  const handleDownloadReport = () => {
    toast({
      title: "Report Generated",
      description: "Your fitness report has been downloaded",
    });
    const dummyData = JSON.stringify({
      user: "Alex",
      weight: mockWeightData,
      meals: mockMeals,
      waterIntake: waterIntake,
      date: new Date().toISOString()
    }, null, 2);
    
    const blob = new Blob([dummyData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fitness-report.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleConnectDatabase = () => {
    toast({
      title: "Database Connected",
      description: "Your fitness data is now being synced",
    });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back, Alex</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Here's an overview of your fitness journey</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-3 flex-wrap">
            <Button className="bg-fitness-500 hover:bg-fitness-600">
              <Plus className="mr-2 h-4 w-4" /> Log Workout
            </Button>
            <Button variant="outline" onClick={() => setShowFoodLog(true)}>
              <Utensils className="mr-2 h-4 w-4" /> Log Food
            </Button>
            <Button variant="outline" onClick={handleDownloadReport}>
              <Download className="mr-2 h-4 w-4" /> Download Report
            </Button>
            <Button variant="outline" onClick={handleConnectDatabase}>
              <Database className="mr-2 h-4 w-4" /> Sync Database
            </Button>
          </div>
        </div>

        {showFoodLog && (
          <div className="mb-8">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Log Your Food</CardTitle>
                <CardDescription>Track your nutrition intake</CardDescription>
              </CardHeader>
              <CardContent>
                <FoodLogForm onSubmit={addFoodItem} onClose={() => setShowFoodLog(false)} />
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card className="col-span-1 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-medium">Goal Progress</CardTitle>
              <CardDescription>Weight loss goal</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">Current: 84.2kg</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Target: 80.0kg</span>
              </div>
              <Progress value={65} className="h-2 bg-gray-200" />
              <div className="flex justify-end mt-2">
                <span className="text-sm font-medium text-fitness-600">65% complete</span>
              </div>
              <div className="mt-4 text-center">
                <Award className="w-8 h-8 text-fitness-500 mx-auto mb-2" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  You've lost 4.8kg so far!
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-medium">Today's Stats</CardTitle>
              <CardDescription>April 10, 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Zap className="w-5 h-5 text-yellow-500 mr-2" />
                    <span className="text-sm">Calories Burned</span>
                  </div>
                  <span className="font-medium">420 kcal</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Activity className="w-5 h-5 text-blue-500 mr-2" />
                    <span className="text-sm">Steps</span>
                  </div>
                  <span className="font-medium">8,745 steps</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Utensils className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-sm">Calories Consumed</span>
                  </div>
                  <span className="font-medium">1,350 kcal</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Dumbbell className="w-5 h-5 text-purple-500 mr-2" />
                    <span className="text-sm">Active Minutes</span>
                  </div>
                  <span className="font-medium">48 min</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-medium">Water Intake</CardTitle>
              <CardDescription>Daily goal: 8 glasses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-center space-x-2 h-32">
                {[...Array(waterGoal)].map((_, index) => (
                  <div 
                    key={index} 
                    className="w-6 rounded-t-md transition-all duration-300 flex justify-center items-end"
                    style={{ 
                      height: `${100 * ((index < waterIntake ? 1 : 0.15))}%`,
                      backgroundColor: index < waterIntake ? 'rgb(56, 189, 248)' : 'rgb(224, 242, 254)'
                    }}
                  >
                    {index < waterIntake && (
                      <div className="text-white text-xs mb-1">💧</div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <span className="text-sm text-gray-600 dark:text-gray-300 block mb-2">
                  {waterIntake} of {waterGoal} glasses
                </span>
                <Button 
                  onClick={increaseWaterIntake} 
                  variant="outline" 
                  className="text-blue-500 border-blue-300 hover:bg-blue-50 hover:text-blue-600"
                  disabled={waterIntake >= waterGoal}
                >
                  Log water
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1 shadow-md bg-gradient-to-br from-fitness-500/90 to-fitness-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-medium">AI Coach Insights</CardTitle>
              <CardDescription className="text-white/80">Personalized for you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm">Based on your recent activity:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Try a recovery yoga session tomorrow to prevent overtraining</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Consider adding more protein to your breakfast to support muscle recovery</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Your consistency is paying off! You've worked out 4 days in a row</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="col-span-2 shadow-md">
            <CardHeader>
              <CardTitle>Weekly Progress</CardTitle>
              <CardDescription>Track your metrics over time</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="weight">
                <TabsList className="mb-4">
                  <TabsTrigger value="weight">Weight</TabsTrigger>
                  <TabsTrigger value="steps">Steps</TabsTrigger>
                  <TabsTrigger value="calories">Calories</TabsTrigger>
                </TabsList>
                <TabsContent value="weight">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={mockWeightData}>
                        <defs>
                          <linearGradient id="weightColor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#2DD4BF" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#2DD4BF" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis domain={['dataMin - 0.5', 'dataMax + 0.5']} />
                        <Tooltip />
                        <Area 
                          type="monotone" 
                          dataKey="weight" 
                          stroke="#2DD4BF" 
                          fillOpacity={1} 
                          fill="url(#weightColor)"
                          name="Weight (kg)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
                <TabsContent value="steps">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={mockStepsData}>
                        <defs>
                          <linearGradient id="stepsColor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Area 
                          type="monotone" 
                          dataKey="steps" 
                          stroke="#8B5CF6" 
                          fillOpacity={1} 
                          fill="url(#stepsColor)"
                          name="Steps"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
                <TabsContent value="calories">
                  <div className="h-80 flex items-center justify-center">
                    <p className="text-gray-500">Calorie data will appear here</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Today's Workouts</CardTitle>
              <CardDescription>Your personalized plan for April 10</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockWorkouts.map((workout, index) => (
                  <div key={index} className="flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className={`rounded-full w-10 h-10 flex items-center justify-center mr-3 ${
                      workout.type === "HIIT" ? "bg-red-100 text-red-600" :
                      workout.type === "Strength" ? "bg-blue-100 text-blue-600" :
                      "bg-green-100 text-green-600"
                    }`}>
                      <Dumbbell className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-gray-900 dark:text-white">{workout.title}</h4>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{workout.duration}</span>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-gray-500 dark:text-gray-400">{workout.calories} cal</span>
                        <Button variant="ghost" size="sm" className="h-7 text-xs">
                          {workout.completed ? "Completed" : "Start"}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                <Button className="w-full text-sm" variant="outline">View Full Schedule</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Today's Meal Plan</span>
                <Button variant="ghost" size="sm" className="text-sm" onClick={() => setShowFoodLog(true)}>
                  <Plus className="mr-1 h-4 w-4" /> Log Food
                </Button>
              </CardTitle>
              <CardDescription>Nutrition recommendations for your goals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {foodItems.length > 0 ? (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold mb-2">Your Logged Food</h3>
                    {foodItems.map((item, idx) => (
                      <div key={idx} className="flex p-3 mb-2 rounded-lg border border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-900/20">
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
                ) : null}
                
                {mockMeals.map((meal, index) => (
                  <div key={index} className="flex p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="rounded-full w-10 h-10 flex items-center justify-center mr-3 bg-nutrition-100 text-nutrition-600">
                      <Utensils className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">{meal.title}</h4>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{meal.time}</span>
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">{meal.calories} cal</span>
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
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Ask Your AI Fitness Coach</CardTitle>
              <CardDescription>Get personalized fitness and nutrition advice</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[320px] flex flex-col">
                <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                  {chatMessages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.isUser ? 'justify-end' : ''}`}>
                      <div className={`p-3 rounded-lg max-w-[80%] ${
                        msg.isUser 
                          ? 'bg-gray-100 dark:bg-gray-700' 
                          : 'bg-fitness-100 text-fitness-800'
                      }`}>
                        <p className="text-sm">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleChatSubmit} className="relative">
                  <Input
                    type="text"
                    placeholder="Ask me anything about fitness or nutrition..."
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg py-2 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-fitness-500 focus:border-transparent"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                  />
                  <button 
                    type="submit" 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-fitness-500 hover:text-fitness-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
