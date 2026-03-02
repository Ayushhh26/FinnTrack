import React from "react";

const VARIANT_CLASS = {
  primary: "btn btn-primary",
  outline: "btn btn-primary-outline",
  danger: "btn btn-danger",
  ghost: "btn",
};

export default function Button({
  variant = "primary",
  className = "",
  type = "button",
  ...props
}) {
  const base = VARIANT_CLASS[variant] ?? VARIANT_CLASS.primary;
  return (
    <button
      type={type}
      className={`${base} min-h-[44px] ${className}`.trim()}
      {...props}
    />
  );
}

