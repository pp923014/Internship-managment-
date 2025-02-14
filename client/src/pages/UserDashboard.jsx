import React from "react";
import th from "../assets/th.png";

const UserDashboard = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-white"
      style={{ height: "100vh" }}
    >
      {/* Card */}
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden border-2 border-gray-300 p-8 max-w-sm w-full">
        {/* Image Section */}
        <div className="flex justify-center">
          <div className="relative">
            <img
              src={th} // Use your imported image
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            />
            {/* Image Upload Button (Optional) */}
            <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md cursor-pointer hover:bg-gray-100">
              <input
                type="file"
                className="hidden"
                accept="image/*"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </label>
          </div>
        </div>

        {/* Details Section */}
        <div className="mt-6 text-center">
          <h2 className="text-xl font-bold text-black">Priyanshu</h2>
          <p className="text-black mt-2">Priyansu@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;