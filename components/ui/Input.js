import React, { forwardRef } from "react";

function InputBase(
  { id, label, error, className = "", type = "text", ...props },
  ref
) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-gray-200"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        ref={ref}
        type={type}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full ${className}`.trim()}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

const Input = forwardRef(InputBase);

export default Input;

