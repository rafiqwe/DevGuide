import React from "react";

const ComingSoon = () => {
  return (
    <div className="w-full h-full  ">
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-2xl w-full ">
          <div className="flex items-center justify-center mb-5">
            <img className="w-50 h-50" src="../../public/images/coming-soon.webp"/>
          </div>
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Coming Soon!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-12">
            Web page is under construction. We'll be back soon!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
