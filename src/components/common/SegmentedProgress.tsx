import React from 'react';
import { toPersianDigits } from '../../utils/formatters';

interface SegmentedProgressProps {
  percentage: number;
  segments?: number;
  showLabel?: boolean;
  label?: string;
  className?: string;
}

export const SegmentedProgress: React.FC<SegmentedProgressProps> = ({
  percentage,
  segments = 10,
  showLabel = true,
  label,
  className = ''
}) => {
  const filledCount = Math.round((percentage / 100) * segments);

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {showLabel && (
        <div className="flex items-center justify-between text-xs">
          <span className="text-[var(--text-muted)] font-light">{label || "پیشرفت اسپرینت"}</span>
          <span className="font-bold text-[var(--text)]">{toPersianDigits(percentage)}٪</span>
        </div>
      )}
      <div className="flex items-center gap-1 w-full">
        {Array.from({ length: segments }).map((_, index) => {
          const isFilled = index < filledCount;
          return (
            <div
              key={index}
              className={`h-2 flex-1 rounded-pill transition-all duration-300 ${
                isFilled
                  ? 'bg-[#CFFF04] shadow-[0_0_8px_rgba(207,255,4,0.3)]'
                  : 'bg-[var(--surface-2)] opacity-40'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};
