import { Button } from "@/components/ui/button";
import { GetPlaceDetails } from "@/service/GlobalApi";
import { ImDownload3 } from "react-icons/im";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useCallback, useState } from "react";
import { exportToWordDocument } from "@/Hooks/Export";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaFileWord, FaFilePdf, FaShareAlt, FaMapMarkerAlt, FaCalendarAlt, FaWallet, FaUsers, FaClock, FaStar, FaHotel, FaMap, FaInfoCircle, FaTicketAlt } from "react-icons/fa";
import { exportToPdf } from "@/Hooks/Pdf";
import { toast } from "sonner";
import ArrowDown from "../../../public/Arrowdown"

const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxWidthPx=1000&maxHeightPx=1000&key=' + import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState("");
  const [hotelPhotos, setHotelPhotos] = useState({});
  const [placePhotos, setPlacePhotos] = useState({});
  const [activeTab, setActiveTab] = useState("overview");
  const [openAccordions, setOpenAccordions] = useState({});
  let tripData = null;

  // Attempt to parse tripData
  if (trip?.tripData) {
    try {
      tripData = JSON.parse(trip.tripData.replace(/```json|```/g, "").trim());
    } catch (error) {
      console.error("Error parsing tripData:", error.message);
    }
  }

  const GetPlacePhoto = useCallback(async (placeName) => {
    const data = {
      textQuery: placeName
    };
    try {
      const resp = await GetPlaceDetails(data);
      if (resp.data.places[0]?.photos?.[0]?.name) {
        const photoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[0].name);
        setPlacePhotos(prev => ({ ...prev, [placeName]: photoUrl }));
      }
    } catch (error) {
      console.error("Error fetching place photo:", error);
    }
  }, []);

  const GetHotelPhoto = useCallback(async (hotelName, hotelAddress) => {
    const data = {
      textQuery: `${hotelName} ${hotelAddress}`
    };
    try {
      const resp = await GetPlaceDetails(data);
      if (resp.data.places[0]?.photos?.[0]?.name) {
        const photoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[0].name);
        setHotelPhotos(prev => ({ ...prev, [hotelName]: photoUrl }));
      }
    } catch (error) {
      console.error("Error fetching hotel photo:", error);
    }
  }, []);

  const GetLocationPhoto = useCallback(async () => {
    if (tripData?.location) {
      const data = {
        textQuery: tripData.location
      };
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

  const handleExport = () => {
    if (tripData) {
      exportToWordDocument(tripData);
    }
  };

  const handleShare = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      toast.success("Link copied to clipboard!");
    }).catch(err => {
      console.error('Failed to copy link:', err);
    });
  };

  const toggleAccordion = (dayIndex) => {
    setOpenAccordions(prev => ({
      ...prev,
      [dayIndex]: !prev[dayIndex]
    }));
  };

  return (
    <div id="pdf-content" className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Hero Section */}
      <div className="relative mb-8 rounded-2xl overflow-hidden shadow-lg">
        <div className="absolute inset-0 bg-black/40 z-10 flex items-end">
          <div className="p-6 text-white w-full">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {tripData?.location || "Destination"}
            </h1>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm">
                <FaCalendarAlt className="mr-1 h-4 w-4" />
                {tripData?.duration || "N/A"}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm">
                <FaWallet className="mr-1 h-4 w-4" />
                {tripData?.budget || "N/A"}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm">
                <FaUsers className="mr-1 h-4 w-4" />
                {tripData?.travelers || "N/A"}
              </span>
            </div>
            <div className="flex space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="primary" className="text-white" size="sm">
                    <ImDownload3 className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={handleExport}>
                    <FaFileWord className="h-4 w-4 mr-2" />
                    Export as Word
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => exportToPdf(tripData)}>
                    <FaFilePdf className="h-4 w-4 mr-2" />
                    Export as PDF
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleShare}>
                    <FaShareAlt className="h-4 w-4 mr-2" />
                    Share as Link
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        <img
          src={photoUrl || "/trip.jpg"}
          alt={tripData?.location || "Destination"}
          className="h-[300px] md:h-[400px] lg:h-[500px] w-full object-cover"
        />
      </div>

      {/* Tab Navigation */}
      <div className="mb-8">
        <div >
          <button
            className={`px-6 py-3 font-medium text-sm whitespace-nowrap rounded-xl transition-all duration-300 mx-1
        ${activeTab === "overview"
                ? "bg-white text-black hover:text-white hover:bg-primary shadow-md transform scale-105"
                : "text-gray-500 hover:text-primary hover:bg-white/50 hover:border-primary/50"}`}
            onClick={() => setActiveTab("overview")}
          >
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
              <span>Overview</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("hotels")}
            className={`px-6 py-3 font-medium text-sm whitespace-nowrap rounded-xl transition-all duration-300 mx-1
        ${activeTab === "hotels"
                ? "bg-white text-black hover:text-white hover:bg-primary shadow-md transform scale-105"
                : "text-gray-500 hover:text-primary hover:bg-white/50 hover:border-primary/50"}`}
          >
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
              <span>Accommodations</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("itinerary")}
            className={`px-6 py-3 font-medium text-sm whitespace-nowrap rounded-xl transition-all duration-300 mx-1
        ${activeTab === "itinerary"
                ? "bg-white text-black hover:text-white hover:bg-primary shadow-md transform scale-105"
                : "text-gray-500 hover:text-primary hover:bg-white/50 hover:border-primary/50"}`}
          >
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span>Itinerary</span>
            </div>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Trip Overview</h2>
              <p className="text-sm text-gray-500 mb-4">Essential details about your trip to {tripData?.location}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <FaCalendarAlt className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Duration</p>
                    <p className="font-semibold">{tripData?.duration || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <FaWallet className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Budget</p>
                    <p className="font-semibold">{tripData?.budget || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <FaUsers className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Travelers</p>
                    <p className="font-semibold">{tripData?.travelers || "N/A"}</p>
                  </div>
                </div>
              </div>

              <hr className="my-6" />

              <div>
                <h3 className="text-lg font-semibold mb-3">Quick Highlights</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {tripData?.itinerary && Object.entries(tripData.itinerary).map(([day, activity], index) => (
                    index < 4 && (
                      <li key={index} className="flex gap-2 items-center">
                        <span className="h-6 w-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium">
                          {index + 1}
                        </span>
                        <span className="text-sm">
                          {day.charAt(0).toUpperCase() + day.slice(1)}: {activity.theme}
                        </span>
                      </li>
                    )
                  ))}
                </ul>
                {tripData?.itinerary && Object.keys(tripData.itinerary).length > 4 && (
                  <Button
                    variant="primary"
                    size="sm"
                    className="my-4"
                    onClick={() => setActiveTab("itinerary")}
                  >
                    See full itinerary
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Hotels Tab */}
        {activeTab === "hotels" && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Recommended Accommodations</h2>
              <p className="text-gray-500">Handpicked hotels for your stay in {tripData?.location}</p>
            </div>

            {tripData?.hotels && tripData.hotels.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tripData.hotels.map((hotel, index) => (
                  <Link
                    key={index}
                    to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel?.hotelName + "," + hotel?.hotelAddress)}`}
                    target="_blank"
                    className="block"
                  >
                    <div className="bg-white rounded-lg overflow-hidden border shadow-sm h-full transition-all hover:shadow-lg hover:scale-[1.02]">
                      <div className="relative h-48">
                        <img
                          src={hotelPhotos[hotel.hotelName] || "/trip.jpg"}
                          alt={hotel.hotelName}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-md bg-white/80 text-black backdrop-blur-sm text-xs font-medium">
                            <FaStar className="h-3 w-3 mr-1 text-yellow-500" />
                            {hotel?.rating || "N/A"}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="text-lg font-semibold text-black truncate">{hotel?.hotelName}</h4>
                        <p className="text-xs text-gray-500 flex items-center mb-3">
                          <FaMapMarkerAlt className="h-3 w-3 mr-1" />
                          {hotel?.HotelAddress || hotel?.hotelAddress}
                        </p>

                        <div className="flex items-center justify-between mb-3">
                          <span className="inline-flex items-center text-black px-2 py-1 rounded-md border text-xs font-medium">
                            <FaHotel className="h-3 w-3 mr-1 " />
                            Hotel
                          </span>
                          <p className="font-semibold text-gray-700">{hotel?.price}</p>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-3 mb-3">{hotel.description}</p>
                        <Button
                          size="default"
                          variant="ghost"
                        >
                          <FaMap className="h-4 w-4 mr-1" /> View on Maps
                        </Button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg border p-6 flex items-center justify-center shadow-sm">
                <p className="text-gray-500">No accommodations specified for this trip.</p>
              </div>
            )}
          </div>
        )}

        {/* Itinerary Tab */}
        {activeTab === "itinerary" && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Daily Itinerary</h2>
              <p className="text-gray-500">Your day-by-day plan for {tripData?.location}</p>
            </div>

            {tripData?.itinerary && Object.entries(tripData.itinerary).length > 0 ? (
              <div className="space-y-4">
                {Object.entries(tripData.itinerary).map(([day, activity], dayIndex) => (
                  <div key={dayIndex} className="border rounded-lg overflow-hidden shadow-sm">
                    <button
                      className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50"
                      onClick={() => toggleAccordion(dayIndex)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="h-8 w-8 rounded-full flex items-center justify-center bg-primary/10 text-primary font-medium">
                          {dayIndex + 1}
                        </span>
                        <div className="text-left">
                          <h3 className="font-semibold text-lg">{day.charAt(0).toUpperCase() + day.slice(1)}</h3>
                          <p className="text-sm text-gray-500">{activity.theme}</p>
                        </div>
                      </div>
                      <span className={`transition-transform ${openAccordions[dayIndex] ? 'rotate-180' : ''}`}>
                        <ArrowDown />
                      </span>
                    </button>
                    {openAccordions[dayIndex] && (
                      <div className="px-4 pt-2 pb-4">
                        <div className="mb-4 bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <FaInfoCircle className="h-4 w-4 text-primary" />
                            <span className="font-medium">Best Time to Visit:</span>
                          </div>
                          <p className="text-sm text-gray-600 ml-6">{activity.bestTimeToVisit}</p>
                        </div>

                        <div className="space-y-4 mt-4">
                          {activity.places.map((place, placeIndex) => (
                            <Link
                              key={placeIndex}
                              to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.placeName)}`}
                              target="_blank"
                              className="block"
                            >
                              <div className="bg-white rounded-lg overflow-hidden border shadow-sm transition-all hover:shadow-md">
                                <div className="flex flex-col md:flex-row">
                                  <div className="w-full md:w-1/4 h-48 md:h-auto">
                                    <img
                                      src={placePhotos[place.placeName] || "/trip.jpg"}
                                      alt={place.placeName}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="w-full md:w-3/4 p-4">
                                    <h4 className="text-lg font-semibold text-black mb-2">{place.placeName}</h4>
                                    <p className="text-sm text-gray-600 mb-4">{place.placeDetails}</p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                      <div className="flex items-center gap-2">
                                        <FaTicketAlt className="h-4 w-4 text-primary" />
                                        <span className="text-gray-700">{place.ticketPricing}</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <FaClock className="h-4 w-4 text-primary" />
                                        <span className="text-gray-700">{place.timeToTravel}</span>
                                      </div>
                                    </div>

                                    <Button
                                      size="default"
                                      variant="ghost"
                                      className="mt-2">
                                      <FaMap className="h-4 w-4 mr-1" /> View on Maps
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg border p-6 flex items-center justify-center shadow-sm">
                <p className="text-gray-500">No itinerary provided for this trip.</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-center items-center mt-12 mb-4">
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