import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa";

// Cookie Policy Page
export function CookiePolicy() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Banner */}
      <div className="bg-gray-900 text-white py-16 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-600/20 mix-blend-multiply"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6 pt-10 transition-colors">
              <FaArrowLeft className="mr-2" /> Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Cookie Policy</h1>
            <p className="text-lg text-white/80">
              Last Updated: March 1, 2025
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto py-12 px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Introduction</h2>
          <p className="text-gray-700 mb-6">
            TourIt uses cookies and similar technologies on our website. This Cookie Policy explains how we use cookies, how third-party partners may use cookies on our service, your choices regarding cookies, and further information about cookies.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">What Are Cookies</h2>
          <p className="text-gray-700 mb-6">
            Cookies are small pieces of text sent to your browser when you visit a website. They serve many functions including enabling us to remember certain information about you and your preferences, authenticate users, and analyze our website traffic.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Types of Cookies We Use</h2>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Essential Cookies</h3>
            <p className="text-gray-700 mb-4">
              These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and account access. You may disable these by changing your browser settings, but this may affect how the website functions.
            </p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Performance and Analytics Cookies</h3>
            <p className="text-gray-700 mb-4">
              These cookies help us analyze how visitors use our website, which pages are visited most often, or if they encounter error messages. The information collected is aggregated and anonymous. We use this data to improve the performance of our website.
            </p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Functional Cookies</h3>
            <p className="text-gray-700 mb-4">
              These cookies enable us to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages. If you disable these cookies, some or all of these services may not function properly.
            </p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Targeting and Advertising Cookies</h3>
            <p className="text-gray-700 mb-4">
              These cookies record your visit to our website, the pages you have visited, and the links you have followed. We will use this information to make our website and the advertising displayed on it more relevant to your interests. These cookies may also be used by our third-party advertising partners to build a profile of your interests.
            </p>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Third-Party Cookies</h2>
          <p className="text-gray-700 mb-6">
            In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the service, deliver advertisements, and so on. These cookies may track your browsing habits across different websites and online services.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Managing Your Cookie Preferences</h2>
          <p className="text-gray-700 mb-6">
            Most web browsers allow you to manage your cookie preferences. You can set your browser to refuse cookies, or to alert you when cookies are being sent. The methods for doing so vary from browser to browser, and from version to version. However, you can usually find your cookie preferences in the &quot;options&quot; or &quot;preferences&quot; menu of your browser.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Cookie Consent</h2>
          <p className="text-gray-700 mb-6">
            When you first visit our website, you will be presented with a cookie banner that allows you to accept or decline non-essential cookies. You can change your preferences at any time by clicking on the &quot;Cookie Settings&quot; link in our footer.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-2">
            If you have any questions about our Cookie Policy, please contact us at:
          </p>
          <p className="text-gray-700">
            <strong>Email:</strong> privacy@travelai.com<br />
            <strong>Phone:</strong> +1 (555) 123-4567<br />
            <strong>Address:</strong> 123 Travel Street, San Francisco, CA 94103, USA
          </p>
        </motion.div>
        
        <div className="text-center">
          <Link to="/">
            <Button className="mr-4">Return to Homepage</Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline">Contact Us</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Privacy Policy Page
