import {} from "react";
import { Button } from "../button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="flex flex-col items-center mx-56 gap-9">
      <h2 className="font-extrabold text-[50px] text-center mt-16">
        <span className="text-primary">
          Revolutionize Your Travel Experience with AI:
        </span>
        <br />
        Tailor-Made Itineraries, Effortlessly Designed
      </h2>
      <p className="text-xl text-secondary text-center">
        Unlock the power of AI to craft unique travel plans that match your
        style, interests, and budget. Say goodbye to hours of planning and hello
        to seamless adventures.
      </p>
      <Link to={"/create-trip"}>
        <Button size="lg">Plan Your Perfect Trip – Free & Easy 📅</Button>
      </Link>
    </div>
  );
}

export default Hero;
