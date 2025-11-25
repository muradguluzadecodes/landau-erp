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
}

export const MainBtn = ({
  text,
  isLoading,
  onClick,
  className,
  disabled = false,
  variant = 'normal',
}: MainBtnProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        variant === 'outline' &&
          'bg-white border border-primary text-primary hover:bg-primary/10',
        'btn-primary disabled:opacity-50 w-fit px-6 disabled:cursor-not-allowed hover:bg-hover-main-btn',
        className,
      )}
    >
      {isLoading && <Spin className="white-spin" />}
      {!isLoading && text}
    </button>
  );
};
