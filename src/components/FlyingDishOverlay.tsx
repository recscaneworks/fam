import React from 'react';
import { FlyingAnimation } from '../types';

interface FlyingDishOverlayProps {
  animations: FlyingAnimation[];
}

export const FlyingDishOverlay: React.FC<FlyingDishOverlayProps> = ({ animations }) => {
  if (animations.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {animations.map(anim => {
        const dx = anim.endX - anim.startX;
        const dy = anim.endY - anim.startY;
        
        return (
          <div
            key={anim.id}
            className="absolute rounded-full shadow-2xl overflow-hidden border-2 border-white ring-2 ring-black animate-fly-tray bg-white"
            style={{
              left: `${anim.startX}px`,
              top: `${anim.startY}px`,
              width: '68px',
              height: '68px',
              '--tw-fly-x': `${dx}px`,
              '--tw-fly-y': `${dy}px`,
              '--tw-fly-y-mid': `${dy * 0.45 - 70}px`
            } as React.CSSProperties}
          >
            <img 
              src={anim.dish.imageUrl} 
              alt={anim.dish.name}
              className="w-full h-full object-cover" 
            />
          </div>
        );
      })}
    </div>
  );
};
