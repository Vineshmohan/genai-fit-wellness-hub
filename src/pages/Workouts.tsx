import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Dumbbell, Flame } from "lucide-react";
import { WorkoutProvider, useWorkouts } from "@/contexts/WorkoutContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";

const WorkoutSchedule = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Calendar className="mr-2 h-5 w-5 text-fitness-500" />
        <h3 className="text-lg font-medium">Weekly Schedule</h3>
      </div>
      
      <div className="grid gap-2">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center">
            <Badge variant="outline" className="mr-2">MON</Badge>
            <span className="font-medium">Upper Body Focus</span>
          </div>
          <Badge variant="secondary">Scheduled</Badge>
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center">
            <Badge variant="outline" className="mr-2">WED</Badge>
            <span className="font-medium">Core Crusher</span>
          </div>
          <Badge variant="secondary">Scheduled</Badge>
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center">
            <Badge variant="outline" className="mr-2">FRI</Badge>
            <span className="font-medium">Full Body HIIT</span>
          </div>
          <Badge variant="secondary">Scheduled</Badge>
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center">
            <Badge variant="outline" className="mr-2">SUN</Badge>
            <span className="font-medium">Recovery / Light Cardio</span>
          </div>
          <Badge variant="secondary">Scheduled</Badge>
        </div>
      </div>
    </div>
  );
};

const WorkoutList = () => {
  const { workouts, isLoading, error, startWorkout, completeWorkout } = useWorkouts();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <Card key={i} className="border-light">
            <CardHeader className="pb-2">
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-1/3" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-20 w-full" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-light bg-red-50">
        <CardHeader>
          <CardTitle>Error</CardTitle>
          <CardDescription>Failed to load workouts</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{error}</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" onClick={() => window.location.reload()}>Try Again</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {workouts.map((workout) => (
        <Card key={workout.id} className={`border-light ${workout.completed ? 'bg-gray-50' : ''}`}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle>{workout.title}</CardTitle>
              {workout.completed && (
                <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">Completed</Badge>
              )}
            </div>
            <CardDescription className="flex items-center mt-1">
              <Clock className="h-4 w-4 mr-1" />
              {workout.duration} minutes
              <Flame className="h-4 w-4 ml-3 mr-1" />
              {workout.calories} calories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-32 rounded-md border p-2">
              <div className="space-y-2">
                {workout.exercises.map((exercise, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Dumbbell className="h-4 w-4 mr-2 text-fitness-500" />
                      <span>{exercise.name}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {exercise.sets} sets × {exercise.reps} reps
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="pt-0">
            {workout.completed ? (
              <Button variant="outline" className="w-full" disabled>
                Completed
              </Button>
            ) : (
              <div className="flex space-x-2 w-full">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => startWorkout(workout.id)}
                >
                  Start
                </Button>
                <Button 
                  className="flex-1 bg-fitness-500 hover:bg-fitness-600"
                  onClick={() => completeWorkout(workout.id)}
                >
                  Complete
                </Button>
              </div>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

const WorkoutsContent = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="container px-4 py-6 mx-auto max-w-7xl">
        <Card className="border-light bg-yellow-50">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>Please log in to access your workouts</CardDescription>
          </CardHeader>
          <CardContent>
            <p>You need to be logged in to view and manage your workouts.</p>
          </CardContent>
          <CardFooter>
            <Button variant="default" className="bg-fitness-500 hover:bg-fitness-600" onClick={() => window.location.href = '/login'}>
              Go to Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container px-4 py-6 mx-auto max-w-7xl">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-3/4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">My Workouts</h1>
            <p className="text-gray-600">Track your fitness journey and stay on target</p>
          </div>
          
          <Tabs defaultValue="today" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="all">All Workouts</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            
            <TabsContent value="today" className="space-y-4">
              <WorkoutList />
            </TabsContent>
            
            <TabsContent value="all" className="space-y-4">
              <WorkoutList />
            </TabsContent>
            
            <TabsContent value="completed" className="space-y-4">
              <WorkoutList />
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="md:w-1/4">
          <Card className="border-light">
            <CardHeader>
              <CardTitle>Weekly Plan</CardTitle>
              <CardDescription>Your scheduled workouts</CardDescription>
            </CardHeader>
            <CardContent>
              <WorkoutSchedule />
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => window.location.href = '/schedule'}
              >
                Edit Schedule
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

const Workouts = () => {
  return (
    <WorkoutProvider>
      <WorkoutsContent />
    </WorkoutProvider>
  );
};

export default Workouts;
