import React from 'react';
import styles from './Button.module.css';

/**
 * Reusable Button Component (PPT Slide 50 & Slide 27-28)
 * Demonstrates:
 * - Props usage (text, onClick, color, variant, etc.)
 * - Configurable styling via CSS Modules and inline styles
 * - Reusable UI component pattern
 */
function Button({
  text,
  onClick,
  color,
  variant = 'primary',
  type = 'button',
  className = '',
  style = {},
  disabled = false,
  children
}) {
  const variantClass = styles[variant] || styles.primary;
  
  const customStyle = {
    ...(color ? { backgroundColor: color } : {}),
    ...style
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.btn} ${variantClass} ${className}`}
      style={customStyle}
    >
      {text || children}
    </button>
  );
}

export default Button;
