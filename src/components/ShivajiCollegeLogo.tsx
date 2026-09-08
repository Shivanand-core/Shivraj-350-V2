import React from 'react';
import shivajiLogoSvg from '../assets/images/shivaji_logo.svg';

interface LogoProps {
  className?: string;
  size?: number;
}

/**
 * Official Crest of Shivaji College, University of Delhi
 * Directly renders the user's authentic SVG vector emblem.
 * Features:
 * - Real tagline: "अमृतं तु विद्या" (Amritam Tu Vidya)
 * - Official Devanagari lettering: "शिवाजी कॉलेज" & "दिल्ली विश्वविद्यालय"
 * - Infinitely scalable, ultra-sharp vector rendering
 */
export default function ShivajiCollegeLogo({ className = '', size = 74 }: LogoProps) {
  return (
    <div 
      className={`relative inline-flex items-center justify-center shrink-0 select-none overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-amber-400/30 p-0.5 ${className}`}
      style={{ width: size, height: size }}
      aria-label="Shivaji College Official Crest"
      title="Shivaji College, University of Delhi - अमृतं तु विद्या"
    >
      <img
        src={shivajiLogoSvg}
        alt="Shivaji College Official Crest - अमृतं तु विद्या"
        className="w-full h-full object-contain scale-[1.04]"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
