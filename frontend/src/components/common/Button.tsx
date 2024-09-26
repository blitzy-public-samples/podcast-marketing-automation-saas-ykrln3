import React from 'react';
import classNames from 'classnames';
import { ButtonProps } from '../types';

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  fullWidth = false,
  onClick,
  className,
  type = 'button',
}) => {
  // Define base button classes
  const baseClasses = 'font-semibold rounded focus:outline-none transition duration-150 ease-in-out';

  // Define variant-specific classes
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50',
    outline: 'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50',
    text: 'bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50',
  };

  // Define size-specific classes
  const sizeClasses = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2',
    large: 'px-6 py-3 text-lg',
  };

  // Combine all classes using classNames utility
  const buttonClasses = classNames(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    {
      'w-full': fullWidth,
      'opacity-50 cursor-not-allowed': disabled,
    },
    className
  );

  // Return a button element with combined classes and props
  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};