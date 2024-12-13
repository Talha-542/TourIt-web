import  { useEffect } from 'react';
import './App.css';
import Hero from './components/ui/custom/Hero';
import Intro from './components/ui/custom/Intro/Intro';



const App = () => {
  useEffect(() => {
    document.title = "TourIt";

    const favicon = document.querySelector("link[rel='icon']") || document.createElement('link');
    favicon.rel = "icon";
    favicon.href = "/favicon.ico";
    document.head.appendChild(favicon);
  }, []);

  return (
    <>
      <Hero />
      <Intro />
    </>
  );
};

export default App;
