
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Camera, ChevronLeft, ChevronRight } from 'lucide-react';

const ProfileSetup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState('basics');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [profileData, setProfileData] = useState({
    // Basic Info
    age: '',
    gender: '',
    height: '',
    weight: '',
    // Goals
    fitnessGoal: '',
    activityLevel: '',
    // Preferences
    dietaryPreference: '',
    allergies: '',
    // Traits
    geneticTraits: [] as string[],
    // Image
    profileImage: null as File | null,
    profileImagePreview: '',
  });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  // Handle dropdown changes
  const handleSelectChange = (name: string, value: string) => {
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  // Handle radio changes
  const handleRadioChange = (name: string, value: string) => {
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  // Handle checkbox (trait) changes
  const handleTraitChange = (trait: string) => {
    setProfileData({
      ...profileData,
      geneticTraits: profileData.geneticTraits.includes(trait)
        ? profileData.geneticTraits.filter(t => t !== trait)
        : [...profileData.geneticTraits, trait],
    });
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileData({
        ...profileData,
        profileImage: file,
        profileImagePreview: URL.createObjectURL(file),
      });
    }
  };

  // Navigate to next step
  const goToNextStep = () => {
    if (currentStep === 'basics') setCurrentStep('goals');
    else if (currentStep === 'goals') setCurrentStep('preferences');
    else if (currentStep === 'preferences') setCurrentStep('traits');
    else if (currentStep === 'traits') setCurrentStep('photo');
  };

  // Navigate to previous step
  const goToPreviousStep = () => {
    if (currentStep === 'goals') setCurrentStep('basics');
    else if (currentStep === 'preferences') setCurrentStep('goals');
    else if (currentStep === 'traits') setCurrentStep('preferences');
    else if (currentStep === 'photo') setCurrentStep('traits');
  };

  // Complete profile setup
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Profile setup complete",
        description: "Your personalized fitness journey starts now!",
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Profile setup failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Set Up Your Profile</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Let's personalize your fitness experience
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
          <Tabs value={currentStep} className="w-full">
            <TabsList className="grid grid-cols-5 mb-8">
              <TabsTrigger value="basics" disabled>Basic Info</TabsTrigger>
              <TabsTrigger value="goals" disabled>Goals</TabsTrigger>
              <TabsTrigger value="preferences" disabled>Preferences</TabsTrigger>
              <TabsTrigger value="traits" disabled>Traits</TabsTrigger>
              <TabsTrigger value="photo" disabled>Photo</TabsTrigger>
            </TabsList>

            <TabsContent value="basics" className="space-y-6">
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  placeholder="Enter your age"
                  className="input-field mt-1"
                  value={profileData.age}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label>Gender</Label>
                <RadioGroup 
                  value={profileData.gender}
                  onValueChange={(value) => handleRadioChange('gender', value)}
                  className="flex space-x-4 mt-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    name="height"
                    type="number"
                    placeholder="Height in cm"
                    className="input-field mt-1"
                    value={profileData.height}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    name="weight"
                    type="number"
                    placeholder="Weight in kg"
                    className="input-field mt-1"
                    value={profileData.weight}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <Button 
                  onClick={goToNextStep}
                  className="bg-fitness-500 hover:bg-fitness-600"
                >
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="goals" className="space-y-6">
              <div>
                <Label htmlFor="fitnessGoal">What is your primary fitness goal?</Label>
                <Select 
                  value={profileData.fitnessGoal}
                  onValueChange={(value) => handleSelectChange('fitnessGoal', value)}
                >
                  <SelectTrigger className="input-field mt-1">
                    <SelectValue placeholder="Select your goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weight-loss">Weight Loss</SelectItem>
                    <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="endurance">Endurance</SelectItem>
                    <SelectItem value="flexibility">Flexibility</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="activityLevel">How active are you currently?</Label>
                <Select 
                  value={profileData.activityLevel}
                  onValueChange={(value) => handleSelectChange('activityLevel', value)}
                >
                  <SelectTrigger className="input-field mt-1">
                    <SelectValue placeholder="Select activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary (little to no exercise)</SelectItem>
                    <SelectItem value="light">Lightly active (light exercise 1-3 days/week)</SelectItem>
                    <SelectItem value="moderate">Moderately active (moderate exercise 3-5 days/week)</SelectItem>
                    <SelectItem value="very">Very active (hard exercise 6-7 days/week)</SelectItem>
                    <SelectItem value="extreme">Extremely active (very hard exercise & physical job)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-between mt-8">
                <Button 
                  onClick={goToPreviousStep}
                  variant="outline"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button 
                  onClick={goToNextStep}
                  className="bg-fitness-500 hover:bg-fitness-600"
                >
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-6">
              <div>
                <Label htmlFor="dietaryPreference">Dietary Preference</Label>
                <Select 
                  value={profileData.dietaryPreference}
                  onValueChange={(value) => handleSelectChange('dietaryPreference', value)}
                >
                  <SelectTrigger className="input-field mt-1">
                    <SelectValue placeholder="Select dietary preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="omnivore">Omnivore (No restrictions)</SelectItem>
                    <SelectItem value="pescatarian">Pescatarian</SelectItem>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                    <SelectItem value="keto">Keto</SelectItem>
                    <SelectItem value="paleo">Paleo</SelectItem>
                    <SelectItem value="mediterranean">Mediterranean</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="allergies">Food Allergies or Restrictions</Label>
                <Input
                  id="allergies"
                  name="allergies"
                  type="text"
                  placeholder="Enter allergies or restrictions, separated by commas"
                  className="input-field mt-1"
                  value={profileData.allergies}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex justify-between mt-8">
                <Button 
                  onClick={goToPreviousStep}
                  variant="outline"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button 
                  onClick={goToNextStep}
                  className="bg-fitness-500 hover:bg-fitness-600"
                >
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="traits" className="space-y-6">
              <div>
                <Label className="block mb-2">Do you have any of these traits? (Optional)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Slow metabolism",
                    "Fast metabolism",
                    "Joint pain",
                    "Back pain",
                    "Lactose intolerance",
                    "Gluten sensitivity",
                    "Poor sleep",
                    "High stress levels"
                  ].map(trait => (
                    <div key={trait} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={trait}
                        checked={profileData.geneticTraits.includes(trait)}
                        onChange={() => handleTraitChange(trait)}
                        className="rounded text-fitness-500 focus:ring-fitness-500"
                      />
                      <Label htmlFor={trait}>{trait}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button 
                  onClick={goToPreviousStep}
                  variant="outline"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button 
                  onClick={goToNextStep}
                  className="bg-fitness-500 hover:bg-fitness-600"
                >
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="photo" className="space-y-6">
              <div className="text-center">
                <Label className="block mb-4">Upload a profile photo (Optional)</Label>
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 mb-4 flex items-center justify-center relative">
                    {profileData.profileImagePreview ? (
                      <img 
                        src={profileData.profileImagePreview} 
                        alt="Profile preview" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Camera className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                    )}
                  </div>
                  <label 
                    htmlFor="profile-photo" 
                    className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-md cursor-pointer text-sm"
                  >
                    Choose file
                    <input
                      id="profile-photo"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button 
                  onClick={goToPreviousStep}
                  variant="outline"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button 
                  onClick={handleSubmit}
                  className="bg-fitness-500 hover:bg-fitness-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Completing setup..." : "Complete Setup"}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
