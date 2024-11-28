import {} from "react";
import { Button } from "../button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="flex flex-col items-center px-4 sm:px-8 lg:mx-56 gap-6 sm:gap-9">
      <h2 className="font-extrabold text-3xl sm:text-[40px] lg:text-[50px] text-center mt-10 sm:mt-16 leading-relaxed sm:leading-normal lg:leading-snug">
      <span className="text-primary">
          Revolutionize Your Travel Experience with AI:
        </span>
        <br />
        Tailor-Made Itineraries, Effortlessly Designed
      </h2>
      <p className="text-sm sm:text-lg lg:text-xl text-secondary text-center">
        Unlock the power of AI to craft unique travel plans that match your
        style, interests, and budget. Say goodbye to hours of planning and hello
        to seamless adventures.
      </p>
      <Link to={"/create-trip"}>
        <Button size="lg" className="w-full sm:w-auto">
          Plan Your Perfect Trip – Free & Easy 📅
        </Button>
      </Link>
    </div>
  );
}

export default Hero;
