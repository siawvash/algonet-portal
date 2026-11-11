import React from 'react';

interface ParticleOrbProps {
  variant?: 1 | 2 | 3;
  className?: string;
  glow?: boolean;
}

export const ParticleOrb: React.FC<ParticleOrbProps> = ({
  variant = 1,
  className = '',
  glow = true
}) => {
  return (
    <div className={`relative overflow-hidden select-none pointer-events-none rounded-card ${className}`}>
      <img
        src={`/assets/particle-orb-${variant}.jpg`}
        alt="Particle Orb"
        className="w-full h-full object-cover mix-blend-screen opacity-70 filter brightness-110 contrast-125"
      />
      {glow && (
        <div
          className="absolute inset-0 bg-radial from-[#CFFF04]/10 via-transparent to-transparent pointer-events-none"
          style={{ mixBlendMode: 'screen' }}
        />
      )}
    </div>
  );
};
