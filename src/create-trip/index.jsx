import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SelectBudgetOptions,
  SelectTravelList,
  AI_PROMPT,
} from "@/constants/options";
import { chatSession } from "@/service/AIModal";
import { useEffect, useState } from "react";
// import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { FaPlaneDeparture, FaCalendarAlt, FaUsers } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { db } from "@/service/firebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";
import { FaMoneyBills } from "react-icons/fa6";
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
  const [formData, setFormData] = useState([]);
  const [place, setPlace] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useNavigate();

  const handleTnputChange = (name, value) => {
    if (name === "NoOfDays" && value > 20) {
      toast.error("Please enter a duration of 5 days or less.");
      return;
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
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
      // toast.error("Please Sign in to Generate Your Trip")
      return;
    }
    if (
      (formData?.NoOfDays > 20 && !formData?.location) ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      // alert("Please enter a duration of 5 days or less.");
      toast.error("Please Enter all the details");

      return;
    }
    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{totalDays}", formData?.NoOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.NoOfDays);

    // console.log(FINAL_PROMPT);
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log("-->", result?.response?.text());
    setLoading(false);
    saveTrips(result?.response?.text());

    console.log("Trip Generated:", formData);
    toast.success("Your trip has been successfully generated!");
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
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        OngenerateTrip();
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  };

  const saveTrips = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "Trips", docId), {
      userRefrence: formData,
      tripData: TripData,
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    router("/view-trip/" + docId);
  };

  return (
    <div className="content-container sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5">
      <h2 className="font-bold text-4xl text-primary  ">
        Plan Your Dream Getaway ✈️
      </h2>
      <p className="mt-4 text-secondary text-lg leading-relaxed">
        Answer a few simple questions, and we’ll craft a personalized travel
        itinerary tailored just for you. Your adventure starts here!
      </p>

      <div className="mt-12 flex flex-col gap-12">
        <div className="flex flex-col sm:flex-row sm:gap-8">
          <div className="flex-1">
            <h2 className="text-xl my-3 font-medium text-primary flex items-center gap-2">
              <FaPlaneDeparture className="text-2xl mr-1 text-black" /> Where do
              you want to go?
            </h2>
            <Input
              type="text"
              value={place?.label || ""}
              onChange={(e) => {
                const value = e.target.value;
                setPlace({ label: value });
                handleTnputChange("location", { label: value });
              }}
              placeholder="Enter a location"
            />
          </div>

          {/* Trip Duration */}
          <div className="flex-1">
            <h2 className="text-xl my-3 font-medium text-primary flex items-center gap-2">
              <FaCalendarAlt className="text-2xl mr-1 text-black" /> How long
              will you stay?
            </h2>
            <Input
              placeholder="Enter the number of days (e.g., 5)"
              type="number"
              onChange={(e) => handleTnputChange("NoOfDays", e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        {/* Budget Selection */}
        <div>
          <h2 className="text-xl my-3 font-medium text-primary flex items-center gap-2">
            <FaMoneyBills className="text-2xl mr-1 text-black" />
            What’s your budget range?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClickCapture={() => handleTnputChange("budget", item.title)}
                className={`p-6 rounded-xl border cursor-pointer hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 ${
                  formData?.budget === item.title
                    ? "bg-primary text-white shadow-2xl scale-105"
                    : "bg-white text-primary border-gray-300"
                }`}
              >
                <h2 className="text-5xl">{item.icon}</h2>
                <h2 className="font-bold text-lg mt-4 mb-2">{item.title}</h2>
                <p
                  className={`text-lg ${
                    formData?.budget === item.title
                      ? "text-white"
                      : "text-secondary"
                  }`}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Travel Partner */}
        <div>
          <h2 className="text-xl my-3 font-medium text-primary flex items-center gap-2">
            <FaUsers className="text-2xl mr-1 text-black" /> Who’s coming with
            you?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
            {SelectTravelList.map((item, index) => (
              <div
                key={index}
                onClickCapture={() =>
                  handleTnputChange("traveler", item.people)
                }
                className={`p-6 rounded-xl border cursor-pointer hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 ${
                  formData?.traveler === item.people
                    ? "bg-primary text-white shadow-2xl scale-105"
                    : "bg-white text-primary border-gray-300"
                }`}
              >
                <h2 className="text-5xl">{item.icon}</h2>
                <h2 className="font-bold text-2xl mt-4 mb-2">{item.title}</h2>
                <p
                  className={`text-lg ${
                    formData?.traveler === item.people
                      ? "text-white"
                      : "text-secondary"
                  }`}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Generate Trip */}
        <div className="flex justify-end my-10">
          <Button disabled={loading} onClick={OngenerateTrip}>
            {loading ? <AiOutlineLoading3Quarters /> : "Genrate My Trip 🎉"}
          </Button>
        </div>
        <Dialog open={openDialog}>
          <DialogTitle></DialogTitle>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <img src="/logo.svg" alt="" />
                <h2 className="font-semibold text-lg mt-6">
                  Sign In with Google
                </h2>
                <p>Sign in to the App to keep your Trips Save</p>
                <Button
                  onClick={login}
                  disabled={loading}
                  className="w-full mt-5 flex gap-4 items-center"
                >
                  <FcGoogle /> Sign In with Google
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default CreateTrip;
