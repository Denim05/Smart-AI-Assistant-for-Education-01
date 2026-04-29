import React from "react";

const Logo = ({ className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      <img
        src="/logo.svg"
        alt="GENzAI Logo"
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default Logo;
