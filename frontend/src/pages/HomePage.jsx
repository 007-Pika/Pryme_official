import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import HomePage1 from "../assets/Homepage1.jpg";
import Featureimage1 from "../assets/feature1.jpg";
import Featureimage2 from "../assets/feature2.jpg";
import User1 from "../assets/user1.png";
import User2 from "../assets/user2.png";
import User3 from "../assets/user3.png";
import User4 from "../assets/user4.png";
import Footer from "../components/Footer";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-8 px-4 md:px-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="max-w-xl py-8 px-2 md:px-0">
            <div className="flex items-center">
              <span className="h-px w-6 bg-white mr-3"></span>
              <p className="uppercase text-sm tracking-wide">Fast Cleaning</p>
            </div>
            <h2 className="text-[32px] sm:text-[40px] md:text-[45px] font-bold mt-2 leading-tight">
              One Call Solves All
              <br /> Your Home Needs
            </h2>
            <p className="mt-4">
              Expert Home Services at Your Doorstep. Satisfaction Guaranteed!
            </p>
            <div className="mt-6 space-x-4">
              <button
                onClick={() => navigate("/signup")}
                className="bg-white cursor-pointer text-blue-600 px-4 py-2 rounded-md font-medium w-44"
              >
                Get Started
              </button>
              <button
                onClick={() => navigate("/login")}
                className="px-4 font-medium cursor-pointer"
              >
                <span className="border-b-2 border-white inline-block w-12 text-center">
                  Log In
                </span>
              </button>
            </div>
          </div>
          <img
            src={HomePage1}
            alt="Cleaning"
            className="mt-8 md:mt-0 rounded-2xl w-full md:max-w-[622px] h-74 object-cover shadow-lg border-4 border-white"
          />
        </div>
      </section>

      {/* Featured Services */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="py-16 text-center">
          <h3 className="text-2xl font-semibold mb-10">Featured Services</h3>
          <div className="flex flex-col md:flex-row md:flex-wrap md:justify-center gap-6">
            {[
              {
                title: "Floor Cleaning",
                description:
                  "Whether it's hardwood, tile, or carpet, we ensure every inch is thoroughly cleaned and maintained to perfection.",
                badge: "15% Off | 4 Hours Remaining",
                img: Featureimage1,
              },
              {
                title: "Mirror Cleaning",
                description:
                  "Our mirror cleaning service leaves your mirrors sparkling and streak-free. We use special techniques and premium cleaning.",
                badge: "21% Off | 3 Hours Remaining",
                img: Featureimage2,
              },
            ].map((service, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row w-full md:w-[calc(46%-12px)] border border-blue-600 rounded-2xl overflow-hidden shadow hover:shadow-lg transition-shadow duration-200"
              >
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full sm:w-1/2 h-auto object-cover"
                />
                <div className="w-full sm:w-1/2 p-4 text-left flex flex-col justify-between">
                  <div>
                    <div className="bg-blue-600 text-white text-xs font-medium px-2 py-1 inline-block rounded mb-2">
                      {service.badge}
                    </div>
                    <h4 className="mt-4 text-md font-semibold">
                      {service.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-2">
                      {service.description}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate(`/booking/${service.title.toLowerCase().replace(/\s+/g, "-")}`)}
                    className="mt-4 text-blue-600 border border-blue-600 px-4 py-2 rounded hover:bg-blue-50 w-full"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Testimonials */}
      <section style={{ backgroundColor: "#E8F0FD" }} className="py-16 px-4">
        <div className="max-w-7xl mx-auto px-4 md:px-16">
          <h3 className="text-2xl font-semibold text-center mb-10">
            Testimonials
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                image: User1,
                name: "Haider Qureshi",
                role: "Customer",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sodales dui at risus convallis.",
              },
              {
                image: User2,
                name: "Faizan Awan",
                role: "Customer",
                text: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames.",
              },
              {
                image: User3,
                name: "Zain Gandapur",
                role: "Customer",
                text: "Fusce varius, turpis nec bibendum posuere, ex magna fermentum nunc.",
              },
              {
                image: User4,
                name: "Amaan Qureshi",
                role: "Customer",
                text: "Donec non dui vitae elit blandit efficitur eu in urna bcd msdfsd sdfwe.",
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-lg shadow flex flex-col"
              >
                <div className="flex space-x-1 text-yellow-400 mb-2">
                  {Array(5)
                    .fill(0)
                    .map((_, j) => (
                      <span key={j}>★</span>
                    ))}
                </div>
                <p className="text-gray-700 mb-4">{testimonial.text}</p>
                <div className="flex items-center mt-auto space-x-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="rounded-full w-10 h-10 object-cover"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
