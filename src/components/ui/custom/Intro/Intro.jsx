import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import solotraveler from "./solotraveler.png";

function Intro() {
  const [refDestinations, inViewDestinations] = useInView({ triggerOnce: true });
  const [refTourists, inViewTourists] = useInView({ triggerOnce: true });
  const [refHotels, inViewHotels] = useInView({ triggerOnce: true });

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Section: Image */}
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-blue-400/20 rounded-2xl blur-xl"></div>
              <img
                src={solotraveler}
                alt="Solo Traveler"
                className="relative rounded-2xl w-full object-cover shadow-xl transform transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

          {/* Right Section: Content */}
          <div className="lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Explore Any Corner of{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
                  The World
                </span>{" "}
                With Us
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Discover nature&apos;s paradise and find the best destinations with our AI-powered
                travel guide. Experience unmatched beauty and create unforgettable memories
                on your journey.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Destinations Card */}
              <div
                ref={refDestinations}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="space-y-2 text-center">
                  <div className="text-primary text-3xl font-bold">
                    {inViewDestinations && (
                      <>
                        <CountUp
                          start={0}
                          end={300}
                          duration={2.5}
                          separator=","
                        />
                        <span>+</span>
                      </>
                    )}
                  </div>
                  <p className="text-gray-600 font-medium">Destinations</p>
                </div>
              </div>

              {/* Tourists Card */}
              <div
                ref={refTourists}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="space-y-2 text-center">
                  <div className="text-primary text-3xl font-bold">
                    {inViewTourists && (
                      <>
                        <CountUp
                          start={3500}
                          end={5000}
                          duration={2.5}
                          separator=","
                        />
                        <span>+</span>
                      </>
                    )}
                  </div>
                  <p className="text-gray-600 font-medium">Happy Travelers</p>
                </div>
              </div>

              {/* Hotels Card */}
              <div
                ref={refHotels}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="space-y-2 text-center">
                  <div className="text-primary text-3xl font-bold">
                    {inViewHotels && (
                      <>
                        <CountUp
                          start={0}
                          end={150}
                          duration={2.5}
                          separator=","
                        />
                        <span>+</span>
                      </>
                    )}
                  </div>
                  <p className="text-gray-600 font-medium">Premium Hotels</p>
                </div>
              </div>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary text-xl">🎯</span>
                </div>
                <span className="text-gray-700">Personalized Itineraries</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary text-xl">💎</span>
                </div>
                <span className="text-gray-700">Premium Experiences</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary text-xl">🤖</span>
                </div>
                <span className="text-gray-700">AI-Powered Planning</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary text-xl">💰</span>
                </div>
                <span className="text-gray-700">Budget-Friendly Options</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Intro;
