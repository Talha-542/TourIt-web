import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SelectBudgetOptions,
  SelectTravelList,
  SelectFoodOptions,
  SelectInterestOptions,
  SelectTripTypes,
  SelectHealthcareSpecialties,
  SelectEducationalFields,
} from "@/constants/options";
import { chatSession, TRAVEL_PROMPT, HEALTHCARE_PROMPT, EDUCATION_PROMPT } from "@/service/AIModal";
import { useEffect, useState } from "react";
import { db } from "@/service/firebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaPlaneDeparture, FaCalendarAlt, FaUsers, FaHeart } from "react-icons/fa";
import { FaMoneyBills, FaBowlFood } from "react-icons/fa6";
import { MdHealthAndSafety, MdSchool, MdTravelExplore } from "react-icons/md";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function CreateTrip() {
  const [formData, setFormData] = useState({
    tripType: '', // Default to tourism
  });
  const [place, setPlace] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [selectedEducationFields, setSelectedEducationFields] = useState([]);
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
    const requiredFields = ["location", "NoOfDays", "budget", "traveler", "tripType"];
    const filledFields = requiredFields.filter(field => data[field]);
    setFormProgress((filledFields.length / requiredFields.length) * 100);
  };

  const toggleItem = (item, stateSetter, stateGetter, formField) => {
    stateSetter(prev => {
      const isSelected = prev.includes(item);
      const newItems = isSelected
        ? prev.filter(i => i !== item)
        : [...prev, item];

      // Update formData
      handleInputChange(formField, newItems);
      return newItems;
    });
  };

  const toggleInterest = (interest) => toggleItem(interest, setSelectedInterests, selectedInterests, "interests");
  const toggleSpecialty = (specialty) => toggleItem(specialty, setSelectedSpecialties, selectedSpecialties, "specialties");
  const toggleEducationField = (field) => toggleItem(field, setSelectedEducationFields, selectedEducationFields, "educationFields");

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

    if (!formData?.location || !formData?.NoOfDays || !formData?.budget || !formData?.traveler || !formData?.tripType) {
      toast.error("Please fill in all required fields to generate your trip.");
      return;
    }

    if (formData?.NoOfDays > 20) {
      toast.error("Please enter a duration of 20 days or less.");
      return;
    }

    setLoading(true);

    try {
      let promptTemplate;
      let additionalParams = '';

      // Choose prompt based on trip type
      switch (formData.tripType) {
        case 'healthcare':
          promptTemplate = HEALTHCARE_PROMPT;
          if (formData?.specialties && formData.specialties.length > 0) {
            additionalParams = ` with focus on ${formData.specialties.join(', ')}`;
          }
          break;
        case 'education':
          promptTemplate = EDUCATION_PROMPT;
          if (formData?.educationFields && formData.educationFields.length > 0) {
            additionalParams = ` with focus on ${formData.educationFields.join(', ')}`;
          }
          break;
        default: // tourism
          promptTemplate = TRAVEL_PROMPT;
          if (formData?.interests && formData.interests.length > 0) {
            additionalParams = ` with interests in ${formData.interests.join(', ')}`;
          }
          if (formData?.food) {
            additionalParams += `, preferring ${formData.food}`;
          }
          break;
      }

      const FINAL_PROMPT = promptTemplate
        .replace("{location}", formData?.location)
        .replace(/\{totalDays\}/g, formData?.NoOfDays)
        .replace("{traveler}", formData?.traveler)
        .replace("{budget}", formData?.budget) + additionalParams;

      console.log(FINAL_PROMPT)
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      saveTrips(result?.response?.text());

      toast.success(`Your ${formData.tripType} plan has been successfully generated!`);
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

  // Get icon based on trip type
  const getTripTypeIcon = () => {
    switch (formData.tripType) {
      case 'healthcare':
        return <MdHealthAndSafety className="text-xl text-primary" />;
      case 'education':
        return <MdSchool className="text-xl text-primary" />;
      default:
        return <MdTravelExplore className="text-xl text-primary" />;
    }
  };

  // Get title based on trip type
  const getTripTypeTitle = () => {
    switch (formData.tripType) {
      case 'healthcare':
        return "Plan Your Medical Visit";
      case 'education':
        return "Explore Educational Opportunities";
      default:
        return "Plan Your Dream Getaway";
    }
  };

  return (
    <div className="content-container max-w-7xl mx-auto px-6 py-12">
      {/* Header with progress bar */}
      <div className="mb-10">
        <h1 className="font-bold text-5xl text-primary bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          {getTripTypeTitle()} ✈️
        </h1>
        <p className="mt-4 text-secondary text-lg leading-relaxed max-w-3xl">
          Answer a few simple questions, and we&apos;ll craft a personalized itinerary
          tailored just for you. Your journey starts here!
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
            "Ready to generate your plan! 🎉"}
        </p>
      </div>

      {/* Trip Type Selection */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">What type of trip are you planning?</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {SelectTripTypes.map((item) => (
            <div
              key={item.id}
              onClick={() => handleInputChange("tripType", item.type)}
              className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-xl ${formData?.tripType === item.type
                  ? "border-primary bg-primary/5 shadow-lg shadow-primary/10 transform -translate-y-1"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className={`font-bold text-xl mb-2 ${formData?.tripType === item.type ? "text-primary" : "text-gray-800"
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
                placeholder="Enter your destination..."
                className="h-12 text-lg"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xl font-medium text-primary">
                <div className="p-3 bg-blue-50 rounded-full">
                  <FaCalendarAlt className="text-xl text-primary" />
                </div>
                <span>How many days?</span>
              </div>
              <Input
                type="number"
                value={formData?.NoOfDays || ""}
                onChange={(e) => handleInputChange("NoOfDays", parseInt(e.target.value))}
                placeholder="Number of days (max 20)"
                min="1"
                max="20"
                className="h-12 text-lg"
              />
            </div>
          </div>
        </div>

        {/* Travelers & Budget Section */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Travelers & Budget</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Travelers selection */}
            <div>
              <div className="flex items-center gap-2 text-xl font-medium text-primary mb-6">
                <div className="p-3 bg-blue-50 rounded-full">
                  <FaUsers className="text-xl text-primary" />
                </div>
                <span>Who's traveling?</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {SelectTravelList.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleInputChange("traveler", item.people)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${formData?.traveler === item.people
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 hover:border-gray-300"
                      }`}
                  >
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Budget selection */}
            <div>
              <div className="flex items-center gap-2 text-xl font-medium text-primary mb-6">
                <div className="p-3 bg-blue-50 rounded-full">
                  <FaMoneyBills className="text-xl text-primary" />
                </div>
                <span>What's your budget?</span>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {SelectBudgetOptions.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleInputChange("budget", item.title)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${formData?.budget === item.title
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 hover:border-gray-300"
                      }`}
                  >
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trip Type Specific Options */}
        {formData.tripType === 'tourism' && (
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Tourism Preferences</h2>

            <div className="space-y-10">
              {/* Food preferences */}
              <div>
                <div className="flex items-center gap-2 text-xl font-medium text-primary mb-6">
                  <div className="p-3 bg-blue-50 rounded-full">
                    <FaBowlFood className="text-xl text-primary" />
                  </div>
                  <span>Food preferences?</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {SelectFoodOptions.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleInputChange("food", item.title)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${formData?.food === item.title
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-gray-300"
                        }`}
                    >
                      <div className="text-3xl mb-2">{item.icon}</div>
                      <h3 className="font-bold">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div>
                <div className="flex items-center gap-2 text-xl font-medium text-primary mb-6">
                  <div className="p-3 bg-blue-50 rounded-full">
                    <FaHeart className="text-xl text-primary" />
                  </div>
                  <span>Select your interests (optional)</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {SelectInterestOptions.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleInterest(item.title)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all flex flex-col items-center justify-center text-center ${selectedInterests.includes(item.title)
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-gray-300"
                        }`}
                    >
                      <div className="text-2xl mb-1">{item.icon}</div>
                      <h3 className="text-sm font-medium">{item.title}</h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Healthcare Options */}
        {formData.tripType === 'healthcare' && (
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Healthcare Preferences</h2>

            <div className="space-y-6">
              <div className="flex items-center gap-2 text-xl font-medium text-primary mb-6">
                <div className="p-3 bg-blue-50 rounded-full">
                  <MdHealthAndSafety className="text-xl text-primary" />
                </div>
                <span>Select medical specialties of interest (optional)</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {SelectHealthcareSpecialties.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleSpecialty(item.title)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all flex flex-col items-center justify-center text-center ${selectedSpecialties.includes(item.title)
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 hover:border-gray-300"
                      }`}
                  >
                    <div className="text-2xl mb-1">{item.icon}</div>
                    <h3 className="text-sm font-medium">{item.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Education Options */}
        {formData.tripType === 'education' && (
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Educational Preferences</h2>

            <div className="space-y-6">
              <div className="flex items-center gap-2 text-xl font-medium text-primary mb-6">
                <div className="p-3 bg-blue-50 rounded-full">
                  <MdSchool className="text-xl text-primary" />
                </div>
                <span>Select educational fields of interest (optional)</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {SelectEducationalFields.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleEducationField(item.title)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all flex flex-col items-center justify-center text-center ${selectedEducationFields.includes(item.title)
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 hover:border-gray-300"
                      }`}
                  >
                    <div className="text-2xl mb-1">{item.icon}</div>
                    <h3 className="text-sm font-medium">{item.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Generate Trip Button */}
        <div className="flex justify-center mt-12">
          <Button
            onClick={OngenerateTrip}
            disabled={loading || formProgress < 100}
            className="h-16 px-10 text-lg font-medium rounded-xl transition-all"
          >
            {loading ? (
              <>
                <AiOutlineLoading3Quarters className="mr-2 h-5 w-5 animate-spin" />
                Generating Your Perfect Trip...
              </>
            ) : (
              <>
                {getTripTypeIcon()}
                <span className="ml-2">Generate My {formData.tripType === 'tourism' ? 'Trip' : formData.tripType === 'healthcare' ? 'Medical Plan' : 'Educational Plan'}</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Login Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Sign in required</DialogTitle>
            <DialogDescription>
              Please sign in with your Google account to generate and save your trip plan.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center py-6">
            <Button
              variant="outline"
              onClick={() => login()}
              className="flex items-center gap-2 py-6"
            >
              <FcGoogle className="h-5 w-5" />
              <span>Continue with Google</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;