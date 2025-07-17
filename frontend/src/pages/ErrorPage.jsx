import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f] flex flex-col items-center justify-center px-4 text-center">
      {/* Illustration */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/6478/6478111.png" // Put your image in public/images folder
        alt="Error"
        className="w-50 max-w-md md:max-w-lg lg:max-w-2xl mx-auto mb-10"
      />

      {/* Text */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
        Oops! Page Not Found
      </h1>
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-8">
        The page you're looking for doesn't exist or has been moved. Let's get
        you back home.
      </p>

      {/* Back Button */}

      <div className="flex gap-4 ">
        <button
          onClick={handleGoBack}
          className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
        >
          Go Back
        </button>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
