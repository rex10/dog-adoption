import React from 'react';
import { twMerge } from 'tailwind-merge';
import { useTheme } from '../../contexts/useTheme';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
}

const baseClasses =
  'font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none';

const Button = ({ children, variant = 'primary', className, ...props }: ButtonProps) => {
  const { darkMode } = useTheme();

  const variants = {
    primary: darkMode
      ? 'bg-indigo-500! text-white! hover:bg-indigo-600!'
      : 'bg-indigo-600! text-white! hover:bg-indigo-700!',
    secondary: darkMode
      ? 'bg-gray-700! text-white! hover:bg-gray-600!'
      : 'bg-indigo-200! text-gray-800! hover:bg-indigo-300!',
    ghost: darkMode
      ? 'bg-transparent! text-white! hover:bg-gray-700!'
      : 'bg-transparent! text-indigo-700! hover:bg-indigo-100!',
  };

  const combined = twMerge(baseClasses, variants[variant], className);

  return (
    <button className={combined} {...props}>
      {children}
    </button>
  );
};

export default Button;