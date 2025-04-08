import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-[40vh]">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export default LoadingSpinner;
