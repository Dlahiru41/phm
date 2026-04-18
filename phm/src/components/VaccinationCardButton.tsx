import React from 'react';
import { Link } from 'react-router-dom';

interface VaccinationCardButtonProps {
  childId: string;
  childName?: string;
  className?: string;
  style?: React.CSSProperties;
  variant?: 'primary' | 'secondary' | 'link';
}

/**
 * VaccinationCardButton Component
 * Provides a button/link to navigate to the vaccination card page for a child
 */
export const VaccinationCardButton: React.FC<VaccinationCardButtonProps> = ({
  childId,
  childName = 'Vaccination Card',
  className = '',
  style = {},
  variant = 'primary',
}) => {
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    borderRadius: 8,
    padding: '10px 16px',
    fontSize: 13,
    fontWeight: 600,
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      ...baseStyles,
      background: '#0F6E56',
      color: '#fff',
    },
    secondary: {
      ...baseStyles,
      background: '#E1F5EE',
      color: '#0F6E56',
      border: '1px solid #B4E8D6',
    },
    link: {
      ...baseStyles,
      background: 'transparent',
      color: '#0F6E56',
      padding: '8px 12px',
    },
  };

  const finalStyles = { ...variantStyles[variant], ...style };

  return (
    <Link
      to={`/vaccination-card/${childId}`}
      className={className}
      style={finalStyles}
      title={`View vaccination card for ${childName}`}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>View Card</span>
    </Link>
  );
};

export default VaccinationCardButton;

