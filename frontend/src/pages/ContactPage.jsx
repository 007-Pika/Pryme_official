import React from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTwitter,
  FaInstagram,
  FaDiscord,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ContactPage = () => {
  return (
    <div>
      <Navbar />

      <div className="max-w-6xl mx-auto py-12 font-sans">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Left Column */}
          <div className="relative flex-1 overflow-hidden rounded-lg shadow-md flex">
            <div className="bg-[#1668E8] text-white p-8 md:p-12 flex flex-col justify-between w-full relative z-10">
              <div>
                <h1 className="text-3xl font-bold mb-4">Contact Information</h1>
                <p>Say something to start a live chat!</p>
              </div>

              <div className="space-y-6 mt-12">
                <div className="flex items-start gap-4">
                  <FaPhone className="mt-1" />
                  <span>+1012 3456 789</span>
                </div>
                <div className="flex items-start gap-4">
                  <FaEnvelope className="mt-1" />
                  <span>demo@gmail.com</span>
                </div>
                <div className="flex items-start gap-4">
                  <FaMapMarkerAlt className="mt-1" />
                  <address className="not-italic">
                    132 Dartmouth Street Boston,
                    <br />
                    Massachusetts 02156 United States
                  </address>
                </div>
              </div>

              <div className="flex gap-4 pt-8">
                <FaTwitter className="w-5 h-5 hover:opacity-80 cursor-pointer" />
                <FaInstagram className="w-5 h-5 hover:opacity-80 cursor-pointer" />
                <FaDiscord className="w-5 h-5 hover:opacity-80 cursor-pointer" />
              </div>
            </div>

            <div className="absolute bottom-0 right-20 w-48 h-48 bg-white/10 rounded-full translate-x-1/4 translate-y-1/4 z-10"></div>
            <div className="absolute bottom-12 right-32 w-32 h-32 bg-white/20 rounded-full z-10"></div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-white flex-1 p-6 md:p-8 rounded-lg shadow-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  className="w-full border-0 border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none px-0 py-2"
                  placeholder="John"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  className="w-full border-0 border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none px-0 py-2"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full border-0 border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none px-0 py-2"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  className="w-full border-0 border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none px-0 py-2"
                  placeholder="+1 012 3456 789"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">
                Select Subject?
              </label>
              <div className="flex flex-wrap gap-2">
                {[...Array(4)].map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className="px-4 py-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 text-sm"
                  >
                    General inquiry
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">
                Write your message..
              </label>
              <textarea
                className="w-full border-0 border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none px-0 py-2 h-32"
                placeholder="Your message here..."
              />
            </div>

            <button className="bg-blue-600 text-white py-3 px-8 rounded-md hover:bg-blue-700 transition-colors">
              Send Message
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
