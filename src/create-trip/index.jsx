import { Input } from "@/components/ui/input";
import { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

function CreateTrip() {
  const [place, setPlace] = useState();
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel preferences</h2>
      <p className="mt-3 text-secondary text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className="mt-20">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is your destination? (replace to google place api )
          </h2>
          {/* Google Places Autocomplete */}
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                console.log(v);
              },
            }}
          />
          {/* Additional input field below the Google Places Autocomplete */}
          {/* <input
            type="text"
            className="mt-4 px-4 py-2 border rounded-md w-full"
            placeholder="Enter additional destination or notes"
          /> */}
        </div>
      </div>
      <div>
        <h2 className="text-xl my-3 font-medium">
        For how many days You are planning your Trip?
        </h2>
        <Input placeholder={'Ex.3'} type="number"/>
      </div>
    </div>
  );
}

export default CreateTrip;
