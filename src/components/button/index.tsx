import React, { useState } from 'react';
import { Loader } from 'lucide-react';

interface ButtonProps {
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  type?: "submit" | "button"
  text: string;
}

const Button: React.FC<ButtonProps> = ({ 
    onClick = () => null, 
    disabled = false, 
    loading = false, 
    type = "button", 
    text 
}) => {    
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
      className={`flex justify-center items-center py-3 px-6 rounded-lg bg-blue-500 text-white ${
        disabled || loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
      } transition-all`}
    >
      {loading ? <Loader color="white" size={24} className="animate-spin" /> : text}
    </button>
  );
};

export default Button;
