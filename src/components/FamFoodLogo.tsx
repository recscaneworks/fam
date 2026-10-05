import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'circle' | 'minimal' | 'black-on-white';
}

export const FamFoodLogo: React.FC<LogoProps> = ({ className = 'h-10', variant = 'circle' }) => {
  if (variant === 'circle') {
    return (
      <svg 
        viewBox="0 0 400 400" 
        className={`${className} aspect-square`}
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        aria-label="FAM FOOD Logo"
      >
        {/* Outer Circular Boundary */}
        <circle cx="200" cy="200" r="185" stroke="#111111" strokeWidth="12" />
        
        {/* Inner Rectangular Frame */}
        <rect x="110" y="115" width="180" height="90" stroke="#111111" strokeWidth="8" fill="none" />
        
        {/* F A M text with geometric triangular Delta for A */}
        <g fill="#111111">
          {/* F */}
          <path d="M128 140 H158 V152 H142 V162 H155 V174 H142 V195 H128 Z" />
          
          {/* Triangular A (Delta) */}
          <path d="M185 140 L204 195 H166 Z M185 160 L176 185 H194 Z" fillRule="evenodd" />
          
          {/* M */}
          <path d="M216 140 H230 L240 170 L250 140 H264 V195 H252 V164 L244 188 H236 L228 164 V195 H216 Z" />
        </g>

        {/* FOOD in Art-Deco High Contrast Serif */}
        <g fill="#111111">
          {/* F */}
          <path d="M112 235 H138 V244 H123 V254 H135 V263 H123 V285 H112 Z" />
          
          {/* O (split geometric style) */}
          <path d="M165 234 C152 234 142 245 142 260 C142 275 152 286 165 286 C178 286 188 275 188 260 C188 245 178 234 165 234 Z M165 244 C172 244 177 251 177 260 C177 269 172 276 165 276 Z" />
          
          {/* Second O */}
          <path d="M214 234 C201 234 191 245 191 260 C191 275 201 286 214 286 C227 286 237 275 237 260 C237 245 227 234 214 234 Z M214 244 C221 244 226 251 226 260 C226 269 221 276 214 276 Z" />
          
          {/* D */}
          <path d="M245 235 H264 C277 235 287 245 287 260 C287 275 277 285 264 285 H245 Z M256 245 V275 H264 C271 275 276 269 276 260 C276 251 271 245 264 245 Z" />
        </g>
      </svg>
    );
  }

  // Minimalist rectangular variant
  return (
    <div className={`flex flex-col items-center justify-center font-sans tracking-tight ${className}`}>
      <div className="border-2 border-black px-3 py-1 text-center font-bold text-lg tracking-widest leading-none">
        F<span className="font-normal font-mono">Δ</span>M
      </div>
      <div className="text-xs font-serif font-black tracking-[0.25em] mt-1 text-black">
        FOOD
      </div>
    </div>
  );
};