export function PrivacyPolicy() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Banner */}
      <div className="bg-gray-900 text-white py-16 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-600/20 mix-blend-multiply"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6 pt-10 transition-colors">
              <FaArrowLeft className="mr-2" /> Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Privacy Policy</h1>
            <p className="text-lg text-white/80">
              Last Updated: March 1, 2025
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto py-12 px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Introduction</h2>
          <p className="text-gray-700 mb-6">
            TourIt respects your privacy and is committed to protecting your personal data. This Privacy Policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Information We Collect</h2>
          <p className="text-gray-700 mb-4">
            We collect several types of information from and about users of our website, including:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Personal Identifiers:</strong> Such as name, email address, phone number, and postal address when you create an account, make a booking, or contact us.</li>
            <li><strong>Travel Preferences:</strong> Information about your travel style, interests, and budget to provide personalized itineraries.</li>
            <li><strong>Payment Information:</strong> Credit card details and billing information when you make purchases (processed securely through third-party payment processors).</li>
            <li><strong>Communication Data:</strong> Communications and correspondence with us via email, chat, or phone.</li>
            <li><strong>Technical Data:</strong> Internet protocol (IP) address, browser type and version, time zone setting, browser plug-in types and versions, operating system and platform.</li>
            <li><strong>Usage Data:</strong> Information about how you use our website, products, and services.</li>
          </ul>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">How We Use Your Information</h2>
          <p className="text-gray-700 mb-4">
            We use your personal information for the following purposes:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>To create and manage your account</li>
            <li>To provide personalized travel recommendations and itineraries</li>
            <li>To process and fulfill your bookings and transactions</li>
            <li>To communicate with you about your account, bookings, or inquiries</li>
            <li>To send you marketing communications (with your consent)</li>
            <li>To improve our website, products, and services</li>
            <li>To protect the security and integrity of our services</li>
            <li>To comply with legal obligations</li>
          </ul>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Data Sharing and Disclosure</h2>
          <p className="text-gray-700 mb-4">
            We may share your personal information with:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Service Providers:</strong> Third parties that provide services on our behalf, such as payment processing, data analysis, email delivery, hosting services, and customer service.</li>
            <li><strong>Travel Partners:</strong> Hotels, airlines, tour operators, and other travel service providers necessary to fulfill your bookings.</li>
            <li><strong>Business Transfers:</strong> In connection with any merger, sale of company assets, financing, or acquisition.</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights, privacy, safety, or property, or that of our users or others.</li>
          </ul>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Data Retention</h2>
          <p className="text-gray-700 mb-6">
            We will retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Rights</h2>
          <p className="text-gray-700 mb-4">
            Depending on your location, you may have the following rights regarding your personal information:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>The right to access your personal information</li>
            <li>The right to rectify inaccurate or incomplete information</li>
            <li>The right to erasure of your personal information</li>
            <li>The right to restrict processing of your personal information</li>
            <li>The right to data portability</li>
            <li>The right to object to processing of your personal information</li>
            <li>The right to withdraw consent at any time</li>
          </ul>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Data Security</h2>
          <p className="text-gray-700 mb-6">
            We have implemented appropriate security measures to prevent your personal information from being accidentally lost, used, or accessed in an unauthorized way. We limit access to your personal information to those employees, agents, contractors, and other third parties who have a business need to know.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">International Transfers</h2>
          <p className="text-gray-700 mb-6">
            Your personal information may be transferred to, and processed in, countries other than the country in which you are resident. These countries may have data protection laws that are different from the laws of your country. We ensure that appropriate safeguards are in place to protect your personal information in compliance with applicable data protection laws.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Children&apos;s Privacy</h2>
          <p className="text-gray-700 mb-6">
            Our website is not intended for children under 16 years of age. We do not knowingly collect personal information from children under 16. If you are a parent or guardian and believe we may have collected information about a child, please contact us.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Changes to This Privacy Policy</h2>
          <p className="text-gray-700 mb-6">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-2">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p className="text-gray-700">
            <strong>Email:</strong> privacy@travelai.com<br />
            <strong>Phone:</strong> +1 (555) 123-4567<br />
            <strong>Address:</strong> 123 Travel Street, San Francisco, CA 94103, USA
          </p>
        </motion.div>
        
        <div className="text-center">
          <Link to="/">
            <Button className="mr-4">Return to Homepage</Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline">Contact Us</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Terms of Service Page
