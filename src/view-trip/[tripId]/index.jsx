import { useEffect, useState } from "react";
import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import InfoSection from "../components/InfoSection";
// import Hotels from "../components/Hotels";

function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);

  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);
  const GetTripData = async () => {
    const docRef = doc(db, "Trips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document", docSnap.data());
      setTrip(docSnap.data());
    } else {
      console.log("No Document available");
      toast.error("No trip Found!");
    }
  };
  return (
    <div className="content-container max-w-7xl mx-auto px-4">
      {/* {tripId} */}
      {/* Info Section */}
      <InfoSection trip={trip} />
      {/* <Hotels trip={GetTripData()} /> */}
          </div>
  );
}

export default ViewTrip;
