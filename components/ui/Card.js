import React from "react";

export default function Card({ as: Component = "div", className = "", ...props }) {
  return (
    <Component
      className={`rounded-2xl bg-slate-800 p-4 text-gray-300 ${className}`.trim()}
      {...props}
    />
  );
}

