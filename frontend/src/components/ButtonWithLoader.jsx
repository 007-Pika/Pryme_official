import React from "react";

const ButtonWithLoader = ({
  loading = false,
  children,
  loadingText = "Please wait...",
  disabled = false,
  className = "",
  ...props
}) => {
  return (
    <button
      disabled={loading || disabled}
      className={`inline-flex items-center justify-center transition-colors px-4 py-2 rounded-md font-medium
        ${loading ? "opacity-70 cursor-not-allowed" : ""}
        ${className}
      `}
      {...props}
    >
      {loading ? loadingText : children}
    </button>
  );
};

export default ButtonWithLoader;
