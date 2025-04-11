
// Report generation utilities
import { FoodItem } from '@/hooks/useFoodLog';
import { Collections, mongoDBService } from '@/services/mongodb';

// Report types
export type ReportType = 'food-log' | 'workouts' | 'schedule';

// Format date for filename
const formatDateForFilename = (date: Date = new Date()): string => {
  return date.toISOString().split('T')[0];
};

// Generate CSV content from food log
const generateFoodLogCsv = (foodItems: FoodItem[]): string => {
  // CSV header
  const header = ['Name', 'Meal Type', 'Calories', 'Protein (g)', 'Carbs (g)', 'Fat (g)'].join(',');
  
  // CSV rows
  const rows = foodItems.map(item => {
    return [
      `"${item.name}"`, // Quote names to handle commas in food names
      item.mealType,
      item.calories,
      item.protein, 
      item.carbs,
      item.fat
    ].join(',');
  });
  
  // Combine header and rows
  return [header, ...rows].join('\n');
};

// Download data as a file
export const downloadAsFile = (data: string, filename: string, type: string): void => {
  // Create a blob with the data
  const blob = new Blob([data], { type });
  
  // Create a URL for the blob
  const url = URL.createObjectURL(blob);
  
  // Create a temporary link element
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  
  // Append to the body, click, and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Release the object URL
  URL.revokeObjectURL(url);
};

// Generate and download food log report
export const downloadFoodLogReport = async (): Promise<boolean> => {
  try {
    // Fetch food log data from MongoDB service
    const result = await mongoDBService.getCollection(Collections.FOOD_LOGS);
    
    if (result.success && Array.isArray(result.data)) {
      // Generate CSV content
      const csvContent = generateFoodLogCsv(result.data);
      
      // Generate filename with current date
      const filename = `food-log-report-${formatDateForFilename()}.csv`;
      
      // Download the file
      downloadAsFile(csvContent, filename, 'text/csv');
      
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error generating food log report:', error);
    return false;
  }
};

// Generate and download workout report
export const downloadWorkoutReport = async (): Promise<boolean> => {
  try {
    // Fetch workouts data from MongoDB service
    const result = await mongoDBService.getCollection(Collections.WORKOUTS);
    
    if (result.success && Array.isArray(result.data)) {
      // Convert to JSON string
      const jsonContent = JSON.stringify(result.data, null, 2);
      
      // Generate filename with current date
      const filename = `workout-report-${formatDateForFilename()}.json`;
      
      // Download the file
      downloadAsFile(jsonContent, filename, 'application/json');
      
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error generating workout report:', error);
    return false;
  }
};

// Generate and download schedule report
export const downloadScheduleReport = async (): Promise<boolean> => {
  try {
    // Fetch schedule data from MongoDB service
    const result = await mongoDBService.getCollection(Collections.SCHEDULES);
    
    if (result.success && Array.isArray(result.data)) {
      // Convert to JSON string
      const jsonContent = JSON.stringify(result.data, null, 2);
      
      // Generate filename with current date
      const filename = `schedule-report-${formatDateForFilename()}.json`;
      
      // Download the file
      downloadAsFile(jsonContent, filename, 'application/json');
      
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error generating schedule report:', error);
    return false;
  }
};
