import { useEffect } from 'react';
import './App.css';
import Hero from './components/ui/custom/Hero';
import Intro from './components/ui/custom/Intro/Intro';

const App = () => {
  useEffect(() => {
    document.title = "TourIt";

    const favicon = document.querySelector("link[rel='icon']");
    if (!favicon) {
      const newFavicon = document.createElement('link');
      newFavicon.rel = "icon";
      newFavicon.type = "image/svg+xml";
      newFavicon.href = "/favicon.svg";
      document.head.appendChild(newFavicon);
    }
  }, []);

  return (
    <>
      <Hero />
      <Intro />
    </>
  );
};

export default App;
