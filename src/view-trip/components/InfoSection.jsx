import { Button } from "@/components/ui/button";
import { FaShare } from "react-icons/fa";
import { Link } from "react-router-dom";
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
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Image Section */}
      <img
        src="/trip.jpg"
        alt="Trip"
        className="h-[250px] sm:h-[350px] lg:h-[420px] w-full object-cover rounded-xl mb-6"
      />

      {/* Trip Details */}
      <div className="flex flex-col md:flex-row justify-between gap-5">
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-xl sm:text-2xl">
            {tripData?.location || "Location not specified"}
          </h2>
          <div className="flex gap-2 sm:gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs sm:text-sm">
              📅 Duration: {tripData?.duration || "N/A"}
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs sm:text-sm">
              💰 Budget: {tripData?.budget || "N/A"}
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs sm:text-sm">
              👪 Travelers: {tripData?.travelers || "N/A"}
            </h2>
          </div>
        </div>
        <Button>
          <FaShare />
        </Button>
      </div>

      {/* Hotels List */}
      <div>
        {tripData?.hotels && tripData.hotels.length > 0 ? (
          <div>
            <h3 className="font-bold text-xl mt-5">Recommended Hotels:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {tripData.hotels.map((hotel, index) => (
                <Link
                  target="_blank"
                  key={index}
                  to={
                    "https://www.google.com/maps/search/?api=1&query=" +
                    hotel?.hotelName +
                    "," +
                    hotel?.hotelAddress
                  }
                  className="text-black"
                >
                  <div className="border rounded-xl p-4 hover:scale-105 transition-all cursor-pointer">
                    <img
                      src="/trip.jpg"
                      alt={hotel.hotelName}
                      className="w-full h-auto rounded-lg mb-4"
                    />
                    <h4 className="font-bold text-lg">{hotel?.hotelName}</h4>
                    <p className="text-xs text-gray-500">
                      📍{hotel?.hotelAddress}
                    </p>
                    <p className="text-sm font-bold">Price: {hotel?.price}</p>
                    <p className="text-sm font-medium">
                      Rating: {hotel?.rating} ★
                    </p>
                    <p className="text-xs text-gray-500 my-2">
                      {hotel.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <p>No hotels specified.</p>
        )}
      </div>

      {/* Itinerary */}
      <div>
        <h2 className="font-bold text-lg sm:text-xl mt-5">Places to Visit</h2>
        {tripData?.itinerary &&
        Object.entries(tripData.itinerary).length > 0 ? (
          <div className="flex flex-col gap-5 mt-5">
            {Object.entries(tripData.itinerary).map(
              ([day, activity], index) => (
                <div
                  key={index}
                  className="border rounded-xl p-4 bg-gray-100 shadow-md"
                >
                  {/* Day and Theme */}
                  <h2 className="font-medium text-base sm:text-lg mb-2">
                    {day.charAt(0).toUpperCase() + day.slice(1, 3)}{" "}
                    {day.slice(3)}
                  </h2>{" "}
                  <p className="italic text-sm sm:text-base mb-4">
                    <span className="font-bold">Theme:</span> {activity.theme}
                  </p>
                  <p className="italic text-sm sm:text-base mb-4">
                    <span className="font-bold">Best Time to Visit:</span>{" "}
                    {activity.bestTimeToVisit}
                  </p>
                  {/* Places to Visit */}
                  {activity.places.map((place, placeIndex) => (
                    <Link
                      target="_blank"
                      key={index}
                      to={
                        "https://www.google.com/maps/search/?api=1&query=" +
                        place?.placeName
                      }
                      className="text-black"
                    >
                      <div key={placeIndex} className="mb-6">
                        {/* Place Card */}
                        <div className="border rounded-xl p-4 flex flex-col sm:flex-row gap-4 bg-white shadow-lg">
                          {/* Image */}
                          <img
                            src="/trip.jpg"
                            alt={place.placeName}
                            className="w-[120px] h-[120px] object-cover rounded-lg"
                          />

                          {/* Place Details */}
                          <div className="flex flex-col">
                            <h3 className="text-lg font-semibold">
                              {place.placeName}
                            </h3>
                            <p className="text-sm text-gray-700 mt-1">
                              <strong className="text-black">Details:</strong>{" "}
                              {place.placeDetails}
                            </p>
                            <p className="text-sm text-gray-700 mt-1">
                              <strong className="text-black">
                                Ticket Pricing:
                              </strong>{" "}
                              {place.ticketPricing}
                            </p>
                            {/* Time to Travel */}
                            <div className="mt-3 flex items-center">
                              <p className="text-sm font-medium text-orange-600">
                                <strong className="text-black">
                                  Time to Travel:
                                </strong>{" "}
                                {place.timeToTravel}
                              </p>
                              {/* <p className="text-[12px] text-red-500 font-small ml-1">
                                (Traffic conditions may vary; plan accordingly.)
                              </p> */}
                            </div>
                          </div>
                        </div>

                        {/* Divider */}
                        <hr className="my-5 border-1 border-gray-300 rounded-full" />
                      </div>
                    </Link>
                  ))}
                </div>
              )
            )}
          </div>
        ) : (
          <p>No itinerary provided.</p>
        )}
      </div>
    </div>
  );
}

InfoSection.propTypes = {
  trip: PropTypes.shape({
    tripData: PropTypes.string,
  }),
};

export default InfoSection;
