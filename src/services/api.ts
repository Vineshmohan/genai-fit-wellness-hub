// GenAI-Fit API service
// This simulates a real backend but uses MongoDB service
import { mongoDBService, Collections } from './mongodb';

// Mock authentication state (would be JWT in real app)
let isAuthenticated = false;
const mockUsers = [
  { id: 1, email: 'demo@genaifit.com', password: 'password123', name: 'Demo User' }
];

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Initialize database collections
const initializeCollections = async () => {
  // Check if workouts collection exists, if not, create with mock data
  const workoutsResult = await mongoDBService.getCollection(Collections.WORKOUTS);
  if (workoutsResult.success && Array.isArray(workoutsResult.data) && workoutsResult.data.length === 0) {
    // Initialize with mock workouts
    const mockWorkouts = [
      { 
        id: 1, 
        title: 'Full Body HIIT', 
        duration: 30, 
        calories: 350, 
        completed: false,
        exercises: [
          { name: 'Jumping Jacks', sets: 3, reps: 20, rest: 30 },
          { name: 'Push-ups', sets: 3, reps: 12, rest: 45 },
          { name: 'Squats', sets: 3, reps: 15, rest: 45 },
          { name: 'Mountain Climbers', sets: 3, reps: 20, rest: 30 }
        ]
      },
      { 
        id: 2, 
        title: 'Upper Body Focus', 
        duration: 45, 
        calories: 280, 
        completed: false,
        exercises: [
          { name: 'Dumbbell Press', sets: 4, reps: 10, rest: 60 },
          { name: 'Bent Over Rows', sets: 4, reps: 12, rest: 60 },
          { name: 'Tricep Dips', sets: 3, reps: 15, rest: 45 },
          { name: 'Bicep Curls', sets: 3, reps: 12, rest: 45 }
        ]
      },
      { 
        id: 3, 
        title: 'Core Crusher', 
        duration: 20, 
        calories: 180, 
        completed: false,
        exercises: [
          { name: 'Plank', sets: 3, reps: '30 sec', rest: 30 },
          { name: 'Russian Twists', sets: 3, reps: 20, rest: 30 },
          { name: 'Bicycle Crunches', sets: 3, reps: 20, rest: 30 },
          { name: 'Leg Raises', sets: 3, reps: 12, rest: 30 }
        ]
      }
    ];
    
    // Save mock workouts to "database"
    mockWorkouts.forEach(async (workout) => {
      await mongoDBService.insertDocument(Collections.WORKOUTS, workout);
    });
  }
};

// Initialize collections on first load
initializeCollections();

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    await delay(800); // Simulate network delay
    
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      isAuthenticated = true;
      localStorage.setItem('auth_token', 'mock_jwt_token');
      return { success: true, user: { id: user.id, email: user.email, name: user.name } };
    }
    
    return { success: false, message: 'Invalid credentials' };
  },
  
  logout: async () => {
    await delay(300);
    isAuthenticated = false;
    localStorage.removeItem('auth_token');
    return { success: true };
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem('auth_token');
  }
};

// Workouts API
export const workoutsAPI = {
  getWorkouts: async () => {
    await delay(600);
    
    if (!authAPI.isAuthenticated()) {
      return { success: false, message: 'Authentication required' };
    }
    
    return await mongoDBService.getCollection(Collections.WORKOUTS);
  },
  
  getWorkoutById: async (id: number) => {
    await delay(400);
    
    if (!authAPI.isAuthenticated()) {
      return { success: false, message: 'Authentication required' };
    }
    
    const result = await mongoDBService.getCollection(Collections.WORKOUTS);
    if (!result.success) {
      return { success: false, message: 'Failed to fetch workouts' };
    }
    
    const workout = result.data.find((w: any) => w.id === id);
    
    if (workout) {
      return { success: true, data: workout };
    }
    
    return { success: false, message: 'Workout not found' };
  },
  
  updateWorkout: async (id: number, data: any) => {
    await delay(500);
    
    if (!authAPI.isAuthenticated()) {
      return { success: false, message: 'Authentication required' };
    }
    
    const result = await mongoDBService.getCollection(Collections.WORKOUTS);
    if (!result.success) {
      return { success: false, message: 'Failed to fetch workouts' };
    }
    
    const index = result.data.findIndex((w: any) => w.id === id);
    
    if (index !== -1) {
      const workoutId = result.data[index]._id;
      const updateResult = await mongoDBService.updateDocument(
        Collections.WORKOUTS, 
        workoutId, 
        { ...data }
      );
      
      if (updateResult.success) {
        return { success: true, data: updateResult.data };
      }
    }
    
    return { success: false, message: 'Workout not found' };
  }
};

// Nutrition API
export const nutritionAPI = {
  getFoodLog: async () => {
    await delay(600);
    
    if (!authAPI.isAuthenticated()) {
      return { success: false, message: 'Authentication required' };
    }
    
    return await mongoDBService.getCollection(Collections.FOOD_LOGS);
  },
  
  addFoodItem: async (foodItem: any) => {
    await delay(400);
    
    if (!authAPI.isAuthenticated()) {
      return { success: false, message: 'Authentication required' };
    }
    
    const result = await mongoDBService.insertDocument(Collections.FOOD_LOGS, foodItem);
    if (result.success) {
      return await mongoDBService.getCollection(Collections.FOOD_LOGS);
    }
    
    return { success: false, message: 'Failed to add food item' };
  },
  
  removeFoodItem: async (id: string) => {
    await delay(400);
    
    if (!authAPI.isAuthenticated()) {
      return { success: false, message: 'Authentication required' };
    }
    
    const result = await mongoDBService.deleteDocument(Collections.FOOD_LOGS, id);
    if (result.success) {
      return await mongoDBService.getCollection(Collections.FOOD_LOGS);
    }
    
    return { success: false, message: 'Failed to remove food item' };
  }
};

// Export all APIs
export default {
  auth: authAPI,
  workouts: workoutsAPI,
  nutrition: nutritionAPI
};
