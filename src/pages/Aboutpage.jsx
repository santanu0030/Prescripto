import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (<div className="px-6 md:px-10 lg:px-20">


    {/* Heading */}
    <div className="text-center text-3xl pt-10 text-gray-500">
      <p>
        ABOUT <span className="text-gray-800 font-semibold">US</span>
      </p>
    </div>

    {/* About Section */}
    <div className="my-12 flex flex-col md:flex-row items-center gap-12">
      <img
        className="w-full md:max-w-90 rounded-lg"
        src={assets.about_image}
        alt="about"
      />

      <div className="flex flex-col justify-center gap-6 md:w-1/2 text-sm text-gray-600 leading-relaxed">
        <p>
          Welcome to Prescripto, your trusted partner in managing healthcare
          needs conveniently and efficiently. We understand the challenges
          individuals face when scheduling doctor appointments and managing
          their medical information.
        </p>

        <p>
          Prescripto is committed to excellence in healthcare technology. We
          continuously improve our platform to enhance user experience and
          deliver reliable services. Whether you're booking your first
          appointment or managing ongoing care, Prescripto supports you every
          step of the way.
        </p>

        <b className="text-gray-800 text-base">Our Vision</b>

        <p>
          Our vision is to create a seamless healthcare experience for every
          user by bridging the gap between patients and healthcare providers,
          making quality care accessible whenever you need it.
        </p>
      </div>
    </div>

    {/* Why Choose Us */}
    <div className="text-2xl my-6 text-gray-700">
      <p>
        WHY <span className="font-semibold">CHOOSE US</span>
      </p>
    </div>

    <div className="flex flex-col md:flex-row gap-6 mb-20">

      <div className="border rounded-lg px-10 md:px-12 py-10 flex flex-col gap-4 text-[15px] hover:bg-blue-600 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
        <b>EFFICIENCY</b>
        <p>
          Streamlined appointment scheduling designed to fit seamlessly into
          your busy lifestyle.
        </p>
      </div>

      <div className="border rounded-lg px-10 md:px-12 py-10 flex flex-col gap-4 text-[15px] hover:bg-blue-600 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
        <b>CONVENIENCE</b>
        <p>
          Access a trusted network of healthcare professionals and book
          appointments easily.
        </p>
      </div>

      <div className="border rounded-lg px-10 md:px-12 py-10 flex flex-col gap-4 text-[15px] hover:bg-blue-600 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
        <b>PERSONALIZATION</b>
        <p>
          Receive tailored recommendations and reminders to help you stay on
          top of your health.
        </p>
      </div>

    </div>
  </div>

  );
};

export default About;
