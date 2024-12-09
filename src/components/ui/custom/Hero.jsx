import { Button } from "../button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat min-h-screen flex items-center justify-center px-4 sm:px-8"
      style={{ backgroundImage: `url('/home-mix.jpg')` }} // Ensure the image path is correct
    >
      {/* Backdrop (overlay) */}
      <div className="absolute inset-0 bg-white bg-opacity-30"></div> {/* Adjust opacity as needed */}

      <div className="relative p-6 sm:p-10 text-center w-full max-w-4xl mx-auto z-10">
        <h2 className="font-extrabold text-3xl sm:text-[40px] lg:text-[50px] leading-relaxed sm:leading-normal lg:leading-snug text-gray-900">
          <span className="text-primary">
            Revolutionize Your Travel Experience with AI:
          </span>
          <br />
          Tailor-Made Itineraries, Effortlessly Designed
        </h2>
        <p className="text-sm sm:text-lg lg:text-xl text-secondary mt-4">
          Unlock the power of AI to craft unique travel plans that match your
          style, interests, and budget. Say goodbye to hours of planning and hello
          to seamless adventures.
        </p>
        <Link to={"/create-trip"} className="mt-6 inline-block">
          <Button size="lg" className="w-full sm:w-auto">
            Plan Your Perfect Trip – Free & Easy 📅
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
