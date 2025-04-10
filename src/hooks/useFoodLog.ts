
import { useState, useEffect } from 'react';

export interface FoodItem {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
}

export const useFoodLog = () => {
  // Load food items from localStorage on initial render
  const [foodItems, setFoodItems] = useState<FoodItem[]>(() => {
    const savedItems = localStorage.getItem('foodItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  // Save to localStorage whenever foodItems changes
  useEffect(() => {
    localStorage.setItem('foodItems', JSON.stringify(foodItems));
  }, [foodItems]);

  const addFoodItem = (item: FoodItem) => {
    setFoodItems(prev => [item, ...prev]);
  };

  const removeFoodItem = (index: number) => {
    setFoodItems(prev => prev.filter((_, i) => i !== index));
  };

  const clearFoodLog = () => {
    setFoodItems([]);
  };

  return {
    foodItems,
    addFoodItem,
    removeFoodItem,
    clearFoodLog
  };
};
