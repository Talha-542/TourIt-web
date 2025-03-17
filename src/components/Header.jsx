import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {  CheckSquare } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

function Header() {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    fetchUserTrips();
  }, []);

  const fetchUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

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
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* ... existing header content ... */}

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <CheckSquare className="h-4 w-4" />
                  My Todo Lists
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {userTrips.map((trip) => {
                  const tripData = JSON.parse(trip.tripData.replace(/```json|```/g, "").trim());
                  return (
                    <DropdownMenuItem
                      key={trip.id}
                      onClick={() => navigate(`/view-trip/${trip.id}/todo`)}
                      className="flex items-center gap-2"
                    >
                      <CheckSquare className="h-4 w-4" />
                      <span>{tripData.location}</span>
                    </DropdownMenuItem>
                  );
                })}
                {userTrips.length === 0 && (
                  <DropdownMenuItem disabled>
                    No trips available
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header; 