import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../service/firebaseConfig";
import { useState } from "react";
import MyTripCard from "./components/MyTripCard";
import { Link } from "react-router-dom";

function Mytrips() {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
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

    // Include document ID in the trip data
    const trips = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    }));
    setUserTrips(trips);
  };

  return (
    <div className="px-10 py-20 md:px-20 lg:px-44 xl:px-56">
      <h1 className="text-4xl font-bold text-primary">My trips</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {userTrips.map((trip, index) => (
          <Link to={`/view-trip/${trip.id}`} key={index} className="text-black">
            <MyTripCard trip={trip} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Mytrips;
