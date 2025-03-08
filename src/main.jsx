import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTrip from "./create-trip/index";
import { Header } from "./components/ui/custom/Header";
import { Toaster } from "./components/ui/sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ViewTrip from "./view-trip/[tripId]";
import Mytrips from "./my-trips/trips";
import AboutUs from "./aboutUs";
import ContactUs from "./contactUs";
import { CookiePolicy, PrivacyPolicy, TermsOfService } from "./policies";
import TodoList from './components/TodoList';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/create-trip",
    element: <CreateTrip />,
  },

  {
    path: "/view-trip/:tripId",
    element: <ViewTrip/>,
  },
  {
    path: "/view-trip/:tripId/todo",
    element: <TodoList />,
  },
  {
    path: "/my-trips",
    element: <Mytrips/>,
  },
  {
    path: "/about",
    element: <AboutUs/>,
  },
  {
    path: "/contact",
    element: <ContactUs/>,
  },
  {
    path: "/terms",
    element: <TermsOfService/>,
  },
  {
    path: "/cookies",
    element: <CookiePolicy/>,
  },
  {
    path: "/privacy",
    element: <PrivacyPolicy/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Header />
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
);
