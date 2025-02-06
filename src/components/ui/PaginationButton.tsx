import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  active?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, onClick, disabled, active }) => {
  return (
    <button
      className={`pagination-button ${active ? "active" : ""}`} 
      onClick={onClick} 
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;