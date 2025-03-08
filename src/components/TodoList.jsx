import { useState, useEffect } from "react";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../service/firebaseConfig";
import { Button } from "@/components/ui/button";
import { Trash2, Save, Calendar, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from 'react-router-dom';
import { toast } from "sonner";

function TodoList() {
  const { tripId } = useParams();
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [originalData, setOriginalData] = useState(null);

  useEffect(() => {
    fetchActivities();
  }, [tripId]);

  const fetchActivities = async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("TripId:", tripId);
      const tripDoc = await getDoc(doc(db, "Trips", tripId));
      
      if (tripDoc.exists()) {
        const tripData = tripDoc.data();
        console.log("Raw trip data:", tripData);
        
        const parsedTripData = JSON.parse(tripData.tripData.replace(/```json|```/g, "").trim());
        console.log("Parsed trip data:", parsedTripData);

        setOriginalData(parsedTripData); // Store original data

        // Check if itinerary exists
        if (!parsedTripData.itinerary) {
          setError("No itinerary found for this trip");
          return;
        }

        // Convert itinerary object to activities list
        const activitiesList = Object.entries(parsedTripData.itinerary).map(([dayKey, dayData]) => {
          return dayData.places.map((place, placeIndex) => ({
            id: `${dayKey}-${placeIndex}`,
            name: place.placeName,
            // Check for completed status in the place data, default to false if not present
            completed: place.completed || false,
            day: parseInt(dayKey.replace('day', ''))
          }));
        }).flat();

        console.log("Final activities list:", activitiesList);
        setActivities(activitiesList);
      } else {
        setError("Trip not found");
      }
    } catch (error) {
      console.error("Detailed error:", error);
      setError("Failed to load itinerary: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = (activityId) => {
    setActivities(activities.map(activity =>
      activity.id === activityId 
        ? { ...activity, completed: !activity.completed } 
        : activity
    ));
    setHasChanges(true);
  };

  const handleDelete = (activityId) => {
    setActivities(activities.filter(activity => activity.id !== activityId));
    setHasChanges(true);
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const tripRef = doc(db, "Trips", tripId);
      const tripDoc = await getDoc(tripRef);
      
      if (tripDoc.exists()) {
        const tripData = JSON.parse(tripDoc.data().tripData.replace(/```json|```/g, "").trim());
        
        // Group activities by day
        const updatedItinerary = {};
        activities.forEach(activity => {
          const dayKey = `day${activity.day}`;
          if (!updatedItinerary[dayKey]) {
            // Preserve original day data structure
            updatedItinerary[dayKey] = {
              ...originalData.itinerary[dayKey],
              places: []
            };
          }
          
          // Find the original place data if it exists
          const originalPlace = originalData.itinerary[dayKey].places.find(
            p => p.placeName === activity.name
          ) || {};
          
          // Add place with completed status preserved
          updatedItinerary[dayKey].places.push({
            ...originalPlace,
            placeName: activity.name,
            completed: activity.completed // Save the completed status
          });
        });

        // Update the trip data
        tripData.itinerary = updatedItinerary;
        
        await updateDoc(tripRef, {
          tripData: JSON.stringify(tripData)
        });

        setHasChanges(false);
        toast.success("Changes saved successfully!");
      }
    } catch (error) {
      console.error("Error saving changes:", error);
      toast.error("Failed to save changes");
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-save checkbox changes after a delay
  useEffect(() => {
    if (hasChanges) {
      const saveTimer = setTimeout(() => {
        handleSave();
      }, 1500); // Save 1.5 seconds after the last change
      
      return () => clearTimeout(saveTimer);
    }
  }, [activities, hasChanges]);

  // Calculate trip stats
  const totalActivities = activities.length;
  const completedActivities = activities.filter(a => a.completed).length;
  const completionPercentage = totalActivities > 0 
    ? Math.round((completedActivities / totalActivities) * 100) 
    : 0;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen mt-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen mt-16">
        <div className="text-red-500 bg-red-50 p-6 rounded-lg shadow-sm border border-red-200 max-w-lg">
          <h3 className="text-lg font-medium mb-2">Error Loading Itinerary</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 pt-20 pb-24 max-w-4xl mx-auto">
      <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl shadow-sm">
        <h1 className="text-2xl font-bold mb-2 text-gray-800">Trip Itinerary</h1>
        <p className="text-gray-600 mb-4">Keep track of your planned activities</p>
        
        {/* Trip Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
            <Calendar className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Total Days</p>
              <p className="text-xl font-bold">{Array.from(new Set(activities.map(a => a.day))).length}</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
            <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-xl font-bold">{completedActivities} of {totalActivities}</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Progress</p>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <p className="text-right text-sm mt-1 font-medium">{completionPercentage}%</p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {/* Group activities by day */}
        {Array.from(new Set(activities.map(a => a.day))).sort((a, b) => a - b).map((day) => (
          <motion.div
            key={day}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center mb-3">
              <div className="bg-indigo-100 text-indigo-800 font-bold rounded-full w-10 h-10 flex items-center justify-center mr-3">
                {day}
              </div>
              <h3 className="text-xl font-medium">Day {day}</h3>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {activities
                .filter(activity => activity.day === day)
                .map((activity, index, arr) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className={`flex items-center justify-between p-4 ${
                      index < arr.length - 1 ? "border-b border-gray-100" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        onClick={() => handleToggle(activity.id)}
                        className={`w-6 h-6 flex items-center justify-center rounded-full cursor-pointer transition-all duration-200 ${
                          activity.completed 
                            ? "bg-green-500 text-white" 
                            : "border-2 border-gray-300 hover:border-blue-400"
                        }`}
                      >
                        {activity.completed && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <span className={`transition-all duration-200 ${
                        activity.completed 
                          ? "line-through text-gray-400 font-normal" 
                          : "text-gray-700 font-medium"
                      }`}>
                        {activity.name}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(activity.id)}
                      className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ))}
                
                {activities.filter(activity => activity.day === day).length === 0 && (
                  <div className="p-4 text-center text-gray-500 italic">
                    No activities for this day
                  </div>
                )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Save Changes Button */}
      {hasChanges && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-lg z-10"
        >
          <div className="max-w-4xl mx-auto flex justify-end">
            <Button
              onClick={handleSave}
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2 rounded-lg shadow-sm"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Saving...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </div>
              )}
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default TodoList;