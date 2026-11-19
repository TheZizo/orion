import React from 'react';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

/**
 * Standard Orion Container
 * Enforces responsive 8px-grid padding and max-width: 1280px.
 */
export function Container({
  children,
  className = '',
  ...rest
}: ContainerProps) {
  return (
    <div className={`container-orion ${className}`.trim()} {...rest}>
      {children}
    </div>
  );
}
