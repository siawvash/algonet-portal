import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toPersianDigits(n: number | string): string {
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(n).replace(/[0-9]/g, (w) => farsiDigits[+w]);
}

export function formatHours(hours: number): string {
  const whole = Math.floor(hours);
  const minutes = Math.round((hours - whole) * 60);
  const paddedMin = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const paddedHrs = whole < 10 ? `0${whole}` : `${whole}`;
  return `${toPersianDigits(paddedHrs)}:${toPersianDigits(paddedMin)}`;
}
