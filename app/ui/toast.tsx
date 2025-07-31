'use client';

import { useEffect, useState } from 'react';
import { XCircleIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'warning';
  onDismiss?: () => void;
}

export default function Toast({ message, type, onDismiss }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onDismiss) {
        onDismiss();
      }
    }, 5000); // Auto-dismiss after 5 seconds

    return () => clearTimeout(timer);
  }, [onDismiss]);

  if (!isVisible) return null;

  const icon = {
    success: <CheckCircleIcon className="h-5 w-5 text-green-700" />,
    error: <XCircleIcon className="h-5 w-5 text-red-700" />,
    warning: <ExclamationTriangleIcon className="h-5 w-5 text-yellow-700" />,
  }[type];

  const bgColor = {
    success: 'bg-green-100',
    error: 'bg-red-100',
    warning: 'bg-yellow-100',
  }[type];

  const textColor = {
    success: 'text-green-800',
    error: 'text-red-800',
    warning: 'text-yellow-800',
  }[type];

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg flex items-center space-x-3 ${bgColor} ${textColor}`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      {icon}
      <p className="text-sm font-medium">{message}</p>
      <button
        onClick={() => {
          setIsVisible(false);
          if (onDismiss) {
            onDismiss();
          }
        }}
        className="ml-auto p-1 rounded-md hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-opacity-50"
      >
        <XCircleIcon className="h-5 w-5" />
      </button>
    </div>
  );
}