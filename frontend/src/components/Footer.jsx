import React from "react";
import { MdLocalPostOffice } from "react-icons/md";
import { FaLinkedinIn } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { AiOutlineDiscord } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";
import { FaFigma } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-gray-300 w-full border-t py-8 px-4 max-w-7xl mx-16 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between gap-8">
        {/* Left Section */}
        <div>
          <h4
            className="font-bold text-2xl text-blue-600 mb-4"
            style={{ fontFamily: "Jaro, sans-serif" }}
          >
            Pryme
          </h4>
          <ul className="space-y-2 text-sm text-black flex flex-col gap-6">
            <li>Information</li>
            <li>Contact Us</li>
            <li>Address</li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-start md:items-end gap-3">
          <span className="font-medium text-sm mb-2 pr-[154px] mr-[64px]">
            Stay up to date
          </span>
          <div className="flex items-center mb-1 mr-16 ">
            <input
              type="text"
              placeholder=""
              className="border-2 border-r-0 border-gray-400 rounded-l px-2 py-1 w-56 text-sm "
            />
            <div className="bg-black w-8 h-8 rounded-r-4xl" />
          </div>
          <p className="text-xs text-gray-500 max-w-xs mb-4">
            I confirm that I have read X Cleaning's Privacy policy and agree
            with it.
          </p>
          <div className="flex space-x-3 text-gray-700 text-xl gap-3 pr-[36px]">
            <MdLocalPostOffice />
            <FaLinkedinIn />
            <FaTwitter />
            <FaYoutube />
            <AiOutlineDiscord />
            <FaFigma />

            <FaInstagram />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
