import { Button } from "@/components/ui/button";
import { FaShare } from "react-icons/fa";

import PropTypes from "prop-types";

function InfoSection({ trip }) {
  let tripData = null;

  // Attempt to parse tripData
  if (trip?.tripData) {
    try {
      tripData = JSON.parse(trip.tripData.replace(/```json|```/g, "").trim());
    } catch (error) {
      console.error("Error parsing tripData:", error.message);
    }
  }

  return (
    <div>
      {/* Image Section */}
      <img
        src="/trip.jpg"
        alt="Trip"
        className="h-[420px] w-full object-cover rounded-xl mb-6"
      />

      {/* Trip Details */}
      <div className="flex justify-between">
        <div className=" flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {tripData?.location || "Location not specified"}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              📅 Duration: {tripData?.duration || "N/A"}
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              💰 Budget: {tripData?.budget || "N/A"}
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              👪 Travelers: {tripData?.travelers || "N/A"}{" "}
            </h2>
          </div>
        </div>
        <Button>
          <FaShare />
        </Button>
      </div>
  {/* Hotels List */}
  <div className="">
        {tripData?.hotels && tripData.hotels.length > 0 ? (
          <div>
            <h3 className="font-bold text-xl mt-5"> Recommended Hotels:</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {tripData.hotels.map((hotel, index) => (
                <div key={index} className="border rounded-xl p-4 hover:scale-105 transition-all cursor-pointer">
                  <img
                    src="/trip.jpg"
                    alt={hotel.hotelName}
                    className="w-full h-auto rounded-lg mb-4"
                  />
                  <h4 className="font-bold text-lg">{hotel?.hotelName}</h4>
                  <p className="text-xs text-gray-500">📍{hotel?.hotelAddress}</p>
                  <p className="text-sm font-bold">Price: {hotel?.price}</p>
                  <p className="text-sm font-medium">Rating: {hotel?.rating} ★</p>
                  {/* <p className="text-xs text-gray-500">{hotel.description}</p> */}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>No hotels specified.</p>
        )}
      </div>

      {/* Itinerary */}
      {/* {tripData?.itinerary ? (
        <div>
          <h3 className="font-semibold mt-4">Itinerary:</h3>
          {Object.entries(tripData.itinerary).map(([day, activities]) => (
            <div key={day}>
              <p>
                <strong>{day}:</strong>{" "}
                {activities.description || "No activities planned"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No itinerary provided.</p>
      )} */}
    </div>
  );
}

InfoSection.propTypes = {
  trip: PropTypes.shape({
    tripData: PropTypes.string,
  }),
};

export default InfoSection;
