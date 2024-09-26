import React from 'react';
import classNames from 'classnames';
import { InputProps } from '../types';

export const Input: React.FC<InputProps> = ({
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  label,
  error,
  disabled = false,
  required = false,
  className,
}) => {
  const baseInputClasses = 'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-all';
  const errorClasses = 'border-red-500 focus:ring-red-500';
  const disabledClasses = 'bg-gray-100 cursor-not-allowed';

  const inputClasses = classNames(
    baseInputClasses,
    {
      [errorClasses]: error,
      [disabledClasses]: disabled,
    },
    className
  );

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block mb-2 font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={inputClasses}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <p id={`${name}-error`} className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};