import { Spin } from 'antd';
import clsx from 'clsx';
import React from 'react';

interface MainBtnProps {
  text: string | React.ReactNode;
  isLoading?: boolean;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  variant?: 'normal' | 'outline';
  color?: 'blue' | 'red' | 'gray' | 'green';
}

const colorStyles = {
  blue: {
    normal: 'bg-primary text-white border border-primary hover:bg-blue-600',
    outline: 'bg-white text-primary border border-primary hover:bg-blue-50',
    spin: 'spin-blue',
  },
  red: {
    normal: 'bg-error text-white border border-red-500 hover:bg-red-600',
    outline: 'bg-white text-error border border-error hover:bg-red-50',
    spin: 'spin-red',
  },
  gray: {
    normal: 'bg-gray-500 text-white border border-gray-55 hover:bg-gray-600',
    outline: 'bg-white text-gray-700 border border-gray-55 hover:bg-gray-100',
    spin: 'spin-gray',
  },
  green: {
    normal:
      'bg-green-500 text-white border border-green-500 hover:bg-green-600',
    outline:
      'bg-white text-green-500 border border-green-500 hover:bg-green-50',
    spin: 'spin-green',
  },
};

export const MainBtn = ({
  text,
  isLoading,
  onClick,
  className,
  disabled = false,
  variant = 'normal',
  color = 'blue',
}: MainBtnProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        'btn-primary w-fit px-6 rounded-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2',
        colorStyles[color][variant],
        className,
      )}
    >
      {isLoading ? (
        <Spin
          className={clsx(
            variant === 'normal' && 'spin-white',
            colorStyles[color].spin,
          )}
        />
      ) : (
        text
      )}
    </button>
  );
};
