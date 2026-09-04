"use client";
import React from "react";
import { cn } from "../../lib/utils";

interface BackgroundRippleEffectProps {
  className?: string;
}

export const BackgroundRippleEffect: React.FC<BackgroundRippleEffectProps> = ({
  className,
}) => {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 w-full h-full overflow-hidden select-none z-0",
        className
      )}
    >
      {/* Soft ambient blue glow centered behind hero content */}
      <div className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[85%] max-w-4xl h-[450px] rounded-[50%] bg-blue-400/14 dark:bg-blue-600/14 blur-[130px]" />
      <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[60%] max-w-2xl h-[320px] rounded-[50%] bg-sky-300/16 dark:bg-blue-500/16 blur-[90px]" />

      {/* Hexagonal Honeycomb Pattern Grid: Slightly lighter for perfect subtle balance */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          maskImage: "radial-gradient(ellipse 78% 68% at 50% 32%, rgba(0,0,0,1) 22%, rgba(0,0,0,0.38) 62%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 78% 68% at 50% 32%, rgba(0,0,0,1) 22%, rgba(0,0,0,0.38) 62%, rgba(0,0,0,0) 100%)",
        }}
      >
        <svg className="w-full h-full text-[#8fcdff]/50 dark:text-sky-400/22">
          <defs>
            <pattern
              id="hex-grid-pattern"
              width="62.354"
              height="108"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M31.177 0 L62.354 18 V54 L31.177 72 L0 54 V18 Z M31.177 72 V108"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.6"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex-grid-pattern)" />
        </svg>
      </div>
    </div>
  );
};
