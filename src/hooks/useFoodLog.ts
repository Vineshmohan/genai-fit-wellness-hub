
import { useState, useEffect } from 'react';
import { nutritionAPI } from '../services/api';
import { mongoDBService, Collections } from '@/services/mongodb';

export interface FoodItem {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  _id?: string;
}

export const useFoodLog = () => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch food items from database on initial render
  useEffect(() => {
    const fetchFoodItems = async () => {
      setIsLoading(true);
      try {
        const response = await nutritionAPI.getFoodLog();
        if (response.success) {
          setFoodItems(response.data);
          setError(null);
        } else {
          setError(response.message || 'Failed to load food log');
          setFoodItems([]);
        }
      } catch (err) {
        setError('An error occurred while fetching food log');
        setFoodItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFoodItems();
  }, []);

  const addFoodItem = async (item: FoodItem) => {
    try {
      const response = await nutritionAPI.addFoodItem(item);
      if (response.success) {
        setFoodItems(response.data);
        return true;
      } else {
        setError(response.message || 'Failed to add food item');
        return false;
      }
    } catch (err) {
      setError('An error occurred while adding food item');
      return false;
    }
  };

  const removeFoodItem = async (id: string) => {
    try {
      const response = await nutritionAPI.removeFoodItem(id);
      if (response.success) {
        setFoodItems(response.data);
        return true;
      } else {
        setError(response.message || 'Failed to remove food item');
        return false;
      }
    } catch (err) {
      setError('An error occurred while removing food item');
      return false;
    }
  };

  const clearFoodLog = async () => {
    try {
      // Remove each item one by one
      const currentItems = [...foodItems];
      for (const item of currentItems) {
        if (item._id) {
          await nutritionAPI.removeFoodItem(item._id);
        }
      }
      
      // Clear the state
      setFoodItems([]);
      // Verify the collection is empty in the database
      await mongoDBService.getCollection(Collections.FOOD_LOGS);
      
      return true;
    } catch (err) {
      setError('An error occurred while clearing food log');
      return false;
    }
  };

  return {
    foodItems,
    isLoading,
    error,
    addFoodItem,
    removeFoodItem,
    clearFoodLog
  };
};
