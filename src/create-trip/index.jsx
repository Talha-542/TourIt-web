import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SelectBudgetOptions,
  SelectTravelList,
  SelectFoodOptions,
  AI_PROMPT,
  SelectInterestOptions,
} from "@/constants/options";
import { chatSession } from "@/service/AIModal";
import { useEffect, useState } from "react";
import { FaPlaneDeparture, FaCalendarAlt, FaUsers, FaHeart } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { db } from "@/service/firebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";
import { FaMoneyBills, FaBowlFood } from "react-icons/fa6";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [formData, setFormData] = useState({});
  const [place, setPlace] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [formProgress, setFormProgress] = useState(0);

  const router = useNavigate();

  const handleInputChange = (name, value) => {
    if (name === "NoOfDays" && value > 20) {
      toast.error("Please enter a duration of 20 days or less.");
      return;
    }
    
    const newFormData = {
      ...formData,
      [name]: value,
    };
    
    setFormData(newFormData);
    
    // Calculate form progress
    calculateFormProgress(newFormData);
  };
  
  const calculateFormProgress = (data) => {
    const requiredFields = ["location", "NoOfDays", "budget", "traveler"];
    const filledFields = requiredFields.filter(field => data[field]);
    setFormProgress((filledFields.length / requiredFields.length) * 100);
  };

  const toggleInterest = (interest) => {
    setSelectedInterests(prev => {
      const isSelected = prev.includes(interest);
      const newInterests = isSelected 
        ? prev.filter(i => i !== interest)
        : [...prev, interest];
      
      // Update formData with interests
      handleInputChange("interests", newInterests);
      return newInterests;
    });
  };

  useEffect(() => {
    calculateFormProgress(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (response) => {
      GetUserProfile(response);
    },
    onError: (error) => {
      console.error("Google Login Error:", error);
      toast.error("Google login failed. Please try again.");
    },
  });

  const OngenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }
    
    if (!formData?.location || !formData?.NoOfDays || !formData?.budget || !formData?.traveler) {
      toast.error("Please fill in all required fields to generate your trip.");
      return;
    }
    
    if (formData?.NoOfDays > 20) {
      toast.error("Please enter a duration of 20 days or less.");
      return;
    }
    
    setLoading(true);
    
    try {
      // Format interests as a string if they exist
      const interestsString = formData?.interests && formData.interests.length > 0 
        ? ` with interests in ${formData.interests.join(', ')}` 
        : '';
      
      const FINAL_PROMPT = AI_PROMPT.replace(
        "{location}",
        formData?.location
      )
        .replace(/\{totalDays\}/g, formData?.NoOfDays)
        .replace("{traveler}", formData?.traveler)
        .replace("{budget}", formData?.budget) + interestsString;

      const result = await chatSession.sendMessage(FINAL_PROMPT);
      saveTrips(result?.response?.text());
      
      toast.success("Your trip has been successfully generated!");
    } catch (error) {
      console.error("Error generating trip:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        toast.success(`Welcome, ${resp.data.name}!`);
        OngenerateTrip();
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
        toast.error("Could not retrieve user information.");
      });
  };

  const saveTrips = async (TripData) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const docId = Date.now().toString();
      await setDoc(doc(db, "Trips", docId), {
        userRefrence: formData,
        tripData: TripData,
        userEmail: user?.email,
        id: docId,
        createdAt: new Date().toISOString(),
      });
      
      router("/view-trip/" + docId);
    } catch (error) {
      console.error("Error saving trip:", error);
      toast.error("Failed to save your trip. Please try again.");
    }
  };

  return (
    <div className="content-container max-w-7xl mx-auto px-6 py-12">
      {/* Header with progress bar */}
      <div className="mb-10">
        <h1 className="font-bold text-5xl text-primary bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Plan Your Dream Getaway ✈️
        </h1>
        <p className="mt-4 text-secondary text-lg leading-relaxed max-w-3xl">
          Answer a few simple questions, and we&apos;ll craft a personalized travel
          itinerary tailored just for you. Your adventure starts here!
        </p>
        
        <div className="mt-6 bg-gray-100 h-2 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
            style={{ width: `${formProgress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          {formProgress < 100 ? 
            `Complete the form (${Math.round(formProgress)}% done)` : 
            "Ready to generate your trip! 🎉"}
        </p>
      </div>

      <div className="space-y-16">
        {/* Destination & Duration Section */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Basic Trip Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xl font-medium text-primary">
                <div className="p-3 bg-blue-50 rounded-full">
                  <FaPlaneDeparture className="text-xl text-primary" />
                </div>
                <span>Where do you want to go?</span>
              </div>
              <Input
                type="text"
                value={place || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  setPlace(value);
                  handleInputChange("location", value);
                }}
                placeholder="Enter a destination (e.g., Paris, Tokyo, Bali)"
                className="py-6 px-4 text-lg"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xl font-medium text-primary">
                <div className="p-3 bg-blue-50 rounded-full">
                  <FaCalendarAlt className="text-xl text-primary" />
                </div>
                <span>How long will you stay?</span>
              </div>
              <Input
                placeholder="Number of days (max 20)"
                type="number"
                min="1"
                max="20"
                value={formData.NoOfDays || ""}
                onChange={(e) => handleInputChange("NoOfDays", e.target.value)}
                className="py-6 px-4 text-lg"
              />
            </div>
          </div>
        </div>

        {/* Budget Selection */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex items-center gap-2 text-2xl font-bold text-gray-800 mb-6">
            <div className="p-3 bg-blue-50 rounded-full">
              <FaMoneyBills className="text-xl text-primary" />
            </div>
            <span>What&apos;s your budget range?</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {SelectBudgetOptions.map((item) => (
              <div
                key={item.id}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-xl ${
                  formData?.budget === item.title
                    ? "border-primary bg-primary/5 shadow-lg shadow-primary/10 transform -translate-y-1"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className={`font-bold text-xl mb-2 ${
                  formData?.budget === item.title ? "text-primary" : "text-gray-800"
                }`}>
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Travel Companions */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex items-center gap-2 text-2xl font-bold text-gray-800 mb-6">
            <div className="p-3 bg-blue-50 rounded-full">
              <FaUsers className="text-xl text-primary" />
            </div>
            <span>Whos coming with you?</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SelectTravelList.map((item) => (
              <div
                key={item.id}
                onClick={() => handleInputChange("traveler", item.people)}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-xl ${
                  formData?.traveler === item.people
                    ? "border-primary bg-primary/5 shadow-lg shadow-primary/10 transform -translate-y-1"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className={`font-bold text-xl mb-2 ${
                  formData?.traveler === item.people ? "text-primary" : "text-gray-800"
                }`}>
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>


        {/* Food Selection */}
<div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex items-center gap-2 text-2xl font-bold text-gray-800 mb-6">
            <div className="p-3 bg-blue-50 rounded-full">
              <FaBowlFood className="text-xl text-primary" />
            </div>
            <span>What type of Food you like?</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {SelectFoodOptions.map((item) => (
              <div
                key={item.id}
                onClick={() => handleInputChange("food", item.title)}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-xl ${
                  formData?.food === item.title
                    ? "border-primary bg-primary/5 shadow-lg shadow-primary/10 transform -translate-y-1"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className={`font-bold text-xl mb-2 ${
                  formData?.budget === item.title ? "text-primary" : "text-gray-800"
                }`}>
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex items-center gap-2 text-2xl font-bold text-gray-800 mb-6">
            <div className="p-3 bg-blue-50 rounded-full">
              <FaHeart className="text-xl text-primary" />
            </div>
            <span>What are your interests?</span>
            <span className="text-sm ml-auto font-normal text-gray-500">Select multiple</span>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {SelectInterestOptions.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleInterest(item.title)}
                className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ease-in-out ${
                  selectedInterests.includes(item.title)
                    ? "border-primary bg-primary/5 shadow-lg shadow-primary/10 transform -translate-y-1"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="text-3xl">{item.icon}</div>
                  <h3 className={`font-medium text-base ${
                    selectedInterests.includes(item.title) ? "text-primary" : "text-gray-800"
                  }`}>
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Generate Trip Button */}
        <div className="flex flex-col gap-4 items-center my-10">
          <Button 
            disabled={loading || formProgress < 100} 
            onClick={OngenerateTrip}
            className="py-6 px-8 text-lg rounded-full shadow-lg transition-all hover:shadow-xl hover:scale-105"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <AiOutlineLoading3Quarters className="animate-spin" />
                <span>Creating Your Perfect Itinerary...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span>Generate My Dream Trip</span>
                <span className="text-2xl">🎉</span>
              </div>
            )}
          </Button>
          
          {formProgress < 100 && (
            <p className="text-orange-500">Please complete all required fields to generate your trip</p>
          )}
        </div>
      </div>

      {/* Sign In Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">Sign In to Save Your Trip</DialogTitle>
            <DialogDescription className="text-center">
              <div className="flex justify-center my-6">
                <img src="/logo.svg" alt="Logo" className="h-16" />
              </div>
              <p className="text-lg mb-6">Sign in to keep all your dream trips saved and accessible</p>
              <Button
                onClick={login}
                disabled={loading}
                className="w-full py-6 flex gap-4 items-center justify-center text-lg transition-all hover:scale-105"
              >
                <FcGoogle className="text-2xl" /> 
                <span>Continue with Google</span>
              </Button>
              <p className="mt-6 text-xs text-gray-500">We only use your Google account to save your trips</p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;