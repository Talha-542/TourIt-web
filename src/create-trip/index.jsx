// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { SelectBudgetOptions, SelectTravelList } from "@/constants/options";
// import { useEffect, useState } from "react";
// import GooglePlacesAutocomplete from "react-google-places-autocomplete";
// import { FaPlaneDeparture, FaCalendarAlt, FaUsers } from "react-icons/fa";
// import { FaMoneyBills } from "react-icons/fa6";

// function CreateTrip() {
//   // const [destination, setDestination] = useState("");
//   // const [tripDays, setTripDays] = useState("");
//   // const [budget, setBudget] = useState(null);
//   // const [partner, setPartner] = useState(null);
//   const [formData, setFormData] = useState([]);
//   const [place, setPlace] = useState("");

//   const handleTnputChange = (name, value) => {
//     if (name === "No of days" && value > 5) {
//       console.log("Please Enter less then 5 days");
//       return;
//     }
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   useEffect(() => {
//     console.log(formData);
//   }, [formData]);

//   const OngenerateTrip = () => {
//     console.log("Button clicked, OngenerateTrip called");

//     if (formData?.NoOfDays > 5) {
//       alert("Please enter a duration of 5 days or less.");
//       return;
//     }

//     console.log("Trip Generated:", formData);
//     alert("Your trip has been successfully generated!");
//   };

//   return (
//     <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
//       <h2 className="font-bold text-4xl text-primary">
//         Plan Your Dream Getaway ✈️
//       </h2>
//       <p className="mt-4 text-secondary text-lg leading-relaxed">
//         Answer a few simple questions, and we’ll craft a personalized travel
//         itinerary tailored just for you. Your adventure starts here!
//       </p>

//       <div className="mt-12 flex flex-col gap-12">
//         {/* Destination */}
//         <div>
//           <h2 className="text-xl my-3 font-medium text-primary flex items-center gap-2">
//             <FaPlaneDeparture className="text-2xl mr-1 text-black" /> Where do
//             you want to go?
//           </h2>
//           <GooglePlacesAutocomplete
//             apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
//             selectProps={{
//               place,
//               onChange: (v) => {
//                 setPlace(v);
//                 handleTnputChange("location", v);
//               },
//             }}
//           />
//         </div>

//         {/* Trip Duration */}
//         <div>
//           <h2 className="text-xl my-3 font-medium text-primary flex items-center gap-2">
//             <FaCalendarAlt className="text-2xl mr-1 text-black" /> How long will
//             you stay?
//           </h2>
//           <Input
//             placeholder="Enter the number of days (e.g., 5)"
//             type="number"
//             onChange={(e) => handleTnputChange("NoOfDays", e.target.value)}
//             className="w-full"
//           />
//         </div>

//         {/* Budget Selection */}
//         <div>
//           <h2 className="text-xl my-3 font-medium text-primary flex items-center gap-2">
//             <FaMoneyBills className="text-2xl mr-1 text-black" />
//             What’s your budget range?
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
//             {SelectBudgetOptions.map((item, index) => (
//               <div
//                 key={index}
//                 onClickCapture={() => handleTnputChange("budget", item.title)}
//                 className={`p-4 rounded-lg border cursor-pointer hover:shadow-lg ${
//                   formData?.budget === item.title && "shadow-lg border-black"
//                 }`}
//               >
//                 <h2 className="text-4xl">{item.icon}</h2>
//                 <h2 className="font-bold text-lg mt-2">{item.title}</h2>
//                 <p className="text-sm text-secondary">{item.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Travel Partner */}
//         <div>
//           <h2 className="text-xl my-3 font-medium text-primary flex items-center gap-2">
//             <FaUsers className="text-2xl mr-1 text-black" /> Who’s coming with
//             you?
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
//             {SelectTravelList.map((item, index) => (
//               <div
//                 key={index}
//                 onClickCapture={() =>
//                   handleTnputChange("traveler", item.people)
//                 }
//                 className={`p-4 rounded-lg border cursor-pointer hover:shadow-lg ${
//                   formData?.traveler === item.people && "shadow-lg border-black"
//                 }`}
//               >
//                 <h2 className="text-4xl">{item.icon}</h2>
//                 <h2 className="font-bold text-lg mt-2">{item.title}</h2>
//                 <p className="text-sm text-secondary">{item.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Generate Trip */}
//         <div className="flex justify-end my-10">
//           <Button onClick={OngenerateTrip}>Generate My Trip 🎉</Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CreateTrip;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SelectBudgetOptions, SelectTravelList } from "@/constants/options";
import { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { FaPlaneDeparture, FaCalendarAlt, FaUsers } from "react-icons/fa";
import { FaMoneyBills } from "react-icons/fa6";

function CreateTrip() {
  const [formData, setFormData] = useState([]);
  const [place, setPlace] = useState("");

  const handleTnputChange = (name, value) => {
    if (name === "No of days" && value > 5) {
      console.log("Please Enter less than 5 days");
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

  const OngenerateTrip = () => {
    console.log("Button clicked, OngenerateTrip called");

    if (formData?.NoOfDays > 5) {
      alert("Please enter a duration of 5 days or less.");
      return;
    }

    console.log("Trip Generated:", formData);
    alert("Your trip has been successfully generated!");
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
        {/* Destination and Trip Duration on the same line */}
        <div className="flex flex-col sm:flex-row sm:gap-8">
          {/* Destination */}
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
      </div>
    </div>
  );
}

export default CreateTrip;
