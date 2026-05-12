import React from 'react';

export function Logo({ className }) {
  return (
    <img
      src="/logo.png"
      alt="Logo"
      className={`${className} object-contain`}
    />
  );
}
