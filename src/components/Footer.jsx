import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { Github, Info, Linkedin } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t mt-40">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14">

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-sm">

          {/* LEFT SECTION */}
          <div className="space-y-4">
            <img src={assets.logo} alt="Prescripto Logo" className="w-40" />

            <p className="text-gray-600 leading-relaxed max-w-md">
              We help patients connect with trusted doctors and book
              appointments quickly and easily. Our goal is to make healthcare
              accessible, convenient, and reliable for everyone.
            </p>
          </div>

          {/* COMPANY */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 tracking-wide">
              COMPANY
            </h3>

            <ul className="flex flex-col gap-3 text-gray-600">
              <li>
                <Link to="/" className="hover:text-blue-600 transition">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/about" className="hover:text-blue-600 transition">
                  About Us
                </Link>
              </li>

              <li>
                <Link to="/contact" className="hover:text-blue-600 transition">
                  Contact Us
                </Link>
              </li>

              <li className="cursor-pointer hover:text-blue-600 transition">
                Privacy Policy
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 tracking-wide">
              GET IN TOUCH
            </h3>

            <ul className="flex flex-col gap-3 text-gray-600">
              <li>
                <a
                  href="tel:+917585046672"
                  className="hover:text-blue-600 transition"
                >
                  📞 +91 75850 46672
                </a>
              </li>

              <li>
                <a
                  href="mailto:support@prescripto.com"
                  className="hover:text-blue-600 transition"
                >
                  ✉️ support@prescripto.com
                </a>
              </li>
            </ul>

            {/* SOCIAL */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://github.com/himadri75"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md bg-white shadow-sm hover:shadow-md hover:text-black transition"
              >
                <Github size={20} />
              </a>

              <a
                href="https://www.linkedin.com/in/himadri516/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md bg-white shadow-sm hover:shadow-md hover:text-blue-600 transition"
              >
                <Linkedin size={20} />
              </a>

              <a
                href="https://himadri.me"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition"
              >
                <Info size={18} />
                <span className="text-sm">Project Info</span>
              </a>
            </div>

            {/* DESIGN CREDIT */}
            <p className="text-gray-500 text-xs pt-3 border-t">
              Designed by{" "}
              <span className="font-medium text-gray-700">
                Himadri Karan
              </span>{" "}
              (TECB)
            </p>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t bg-white">
        <p className="text-center text-gray-500 text-sm py-5">
          © {year} Prescripto. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;