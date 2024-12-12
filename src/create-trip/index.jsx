import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SelectBudgetOptions,
  SelectTravelList,
  AI_PROMPT,
} from "@/constants/options";
import { chatSession } from "@/service/AIModal";
import { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { FaPlaneDeparture, FaCalendarAlt, FaUsers } from "react-icons/fa";
// import { FcGoogle } from "react-icons/fc";

import { FaMoneyBills } from "react-icons/fa6";
import { toast } from "sonner";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { useGoogleLogin } from "@react-oauth/google";

function CreateTrip() {
  const [formData, setFormData] = useState([]);
  const [place, setPlace] = useState("");
  // const [openDialog, setOpenDialog] = useState(false);

  const handleTnputChange = (name, value) => {
    if (name === "NoOfDays" && value > 5) {
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

  // const { login } = useGoogleLogin({
  //   onSuccess: (codeResp) => {
  //     console.log(codeResp);

  //   },
  //   onError: (error) => {
  //     console.log(error);
  //     toast.error("Google login failed. Please try again.");
  //   },
  // });

  const OngenerateTrip = async () => {
    // const user = localStorage.getItem("user");
    // if (!user) {
    //   setOpenDialog(true);
    //   // toast.error("Please Sign in to Generate Your Trip")
    //   return;
    // }
    if (
      (formData?.NoOfDays > 5 && !formData?.location) ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      // alert("Please enter a duration of 5 days or less.");
      toast.error("Please Enter all the details");

      return;
    }

    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{totalDays}", formData?.NoOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.NoOfDays);

    console.log(FINAL_PROMPT);
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log("-->" ,result?.response?.text());

    console.log("Trip Generated:", formData);
    toast.success("Your trip has been successfully generated!");
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-4xl text-primary">
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
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                place,
                onChange: (v) => {
                  setPlace(v);
                  handleTnputChange("location", v);
                },
              }}
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
          <Button onClick={OngenerateTrip}>Generate My Trip 🎉</Button>
        </div>
        {/* <Dialog open={openDialog}>
          <DialogTitle>Sign In to Our App </DialogTitle>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <img src="/logo.svg" alt="" />
                <h2 className="font-semibold text-lg mt-6">Sign In with Google</h2>
                <p>Sign in to the App to keep your Trips Save</p>
                <Button onClick={login} className="w-full mt-5 flex gap-4 items-center">
                  <FcGoogle/> Sign In with Google </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
          </Dialog> */}
      </div>
    </div>
  );
}

export default CreateTrip;
