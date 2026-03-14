import { assets } from "../assets/assets";

const Contact = () => {
  return (<div className="px-6 md:px-10 lg:px-20">

    {/* Heading */}
    <div className="text-center text-3xl pt-10 text-gray-500">
      <p>
        CONTACT <span className="text-gray-800 font-semibold">US</span>
      </p>
    </div>

    {/* Contact Section */}
    <div className="my-14 flex flex-col md:flex-row items-center justify-center gap-12 mb-28 text-sm">

      <img
        className="w-full md:max-w-95 rounded-lg"
        src={assets.contact_image}
        alt="contact"
      />

      <div className="flex flex-col justify-center items-start gap-6 max-w-md">

        <p className="font-semibold text-lg text-gray-700">
          OUR OFFICE
        </p>

        <p className="text-gray-500 leading-relaxed">
          8B, Rajendra Prasad Colony, Jadavpur <br />
          Kolkata, West Bengal 700032
        </p>

        <p className="text-gray-500 leading-relaxed">
          Tel: (+91) 75850-46672 <br />
          Email: karanhimadri1234@gmail.com
        </p>

        <p className="font-semibold text-lg text-gray-700">
          CAREERS AT PRESCRIPTO
        </p>

        <p className="text-gray-500">
          Learn more about our teams and explore exciting job opportunities.
        </p>

        <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-md hover:bg-blue-600 hover:text-white transition-all duration-300">
          Explore Jobs
        </button>

      </div>
    </div>

  </div>

  );
};

export default Contact;
