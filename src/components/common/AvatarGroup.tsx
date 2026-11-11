import React from 'react';
import { toPersianDigits } from '../../utils/formatters';

interface TeamMember {
  name: string;
  initials: string;
  color: string;
}

interface AvatarGroupProps {
  members: TeamMember[];
  max?: number;
  size?: number;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  members,
  max = 3,
  size = 28
}) => {
  const visible = members.slice(0, max);
  const remaining = members.length - max;

  return (
    <div className="flex items-center -space-x-2 space-x-reverse select-none">
      {visible.map((member, i) => {
        // Determine text color based on background
        const isLime = member.color.toLowerCase() === '#cfff04';
        const isOrange = member.color.toLowerCase() === '#fa5a14';
        const textColor = isLime || isOrange ? '#000000' : '#FFFFFF';

        return (
          <div
            key={i}
            title={member.name}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: member.color,
              color: textColor
            }}
            className="rounded-full border-2 border-[var(--bg)] flex items-center justify-center font-bold text-[10px] shadow-sm transform hover:scale-110 hover:z-10 transition-transform duration-150 cursor-default"
          >
            {member.initials}
          </div>
        );
      })}

      {remaining > 0 && (
        <div
          style={{
            width: `${size}px`,
            height: `${size}px`
          }}
          className="rounded-full bg-[var(--surface-2)] border-2 border-[var(--bg)] text-[var(--text-muted)] flex items-center justify-center font-medium text-[10px]"
        >
          +{toPersianDigits(remaining)}
        </div>
      )}
    </div>
  );
};
