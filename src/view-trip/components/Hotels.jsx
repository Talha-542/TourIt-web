import PropTypes from "prop-types";

function Hotels({ trip }) {
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
    <div className="p-4 md:p-8 bg-white shadow-lg rounded-lg">
      {/* Image Section */}
      <img
        src="/trip.jpg"
        alt="Trip"
        className="h-[420px] w-full object-cover rounded-xl mb-6"
      />

      {/* Trip Details */}
      <div>
        <h2 className="text-2xl font-bold mb-2">
          {tripData?.location || "Location not specified"}
        </h2>

        <p>Budget: {tripData?.budget || "N/A"}</p>
        <p>Duration: {tripData?.duration || "N/A"}</p>
        <p>Travelers: {tripData?.travelers || "N/A"}</p>

        {/* Hotels List */}
        {tripData?.hotels && tripData.hotels.length > 0 ? (
          <div>
            <h3 className="font-semibold mt-4">Hotels:</h3>
            <ul className="list-disc ml-6">
              {tripData.hotels.map((hotel, index) => (
                <li key={index}>
                  <strong>{hotel.hotelName}</strong>
                  <p>{hotel.hotelAddress}</p>
                  <p>Price: {hotel.price}</p>
                  <p>Rating: {hotel.rating} ★</p>
                  <p>{hotel.description}</p>
                  <img
                    src={hotel.hotelImageURL}
                    alt={hotel.hotelName}
                    className="w-full h-auto rounded-lg mt-2"
                  />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No hotels specified.</p>
        )}

        {/* Itinerary */}
        {tripData?.itinerary ? (
          <div>
            <h3 className="font-semibold mt-4">Itinerary:</h3>
            {Object.entries(tripData.itinerary).map(([day, activities]) => (
              <div key={day}>
                <p>
                  <strong>{day}:</strong> {activities.description || "No activities planned"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No itinerary provided.</p>
        )}
      </div>
    </div>
  );
}

Hotels.propTypes = {
  trip: PropTypes.shape({
    tripData: PropTypes.string,
  }),
};

export default Hotels;
