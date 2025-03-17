import { useEffect, useState } from "react";
import { Button } from "../button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";

export const Header = () => {
  const users = JSON.parse(localStorage.getItem("user"));
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };
  
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    console.log(users);
  }, [users]);
  
  const login = useGoogleLogin({
    onSuccess: (response) => {
      GetUserProfile(response);
    },
    onError: (error) => {
      console.error("Google Login Error:", error);
      toast.error("Google login failed. Please try again.");
    },
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 border-b">
      <div className="max-w-7xl mx-auto p-2 flex justify-between items-center">
        <Link to="/">
        <div className="flex items-center gap-2">
          <img
            src="/src/components/ui/custom/logo.png"
            className="w-10 h-10 object-contain"
            alt="TourIt Logo"
          />
          <span className="text-2xl font-extrabold text-primary">Tour It</span>
        </div>
        </Link>

        <div>
          {users ? (
            <div className="flex items-center gap-4">
              {/* Show buttons only on medium screens and larger */}
              <div className="hidden md:flex items-center gap-4">
                <a href="/create-trip" className="text-black">
                  <Button variant="outline" className="rounded-full hover:bg-primary/10">
                    + Create Trip
                  </Button>
                </a>
                <a href="/my-trips" className="text-black">
                  <Button variant="outline" className="rounded-full hover:bg-primary/10">
                    My trips
                  </Button>
                </a>
              </div>
              
              <Popover>
                <PopoverTrigger className="rounded-full p-0 hover:ring-2 hover:ring-primary/20 transition-all">
                  <img
                    src={users.picture}
                    alt="user"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                </PopoverTrigger>
                <PopoverContent className="w-56">
                  <div className="flex flex-col gap-2 p-2">
                    {/* Show buttons only on small screens */}
                    <div className="md:hidden space-y-2 mb-2">
                      <a href="/create-trip" className="block w-full">
                        <Button variant="outline" className="w-full justify-start">
                          + Create Trip
                        </Button>
                      </a>
                      <a href="/my-trips" className="block w-full">
                        <Button variant="outline" className="w-full justify-start">
                          My trips
                        </Button>
                      </a>
                      <div className="border-t my-2"></div>
                    </div>
                    <Button onClick={handleLogout} variant="ghost" className="w-full justify-start">
                      Logout
                    </Button>
                    <p className="text-sm text-muted-foreground text-center">Under Development</p>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <Button 
              onClick={() => setOpenDialog(true)}
              className="rounded-full hover:bg-primary/90"
            >
              Sign Up
            </Button>
          )}
        </div>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader className="text-center">
              <DialogTitle className="text-2xl font-bold">Welcome to Tour It</DialogTitle>
              <DialogDescription className="flex flex-col items-center gap-4">
                <img src="/src/components/ui/custom/logo.png" alt="Tour It Logo" className="w-16 h-16 mt-4" />
                <div className="space-y-2">
                  <h2 className="font-semibold text-lg">Sign In with Google</h2>
                  <p className="text-sm text-muted-foreground">
                    Sign in to the App to keep your Trips Save
                  </p>
                </div>
                <Button
                  onClick={login}
                  className="w-full mt-2 flex gap-2 items-center justify-center"
                >
                  <FcGoogle className="text-xl" /> Sign In with Google
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
};