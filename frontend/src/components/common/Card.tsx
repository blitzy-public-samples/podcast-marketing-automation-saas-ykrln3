import React from 'react';
import classNames from 'classnames';
import { CardProps } from '../types';

export const Card: React.FC<CardProps> = ({
  children,
  className,
  onClick,
  hoverable = false,
  elevation = 'medium',
  header,
  footer
}) => {
  // Define base card classes
  const baseClasses = 'rounded-lg overflow-hidden';

  // Define elevation-specific classes
  const elevationClasses = {
    low: 'shadow-sm',
    medium: 'shadow-md',
    high: 'shadow-lg'
  };

  // Define hoverable class if hoverable prop is true
  const hoverableClass = hoverable ? 'transition-shadow duration-300 hover:shadow-xl' : '';

  // Combine all classes using classNames utility
  const cardClasses = classNames(
    baseClasses,
    elevationClasses[elevation],
    hoverableClass,
    className
  );

  // Return a div containing the card structure
  return (
    <div className={cardClasses} onClick={onClick}>
      {/* Render header if provided */}
      {header && <div className="px-4 py-3 border-b">{header}</div>}

      {/* Render children in the card body */}
      <div className="p-4">{children}</div>

      {/* Render footer if provided */}
      {footer && <div className="px-4 py-3 border-t">{footer}</div>}
    </div>
  );
};