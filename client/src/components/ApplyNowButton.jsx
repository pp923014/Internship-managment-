import React from "react";
import { Link } from "react-router-dom";
const ApplyNowButton = () => {
  return (
    <div className="flex justify-center items-center ">
      <div className="w-full sm:w-auto px-4">
        <Link
          to="/apply"
          className="block w-full sm:w-auto text-center px-6 py-2 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition"
        >
          Apply Now
        </Link>
      </div>
    </div>
  );
};

export default ApplyNowButton;