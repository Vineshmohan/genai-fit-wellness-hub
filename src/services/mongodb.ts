
// MongoDB simulation service for browser environment
import { v4 as uuidv4 } from 'uuid';

// Database collections
export enum Collections {
  USERS = "users",
  WORKOUTS = "workouts",
  FOOD_LOGS = "food_logs",
  MEAL_PLANS = "meal_plans",
  SCHEDULES = "schedules",
}

// MongoDB service with simulated connection for browser
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
      const newDoc = { ...document, _id: uuidv4() };
      
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
      return { success: true, data: filteredData };
    } catch (error) {
      console.error(`Error deleting from ${collectionName}:`, error);
      return { success: false, message: `Failed to delete from ${collectionName}` };
    }
  }
};
