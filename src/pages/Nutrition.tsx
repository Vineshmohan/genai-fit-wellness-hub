
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Download } from "lucide-react";
import FoodLogForm from '@/components/FoodLogForm';
import { useFoodLog, FoodItem } from '@/hooks/useFoodLog';
import { useToast } from '@/hooks/use-toast';
import { downloadFoodLogReport } from '@/utils/reportUtils';

// Helper to calculate daily totals
const calculateDailyTotals = (items: FoodItem[]) => {
  return items.reduce((acc, item) => {
    return {
      calories: acc.calories + item.calories,
      protein: acc.protein + item.protein,
      carbs: acc.carbs + item.carbs,
      fat: acc.fat + item.fat
    };
  }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
};

// Component to display nutrition macros
const MacroDisplay = ({ title, value, unit }: { title: string, value: number, unit: string }) => (
  <div className="text-center">
    <p className="text-lg font-bold">{value.toFixed(1)}{unit}</p>
    <p className="text-sm text-gray-500">{title}</p>
  </div>
);

const Nutrition = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const { foodItems, isLoading, error, addFoodItem, removeFoodItem, clearFoodLog } = useFoodLog();
  const { toast } = useToast();
  
  // Group food items by meal type
  const groupedFoodItems = foodItems.reduce((acc: Record<string, FoodItem[]>, item) => {
    if (!acc[item.mealType]) {
      acc[item.mealType] = [];
    }
    acc[item.mealType].push(item);
    return acc;
  }, {});
  
  // Calculate daily totals
  const dailyTotals = calculateDailyTotals(foodItems);
  
  const handleAddFood = async (item: FoodItem) => {
    const success = await addFoodItem(item);
    if (success) {
      toast({
        title: "Food added",
        description: `${item.name} added to your food log`,
      });
      setShowAddForm(false);
    } else {
      toast({
        title: "Error",
        description: "Failed to add food item",
        variant: "destructive",
      });
    }
  };
  
  const handleRemoveFood = async (id: string) => {
    const success = await removeFoodItem(id);
    if (success) {
      toast({
        title: "Food removed",
        description: "Item removed from your food log",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to remove food item",
        variant: "destructive",
      });
    }
  };
  
  const handleClearLog = async () => {
    const success = await clearFoodLog();
    if (success) {
      toast({
        title: "Food log cleared",
        description: "All items have been removed from your food log",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to clear food log",
        variant: "destructive",
      });
    }
  };

  const handleDownloadReport = async () => {
    const success = await downloadFoodLogReport();
    if (success) {
      toast({
        title: "Report downloaded",
        description: "Your food log report has been downloaded",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to download report",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-24 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Nutrition Tracker</h1>
        <p className="text-gray-600 dark:text-gray-400">Track your daily food intake and macronutrients</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Summary */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Daily Summary</CardTitle>
            <CardDescription>Your nutritional intake today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <MacroDisplay title="Calories" value={dailyTotals.calories} unit="kcal" />
              <MacroDisplay title="Protein" value={dailyTotals.protein} unit="g" />
              <MacroDisplay title="Carbs" value={dailyTotals.carbs} unit="g" />
              <MacroDisplay title="Fat" value={dailyTotals.fat} unit="g" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              className="text-red-500" 
              onClick={handleClearLog}
              disabled={isLoading || foodItems.length === 0}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear Log
            </Button>
            <Button 
              variant="outline" 
              onClick={handleDownloadReport}
              disabled={isLoading || foodItems.length === 0}
            >
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
          </CardFooter>
        </Card>
        
        {/* Food Log */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Food Log</CardTitle>
              <CardDescription>What you've eaten today</CardDescription>
            </div>
            <Button 
              onClick={() => setShowAddForm(!showAddForm)}
              disabled={isLoading}
            >
              {showAddForm ? 'Cancel' : <><Plus className="mr-2 h-4 w-4" /> Add Food</>}
            </Button>
          </CardHeader>
          
          <CardContent>
            {showAddForm ? (
              <FoodLogForm onSubmit={handleAddFood} onCancel={() => setShowAddForm(false)} />
            ) : (
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-4 w-full justify-start">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="Breakfast">Breakfast</TabsTrigger>
                  <TabsTrigger value="Lunch">Lunch</TabsTrigger>
                  <TabsTrigger value="Dinner">Dinner</TabsTrigger>
                  <TabsTrigger value="Snack">Snack</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all">
                  {isLoading ? (
                    <p className="text-center py-8">Loading food log...</p>
                  ) : foodItems.length === 0 ? (
                    <p className="text-center py-8 text-gray-500">No food items logged today. Add some food to get started!</p>
                  ) : (
                    <div className="space-y-4">
                      {Object.entries(groupedFoodItems).map(([mealType, items]) => (
                        <div key={mealType}>
                          <h3 className="font-medium text-lg mb-2">{mealType}</h3>
                          <div className="space-y-2">
                            {items.map(item => (
                              <div key={item._id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                                <div>
                                  <p className="font-medium">{item.name}</p>
                                  <p className="text-sm text-gray-500">{item.calories} kcal | P: {item.protein}g | C: {item.carbs}g | F: {item.fat}g</p>
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => item._id && handleRemoveFood(item._id)}
                                >
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
                
                {['Breakfast', 'Lunch', 'Dinner', 'Snack'].map((mealType) => (
                  <TabsContent key={mealType} value={mealType}>
                    {isLoading ? (
                      <p className="text-center py-8">Loading food log...</p>
                    ) : !groupedFoodItems[mealType] || groupedFoodItems[mealType].length === 0 ? (
                      <p className="text-center py-8 text-gray-500">No {mealType.toLowerCase()} items logged today.</p>
                    ) : (
                      <div className="space-y-2">
                        {groupedFoodItems[mealType].map(item => (
                          <div key={item._id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-gray-500">{item.calories} kcal | P: {item.protein}g | C: {item.carbs}g | F: {item.fat}g</p>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => item._id && handleRemoveFood(item._id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Nutrition;
