import React from 'react';

export const Eyebrow: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`eyebrow mb-2.5 ${className}`}>
      {children}
    </div>
  );
};
