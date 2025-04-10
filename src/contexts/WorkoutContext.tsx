
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { workoutsAPI } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

interface Exercise {
  name: string;
  sets: number;
  reps: number | string;
  rest: number;
}

interface Workout {
  id: number;
  title: string;
  duration: number;
  calories: number;
  completed: boolean;
  exercises: Exercise[];
}

interface WorkoutContextType {
  workouts: Workout[];
  isLoading: boolean;
  error: string | null;
  refreshWorkouts: () => Promise<void>;
  startWorkout: (id: number) => Promise<void>;
  completeWorkout: (id: number) => Promise<void>;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const refreshWorkouts = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await workoutsAPI.getWorkouts();
      
      if (response.success) {
        setWorkouts(response.data);
      } else {
        setError(response.message || 'Failed to load workouts');
        toast({
          title: 'Error',
          description: response.message || 'Failed to load workouts',
          variant: 'destructive',
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const startWorkout = async (id: number) => {
    try {
      toast({
        title: 'Workout Started',
        description: 'Your workout timer has begun. Good luck!',
      });
      
      // In a real app, this would start a timer and connect to a backend API
      console.log(`Starting workout ${id}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to start workout';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  const completeWorkout = async (id: number) => {
    try {
      const response = await workoutsAPI.updateWorkout(id, { completed: true });
      
      if (response.success) {
        setWorkouts(workouts.map(workout => 
          workout.id === id ? { ...workout, completed: true } : workout
        ));
        
        toast({
          title: 'Workout Completed',
          description: 'Great job! Your progress has been recorded.',
        });
      } else {
        throw new Error(response.message || 'Failed to complete workout');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  // Load workouts on component mount
  useEffect(() => {
    refreshWorkouts();
  }, []);

  return (
    <WorkoutContext.Provider value={{ 
      workouts, 
      isLoading, 
      error,
      refreshWorkouts,
      startWorkout,
      completeWorkout
    }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkouts = () => {
  const context = useContext(WorkoutContext);
  
  if (context === undefined) {
    throw new Error('useWorkouts must be used within a WorkoutProvider');
  }
  
  return context;
};
