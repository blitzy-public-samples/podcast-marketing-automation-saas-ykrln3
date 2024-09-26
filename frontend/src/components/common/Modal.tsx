import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { ModalProps } from '../types';
import { Button } from './Button';

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'medium',
  closeOnOverlayClick = true,
  className,
}) => {
  const baseClasses = 'fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none';
  const modalClasses = classNames(
    'relative w-auto mx-auto my-6 bg-white rounded-lg shadow-lg',
    {
      'max-w-sm': size === 'small',
      'max-w-lg': size === 'medium',
      'max-w-4xl': size === 'large',
    },
    className
  );

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={baseClasses} onClick={handleOverlayClick}>
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className={modalClasses}>
        <div className="flex items-start justify-between p-5 border-b border-gray-200 rounded-t">
          <h3 className="text-lg font-semibold">{title}</h3>
          <Button
            onClick={onClose}
            variant="text"
            size="small"
            aria-label="Close modal"
          >
            ×
          </Button>
        </div>
        <div className="relative p-6 flex-auto">{children}</div>
        {footer && (
          <div className="flex items-center justify-end p-6 border-t border-gray-200 rounded-b">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};