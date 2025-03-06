import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FaUsers, FaLightbulb, FaGlobe, FaHeart } from "react-icons/fa";
import Footer from "@/components/ui/custom/Footer";


function AboutUs() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center bg-no-repeat pt-32 pb-20 px-6"
        style={{ backgroundImage: `url('/about-header.jpg')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70"></div>
        <div className="relative max-w-7xl mx-auto text-center z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight"
          >
            About <span className="text-primary">TourIt</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-white/90 max-w-3xl mx-auto"
          >
            We&apos;re revolutionizing travel planning with AI-powered technology,
            making personalized adventures accessible to everyone.
          </motion.p>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="md:w-1/2"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Our <span className="text-primary">Story</span>
              </h2>
              <p className="text-gray-600 mb-4 text-lg">
                Founded in late 2024, TourIt began with a simple idea: travel planning should be
                enjoyable, not exhausting. Our team of travel enthusiasts and AI experts came
                together to create a solution that empowers travelers to focus on what matters -
                enjoying their adventures.
              </p>
              <p className="text-gray-600 mb-4 text-lg">
                We noticed that most travelers spent countless hours researching destinations,
                comparing prices, and creating itineraries, often feeling overwhelmed by information
                overload. We set out to solve this problem by building an intelligent platform
                that understands your preferences and handles the complex planning process.
              </p>
              <p className="text-gray-600 text-lg">
                Today, TourIt helps thousands of travelers discover amazing destinations
                and create tailor-made itineraries that perfectly match their interests,
                budgets, and travel styles.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="md:w-1/2 relative"
            >
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-full"></div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-500/10 rounded-full"></div>
                <img
                  src="/our-story.jpg"
                  alt="Our Story"
                  className="w-full h-auto rounded-2xl shadow-xl relative z-10"
                />
                <div className="absolute -z-10 top-1/4 -right-4 w-20 h-20 bg-yellow-400/20 rounded-lg rotate-12"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
          >
            Our <span className="text-primary">Mission</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            To empower travelers worldwide with intelligent planning tools, making
            unforgettable adventures accessible to everyone regardless of their travel
            expertise.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {/* Core Value 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Traveler First</h3>
              <p className="text-gray-600">
                We put travelers&apos; needs at the heart of everything we build, ensuring our
                platform delivers genuine value and solves real problems.
              </p>
            </motion.div>

            {/* Core Value 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaLightbulb className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Innovation</h3>
              <p className="text-gray-600">
                We constantly push technological boundaries to create smarter, more intuitive
                ways to plan and experience travel.
              </p>
            </motion.div>

            {/* Core Value 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaGlobe className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Sustainability</h3>
              <p className="text-gray-600">
                We promote responsible tourism by highlighting eco-friendly options and
                supporting local communities in all our travel recommendations.
              </p>
            </motion.div>

            {/* Core Value 4 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHeart className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Passion</h3>
              <p className="text-gray-600">
                We&apos;re driven by our love for travel and technology, bringing enthusiasm and
                dedication to creating amazing travel experiences.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
          >
            Meet Our <span className="text-primary">Team</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-16"
          >
            Our diverse team combines expertise in travel, AI, design, and customer service
            to create the ultimate travel planning experience.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden group"
            >
              <div className="relative">
                <img
                  src="/team-member-1.jpg"
                  alt="Sarah Johnson"
                  className="w-full h-64 object-cover object-center"
                />
                <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex space-x-4">
                    <a href="#" className="text-white hover:text-white/80 transition-colors">
                      <i className="fab fa-linkedin text-xl"></i>
                    </a>
                    <a href="#" className="text-white hover:text-white/80 transition-colors">
                      <i className="fab fa-twitter text-xl"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">Sarah Johnson</h3>
                <p className="text-primary font-medium">CEO & Co-Founder</p>
                <p className="text-gray-600 mt-3">
                  Former travel consultant with 10+ years experience and AI enthusiast.
                </p>
              </div>
            </motion.div>

            {/* Team Member 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden group"
            >
              <div className="relative">
                <img
                  src="/team-member-2.jpg"
                  alt="David Chen"
                  className="w-full h-64 object-cover object-center"
                />
                <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex space-x-4">
                    <a href="#" className="text-white hover:text-white/80 transition-colors">
                      <i className="fab fa-linkedin text-xl"></i>
                    </a>
                    <a href="#" className="text-white hover:text-white/80 transition-colors">
                      <i className="fab fa-twitter text-xl"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">David Chen</h3>
                <p className="text-primary font-medium">CTO & Co-Founder</p>
                <p className="text-gray-600 mt-3">
                  AI researcher and developer with a passion for creating intelligent systems.
                </p>
              </div>
            </motion.div>

            {/* Team Member 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden group"
            >
              <div className="relative">
                <img
                  src="/team-member-3.jpg"
                  alt="Elena Rodriguez"
                  className="w-full h-64 object-cover object-center"
                />
                <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex space-x-4">
                    <a href="#" className="text-white hover:text-white/80 transition-colors">
                      <i className="fab fa-linkedin text-xl"></i>
                    </a>
                    <a href="#" className="text-white hover:text-white/80 transition-colors">
                      <i className="fab fa-twitter text-xl"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">Elena Rodriguez</h3>
                <p className="text-primary font-medium">Head of Product</p>
                <p className="text-gray-600 mt-3">
                  Product visionary who has traveled to over 50 countries across 6 continents.
                </p>
              </div>
            </motion.div>

            {/* Team Member 4 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden group"
            >
              <div className="relative">
                <img
                  src="/team-member-4.jpg"
                  alt="James Wilson"
                  className="w-full h-64 object-cover object-center"
                />
                <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex space-x-4">
                    <a href="#" className="text-white hover:text-white/80 transition-colors">
                      <i className="fab fa-linkedin text-xl"></i>
                    </a>
                    <a href="#" className="text-white hover:text-white/80 transition-colors">
                      <i className="fab fa-twitter text-xl"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">James Wilson</h3>
                <p className="text-primary font-medium">Lead UX Designer</p>
                <p className="text-gray-600 mt-3">
                  Experience design specialist focused on creating seamless travel interfaces.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
          >
            What Our <span className="text-primary">Users Say</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-16"
          >
            Thousands of travelers have transformed their journey planning experience with TourIt.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-xl shadow-lg relative"
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
              &quot;
              </div>
              <p className="text-gray-600 italic mb-6 pt-4">
              &quot;TourIt saved me hours of planning for my Europe trip. The personalized itinerary
                was perfect - it included all the major attractions I wanted to see plus some hidden
                gems I would have never discovered on my own!&quot;
              </p>
              <div className="flex items-center justify-center">
                <img
                  src="/profile.jpeg"
                  alt="Michael T."
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div className="text-left">
                  <h4 className="font-bold text-gray-800">Michael T.</h4>
                  <p className="text-gray-500 text-sm">Adventure Traveler</p>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-8 rounded-xl shadow-lg relative"
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
              &quot;
              </div>
              <p className="text-gray-600 italic mb-6 pt-4">
              &quot;As a family of four, planning vacations used to be stressful. TourIt understood our
                needs perfectly and suggested family-friendly activities and accommodations that worked
                for both kids and adults. Truly impressive!&quot;
              </p>
              <div className="flex items-center justify-center">
                <img
                  src="/profile.jpeg"
                  alt="Jennifer K."
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div className="text-left">
                  <h4 className="font-bold text-gray-800">Jennifer K.</h4>
                  <p className="text-gray-500 text-sm">Family Traveler</p>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-8 rounded-xl shadow-lg relative"
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
              &quot;
              </div>
              <p className="text-gray-600 italic mb-6 pt-4">
              &quot;I&apos;ve tried many travel planning tools, but TourIt is on another level. The AI
                recommendations were spot-on for my culinary tour of Asia. Each restaurant suggestion
                was exactly what I was looking for!&quot;
              </p>
              <div className="flex items-center justify-center">
                <img
                  src="/profile.jpeg"
                  alt="Carlos M."
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div className="text-left">
                  <h4 className="font-bold text-gray-800">Carlos M.</h4>
                  <p className="text-gray-500 text-sm">Food Explorer</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-10 md:p-16 text-center text-white shadow-xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Ready to Transform Your Travel Experience?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl text-white/90 max-w-3xl mx-auto mb-10"
          >
            Join thousands of happy travelers who have discovered the joy of stress-free
            travel planning with TourIt.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/create-trip">
              <Button
                size="lg"
                className="w-full sm:w-auto px-8 py-6 text-lg font-bold bg-white text-primary hover:bg-white/90"
              >
                Plan Your Trip Now 🚀
              </Button>
            </Link>
            
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default AboutUs;

