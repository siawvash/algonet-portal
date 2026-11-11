import React from 'react';

interface GeometricPatternProps {
  className?: string;
  opacity?: number;
}

export const GeometricPattern: React.FC<GeometricPatternProps> = ({
  className = '',
  opacity = 0.12
}) => {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
      style={{ opacity }}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="brand-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="9.5%" stopColor="#5F5CE1" />
            <stop offset="29.6%" stopColor="#AF6471" />
            <stop offset="52%" stopColor="#FF6B00" />
            <stop offset="75.4%" stopColor="#E7B502" />
            <stop offset="100%" stopColor="#CFFF04" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        <line x1="50" y1="0" x2="50" y2="300" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="150" y1="0" x2="150" y2="300" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="250" y1="0" x2="250" y2="300" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="350" y1="0" x2="350" y2="300" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />

        <line x1="0" y1="60" x2="400" y2="60" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="0" y1="150" x2="400" y2="150" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="0" y1="240" x2="400" y2="240" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />

        {/* Interconnecting Geometric Curves with Brand Gradient */}
        <path
          d="M50 150 C100 60, 150 240, 250 150 S350 60, 400 150"
          stroke="url(#brand-grad)"
          strokeWidth="1.5"
          fill="none"
        />

        <path
          d="M0 60 Q150 200, 350 60"
          stroke="url(#brand-grad)"
          strokeWidth="1.2"
          fill="none"
        />

        <path
          d="M150 240 C200 150, 300 280, 400 240"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />

        {/* Nodes */}
        <circle cx="50" cy="150" r="3" fill="#CFFF04" />
        <circle cx="150" cy="60" r="3" fill="#5F5CE1" />
        <circle cx="250" cy="150" r="3" fill="#FA5A14" />
        <circle cx="350" cy="240" r="3" fill="#CFFF04" />
        <circle cx="150" cy="240" r="2.5" fill="#FFFFFF" />
        <circle cx="350" cy="60" r="2.5" fill="#5F5CE1" />
      </svg>
    </div>
  );
};
