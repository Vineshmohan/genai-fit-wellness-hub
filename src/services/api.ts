
// Simulated API service for GenAI-Fit
// In a real application, this would connect to an actual backend

// Mock authentication state
let isAuthenticated = false;
const mockUsers = [
  { id: 1, email: 'demo@genaifit.com', password: 'password123', name: 'Demo User' }
];

// Mock workout data
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

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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
    
    return { success: true, data: mockWorkouts };
  },
  
  getWorkoutById: async (id: number) => {
    await delay(400);
    
    if (!authAPI.isAuthenticated()) {
      return { success: false, message: 'Authentication required' };
    }
    
    const workout = mockWorkouts.find(w => w.id === id);
    
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
    
    const index = mockWorkouts.findIndex(w => w.id === id);
    
    if (index !== -1) {
      mockWorkouts[index] = { ...mockWorkouts[index], ...data };
      return { success: true, data: mockWorkouts[index] };
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
    
    // This would normally fetch from a database but we're using localStorage for this demo
    const storedItems = localStorage.getItem('foodItems');
    const foodItems = storedItems ? JSON.parse(storedItems) : [];
    
    return { success: true, data: foodItems };
  },
  
  addFoodItem: async (foodItem: any) => {
    await delay(400);
    
    if (!authAPI.isAuthenticated()) {
      return { success: false, message: 'Authentication required' };
    }
    
    // Get existing items
    const storedItems = localStorage.getItem('foodItems');
    const foodItems = storedItems ? JSON.parse(storedItems) : [];
    
    // Add new item
    const updatedItems = [foodItem, ...foodItems];
    localStorage.setItem('foodItems', JSON.stringify(updatedItems));
    
    return { success: true, data: updatedItems };
  },
  
  removeFoodItem: async (index: number) => {
    await delay(400);
    
    if (!authAPI.isAuthenticated()) {
      return { success: false, message: 'Authentication required' };
    }
    
    // Get existing items
    const storedItems = localStorage.getItem('foodItems');
    const foodItems = storedItems ? JSON.parse(storedItems) : [];
    
    // Remove item
    const updatedItems = foodItems.filter((_: any, i: number) => i !== index);
    localStorage.setItem('foodItems', JSON.stringify(updatedItems));
    
    return { success: true, data: updatedItems };
  }
};
