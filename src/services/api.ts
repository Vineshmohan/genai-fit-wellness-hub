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
  // Check if users collection exists, if not, create with mock data
  const usersResult = await mongoDBService.getCollection(Collections.USERS);
  if (usersResult.success && Array.isArray(usersResult.data) && usersResult.data.length === 0) {
    // Initialize with mock user
    await mongoDBService.insertDocument(Collections.USERS, { 
      id: 1, 
      email: 'demo@genaifit.com', 
      password: 'password123', 
      name: 'Demo User' 
    });
  }

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
    
    // Get users from database
    const usersResult = await mongoDBService.getCollection(Collections.USERS);
    if (!usersResult.success) {
      return { success: false, message: 'Failed to fetch users' };
    }
    
    const user = usersResult.data.find((u: any) => u.email === email && u.password === password);
    
    if (user) {
      isAuthenticated = true;
      localStorage.setItem('auth_token', 'mock_jwt_token');
      return { success: true, user: { id: user.id, email: user.email, name: user.name } };
    }
    
    return { success: false, message: 'Invalid credentials' };
  },
  
  signup: async (name: string, email: string, password: string) => {
    await delay(800); // Simulate network delay
    
    // Check if email already exists
    const usersResult = await mongoDBService.getCollection(Collections.USERS);
    if (!usersResult.success) {
      return { success: false, message: 'Failed to check existing users' };
    }
    
    const existingUser = usersResult.data.find((u: any) => u.email === email);
    if (existingUser) {
      return { success: false, message: 'Email already in use' };
    }
    
    // Create a new user
    const newUser = {
      id: Date.now(), // Simple way to generate unique IDs
      email,
      password,
      name
    };
    
    // Store in database
    const result = await mongoDBService.insertDocument(Collections.USERS, newUser);
    if (!result.success) {
      return { success: false, message: 'Failed to create user account' };
    }
    
    isAuthenticated = true;
    localStorage.setItem('auth_token', 'mock_jwt_token');
    
    return { 
      success: true, 
      user: { id: newUser.id, email: newUser.email, name: newUser.name } 
    };
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
      return result;
    }
    
    return { success: false, message: 'Failed to remove food item' };
  }
};

// Schedule API
export const scheduleAPI = {
  getSchedule: async () => {
    await delay(600);
    
    if (!authAPI.isAuthenticated()) {
      return { success: false, message: 'Authentication required' };
    }
    
    return await mongoDBService.getCollection(Collections.SCHEDULES);
  },
  
  addScheduleItem: async (item: any) => {
    await delay(400);
    
    if (!authAPI.isAuthenticated()) {
      return { success: false, message: 'Authentication required' };
    }
    
    const result = await mongoDBService.insertDocument(Collections.SCHEDULES, item);
    if (result.success) {
      return await mongoDBService.getCollection(Collections.SCHEDULES);
    }
    
    return { success: false, message: 'Failed to add schedule item' };
  },
  
  removeScheduleItem: async (id: string) => {
    await delay(400);
    
    if (!authAPI.isAuthenticated()) {
      return { success: false, message: 'Authentication required' };
    }
    
    const result = await mongoDBService.deleteDocument(Collections.SCHEDULES, id);
    if (result.success) {
      return result;
    }
    
    return { success: false, message: 'Failed to remove schedule item' };
  },
  
  updateScheduleItem: async (id: string, data: any) => {
    await delay(500);
    
    if (!authAPI.isAuthenticated()) {
      return { success: false, message: 'Authentication required' };
    }
    
    const result = await mongoDBService.updateDocument(Collections.SCHEDULES, id, data);
    if (result.success) {
      return { success: true, data: result.data };
    }
    
    return { success: false, message: 'Failed to update schedule item' };
  }
};

// Meal Plan API
export const mealPlanAPI = {
  getMealPlan: async () => {
    await delay(600);
    
    if (!authAPI.isAuthenticated()) {
      return { success: false, message: 'Authentication required' };
    }
    
    return await mongoDBService.getCollection(Collections.MEAL_PLANS);
  },
  
  addMealPlanItem: async (item: any) => {
    await delay(400);
    
    if (!authAPI.isAuthenticated()) {
      return { success: false, message: 'Authentication required' };
    }
    
    const result = await mongoDBService.insertDocument(Collections.MEAL_PLANS, item);
    if (result.success) {
      return await mongoDBService.getCollection(Collections.MEAL_PLANS);
    }
    
    return { success: false, message: 'Failed to add meal plan item' };
  },
  
  removeMealPlanItem: async (id: string) => {
    await delay(400);
    
    if (!authAPI.isAuthenticated()) {
      return { success: false, message: 'Authentication required' };
    }
    
    const result = await mongoDBService.deleteDocument(Collections.MEAL_PLANS, id);
    if (result.success) {
      return result;
    }
    
    return { success: false, message: 'Failed to remove meal plan item' };
  }
};

// Export all APIs
export default {
  auth: authAPI,
  workouts: workoutsAPI,
  nutrition: nutritionAPI,
  schedule: scheduleAPI,
  mealPlan: mealPlanAPI
};
