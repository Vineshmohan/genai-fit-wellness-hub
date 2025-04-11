
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';

// This would come from environment variables in a real app
const MONGODB_URI = "mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority";
const DB_NAME = "genai_fit";

// Create a MongoClient instance
const client = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Database collections
export enum Collections {
  USERS = "users",
  WORKOUTS = "workouts",
  FOOD_LOGS = "food_logs",
  MEAL_PLANS = "meal_plans",
  SCHEDULES = "schedules",
}

// Connect to MongoDB
async function connectDB() {
  try {
    // For demo purposes, we're using simulated connection
    // In production, you would actually connect:
    // await client.connect();
    console.log("Simulated MongoDB connection successful");
    return client.db(DB_NAME);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    // Fallback to mock data
    return null;
  }
}

// MongoDB service with simulated connection for demo
export const mongoDBService = {
  // Get collection data (simulated)
  getCollection: async (collectionName: Collections) => {
    try {
      // Simulate DB connection delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Get data from localStorage as fallback/simulation
      const data = localStorage.getItem(collectionName) || "[]";
      return { success: true, data: JSON.parse(data) };
    } catch (error) {
      console.error(`Error getting collection ${collectionName}:`, error);
      return { success: false, message: `Failed to fetch ${collectionName}` };
    }
  },

  // Insert document (simulated)
  insertDocument: async (collectionName: Collections, document: any) => {
    try {
      // Simulate DB connection delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Add _id to simulate MongoDB document
      const newDoc = { ...document, _id: new ObjectId().toString() };
      
      // Save to localStorage for simulation
      const existingData = localStorage.getItem(collectionName) || "[]";
      const parsedData = JSON.parse(existingData);
      localStorage.setItem(collectionName, JSON.stringify([newDoc, ...parsedData]));
      
      return { success: true, data: newDoc };
    } catch (error) {
      console.error(`Error inserting into ${collectionName}:`, error);
      return { success: false, message: `Failed to insert into ${collectionName}` };
    }
  },

  // Update document (simulated)
  updateDocument: async (collectionName: Collections, id: string, update: any) => {
    try {
      // Simulate DB connection delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update in localStorage
      const existingData = localStorage.getItem(collectionName) || "[]";
      const parsedData = JSON.parse(existingData);
      const updatedData = parsedData.map((item: any) => 
        item._id === id ? { ...item, ...update } : item
      );
      
      localStorage.setItem(collectionName, JSON.stringify(updatedData));
      return { success: true, data: updatedData.find((item: any) => item._id === id) };
    } catch (error) {
      console.error(`Error updating in ${collectionName}:`, error);
      return { success: false, message: `Failed to update in ${collectionName}` };
    }
  },

  // Delete document (simulated)
  deleteDocument: async (collectionName: Collections, id: string) => {
    try {
      // Simulate DB connection delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Delete from localStorage
      const existingData = localStorage.getItem(collectionName) || "[]";
      const parsedData = JSON.parse(existingData);
      const filteredData = parsedData.filter((item: any) => item._id !== id);
      
      localStorage.setItem(collectionName, JSON.stringify(filteredData));
      return { success: true };
    } catch (error) {
      console.error(`Error deleting from ${collectionName}:`, error);
      return { success: false, message: `Failed to delete from ${collectionName}` };
    }
  }
};
