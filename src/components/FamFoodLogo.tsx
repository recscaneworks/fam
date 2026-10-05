import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  variant?: 'circle' | 'minimal' | 'black-on-white';
}

// Possible filenames the user can add to GitHub in the public/ folder:
const POSSIBLE_LOGO_PATHS = [
  '/logo.png',
  '/logo.jpg',
  '/Invert_logo_colors_2K_20261005012855.jpg',
  '/Invert_logo_colors_2K_20261005012855.png',
  '/logo.svg'
];

export const FamFoodLogo: React.FC<LogoProps> = ({ className = 'h-10' }) => {
  const [pathIndex, setPathIndex] = useState<number>(0);
  const [showSvgFallback, setShowSvgFallback] = useState<boolean>(false);

  const handleImgError = () => {
    if (pathIndex < POSSIBLE_LOGO_PATHS.length - 1) {
      setPathIndex(prev => prev + 1);
    } else {
      setShowSvgFallback(true);
    }
  };

  if (!showSvgFallback) {
    return (
      <img
        src={POSSIBLE_LOGO_PATHS[pathIndex]}
        alt="FAM FOOD"
        onError={handleImgError}
        className={`${className} aspect-square object-contain shrink-0`}
      />
    );
  }

  // Fallback vector SVG if PNG file is not yet pushed to GitHub
  return (
    <svg 
      viewBox="0 0 1000 1000" 
      className={`${className} aspect-square shrink-0`}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="FAM FOOD Logo"
    >
      <circle cx="500" cy="500" r="382" stroke="#000000" strokeWidth="36" fill="none" />
      <path d="M 356 350 H 664 V 472" fill="none" stroke="#000000" strokeWidth="16" strokeLinecap="square" strokeLinejoin="miter" />
      <path d="M 664 530 H 356 V 408" fill="none" stroke="#000000" strokeWidth="16" strokeLinecap="square" strokeLinejoin="miter" />
      <line x1="356" y1="408" x2="442" y2="408" stroke="#000000" strokeWidth="16" strokeLinecap="square" />
      <line x1="370" y1="408" x2="370" y2="514" stroke="#000000" strokeWidth="16" strokeLinecap="square" />
      <line x1="370" y1="445" x2="442" y2="445" stroke="#000000" strokeWidth="14" strokeLinecap="square" />
      <polygon points="503,406 449,478 557,478" fill="none" stroke="#000000" strokeWidth="16" strokeLinejoin="miter" />
      <polyline points="564,478 564,406 614,478 664,406 664,472" fill="none" stroke="#000000" strokeWidth="16" strokeLinecap="square" strokeLinejoin="miter" />
      <rect x="304" y="568" width="40" height="92" fill="#000000" />
      <polygon points="344,568 382,568 382,584 374,584 374,578 344,578" fill="#000000" />
      <rect x="344" y="612" width="30" height="9" fill="#000000" />
      <path d="M 438 568 C 414 568 394 588 394 614 C 394 640 414 660 438 660 C 462 660 482 640 482 614 C 482 588 462 568 438 568 Z M 438 574 C 460 574 476 592 476 614 C 476 636 460 654 438 654 C 436 654 436 636 436 614 C 436 592 436 574 438 574 Z" fill="#000000" fillRule="evenodd" />
      <path d="M 548 568 C 524 568 504 588 504 614 C 504 640 524 660 548 660 C 572 660 592 640 592 614 C 592 588 572 568 548 568 Z M 548 574 C 570 574 586 592 586 614 C 586 636 570 654 548 654 C 546 654 546 636 546 614 C 546 592 546 574 548 574 Z" fill="#000000" fillRule="evenodd" />
      <rect x="624" y="568" width="40" height="92" fill="#000000" />
      <path d="M 664 571 C 694 571 716 590 716 614 C 716 638 694 657 664 657" fill="none" stroke="#000000" strokeWidth="6" />
    </svg>
  );
};
