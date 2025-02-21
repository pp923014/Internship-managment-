import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout, authUser } = useAuthStore();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to close the menu when a link is clicked
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  const handleLogout = () => {
    logout(); // Ensure logout function is called
    window.location.reload(); // Refresh the page after logout
    window.location.href = "/";
  };

  return (
    <nav className="bg-white shadow-md w-full z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Side - Brand Name */}
          <Link to="/" className="text-xl font-bold text-gray-800" onClick={closeMenu}>
            UmaTech
          </Link>

          {/* Right Side - Menu Items */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/varify" className="text-gray-700 hover:text-gray-900" onClick={closeMenu}>
              Our Trainee
            </Link>
            {authUser ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-gray-900" onClick={closeMenu}>
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-800 hover:text-gray-900"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/signup" className="text-gray-700 hover:text-gray-900" onClick={closeMenu}>
                Create Account
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 focus:outline-none"
            >
              <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} size="lg" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 pb-4">
            <Link
              to="/varify"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={closeMenu}
            >
              Our Trainee
            </Link>
            {authUser ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-red-800 hover:bg-gray-100 w-full text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/signup"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={closeMenu}
              >
                Create Account
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;