import React from "react";

/**
 * PUBLIC_INTERFACE
 * IconButton is a circular 40x40 button used for header actions and search actions.
 */
export default function IconButton({
  children,
  ariaLabel,
  onClick,
  className = "",
  title,
  type = "button",
}) {
  return (
    <button
      type={type}
      className={`icon-btn ${className}`}
      aria-label={ariaLabel || title}
      title={title}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
