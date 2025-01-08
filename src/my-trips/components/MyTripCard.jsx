import { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { GetPlaceDetails } from "@/service/GlobalApi";
const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxWidthPx=1000&maxHeightPx=1000&key=" +
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

function MyTripCard({ trip }) {
  const [photoUrl, setPhotoUrl] = useState("");
  let tripData = null;

  const getPlacePhoto = useCallback(async (placeName) => {
    const data = {
      textQuery: placeName,
    };
    try {
      const resp = await GetPlaceDetails(data);
      if (resp.data.places[0]?.photos?.[0]?.name) {
        const url = PHOTO_REF_URL.replace(
          "{NAME}",
          resp.data.places[0].photos[0].name
        );
        setPhotoUrl(url);
      }
    } catch (error) {
      console.error("Error fetching place photo:", error);
    }
  }, []);

  useEffect(() => {
    if (tripData?.location) {
      getPlacePhoto(tripData.location);
    }
  }, [tripData?.location, getPlacePhoto]);

  // Attempt to parse tripData
  if (trip?.tripData) {
    try {
      tripData = JSON.parse(trip.tripData.replace(/```json|```/g, "").trim());
    } catch (error) {
      console.error("Error parsing tripData:", error.message);
      console.log("Raw tripData:", trip.tripData);
    }
  }

  return (
    <div className="flex flex-col justify-center pt-4 hover:">
      <img
        src={photoUrl || "./trip.jpg"}
        alt={tripData?.location || "Trip location"}
        className="my-2 rounded-xl object-cover w-full h-48"
      />
      <div className="flex flex-col ">
        <h2>{tripData?.location || "No location available"}</h2>
        <h2 className="text-sm">{tripData?.duration } with {tripData?.budget } budget</h2>
      </div>
    </div>
  );
}

MyTripCard.propTypes = {
  trip: PropTypes.shape({
    tripData: PropTypes.string,
  }).isRequired,
};

export default MyTripCard;