export function TermsOfService() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Banner */}
      <div className="bg-gray-900 text-white py-16 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-600/20 mix-blend-multiply"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6 pt-10 transition-colors">
              <FaArrowLeft className="mr-2" /> Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Terms of Service</h1>
            <p className="text-lg text-white/80">
              Last Updated: March 1, 2025
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto py-12 px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Introduction</h2>
          <p className="text-gray-700 mb-6">
            Welcome to TravelAI. These Terms of Service (Terms) govern your access to and use of our website, mobile applications, and services (collectively, the &quot;Services&quot;). Please read these Terms carefully before using our Services. By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Acceptance of Terms</h2>
          <p className="text-gray-700 mb-6">
            By accessing or using our Services, you confirm that you accept these Terms and agree to comply with them. If you do not agree to these Terms, you must not access or use our Services. We recommend that you print a copy of these Terms for future reference.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Changes to These Terms</h2>
          <p className="text-gray-700 mb-6">
            We reserve the right to modify these Terms at any time. If we make changes, we will provide notice by posting the updated Terms on our website and updating the &quot;Last Updated&quot; date. Your continued use of our Services after such notice constitutes your acceptance of the updated Terms.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Account Registration</h2>
          <p className="text-gray-700 mb-6">
            To use certain features of our Services, you may need to create an account. You must provide accurate, current, and complete information during the registration process and keep your account information up-to-date. You are responsible for safeguarding your account credentials and for any activities or actions under your account. You agree to notify us immediately of any unauthorized use of your account.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Use of Services</h2>
          <p className="text-gray-700 mb-4">
            When using our Services, you agree to:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>Comply with all applicable laws and regulations</li>
            <li>Respect the rights of others and not engage in any harassing, abusive, or harmful behavior</li>
            <li>Not use our Services for any illegal or unauthorized purpose</li>
            <li>Not attempt to interfere with or disrupt the integrity or performance of our Services</li>
            <li>Not attempt to gain unauthorized access to our Services or related systems</li>
            <li>Not reproduce, duplicate, copy, sell, resell, or exploit any portion of our Services without express permission</li>
          </ul>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Bookings and Reservations</h2>
          <p className="text-gray-700 mb-6">
            When you make a booking or reservation through our Services, you are entering into a contract with the travel service provider (e.g., hotel, airline, tour operator), not with TravelAI. We act as an intermediary between you and travel service providers. You agree to review and comply with the terms and conditions of the travel service providers, including payment terms, cancellation policies, and other rules and restrictions.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Payments and Fees</h2>
          <p className="text-gray-700 mb-6">
            All payments made through our Services are processed securely by our payment processors. By providing your payment information, you authorize us to charge the applicable fees to your payment method. All prices displayed on our Services are in the currency indicated and include applicable taxes and fees unless otherwise stated. Some travel service providers may charge additional fees that will be disclosed during the booking process.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Cancellations and Refunds</h2>
          <p className="text-gray-700 mb-6">
            Cancellation and refund policies vary by travel service provider. Please review the specific terms and conditions for each booking. TravelAI charges a service fee for using our platform, which may be non-refundable even if your booking is canceled. If you need to cancel a booking, please contact us as soon as possible.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Intellectual Property</h2>
          <p className="text-gray-700 mb-6">
            The content and materials available on our Services, including but not limited to text, graphics, logos, images, software, and audio and video clips, are owned by or licensed to TravelAI and are protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any material from our Services without our prior written consent.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Limitation of Liability</h2>
          <p className="text-gray-700 mb-6">
            To the maximum extent permitted by law, TravelAI and its affiliates, officers, employees, agents, partners, and licensors shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, or goodwill, arising out of or in connection with your access to or use of our Services. In no event shall our total liability for all claims related to the Services exceed the amount paid by you to TravelAI during the twelve (12) months preceding the event giving rise to the liability.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Indemnification</h2>
          <p className="text-gray-700 mb-6">
            You agree to indemnify and hold harmless TravelAI and its affiliates, officers, employees, agents, partners, and licensors from any claim or demand, including reasonable attorneys&apos; fees, made by any third party due to or arising out of your violation of these Terms, your violation of any law or the rights of a third party, or your use of our Services.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Termination</h2>
          <p className="text-gray-700 mb-6">
            We may terminate or suspend your access to our Services immediately, without prior notice or liability, for any reason, including without limitation if you breach these Terms. Upon termination, your right to use our Services will immediately cease.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Governing Law</h2>
          <p className="text-gray-700 mb-6">
            These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. You agree to submit to the personal and exclusive jurisdiction of the courts located in San Francisco, California.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-2">
            If you have any questions about these Terms, please contact us at:
          </p>
          <p className="text-gray-700">
            <strong>Email:</strong> legal@travelai.com<br />
            <strong>Phone:</strong> +1 (555) 123-4567<br />
            <strong>Address:</strong> 123 Travel Street, San Francisco, CA 94103, USA
          </p>
        </motion.div>
        
        <div className="text-center">
          <Link to="/">
            <Button className="mr-4">Return to Homepage</Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline">Contact Us</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}