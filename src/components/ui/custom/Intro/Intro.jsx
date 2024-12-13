import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import solotraveler from "./solotraveler.png";

function Intro() {
  const [refDestinations, inViewDestinations] = useInView({ triggerOnce: true });
  const [refTourists, inViewTourists] = useInView({ triggerOnce: true });
  const [refHotels, inViewHotels] = useInView({ triggerOnce: true });

  return (
    <div className="flex flex-col md:flex-row items-center gap-10 mt-10 px-6 md:px-20">
      {/* Left Section: Image */}
      <div className="relative w-full md:w-1/4 flex justify-center mt-10">
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
          {/* Destinations */}
          <div
            ref={refDestinations}
            className="bg-white p-4 md:p-6 rounded-lg shadow-md text-center"
          >
            {inViewDestinations && (
              <>
                <CountUp
                  start={0}
                  end={300}
                  duration={4}
                  className="font-bold text-xl sm:text-2xl text-blue-500"
                />
                <span className="font-bold text-xl sm:text-2xl text-blue-500">+</span>
              </>
            )}
            <p className="text-gray-500 text-sm sm:text-base">DESTINATIONS</p>
          </div>

          {/* Tourists */}
          <div
            ref={refTourists}
            className="bg-white p-4 md:p-6 rounded-lg shadow-md text-center"
          >
            {inViewTourists && (
              <>
                <CountUp
                  start={3500}
                  end={5000}
                  duration={4}
                  className="font-bold text-xl sm:text-2xl text-blue-500"
                />
                <span className="font-bold text-xl sm:text-2xl text-blue-500">+</span>
              </>
            )}
            <p className="text-gray-500 text-sm sm:text-base">TOURISTS</p>
          </div>

          {/* Hotels */}
          <div
            ref={refHotels}
            className="bg-white p-4 md:p-6 rounded-lg shadow-md text-center"
          >
            {inViewHotels && (
              <>
                <CountUp
                  start={0}
                  end={150}
                  duration={4}
                  className="font-bold text-xl sm:text-2xl text-blue-500"
                />
                <span className="font-bold text-xl sm:text-2xl text-blue-500">+</span>
              </>
            )}
            <p className="text-gray-500 text-sm sm:text-base">HOTELS</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Intro;
