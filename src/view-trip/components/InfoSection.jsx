import { Button } from "@/components/ui/button";
import { GetPlaceDetails } from "@/service/GlobalApi";
import { ImDownload3 } from "react-icons/im";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import { useEffect, useCallback, useState } from "react";

const PHOTO_REF_URL='https://places.googleapis.com/v1/{NAME}/media?maxWidthPx=1000&maxHeightPx=1000&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY
function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();
  const [hotelPhotos, setHotelPhotos] = useState({});
  const [placePhotos, setPlacePhotos] = useState({});
  let tripData = null;

  // Attempt to parse tripData
  if (trip?.tripData) {
    try {
      tripData = JSON.parse(trip.tripData.replace(/```json|```/g, "").trim());
    } catch (error) {
      console.error("Error parsing tripData:", error.message);
    }
  }

  const exportToWord = async () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            // Title Section with Location
            new Paragraph({
              spacing: { before: 200, after: 200 },
              alignment: "CENTER",
              children: [
                new TextRun({
                  text: "Tour It\n",
                  bold: true,
                  size: 40,
                  color: "2E5090",
                }),
                new TextRun({
                  text: tripData?.location || "Location not specified",
                  size: 32,
                  break: 1,
                }),
              ],
            }),

            // Trip Overview Section
            new Paragraph({
              spacing: { before: 300, after: 200 },
              children: [
                new TextRun({
                  text: "Trip Overview",
                  bold: true,
                  size: 28,
                  color: "2E5090",
                }),
              ],
            }),
            new Paragraph({
              spacing: { before: 100, after: 100 },
              bullet: {
                level: 0,
              },
              children: [
                new TextRun({ text: "Duration: ", bold: true }),
                new TextRun({ text: tripData?.duration || "N/A" }),
              ],
            }),
            new Paragraph({
              spacing: { before: 100, after: 100 },
              bullet: {
                level: 0,
              },
              children: [
                new TextRun({ text: "Budget: ", bold: true }),
                new TextRun({ text: tripData?.budget || "N/A" }),
              ],
            }),
            new Paragraph({
              spacing: { before: 100, after: 200 },
              bullet: {
                level: 0,
              },
              children: [
                new TextRun({ text: "Travelers: ", bold: true }),
                new TextRun({ text: tripData?.travelers || "N/A" }),
              ],
            }),

            // Hotels Section
            new Paragraph({
              spacing: { before: 300, after: 200 },
              children: [
                new TextRun({
                  text: "Recommended Hotels",
                  bold: true,
                  size: 28,
                  color: "2E5090",
                }),
              ],
            }),
            ...(tripData?.hotels || []).flatMap((hotel) => [
              new Paragraph({
                spacing: { before: 200 },
                children: [
                  new TextRun({
                    text: hotel.hotelName,
                    bold: true,
                    size: 24,
                  }),
                ],
              }),
              new Paragraph({
                spacing: { before: 100 },
                children: [
                  new TextRun({ text: "Address: ", bold: true }),
                  new TextRun({ text: hotel.hotelAddress }),
                ],
              }),
              new Paragraph({
                spacing: { before: 100 },
                children: [
                  new TextRun({ text: "Price: ", bold: true }),
                  new TextRun({ text: hotel.price }),
                ],
              }),
              new Paragraph({
                spacing: { before: 100 },
                children: [
                  new TextRun({ text: "Rating: ", bold: true }),
                  new TextRun({ text: `${hotel.rating} stars` }),
                ],
              }),
              new Paragraph({
                spacing: { before: 100, after: 200 },
                children: [
                  new TextRun({ text: "Description: ", bold: true }),
                  new TextRun({ text: hotel.description }),
                ],
              }),
            ]),

            // Itinerary Section
            new Paragraph({
              spacing: { before: 300, after: 200 },
              children: [
                new TextRun({
                  text: "Daily Itinerary",
                  bold: true,
                  size: 28,
                  color: "2E5090",
                }),
              ],
            }),
            ...Object.entries(tripData?.itinerary || {}).flatMap(
              ([day, activity]) => [
                // Day Header
                new Paragraph({
                  spacing: { before: 200 },
                  children: [
                    new TextRun({
                      text: `${day.charAt(0).toUpperCase() + day.slice(1, 3)} ${day.slice(3)}`,
                      bold: true,
                      size: 24,
                      color: "4472C4",
                    }),
                  ],
                }),
                new Paragraph({
                  spacing: { before: 100 },
                  children: [
                    new TextRun({ text: "Theme: ", bold: true }),
                    new TextRun({ text: activity.theme }),
                  ],
                }),
                new Paragraph({
                  spacing: { before: 100, after: 200 },
                  children: [
                    new TextRun({
                      text: "Best Time to Visit: ",
                      bold: true,
                    }),
                    new TextRun({ text: activity.bestTimeToVisit }),
                  ],
                }),
                // Places for the day
                ...activity.places
                  .map((place) => [
                    new Paragraph({
                      spacing: { before: 100 },
                      children: [
                        new TextRun({
                          text: place.placeName,
                          bold: true,
                          size: 22,
                        }),
                      ],
                    }),
                    new Paragraph({
                      spacing: { before: 100 },
                      children: [
                        new TextRun({ text: "📝 Details: ", bold: true }),
                        new TextRun({ text: place.placeDetails }),
                      ],
                    }),
                    new Paragraph({
                      spacing: { before: 100 },
                      children: [
                        new TextRun({
                          text: "🎫 Ticket Pricing: ",
                          bold: true,
                        }),
                        new TextRun({ text: place.ticketPricing }),
                      ],
                    }),
                    new Paragraph({
                      spacing: { before: 100, after: 200 },
                      children: [
                        new TextRun({
                          text: "🚗 Time to Travel: ",
                          bold: true,
                        }),
                        new TextRun({ text: place.timeToTravel }),
                      ],
                    }),
                  ])
                  .flat(),
              ]
            ),

            // Footer
            new Paragraph({
              spacing: { before: 300, after: 200 },
              alignment: "CENTER",
              children: [
                new TextRun({
                  text: "Generated by TourIt",
                  italic: true,
                  size: 20,
                  color: "808080",
                }),
              ],
            }),
          ],
        },
      ],
    });

    // Generate and save the document
    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${tripData?.location || "trip"}-itinerary.docx`);
  };

  const GetPlacePhoto = useCallback(async (placeName) => {
    const data = {
      textQuery: placeName
    }
    try {
      const resp = await GetPlaceDetails(data);
      if (resp.data.places[0]?.photos?.[0]?.name) {
        const photoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[0].name);
        setPlacePhotos(prev => ({...prev, [placeName]: photoUrl}));
      }
    } catch (error) {
      console.error("Error fetching place photo:", error);
    }
  }, []);

  const GetHotelPhoto = useCallback(async (hotelName, hotelAddress) => {
    const data = {
      textQuery: `${hotelName} ${hotelAddress}`
    }
    try {
      const resp = await GetPlaceDetails(data);
      if (resp.data.places[0]?.photos?.[0]?.name) {
        const photoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[0].name);
        setHotelPhotos(prev => ({...prev, [hotelName]: photoUrl}));
      }
    } catch (error) {
      console.error("Error fetching hotel photo:", error);
    }
  }, []);

  const GetLocationPhoto = useCallback(async () => {
    if (tripData?.location) {
      const data = {
        textQuery: tripData.location
      }
      try {
        const resp = await GetPlaceDetails(data);
        if (resp.data.places[0]?.photos?.[0]?.name) {
          const photoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[0].name);
          setPhotoUrl(photoUrl);
        }
      } catch (error) {
        console.error("Error fetching location photo:", error);
      }
    }
  }, [tripData?.location]);

  useEffect(() => {
    GetLocationPhoto();
    // Fetch photos for hotels
    if (tripData?.hotels) {
      tripData.hotels.forEach(hotel => {
        GetHotelPhoto(hotel.hotelName, hotel.hotelAddress);
      });
    }
    // Fetch photos for places
    if (tripData?.itinerary) {
      Object.values(tripData.itinerary).forEach(day => {
        day.places.forEach(place => {
          GetPlacePhoto(place.placeName);
        });
      });
    }
  }, [trip, GetLocationPhoto, GetHotelPhoto, GetPlacePhoto, tripData?.hotels, tripData?.itinerary]);

  return (
    <div className="px-4 sm:px-6 lg:px-8 ">
      {/* Image Section */}
      <img
        src={photoUrl}
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
        <Button onClick={exportToWord}>
          <ImDownload3  />
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
                      src={hotelPhotos[hotel.hotelName] || "/trip.jpg"}
                      alt={hotel.hotelName}
                      className="w-full h-[200px] object-cover rounded-lg mb-4"
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
                            src={placePhotos[place.placeName] || "/trip.jpg"}
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
    <div className="flex justify-center items-center mt-5">
    <p className="text-sm text-gray-500">Generated by TourIt  &#169; 2025</p>
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
