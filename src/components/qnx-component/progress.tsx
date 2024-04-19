import React from "react";

interface ProgressProps {
  value: number; // Progress value (0 to 100)
  size?: "sm" | "md" | "lg"; // Size of the progress bar
  color?: string; // Color of the progress bar
  className?: string; // Additional CSS classes
}

const Progress: React.FC<ProgressProps> = ({
  value,
  size = "md",
  color = "teal",
  className = "",
}) => {
  let barClassName = "h-2 rounded"; // Base class name for the progress bar

  // Add size-related classes
  if (size === "sm") {
    barClassName += " w-20";
  } else if (size === "lg") {
    barClassName += " w-48";
  } else {
    // Default to medium size
    barClassName += " w-32";
  }

  // Add color class
  barClassName += ` bg-${color}-500`;

  return (
    <div className={`bg-gray-200 rounded ${className}`}>
      <div className={barClassName} style={{ width: `${value}%` }}></div>
    </div>
  );
};

export default Progress;
