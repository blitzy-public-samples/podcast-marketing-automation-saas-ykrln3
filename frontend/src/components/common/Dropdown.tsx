import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { DropdownProps } from '../types';
import { useOnClickOutside } from '../hooks/useOnClickOutside';

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  error,
  className,
  dropdownClassName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<{ value: string; label: string } | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionSelect = (option: { value: string; label: string }) => {
    setSelectedOption(option);
    onChange(option.value);
    setIsOpen(false);
  };

  useEffect(() => {
    const selectedOption = options.find(option => option.value === value);
    setSelectedOption(selectedOption || null);
  }, [value, options]);

  const dropdownClasses = classNames(
    'relative inline-block w-full',
    {
      'opacity-50 cursor-not-allowed': disabled,
    },
    className
  );

  const buttonClasses = classNames(
    'w-full px-4 py-2 text-left bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
    {
      'border-red-500': error,
      'border-gray-300': !error,
    }
  );

  const optionsClasses = classNames(
    'absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg',
    dropdownClassName
  );

  return (
    <div className={dropdownClasses} ref={dropdownRef}>
      <button
        type="button"
        onClick={toggleDropdown}
        className={buttonClasses}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selectedOption ? selectedOption.label : placeholder}
      </button>

      {isOpen && (
        <ul className={optionsClasses} role="listbox">
          {options.map((option) => (
            <li
              key={option.value}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleOptionSelect(option)}
              role="option"
              aria-selected={option.value === selectedOption?.value}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};