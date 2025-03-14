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
import HistoryChatbot from './components/HistoryChatbot';
import { HistoryChatbotProvider } from './components/HistoryChatbot/HistoryChatbotContext';

// Create a wrapper component that includes the Header, Toaster, and HistoryChatbot
const AppWrapper = ({ children }) => (
  <>
    <Header />
    <Toaster position="top-right" />
    {children}
    <HistoryChatbot />
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppWrapper><App /></AppWrapper>,
  },
  {
    path: "/create-trip",
    element: <AppWrapper><CreateTrip /></AppWrapper>,
  },
  {
    path: "/view-trip/:tripId",
    element: <AppWrapper><ViewTrip /></AppWrapper>,
  },
  {
    path: "/view-trip/:tripId/todo",
    element: <AppWrapper><TodoList /></AppWrapper>,
  },
  {
    path: "/my-trips",
    element: <AppWrapper><Mytrips /></AppWrapper>,
  },
  {
    path: "/about",
    element: <AppWrapper><AboutUs /></AppWrapper>,
  },
  {
    path: "/contact",
    element: <AppWrapper><ContactUs /></AppWrapper>,
  },
  {
    path: "/terms",
    element: <AppWrapper><TermsOfService /></AppWrapper>,
  },
  {
    path: "/cookies",
    element: <AppWrapper><CookiePolicy /></AppWrapper>,
  },
  {
    path: "/privacy",
    element: <AppWrapper><PrivacyPolicy /></AppWrapper>,
  },
]);

// Create a root component that wraps everything with the necessary providers
const Root = () => (
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <HistoryChatbotProvider>
      <RouterProvider router={router} />
    </HistoryChatbotProvider>
  </GoogleOAuthProvider>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
