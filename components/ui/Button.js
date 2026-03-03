import React from "react";

const VARIANT_CLASS = {
  primary: "btn btn-primary",
  outline: "btn btn-primary-outline",
  danger: "btn btn-danger",
  ghost: "btn",
};

const SIZE_CLASS = {
  sm: "min-h-[36px] px-3 text-xs",
  md: "min-h-[44px] px-4 text-sm",
  lg: "min-h-[52px] px-5 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ...props
}) {
  const variantClass = VARIANT_CLASS[variant] ?? VARIANT_CLASS.primary;
  const sizeClass = SIZE_CLASS[size] ?? SIZE_CLASS.md;

  return (
    <button
      type={type}
      className={`${variantClass} ${sizeClass} ${className}`.trim()}
      {...props}
    />
  );
}

