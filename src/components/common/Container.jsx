import React from "react";

export default function Container({ children, className = "" }) {
    return <div className={`w-[80%] mx-auto ${className}`}>{children}</div>;
  }
  
