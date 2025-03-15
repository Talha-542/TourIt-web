import { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { GetPlaceDetails } from "@/service/GlobalApi";
import { FaPencilAlt } from "react-icons/fa";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { CheckSquare, MoreVertical, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxWidthPx=1000&maxHeightPx=1000&key=" +
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
  
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
function MyTripCard({ trip, onNoteUpdate, onCardClick, onDeleteTrip }) {
  const [photoUrl, setPhotoUrl] = useState("");
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [note, setNote] = useState(trip.note || "");
  let tripData = null;
  const navigate = useNavigate();

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

  const handleNoteSubmit = () => {
    onNoteUpdate(trip.id, note);
    setIsNoteOpen(false);
  };

  const handleCardContentClick = (e) => {
    // Don't navigate if clicking on the note button or dialog
    if (!e.target.closest('.note-button') && !e.target.closest('.dialog-content')) {
      onCardClick(trip.id);
    }
  };

  return (
    <div 
      className="relative flex flex-col  transition-all duration-300 cursor-pointer group"
      onClick={(e) => {
        handleCardContentClick(e);
        scrollToTop();
      }}
    >
      <div className="relative">
        <img
          src={photoUrl || "trip.jpg"}
          alt={tripData?.location || "Trip location"}
          className="my-2 rounded-xl object-cover w-full h-48"
        />
        
        {/* Sticky Note Display */}
        <AnimatePresence>
          {trip.note && (
            <motion.div
              initial={{ rotate: -5, scale: 0.8, opacity: 0 }}
              animate={{ rotate: -5, scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              whileHover={{ rotate: 0, scale: 1.05, zIndex: 20 }}
              className="absolute -bottom-3 -left-2 w-2/3 min-h-[80px] bg-yellow-100 p-3 shadow-md transform rotate-[-5deg] cursor-pointer"
              style={{
                backgroundImage: "linear-gradient(to bottom right, #fff9c4, #fff59d)",
                boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
              }}
              onClick={(e) => {
                e.stopPropagation();
                setIsNoteOpen(true);
              }}
            >
              <div className="font-handwriting text-sm overflow-hidden line-clamp-3">
                {trip.note}
              </div>
              <div className="absolute bottom-1 right-2 text-xs text-gray-500">
                Click to edit
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons Container */}
        <div className="absolute top-4 right-4 flex gap-2">
          {/* Desktop View Buttons - Hidden on Small Screens */}
          <div className="hidden sm:flex gap-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/view-trip/${trip.id}/todo`);
              }}
              className="note-button bg-white p-2 rounded-full shadow-md 
                hover:bg-gray-100 transition-opacity duration-300
                opacity-0 group-hover:opacity-100"
            >
              <CheckSquare className="text-primary h-4 w-4" />
            </button>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsNoteOpen(true);
              }}
              className="note-button bg-white p-2 rounded-full shadow-md 
                hover:bg-gray-100 transition-opacity duration-300
                opacity-0 group-hover:opacity-100"
            >
              <FaPencilAlt className="text-primary" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="font-semibold">{tripData?.location || "No location available"}</h2>
            <h2 className="text-sm text-gray-600">{tripData?.duration} with {tripData?.budget} budget</h2>
          </div>
          
          {/* More Options Menu - Always Visible */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <button className="note-button p-1 rounded-full bg-white hover:bg-gray-100">
                <MoreVertical className="h-5 w-5 text-gray-600" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48" onClick={(e) => e.stopPropagation()}>
              {/* Mobile View Options - Shown only on Small Screens */}
              <div className="block sm:hidden">
                <DropdownMenuItem onClick={() => navigate(`/view-trip/${trip.id}/todo`)}>
                  <CheckSquare className="mr-2 h-4 w-4" />
                  <span>Todo List</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsNoteOpen(true)}>
                  <FaPencilAlt className="mr-2 h-4 w-4" />
                  <span>Add Note</span>
                </DropdownMenuItem>
              </div>
              {/* Delete Option - Always Visible */}
              <DropdownMenuItem 
                className="text-red-600 focus:text-red-600" 
                onClick={() => onDeleteTrip(trip.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete Trip</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Dialog open={isNoteOpen} onOpenChange={setIsNoteOpen}>
        <DialogContent className="dialog-content" onClick={(e) => e.stopPropagation()}>
          <DialogHeader>
            <DialogTitle>Add Note for {tripData?.location}</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full p-2 border rounded-md"
              rows={4}
              placeholder="Add your note here..."
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsNoteOpen(false);
                }}
                className="px-4 py-2 border rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNoteSubmit();
                }}
                className="px-4 py-2 bg-primary text-white rounded-md"
              >
                Save Note
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

MyTripCard.propTypes = {
  trip: PropTypes.shape({
    tripData: PropTypes.string,
    id: PropTypes.string,
    note: PropTypes.string,
  }).isRequired,
  onNoteUpdate: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
  onDeleteTrip: PropTypes.func.isRequired,
};

export default MyTripCard;
