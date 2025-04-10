
import { useState } from 'react';

export interface FoodItem {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
}

export const useFoodLog = () => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);

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
