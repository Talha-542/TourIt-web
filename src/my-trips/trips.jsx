import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../service/firebaseConfig";
import { useState } from "react";
import MyTripCard from "./components/MyTripCard";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";

function Mytrips() {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    setIsLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
      return;
    }

    const q = query(
      collection(db, "Trips"),
      where("userEmail", "==", user?.email)
    );
    const querySnapshot = await getDocs(q);

    const trips = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    }));
    setUserTrips(trips);
    setIsLoading(false);
  };

  const handleCardClick = (tripId) => {
    navigate(`/view-trip/${tripId}`);
  };

  const handleNoteUpdate = async (tripId, note) => {
    try {
      const tripRef = doc(db, "Trips", tripId);
      await updateDoc(tripRef, {
        note: note
      });
      setUserTrips(userTrips.map(trip => 
        trip.id === tripId ? { ...trip, note } : trip
      ));
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="px-6 py-20 md:px-20 lg:px-44 xl:px-56">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <motion.h1 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-4xl font-bold text-primary"
            >
              My Trips
            </motion.h1>
            <motion.p 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 mt-2"
            >
              Your personal travel collection
            </motion.p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/create-trip')}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg shadow-md hover:bg-primary/90 transition-colors"
          >
            <FaPlus size={16} />
            New Trip
          </motion.button>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {/* Empty State */}
            {userTrips.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <img 
                  src="/empty-trips.svg" 
                  alt="No trips" 
                  className="w-48 h-48 mx-auto mb-6 opacity-50"
                />
                <h2 className="text-2xl font-semibold text-gray-600 mb-2">No trips yet</h2>
                <p className="text-gray-500 mb-6">Start planning your next adventure!</p>
                <button
                  onClick={() => navigate('/create-trip')}
                  className="bg-primary text-white px-6 py-3 rounded-lg shadow-md hover:bg-primary/90 transition-colors"
                >
                  Create Your First Trip
                </button>
              </motion.div>
            ) : (
              /* Grid Layout */
              <motion.div 
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {userTrips.map((trip) => (
                  <motion.div key={trip.id} variants={item}>
                    <MyTripCard 
                      trip={trip} 
                      onNoteUpdate={handleNoteUpdate}
                      onCardClick={handleCardClick}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Mytrips;
