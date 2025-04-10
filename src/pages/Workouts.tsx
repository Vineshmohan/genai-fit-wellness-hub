
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dumbbell, Calendar, Clock, Flame } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface WorkoutItem {
  id: number;
  title: string;
  duration: string;
  calories: number;
  completed: boolean;
  type: string;
  description: string;
}

const Workouts = () => {
  const { toast } = useToast();
  const [workouts, setWorkouts] = useState<WorkoutItem[]>([
    {
      id: 1,
      title: "Full Body HIIT",
      duration: "30 min",
      calories: 320,
      completed: false,
      type: "HIIT",
      description: "High-intensity interval training that targets all major muscle groups."
    },
    {
      id: 2,
      title: "Upper Body Strength",
      duration: "45 min",
      calories: 280,
      completed: false,
      type: "Strength",
      description: "Focus on chest, back, shoulders, and arms with progressive resistance."
    },
    {
      id: 3,
      title: "Morning Yoga Flow",
      duration: "20 min",
      calories: 150,
      completed: false,
      type: "Yoga",
      description: "Gentle flow to improve flexibility, balance, and mindfulness."
    },
    {
      id: 4,
      title: "Lower Body Power",
      duration: "40 min",
      calories: 350,
      completed: false,
      type: "Strength",
      description: "Target legs, glutes, and core with compound movements."
    },
    {
      id: 5,
      title: "Cardio Blast",
      duration: "25 min",
      calories: 290,
      completed: false,
      type: "Cardio",
      description: "High-energy cardio session to boost endurance and burn calories."
    }
  ]);

  const startWorkout = (id: number) => {
    toast({
      title: "Workout Started",
      description: "Your workout timer has begun. Good luck!",
    });
    
    // In a real app, this would start a timer and perhaps connect to wearable devices
    console.log(`Starting workout ${id}`);
  };

  const completeWorkout = (id: number) => {
    setWorkouts(workouts.map(workout => 
      workout.id === id ? { ...workout, completed: true } : workout
    ));
    
    toast({
      title: "Workout Completed",
      description: "Great job! Your progress has been recorded.",
    });
  };

  const getTodaysDate = () => {
    const date = new Date();
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your Workout Plan</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Personalized training for your goals</p>
        </div>

        <div className="mb-8">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-fitness-500" />
                Today's Workouts
              </CardTitle>
              <CardDescription>{getTodaysDate()}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workouts.map((workout) => (
                  <div key={workout.id} className="flex flex-col sm:flex-row sm:items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className={`rounded-full w-10 h-10 flex items-center justify-center mb-3 sm:mb-0 mr-0 sm:mr-4 ${
                      workout.type === "HIIT" ? "bg-red-100 text-red-600" :
                      workout.type === "Strength" ? "bg-blue-100 text-blue-600" :
                      workout.type === "Yoga" ? "bg-green-100 text-green-600" :
                      "bg-purple-100 text-purple-600"
                    }`}>
                      <Dumbbell className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">{workout.title}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{workout.description}</p>
                        </div>
                        <div className="flex items-center mt-2 sm:mt-0 space-x-2">
                          <div className="flex items-center text-gray-500 dark:text-gray-400">
                            <Clock className="h-4 w-4 mr-1" />
                            <span className="text-xs">{workout.duration}</span>
                          </div>
                          <div className="flex items-center text-gray-500 dark:text-gray-400">
                            <Flame className="h-4 w-4 mr-1" />
                            <span className="text-xs">{workout.calories} cal</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end mt-3 space-x-2">
                        {!workout.completed ? (
                          <Button 
                            variant="default" 
                            size="sm" 
                            className="bg-fitness-500 hover:bg-fitness-600"
                            onClick={() => startWorkout(workout.id)}
                          >
                            Start
                          </Button>
                        ) : null}
                        {!workout.completed ? (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => completeWorkout(workout.id)}
                          >
                            Complete
                          </Button>
                        ) : (
                          <Button variant="ghost" size="sm" className="text-green-600" disabled>
                            Completed
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Weekly Plan</CardTitle>
              <CardDescription>Your upcoming workouts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Tomorrow</h3>
                  <div className="flex items-center">
                    <div className="rounded-full w-8 h-8 flex items-center justify-center mr-2 bg-purple-100 text-purple-600">
                      <Dumbbell className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Core Strength & Stability</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">35 min • 260 cal</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Day After Tomorrow</h3>
                  <div className="flex items-center">
                    <div className="rounded-full w-8 h-8 flex items-center justify-center mr-2 bg-blue-100 text-blue-600">
                      <Dumbbell className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">HIIT Cardio Mix</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">25 min • 310 cal</p>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full" variant="outline">View Full Schedule</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Weekly Progress</CardTitle>
              <CardDescription>Your workout consistency</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-7 gap-1 text-center">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                    <div key={i} className="text-xs font-medium text-gray-500 dark:text-gray-400">{day}</div>
                  ))}
                  
                  {[true, true, true, false, false, null, null].map((completed, i) => (
                    <div key={i} className={`h-8 rounded-md flex items-center justify-center ${
                      completed === true ? 'bg-fitness-500 text-white' : 
                      completed === false ? 'bg-gray-200 dark:bg-gray-700' : 
                      'border border-dashed border-gray-300 dark:border-gray-600'
                    }`}>
                      {completed === true && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="pt-4">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Week's Stats</p>
                  <div className="mt-2 grid grid-cols-3 gap-2 text-center">
                    <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Workouts</p>
                      <p className="text-lg font-bold text-fitness-600">3/7</p>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Minutes</p>
                      <p className="text-lg font-bold text-fitness-600">95</p>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Calories</p>
                      <p className="text-lg font-bold text-fitness-600">750</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Workouts;
