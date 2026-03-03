import React from "react";

const VARIANT_CLASS = {
  default: "bg-surface-elevated shadow-card",
  subtle: "bg-surface",
};

export default function Card({
  as: Component = "div",
  variant = "default",
  className = "",
  ...props
}) {
  const variantClass = VARIANT_CLASS[variant] ?? VARIANT_CLASS.default;

  return (
    <Component
      className={`rounded-card p-4 text-gray-200 ${variantClass} ${className}`.trim()}
      {...props}
    />
  );
}

