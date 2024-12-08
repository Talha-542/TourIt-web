import {} from "react";
import solotraveler from "./solotraveler.png";

function Intro() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-10 mt-10 px-6 md:px-20">
      {/* Left Section: Image */}
      <div className="relative w-full md:w-1/2 flex justify-center mt-10">
        <img
          src={solotraveler}
          alt="Solo Traveler"
          className="rounded-lg w-full max-w-md md:max-w-full h-auto"
        />
      </div>

      {/* Right Section: Content */}
      <div className="flex flex-col md:w-1/2 text-center md:text-left">
        <h2 className="font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight text-gray-800">
          Travel Any Corner of <br /> The World With Us
        </h2>
        <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
          Would you explore nature paradise in the world? Let’s find the best
          destinations with us. Experience unmatched beauty and adventure like
          never before.
        </p>
        <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
          Plan your journey with the best travel guide to make it truly
          unforgettable.
        </p>

        {/* Card Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md text-center">
            <h3 className="font-bold text-xl sm:text-2xl text-blue-500">300+</h3>
            <p className="text-gray-500 text-sm sm:text-base">DESTINATIONS</p>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md text-center">
            <h3 className="font-bold text-xl sm:text-2xl text-blue-500">5000+</h3>
            <p className="text-gray-500 text-sm sm:text-base">TOURISTS</p>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md text-center">
            <h3 className="font-bold text-xl sm:text-2xl text-blue-500">150+</h3>
            <p className="text-gray-500 text-sm sm:text-base">HOTELS</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Intro;
