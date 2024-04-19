import React from "react";

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: "text" | "filled" | "outlined"; // Updated variant prop
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit" | "reset";
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled = false,
  loading = false,
  variant = "filled", // Default variant is "filled"
  size = "md",
  className = "",
  type = "button",
  children,
}) => {
  let buttonStyles =
    "rounded-md focus:outline-none inline-flex items-center justify-center space-x-2";

  // Determine size classes
  if (size === "sm") {
    buttonStyles += " px-3 py-1 text-sm";
  } else if (size === "lg") {
    buttonStyles += " px-6 py-3 text-lg";
  } else {
    // Default to md size
    buttonStyles += " px-4 py-2 text-base";
  }

  // Determine variant classes
  if (variant === "text") {
    buttonStyles += " text-teal-500 hover:text-teal-600";
  } else if (variant === "outlined") {
    buttonStyles += " border border-teal-500 text-teal-500 hover:bg-teal-100";
  } else {
    // Default to filled variant
    buttonStyles += " bg-teal-500 text-white hover:bg-teal-600";
  }

  return (
    <button
      type={type}
      className={`${buttonStyles} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && (
        <svg
          className="animate-spin h-5 w-5 text-white mr-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.373A8 8 0 0112 4v4a4 4 0 00-4 4H6zm5 3.627A8 8 0 014 12h4a4 4 0 004 4V21zm3-11.627A8 8 0 0120 12h-4a4 4 0 00-4-4v4zm5-4a8 8 0 01-8 8v-4a4 4 0 004-4h4z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
