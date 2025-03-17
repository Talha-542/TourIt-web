import  { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaCheck } from "react-icons/fa";
import Footer from "@/components/ui/custom/Footer";

function ContactUs() {
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    loading: false,
    error: null
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus({ submitted: false, loading: true, error: null });
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus({ submitted: true, loading: false, error: null });
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    }, 1500);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center bg-no-repeat pt-32 pb-20 px-6"
        style={{ backgroundImage: `url('/contact-header.jpg')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70"></div>
        <div className="relative max-w-7xl mx-auto text-center z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight"
          >
            Contact <span className="text-primary">Us</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-white/90 max-w-3xl mx-auto"
          >
            Have questions or feedback? We&apos;d love to hear from you!
            Our team is here to help plan your perfect journey.
          </motion.p>
        </div>
      </div>

      {/* Contact Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:w-3/5"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Send Us a <span className="text-primary">Message</span>
              </h2>
              <p className="text-gray-600 mb-8">
                Whether you have a question about our services, need help with your travel plan,
                or want to provide feedback, we&apos;re ready to assist you.
              </p>

              {formStatus.submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 border border-green-200 rounded-xl p-6 text-center"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaCheck className="text-green-500 text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Message Sent Successfully!</h3>
                  <p className="text-gray-600">
                    Thank you for contacting us. We&apos;ll get back to you as soon as possible, usually within 24 hours.
                  </p>
                  <Button 
                    className="mt-6"
                    onClick={() => setFormStatus({ submitted: false, loading: false, error: null })}
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                      placeholder="How can we help you?"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                      placeholder="Tell us more about what you need..."
                      required
                    ></textarea>
                  </div>
                  <div>
                    <Button
                      type="submit"
                      className="w-full md:w-auto px-8 py-4 text-lg font-semibold"
                      disabled={formStatus.loading}
                    >
                      {formStatus.loading ? "Sending..." : "Send Message"}
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:w-2/5"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Contact <span className="text-primary">Information</span>
              </h2>
              <p className="text-gray-600 mb-8">
                Our team is available to answer your questions Monday through Friday 
                from 9:00 AM to 6:00 PM Pacific Time.
              </p>

              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-lg mr-4">
                      <FaMapMarkerAlt className="text-primary text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">Our Office</h3>
                      <p className="text-gray-600 mt-1">
                        123 Travel Street, San Francisco, CA 94103, USA
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-lg mr-4">
                      <FaPhoneAlt className="text-primary text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">Phone Number</h3>
                      <p className="text-gray-600 mt-1">
                        +1 (555) 123-4567
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        Monday to Friday, 9:00 AM to 6:00 PM PT
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-lg mr-4">
                      <FaEnvelope className="text-primary text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">Email Address</h3>
                      <p className="text-gray-600 mt-1">
                        support@TourIt.com
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        We&apos;ll respond within 24 hours
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-lg mr-4">
                      <FaClock className="text-primary text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">Working Hours</h3>
                      <p className="text-gray-600 mt-1">
                        Monday - Friday: 9:00 AM - 6:00 PM PT
                      </p>
                      <p className="text-gray-600">
                        Saturday & Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-100 rounded-xl p-4 h-96 relative overflow-hidden">
            {/* Google Maps Integration */}
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.0916348658056!2d74.27149267463295!3d31.46666534979514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919039ecc46db03%3A0x838badf1b0f1beb7!2sTectSoft!5e0!3m2!1sen!2s!4v1741283658171!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="TourIt Office Location"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section  className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
          >
            Frequently Asked <span className="text-primary">Questions</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            Find quick answers to common questions about our services
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                How does the AI trip planning work?
              </h3>
              <p className="text-gray-600">
                Our AI analyzes your preferences, budget, travel dates, and interests to create a customized itinerary. 
                It considers factors like local attractions, weather patterns, transportation options, and even crowd levels 
                to create the perfect travel plan just for you.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Can I modify my itinerary after it&apos;s created?
              </h3>
              <p className="text-gray-600">
                Absolutely! Your itinerary is fully customizable. You can add or remove activities, change accommodation 
                preferences, adjust your budget, or even modify your travel dates. The AI will recalculate and optimize 
                your plan based on your changes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Is there a cost to use TourIt?
              </h3>
              <p className="text-gray-600">
                We offer both free and premium plans. The basic trip planning features are available for free, while our premium 
                plans include advanced features like real-time updates, priority support, and the ability to collaborate with 
                travel companions on trip planning.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                What if I need help during my trip?
              </h3>
              <p className="text-gray-600">
                Premium users have access to 24/7 travel support. If you encounter any issues during your trip, our 
                customer service team is ready to assist you. We can help with rebooking, alternative suggestions, or 
                general travel advice to ensure your journey goes smoothly.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Can TourIt handle group trips?
              </h3>
              <p className="text-gray-600">
                Yes! TourIt is perfect for planning group trips. Our platform allows multiple users to collaborate on
                the same itinerary, provide their preferences, and vote on activities. The AI then creates a balanced
                plan that accommodates everyone&apos;s interests as much as possible.
              </p>
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
            Ready to Start Your Journey?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl text-white/90 max-w-3xl mx-auto mb-10"
          >
            Create your personalized travel plan today and discover the magic of AI-powered trip planning.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Button
              size="lg"
              className="px-8 py-6 text-lg font-bold bg-white text-primary hover:bg-white/90"
              onClick={() => window.location.href = '/create-trip'}
            >
              Plan Your Perfect Trip Now 🚀
            </Button>
          </motion.div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

export default ContactUs;