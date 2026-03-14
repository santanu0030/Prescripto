
import { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {

  const { isLoggedIn, logoutPatient, getPatientImageUrl } = useAppContext();

  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  // Navigate helper
  const goTo = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
    setShowMenu(false);
  };

  // Logout handler
  const handleLogout = async () => {
    await logoutPatient();
    navigate("/");
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <div className="fixed top-0 left-0 w-full bg-white z-50 shadow-md flex items-center justify-between text-sm py-4 px-6 border-b border-gray-300">

        {/* Logo */}
        <img
          onClick={() => goTo("/")}
          src={assets.logo}
          alt="logo"
          className="w-44 cursor-pointer"
        />

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-start gap-6 font-medium">

          <NavLink to="/" className="hover:text-primary">
            <li className="py-1">HOME</li>
          </NavLink>

          <NavLink to="/doctors" className="hover:text-primary">
            <li className="py-1">ALL DOCTORS</li>
          </NavLink>

          <NavLink to="/about" className="hover:text-primary">
            <li className="py-1">ABOUT</li>
          </NavLink>

          <NavLink to="/contact" className="hover:text-primary">
            <li className="py-1">CONTACT</li>
          </NavLink>

        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          {/* Logged In User */}
          {isLoggedIn ? (
            <div className="flex items-center gap-2 cursor-pointer group relative">

              <img
                className="w-8 h-8 rounded-full object-cover"
                src={getPatientImageUrl()}
                alt=""
              />

              <img className="w-2.5" src={assets.dropdown_icon} alt="" />

              {/* Dropdown */}
              <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 hidden group-hover:block">

                <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">

                  <p
                    onClick={() => goTo("/patient/profile")}
                    className="hover:text-black cursor-pointer"
                  >
                    My Profile
                  </p>

                  <p
                    onClick={() => goTo("/my-appointments")}
                    className="hover:text-black cursor-pointer"
                  >
                    My Appointments
                  </p>

                  <p
                    onClick={handleLogout}
                    className="hover:text-red-600 cursor-pointer"
                  >
                    Logout
                  </p>

                </div>

              </div>
            </div>

          ) : (

            /* Login + Create Account Buttons */
            <div className="hidden md:flex items-center gap-3">

              <button
                onClick={() => goTo("/login")}
                className="border border-primary text-blue-600 cursor-pointer px-6 py-2 rounded-full font-medium hover:bg-blue-600 hover:text-white transition-all"
              >
                Login
              </button>

              <button
                onClick={() => goTo("/register")}
                className="bg-blue-600 cursor-pointer text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700/90 transition-all"
              >
                Create Account
              </button>

            </div>

          )}

          {/* Mobile Menu Icon */}
          <img
            onClick={() => setShowMenu(true)}
            className="w-6 cursor-pointer md:hidden"
            src={assets.menu_icon}
            alt=""
          />

        </div>
      </div>


      {/* ================= MOBILE MENU ================= */}
      <div
        className={`fixed top-0 bottom-0 ${showMenu ? "right-0" : "-right-full"} w-full h-screen bg-white z-50 transition-all duration-300 md:hidden`}
      >

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-6">

          <img className="w-36" src={assets.logo} alt="" />

          <img
            className="w-7 cursor-pointer"
            onClick={() => setShowMenu(false)}
            src={assets.cross_icon}
            alt=""
          />

        </div>

        {/* Mobile Links */}
        <ul className="flex flex-col items-center gap-5 mt-8 text-lg font-medium">

          <NavLink onClick={() => goTo("/")}><p>HOME</p></NavLink>

          <NavLink onClick={() => goTo("/doctors")}><p>ALL DOCTORS</p></NavLink>

          <NavLink onClick={() => goTo("/about")}><p>ABOUT</p></NavLink>

          <NavLink onClick={() => goTo("/contact")}><p>CONTACT</p></NavLink>

          {isLoggedIn && (
            <>
              <button
                onClick={() => goTo("/login")}
                className="border border-primary text-primary px-6 py-2 rounded-full"
              >
                Login
              </button>

              <button
                onClick={() => goTo("/register")}
                className="bg-primary text-white px-6 py-2 rounded-full"
              >
                Create Account
              </button>
            </>
          )}

        </ul>

      </div>


      {/* Spacer for fixed navbar */}
      <div className="mt-20"></div>
    </>
  );
};

export default Navbar;
