import React from 'react';
import logoWhite from '../../assets/icons/algonet-logo-white.png';
import logoDark from '../../assets/icons/algonet-logo-dark.png';

export interface AlgonetLogoProps {
  variant?: 'persian' | 'latin' | 'symbol';
  size?: number;
  className?: string;
  theme?: 'dark' | 'light' | 'auto';
  showBadge?: boolean;
  renderMode?: 'image' | 'svg';
}

/**
 * Official Algonet Logo component.
 * Uses the exact brand asset uploaded for Algonet (432x275 transparent constellation geometry).
 * Supports white on dark purple/dark mode, slate navy on light backgrounds,
 * and vector SVG fallback for infinite scalability.
 */
export const AlgonetLogo: React.FC<AlgonetLogoProps> = ({
  variant = 'persian',
  size = 38,
  className = '',
  theme = 'auto',
  showBadge = true,
  renderMode = 'svg',
}) => {
  const textColor = theme === 'dark' ? '#FFFFFF' : theme === 'light' ? '#30334e' : 'currentColor';

  // 432 x 275 aspect ratio
  const iconWidth = size;
  const iconHeight = Math.round((size * 275) / 432);

  // Exact vector path extracted from official brand asset
  const vectorPath =
    'M 431 52 L 429 49 L 424 47 L 422 47 L 418 49 L 416 49 L 411 46 L 402 43 L 386 40 L 369 40 L 357 42 L 347 45 L 334 51 L 331 48 L 328 47 L 328 0 L 325 0 L 324 48 L 321 49 L 319 52 L 320 61 L 196 184 L 184 183 L 180 185 L 178 187 L 176 190 L 176 192 L 174 194 L 74 194 L 74 198 L 174 198 L 176 200 L 177 203 L 123 257 L 114 263 L 105 267 L 99 269 L 88 271 L 75 271 L 64 269 L 58 267 L 51 264 L 40 257 L 28 245 L 23 238 L 16 223 L 14 215 L 15 209 L 18 209 L 20 208 L 25 203 L 26 201 L 26 191 L 25 189 L 20 184 L 18 183 L 8 183 L 6 184 L 1 189 L 0 191 L 0 201 L 1 203 L 6 208 L 9 209 L 11 214 L 11 218 L 15 231 L 19 239 L 26 249 L 35 258 L 45 265 L 53 269 L 65 273 L 70 274 L 93 274 L 102 272 L 108 270 L 120 264 L 127 259 L 179 207 L 181 207 L 184 209 L 193 209 L 197 207 L 199 205 L 201 202 L 201 200 L 203 198 L 319 199 L 322 203 L 323 203 L 325 205 L 325 257 L 323 259 L 322 259 L 320 261 L 319 263 L 319 270 L 323 274 L 330 274 L 332 273 L 334 271 L 335 269 L 335 264 L 334 262 L 331 259 L 330 259 L 328 257 L 329 204 L 332 203 L 333 202 L 334 199 L 388 198 L 390 200 L 390 202 L 394 207 L 398 209 L 407 209 L 411 207 L 415 202 L 416 199 L 416 193 L 415 190 L 413 187 L 411 185 L 407 183 L 398 183 L 394 185 L 391 188 L 390 192 L 388 194 L 334 193 L 333 190 L 332 189 L 329 188 L 328 65 L 330 63 L 331 63 L 334 60 L 335 58 L 335 56 L 337 54 L 347 49 L 356 46 L 366 44 L 389 44 L 399 46 L 413 51 L 415 53 L 415 58 L 416 60 L 419 63 L 421 64 L 425 64 L 430 61 L 431 59 Z M 324 63 L 325 187 L 323 189 L 322 189 L 319 193 L 203 194 L 201 192 L 201 190 L 199 187 L 322 64 Z';

  const symbolElement = (
    <div
      className="inline-flex items-center justify-center shrink-0 select-none"
      style={{ width: iconWidth, height: iconHeight }}
    >
      {renderMode === 'svg' ? (
        <svg
          viewBox="0 0 432 275"
          fill="currentColor"
          fillRule="evenodd"
          className="w-full h-full object-contain"
          style={{ color: textColor }}
        >
          <path d={vectorPath} />
        </svg>
      ) : theme === 'dark' ? (
        <img
          src={logoWhite}
          alt="لوگو الگونت"
          className="w-full h-full object-contain select-none pointer-events-none drop-shadow-sm"
          draggable={false}
        />
      ) : theme === 'light' ? (
        <img
          src={logoDark}
          alt="لوگو الگونت"
          className="w-full h-full object-contain select-none pointer-events-none"
          draggable={false}
        />
      ) : (
        <>
          <img
            src={logoWhite}
            alt="لوگو الگونت"
            className="w-full h-full object-contain select-none pointer-events-none hidden dark:block drop-shadow-sm"
            draggable={false}
          />
          <img
            src={logoDark}
            alt="لوگو الگونت"
            className="w-full h-full object-contain select-none pointer-events-none block dark:hidden"
            draggable={false}
          />
        </>
      )}
    </div>
  );

  if (variant === 'symbol') {
    return <div className={`inline-flex items-center justify-center ${className}`}>{symbolElement}</div>;
  }

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {symbolElement}

      {/* Lockup Typography */}
      {variant === 'persian' && (
        <div className="flex flex-col text-right leading-tight">
          <span className="font-['Vazirmatn'] font-bold text-[19px]" style={{ color: textColor }}>
            الگونت
          </span>
          <span className="font-['Vazirmatn'] font-normal text-[11px] opacity-75 mt-0.5" style={{ color: textColor }}>
            پورتال یکپارچه
          </span>
        </div>
      )}

      {variant === 'latin' && (
        <div className="flex flex-col text-left dir-ltr" dir="ltr">
          <span className="font-bold tracking-widest text-lg leading-none" style={{ color: textColor }}>
            ALGONET
          </span>
          <span className="text-[9px] tracking-wider uppercase opacity-60 leading-tight" style={{ color: textColor }}>
            Enterprise Portal
          </span>
        </div>
      )}
    </div>
  );
};
