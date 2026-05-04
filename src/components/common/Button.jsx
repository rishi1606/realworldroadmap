import React from 'react';

export function Button({ 
  children, 
  variant = 'default', 
  size = 'default', 
  className = '', 
  fullWidth = false,
  ...props 
}) {
  const baseStyle = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-bg-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    default: "bg-text-main text-white hover:bg-text-main/90 shadow",
    primary: "bg-brand text-white hover:bg-brand/90 shadow",
    secondary: "bg-border-subtle text-text-main hover:bg-gray-100/80",
    destructive: "bg-red-500 text-white hover:bg-red-500/90 shadow-sm",
    outline: "border border-border-subtle bg-transparent hover:bg-border-subtle hover:text-text-main shadow-sm",
    ghost: "hover:bg-border-subtle hover:text-text-main",
    link: "text-brand underline-offset-4 hover:underline",
    dark: "bg-text-main text-white hover:bg-text-main/90 shadow" // For legacy compatibility in the project
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10 p-0",
    md: "h-10 px-4 py-2", // For legacy compatibility
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant] || variants.default} ${sizes[size] || sizes.default} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
