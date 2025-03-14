import { createContext, useContext, useState, useEffect } from 'react';
import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

// Create context
const HistoryChatbotContext = createContext();

// Custom hook to use the context
export const useHistoryChatbot = () => {
  const context = useContext(HistoryChatbotContext);
  if (!context) {
    throw new Error('useHistoryChatbot must be used within a HistoryChatbotProvider');
  }
  return context;
};

// Provider component
export const HistoryChatbotProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [tripData, setTripData] = useState(null);

  // Extract location information from the URL and update context
  useEffect(() => {
    // Listen for route changes
    const handleRouteChange = () => {
      const path = window.location.pathname;

      // Reset trip data when navigating away from trip view
      if (!path.includes('/view-trip/')) {
        setTripData(null);
        setCurrentLocation(null);
        return;
      }

      // Extract trip ID from URL
      if (path.includes('/view-trip/')) {
        const tripId = path.split('/view-trip/')[1].split('/')[0];

        // Try to get trip data from Firestore
        const fetchTripData = async () => {
          try {
            // First check localStorage for cached data
            const cachedTrips = JSON.parse(localStorage.getItem('allTrips') || '[]');
            const cachedTrip = cachedTrips.find(t => t.id === tripId);

            if (cachedTrip && cachedTrip.tripData) {
              processTripData(cachedTrip.tripData);
            } else {
              // If not in localStorage, try to fetch from Firestore
              const tripDocRef = doc(db, "Trips", tripId);
              const tripDoc = await getDoc(tripDocRef);

              if (tripDoc.exists()) {
                const tripData = tripDoc.data();
                if (tripData.tripData) {
                  processTripData(tripData.tripData);
                }
              }
            }
          } catch (error) {
            console.error('Error fetching trip data:', error);
          }
        };

        fetchTripData();
      }
    };

    // Helper function to process trip data
    const processTripData = (data) => {
      try {
        // Parse the trip data if it's a JSON string
        let parsedData;
        if (typeof data === 'string') {
          try {
            parsedData = JSON.parse(data);
          } catch (e) {
            // If it's not valid JSON, use the string as is
            parsedData = { location: data };
          }
        } else {
          parsedData = data;
        }

        // Set the location from the trip data
        if (parsedData.location) {
          setCurrentLocation(parsedData.location);
        }

        // Store the full trip data
        setTripData(parsedData);
      } catch (error) {
        console.error('Error processing trip data:', error);
      }
    };

    // Initial check
    handleRouteChange();

    // Add event listener for route changes
    window.addEventListener('popstate', handleRouteChange);

    // Also listen for navigation events that don't trigger popstate
    const originalPushState = history.pushState;
    history.pushState = function() {
      originalPushState.apply(this, arguments);
      handleRouteChange();
    };

    // Cleanup
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      history.pushState = originalPushState;
    };
  }, []);

  // Toggle chatbot visibility
  const toggleChatbot = () => {
    setIsOpen(prev => !prev);
  };

  // Close chatbot
  const closeChatbot = () => {
    setIsOpen(false);
  };

  // Open chatbot
  const openChatbot = () => {
    setIsOpen(true);
  };

  // Context value
  const value = {
    isOpen,
    toggleChatbot,
    openChatbot,
    closeChatbot,
    currentLocation,
    tripData
  };

  return (
    <HistoryChatbotContext.Provider value={value}>
      {children}
    </HistoryChatbotContext.Provider>
  );
};

export default HistoryChatbotContext;
