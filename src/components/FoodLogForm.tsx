
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FoodItem } from '@/hooks/useFoodLog';
import { useToast } from "@/hooks/use-toast";

interface FoodLogFormProps {
  onSubmit: (food: FoodItem) => void;
  onClose: () => void;
}

const FoodLogForm = ({ onSubmit, onClose }: FoodLogFormProps) => {
  const { toast } = useToast();
  const [food, setFood] = useState<FoodItem>({
    name: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    mealType: 'Breakfast'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFood(prev => ({
      ...prev,
      [name]: name === 'name' ? value : Number(value)
    }));
  };

  const handleSelectChange = (value: string) => {
    setFood(prev => ({
      ...prev,
      mealType: value as FoodItem['mealType']
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!food.name) {
      toast({
        title: "Error",
        description: "Please enter a food name",
        variant: "destructive"
      });
      return;
    }
    
    if (food.calories <= 0) {
      toast({
        title: "Error",
        description: "Please enter calories",
        variant: "destructive"
      });
      return;
    }

    onSubmit(food);
    toast({
      title: "Food logged successfully",
      description: `Added ${food.name} to your food log`,
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Food Name</Label>
          <Input 
            id="name" 
            name="name" 
            placeholder="e.g., Grilled Chicken Salad" 
            value={food.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="mealType">Meal Type</Label>
          <Select 
            value={food.mealType} 
            onValueChange={handleSelectChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select meal type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Breakfast">Breakfast</SelectItem>
              <SelectItem value="Lunch">Lunch</SelectItem>
              <SelectItem value="Dinner">Dinner</SelectItem>
              <SelectItem value="Snack">Snack</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="calories">Calories</Label>
          <Input 
            id="calories" 
            name="calories" 
            type="number" 
            placeholder="e.g., 350" 
            value={food.calories || ''}
            onChange={handleChange}
            required
            min="0"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="protein">Protein (g)</Label>
          <Input 
            id="protein" 
            name="protein" 
            type="number" 
            placeholder="e.g., 25" 
            value={food.protein || ''}
            onChange={handleChange}
            min="0"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="carbs">Carbs (g)</Label>
          <Input 
            id="carbs" 
            name="carbs" 
            type="number" 
            placeholder="e.g., 30" 
            value={food.carbs || ''}
            onChange={handleChange}
            min="0"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fat">Fat (g)</Label>
          <Input 
            id="fat" 
            name="fat" 
            type="number" 
            placeholder="e.g., 15" 
            value={food.fat || ''}
            onChange={handleChange}
            min="0"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" type="button" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Save Food</Button>
      </div>
    </form>
  );
};

export default FoodLogForm;
