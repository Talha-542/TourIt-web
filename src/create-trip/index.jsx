import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SelectBudgetOptions, SelectTravelList } from "@/constants/options";
import { useState } from "react";
import { FaPlaneDeparture, FaCalendarAlt, FaUsers } from "react-icons/fa";
import { FaMoneyBills } from "react-icons/fa6";

function CreateTrip() {
  const [destination, setDestination] = useState("");
  const [tripDays, setTripDays] = useState("");
  const [budget, setBudget] = useState(null);
  const [partner, setPartner] = useState(null);

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
        {/* Destination */}
        <div>
          <h2 className="text-xl my-3 font-medium text-primary flex items-center gap-2">
            <FaPlaneDeparture className="text-2xl mr-1 text-black" /> Where do
            you want to go?
          </h2>
          <Input
            placeholder="Type your destination (e.g., Paris, Tokyo)"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Trip Duration */}
        <div>
          <h2 className="text-xl my-3 font-medium text-primary flex items-center gap-2">
            <FaCalendarAlt className="text-2xl mr-1 text-black" /> How long will
            you stay?
          </h2>
          <Input
            placeholder="Enter the number of days (e.g., 5)"
            type="number"
            value={tripDays}
            onChange={(e) => setTripDays(e.target.value)}
            className="w-full"
          />
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
                className={`p-4 rounded-lg border cursor-pointer hover:shadow-lg ${
                  budget === item.title ? "border-accent bg-accent-light" : ""
                }`}
                onClick={() => setBudget(item.title)}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg mt-2">{item.title}</h2>
                <p className="text-sm text-secondary">{item.desc}</p>
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
                className={`p-4 rounded-lg border cursor-pointer hover:shadow-lg ${
                  partner === item.title ? "border-accent bg-accent-light" : ""
                }`}
                onClick={() => setPartner(item.title)}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg mt-2">{item.title}</h2>
                <p className="text-sm text-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Generate Trip */}
        <div className="flex justify-end my-10">
          <Button
            onClick={() =>
              console.log({ destination, tripDays, budget, partner })
            }
          >
            Generate My Trip 🎉
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateTrip;
