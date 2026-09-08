import React from 'react';
import duLogoSvg from '../assets/images/dureallogo.svg';

interface LogoProps {
  className?: string;
  size?: number;
}

/**
 * Official Emblem of the University of Delhi (DU)
 * Directly renders the user's authentic SVG vector emblem.
 * Features:
 * - Real motto: "निष्ठा धृतिः सत्यम्" (Nistha Dhritih Satyam)
 * - Elephant emblem, circular Sanskrit script & shield
 * - Scalable, high-fidelity vector rendering
 */
export default function DelhiUniversityLogo({ className = '', size = 64 }: LogoProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden select-none bg-white shadow-sm ring-1 ring-amber-400/30 p-0.5 ${className}`}
      style={{ width: size, height: size }}
      aria-label="University of Delhi Official Emblem"
      title="University of Delhi - निष्ठा धृतिः सत्यम्"
    >
      <img
        src={duLogoSvg}
        alt="University of Delhi Official Emblem - निष्ठा धृतिः सत्यम्"
        className="w-full h-full object-contain"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
