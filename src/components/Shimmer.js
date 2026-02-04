import React from "react";

const Shimmer = () => {
  return (
    <div className="animate-pulse bg-[#F7F8F9] border border-gray-300 w-93.75 m-auto h-[80dvh] mt-[10dvh] mb-[10dvh]">
      <div className="h-10 bg-gray-300 mb-4 mx-5 mt-4 rounded w-1/4"></div>
      <div className="bg-gray-300 h-32 mx-5 rounded mb-4"></div>
      <div className="h-6 bg-gray-300 mb-2 mx-5 rounded w-3/4"></div>
      <div className="h-6 bg-gray-300 mb-2 mx-5 rounded w-2/4"></div>
    </div>
  );
};

export default Shimmer;
