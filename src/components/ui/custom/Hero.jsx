import { Button } from "../button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="relative min-h-screen">
      {/* Background Image with Parallax Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url('/home-mix.jpg')` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent" />

      {/* Content Container */}
      <div className="relative flex flex-col items-center justify-center min-h-screen px-4 sm:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in">
          {/* Main Heading */}
          <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
              Revolutionize Your Travel Experience
            </span>
            <br />
            <span className="mt-2 block text-white">with AI-Powered Planning</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Create personalized itineraries that match your style, interests, and budget.
            Let AI transform your travel dreams into reality.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link to="/create-trip">
              <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-full transform transition-all hover:scale-105">
                Start Planning Now 🗺️
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-2 bg-transparent border-white text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-full">
                Learn More
              </Button>
            </Link>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white">
              ✨ AI-Powered Planning
            </div>
            <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white">
              🎯 Personalized Itineraries
            </div>
            <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white">
              ⚡ Instant Recommendations
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </div>
  );
}

export default Hero;
