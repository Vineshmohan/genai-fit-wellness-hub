
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Dumbbell, Clock, Trash2, Edit, Save, Calendar as CalendarIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface ScheduledWorkout {
  id: number;
  day: string;
  name: string;
  duration: number;
  status: string;
}

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const WORKOUT_TYPES = [
  'Upper Body Focus',
  'Lower Body Focus',
  'Full Body HIIT',
  'Core Crusher',
  'Cardio Blast',
  'Recovery / Light Cardio',
  'Strength Training',
  'Yoga / Flexibility'
];

const SchedulePage = () => {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [schedule, setSchedule] = useState<ScheduledWorkout[]>([
    { id: 1, day: 'MON', name: 'Upper Body Focus', duration: 45, status: 'Scheduled' },
    { id: 2, day: 'WED', name: 'Core Crusher', duration: 30, status: 'Scheduled' },
    { id: 3, day: 'FRI', name: 'Full Body HIIT', duration: 40, status: 'Scheduled' },
    { id: 4, day: 'SUN', name: 'Recovery / Light Cardio', duration: 20, status: 'Scheduled' }
  ]);
  
  const [editingWorkout, setEditingWorkout] = useState<ScheduledWorkout | null>(null);
  const [newWorkout, setNewWorkout] = useState<Partial<ScheduledWorkout>>({
    day: '',
    name: '',
    duration: 30
  });

  const handleEdit = (workout: ScheduledWorkout) => {
    setEditingWorkout(workout);
  };

  const handleSaveEdit = () => {
    if (!editingWorkout) return;
    
    setSchedule(prev => prev.map(w => 
      w.id === editingWorkout.id ? editingWorkout : w
    ));
    
    setEditingWorkout(null);
    
    toast({
      title: "Workout Updated",
      description: "Your scheduled workout has been updated",
    });
  };

  const handleDelete = (id: number) => {
    setSchedule(prev => prev.filter(w => w.id !== id));
    
    toast({
      title: "Workout Removed",
      description: "Your scheduled workout has been removed",
    });
  };

  const handleAddWorkout = () => {
    if (!newWorkout.day || !newWorkout.name) {
      toast({
        title: "Missing Information",
        description: "Please select a day and workout type",
        variant: "destructive"
      });
      return;
    }
    
    // Check if day already has a workout
    const existingDay = schedule.find(w => w.day === newWorkout.day);
    if (existingDay) {
      toast({
        title: "Day Already Scheduled",
        description: `You already have a workout scheduled for ${newWorkout.day}`,
        variant: "destructive"
      });
      return;
    }
    
    const newId = Math.max(0, ...schedule.map(w => w.id)) + 1;
    
    setSchedule(prev => [
      ...prev,
      {
        id: newId,
        day: newWorkout.day!,
        name: newWorkout.name!,
        duration: newWorkout.duration || 30,
        status: 'Scheduled'
      }
    ]);
    
    // Reset form
    setNewWorkout({
      day: '',
      name: '',
      duration: 30
    });
    
    toast({
      title: "Workout Added",
      description: "New workout has been added to your schedule",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="container px-4 py-20 mx-auto max-w-7xl">
        <Card className="border-light bg-yellow-50">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>Please log in to access your schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <p>You need to be logged in to view and manage your workout schedule.</p>
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
    <div className="container px-4 py-20 mx-auto max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Weekly Workout Schedule</h1>
          <p className="text-gray-600">Plan and organize your workout routine</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-4 md:mt-0 bg-fitness-500 hover:bg-fitness-600">
              <Calendar className="mr-2 h-4 w-4" /> Add Workout
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Workout</DialogTitle>
              <DialogDescription>Schedule a new workout for your weekly plan</DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="day">Day of Week</Label>
                <Select
                  value={newWorkout.day}
                  onValueChange={(value) => setNewWorkout({...newWorkout, day: value})}
                >
                  <SelectTrigger id="day">
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    {DAYS.map(day => (
                      <SelectItem key={day} value={day}>{day}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="workoutType">Workout Type</Label>
                <Select
                  value={newWorkout.name}
                  onValueChange={(value) => setNewWorkout({...newWorkout, name: value})}
                >
                  <SelectTrigger id="workoutType">
                    <SelectValue placeholder="Select workout" />
                  </SelectTrigger>
                  <SelectContent>
                    {WORKOUT_TYPES.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={newWorkout.duration}
                  onChange={(e) => setNewWorkout({...newWorkout, duration: parseInt(e.target.value) || 30})}
                  min={5}
                  max={120}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button onClick={handleAddWorkout}>Add to Schedule</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CalendarIcon className="mr-2 h-5 w-5 text-fitness-500" />
            Weekly Schedule
          </CardTitle>
          <CardDescription>Your planned workouts for the week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {DAYS.map(day => {
              const workout = schedule.find(w => w.day === day);
              
              return (
                <div key={day} className="p-4 border rounded-md mb-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-3 w-12 text-center">{day}</Badge>
                      
                      {workout ? (
                        editingWorkout && editingWorkout.id === workout.id ? (
                          <div className="flex items-center space-x-2">
                            <Select
                              value={editingWorkout.name}
                              onValueChange={(value) => setEditingWorkout({...editingWorkout, name: value})}
                            >
                              <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Select workout" />
                              </SelectTrigger>
                              <SelectContent>
                                {WORKOUT_TYPES.map(type => (
                                  <SelectItem key={type} value={type}>{type}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            
                            <Input
                              type="number"
                              className="w-20"
                              value={editingWorkout.duration}
                              onChange={(e) => setEditingWorkout({
                                ...editingWorkout, 
                                duration: parseInt(e.target.value) || 30
                              })}
                              min={5}
                              max={120}
                            />
                            <span className="text-sm text-gray-500">min</span>
                          </div>
                        ) : (
                          <div>
                            <span className="font-medium">{workout.name}</span>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <Clock className="h-3 w-3 mr-1" />
                              {workout.duration} minutes
                              <Dumbbell className="h-3 w-3 ml-3 mr-1" />
                              <Badge variant="secondary" className="text-xs">
                                {workout.status}
                              </Badge>
                            </div>
                          </div>
                        )
                      ) : (
                        <span className="text-gray-500">No workout scheduled</span>
                      )}
                    </div>
                    
                    {workout && (
                      <div className="flex space-x-2">
                        {editingWorkout && editingWorkout.id === workout.id ? (
                          <Button size="sm" variant="default" onClick={handleSaveEdit}>
                            <Save className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline" onClick={() => handleEdit(workout)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleDelete(workout.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
        <CardFooter className="justify-between">
          <Button 
            variant="outline" 
            onClick={() => window.location.href = '/workouts'}
          >
            Back to Workouts
          </Button>
          <Button 
            className="bg-fitness-500 hover:bg-fitness-600"
            onClick={() => {
              toast({
                title: "Schedule Saved",
                description: "Your workout schedule has been saved successfully",
              });
            }}
          >
            Save Schedule
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SchedulePage;
