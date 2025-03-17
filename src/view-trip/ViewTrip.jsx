import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../service/firebaseConfig";
import TodoList from "@/components/TodoList";

function ViewTrip() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const tripDoc = await getDoc(doc(db, "Trips", id));
        if (tripDoc.exists()) {
          setTrip({ ...tripDoc.data(), id: tripDoc.id });
        }
      } catch (error) {
        console.error("Error fetching trip:", error);
      }
    };

    if (id) {
      fetchTrip();
    }
  }, [id]);

  if (!trip) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-6">
          {JSON.parse(trip.tripData)?.location || "Trip Details"}
        </h1>
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <TodoList tripId={id} />
        </div>
      </div>
    </div>
  );
}

export default ViewTrip; 