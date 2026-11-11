import React, { useState, useEffect } from 'react';
import { CURRENT_USER } from '../../data/mockData';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface UserAvatarProps {
  size?: AvatarSize;
  src?: string | null;
  initials?: string;
  name?: string;
  showPresence?: boolean;
  presenceStatus?: 'present' | 'remote' | 'meeting' | 'leave';
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
}

const SIZE_CONFIG: Record<
  AvatarSize,
  {
    containerSize: string;
    textSize: string;
    presenceSize: string;
    presenceOffset: string;
    ringPadding: string;
    glowBlur: string;
  }
> = {
  xs: {
    containerSize: 'size-7',
    textSize: 'text-[11px]',
    presenceSize: 'size-2',
    presenceOffset: '-bottom-0.5 -right-0.5',
    ringPadding: 'p-[1.5px]',
    glowBlur: 'blur-xs'
  },
  sm: {
    containerSize: 'size-9 sm:size-10',
    textSize: 'text-xs sm:text-sm',
    presenceSize: 'size-2.5 sm:size-3',
    presenceOffset: 'bottom-0 right-0',
    ringPadding: 'p-[2px]',
    glowBlur: 'blur-sm'
  },
  md: {
    containerSize: 'size-12 sm:size-14',
    textSize: 'text-base sm:text-lg',
    presenceSize: 'size-3.5',
    presenceOffset: 'bottom-0.5 right-0.5',
    ringPadding: 'p-[2px]',
    glowBlur: 'blur-md'
  },
  lg: {
    containerSize: 'size-16 sm:size-20',
    textSize: 'text-xl sm:text-2xl',
    presenceSize: 'size-4 sm:size-4.5',
    presenceOffset: 'bottom-1 right-1',
    ringPadding: 'p-[2.5px]',
    glowBlur: 'blur-md'
  },
  xl: {
    containerSize: 'size-20 sm:size-24',
    textSize: 'text-2xl sm:text-3xl font-extrabold',
    presenceSize: 'size-5 sm:size-5.5',
    presenceOffset: 'bottom-1 right-1',
    ringPadding: 'p-[3px]',
    glowBlur: 'blur-lg'
  }
};

const PRESENCE_COLORS: Record<string, { bg: string; shadow: string; label: string }> = {
  present: {
    bg: 'bg-emerald-500',
    shadow: 'shadow-[0_0_10px_rgba(16,185,129,0.8)]',
    label: 'حاضر در سازمان'
  },
  remote: {
    bg: 'bg-indigo-500',
    shadow: 'shadow-[0_0_10px_rgba(99,102,241,0.8)]',
    label: 'دورکاری فعال'
  },
  meeting: {
    bg: 'bg-amber-500',
    shadow: 'shadow-[0_0_10px_rgba(245,158,11,0.8)]',
    label: 'در جلسه آنلاین'
  },
  leave: {
    bg: 'bg-rose-500',
    shadow: 'shadow-[0_0_10px_rgba(244,63,94,0.8)]',
    label: 'مرخصی'
  }
};

export const UserAvatar: React.FC<UserAvatarProps> = ({
  size = 'md',
  src,
  initials = CURRENT_USER.initials,
  name = CURRENT_USER.name,
  showPresence = true,
  presenceStatus = 'present',
  className = '',
  onClick,
  interactive = false
}) => {
  const [localAvatar, setLocalAvatar] = useState<string | null>(() => {
    if (src !== undefined) return src;
    try {
      return localStorage.getItem('algonet_user_avatar');
    } catch {
      return null;
    }
  });

  // Sync with external src prop if supplied
  useEffect(() => {
    if (src !== undefined) {
      setLocalAvatar(src);
    }
  }, [src]);

  // Listen to cross-component avatar updates
  useEffect(() => {
    const handleAvatarUpdate = () => {
      try {
        const stored = localStorage.getItem('algonet_user_avatar');
        setLocalAvatar(stored);
      } catch {
        // ignore
      }
    };

    window.addEventListener('user-avatar-updated', handleAvatarUpdate);
    return () => {
      window.removeEventListener('user-avatar-updated', handleAvatarUpdate);
    };
  }, []);

  const config = SIZE_CONFIG[size];
  const presence = PRESENCE_COLORS[presenceStatus] || PRESENCE_COLORS.present;

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={`relative inline-flex items-center justify-center shrink-0 select-none group ${
        interactive || onClick ? 'cursor-pointer' : ''
      } ${className}`}
      title={name}
    >
      {/* 
        ============================================================
        1. Ambient Glow Aura (هاله نورانی مدرن و زنده در پس‌زمینه)
        ============================================================
      */}
      <div
        className={`absolute -inset-1 rounded-full bg-gradient-to-tr from-[#666cff]/45 via-[#9677ff]/30 to-[#4c3ae3]/50 opacity-70 group-hover:opacity-100 transition-all duration-300 pointer-events-none ${config.glowBlur}`}
      />

      {/* 
        ============================================================
        2. Concentric Outer Gradient Ring (حلقه گرادینت بیرونی نئونی)
        ============================================================
      */}
      <div
        className={`${config.containerSize} ${config.ringPadding} rounded-full bg-gradient-to-tr from-[#666cff] via-[#a394ff] to-[#4834d4] shadow-[0_6px_20px_rgba(102,108,255,0.32)] transition-transform duration-300 ease-out group-hover:scale-105 relative z-10 flex items-center justify-center`}
      >
        {/* 
          ============================================================
          3. Inner Gap Separation (حلقه میانی تفکیک‌کننده برای عمق ۳بعدی)
          ============================================================
        */}
        <div className="size-full p-[2px] rounded-full bg-white dark:bg-[#202236] transition-colors duration-200 flex items-center justify-center">
          {/* 
            ============================================================
            4. Core Avatar Surface: Image or Stylized 3D Monogram
            ============================================================
          */}
          <div className="size-full rounded-full overflow-hidden relative flex items-center justify-center bg-gradient-to-br from-[#6a70ff] via-[#5c60ea] to-[#413bb8] shadow-[inset_0_2px_4px_rgba(255,255,255,0.35),inset_0_-2px_4px_rgba(0,0,0,0.3)]">
            {localAvatar ? (
              <img
                src={localAvatar}
                alt={name}
                className="size-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            ) : (
              <>
                {/* 3D Glass / Convex Lighting Sheen */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-black/25 pointer-events-none" />

                {/* Subtle Radial Core Highlight */}
                <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 size-full rounded-full bg-white/20 blur-[3px] pointer-events-none" />

                {/* Modern Geometric Monogram Letter (S) */}
                <span
                  className={`relative z-10 font-['Vazirmatn'] font-bold text-white uppercase tracking-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)] transition-transform duration-300 group-hover:scale-110 ${config.textSize}`}
                >
                  {initials}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 
        ============================================================
        5. Live Presence Beacon (چراغ وضعیت آنلاین و فعال با انیمیشن راداری)
        ============================================================
      */}
      {showPresence && (
        <div
          className={`absolute ${config.presenceOffset} ${config.presenceSize} z-20 flex items-center justify-center pointer-events-none`}
          title={presence.label}
        >
          {/* Radar Ping Animation */}
          {presenceStatus === 'present' && (
            <span
              className={`absolute inset-0 rounded-full ${presence.bg} animate-ping opacity-60`}
            />
          )}

          {/* Solid Glowing Core */}
          <span
            className={`relative size-full rounded-full ${presence.bg} border-2 border-white dark:border-[#202236] ${presence.shadow} transition-colors duration-200`}
          />
        </div>
      )}
    </div>
  );
};
