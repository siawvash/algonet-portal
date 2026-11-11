import React from 'react';
import { UserPresenceStatus } from '../../types';

interface PresenceBadgeProps {
  status: UserPresenceStatus;
  interactive?: boolean;
  onStatusChange?: (status: UserPresenceStatus) => void;
  className?: string;
  showText?: boolean;
}

export const PRESENCE_CONFIG: Record<
  UserPresenceStatus,
  { label: string; badgeClass: string; dotClass?: string }
> = {
  present: {
    label: "حاضر در سازمان",
    badgeClass: "bg-[#CFFF04] text-black font-medium border border-transparent shadow-[0_0_12px_rgba(207,255,4,0.3)]",
    dotClass: "bg-black"
  },
  remote: {
    label: "فعال (دورکاری)",
    badgeClass: "bg-[#5F5CE1] text-white font-medium border border-transparent",
    dotClass: "bg-[#CFFF04]"
  },
  meeting: {
    label: "در جلسه آنلاین",
    badgeClass: "bg-[#FA5A14] text-black font-medium border border-transparent",
    dotClass: "bg-black"
  },
  leave: {
    label: "مرخصی ساعتی",
    badgeClass: "bg-transparent text-[var(--text-muted)] border border-[var(--border)]",
    dotClass: "bg-[#FA5A14]"
  }
};

export const PresenceBadge: React.FC<PresenceBadgeProps> = ({
  status,
  className = '',
  showText = true
}) => {
  const config = PRESENCE_CONFIG[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-pill text-xs transition-all duration-150 select-none ${config.badgeClass} ${className}`}
    >
      {config.dotClass && (
        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse ${config.dotClass}`} />
      )}
      {showText && <span>{config.label}</span>}
    </span>
  );
};
