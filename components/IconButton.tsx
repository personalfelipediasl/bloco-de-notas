
import React from 'react';
import { SpinnerIcon } from './Icons';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  tooltip: string;
  variant?: 'default' | 'danger';
  isLoading?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = ({ children, tooltip, variant = 'default', isLoading = false, ...props }) => {
  const baseClasses = "relative group p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    default: "text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-blue-500",
    danger: "text-red-400 hover:bg-red-500/20 hover:text-red-300 focus:ring-red-500",
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]}`} {...props}>
      {isLoading ? <SpinnerIcon className="w-5 h-5 animate-spin" /> : children}
      <span className="absolute bottom-full mb-2 w-max px-2 py-1 text-xs font-semibold text-white bg-gray-900 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -translate-x-1/2 left-1/2">
        {tooltip}
      </span>
    </button>
  );
};
