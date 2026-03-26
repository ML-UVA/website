import React from "react";
import "@/css/parent.css";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="full-screen-loading">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
