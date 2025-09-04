import React from "react";
import About1 from "../assets/about1.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import About2 from "../assets/about2-2.png";
import About3 from "../assets/underline.png";
import About4 from "../assets/about3.png";
import About5 from "../assets/about44.png";

const AboutUs = () => {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="relative w-full h-[70vh] min-h-[500px] overflow-hidden">
        <img
          src={About1}
          alt="Clean office space"
          className="w-full h-full object-cover object-[60%_94%]"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 md:px-0">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6">
            About Us
          </h1>
          <p className="max-w-2xl text-base md:text-lg lg:text-xl mb-8">
            We believe a clean space is a happy space. With over 10 years of
            experience in the cleaning industry, we are dedicated to providing
            top-notch cleaning services for both residential and commercial
            clients.
          </p>
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors">
            See More
          </button>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-6xl mx-auto px-4 md:px-12 py-16">
        <section className="mb-16 text-center">
          <h2 className="text-4xl font-bold mb-4">Fresh Spaces, Every Time</h2>
          <div className="flex justify-center">
            <img src={About3} alt="underline decoration" />
          </div>

          {/* Cleaning Made Easy */}
          <div className="mt-12 grid md:grid-cols-2 gap-12 items-center text-left">
            <div>
              <h3 className="text-3xl md:text-4xl font-semibold mb-6">
                Cleaning Made Easy
              </h3>
              <p className="text-gray-700 mb-6 text-[16px]">
                <a href="#booking" className="text-blue-600 hover:underline">
                  Booking
                </a>{" "}
                your next cleaning service is simple and hassle-free. We offer
                flexible scheduling to suit your needs. Enjoy a spotless space
                without the stress.
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <img
                src={About2}
                alt="Happy cleaning team"
                className="rounded-lg w-72 md:w-96"
              />
            </div>
          </div>

          {/* Eco-Friendly Section */}
{/* Eco-Friendly Section */}
<div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-left">
  {/* Image first on desktop, but second on mobile */}
  <div className="order-2 md:order-1 flex justify-center md:justify-start">
    <img
      src={About4}
      alt="Eco cleaning"
      className="rounded-lg w-72 md:w-96"
    />
  </div>

  {/* Text first on mobile, second on desktop */}
  <div className="order-1 md:order-2">
    <h3 className="text-3xl md:text-4xl font-semibold mb-6">
      Eco-Friendly Cleaning Solutions
    </h3>
    <p className="text-gray-700 mb-6 text-[16px]">
      We use safe, sustainable products for a healthier environment.
      Protect your home, family, and the planet with every clean. Let
      us clean your space while caring for the earth.
    </p>
  </div>
</div>



          {/* Fresh Spaces (again) */}
          <div className="mt-12 grid md:grid-cols-2 gap-12 items-center text-left">
            <div>
              <h3 className="text-3xl md:text-4xl font-semibold mb-6">
                Fresh Spaces, Every Time
              </h3>
              <p className="text-gray-700 mb-6 text-[16px]">
                Experience the difference with our expert cleaning services. We
                bring freshness to every corner of your home or office. Trust us
                to keep your space spotless and inviting.
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <img
                src={About5}
                alt="Fresh space"
                className="rounded-lg w-72 md:w-96"
              />
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default AboutUs;
