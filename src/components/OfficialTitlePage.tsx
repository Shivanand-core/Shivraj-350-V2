import { MapPin, Globe, Mail } from 'lucide-react';
import { JOURNAL_INFO } from '../data/journalData';
import ShivajiCollegeLogo from './ShivajiCollegeLogo';
import DelhiUniversityLogo from './DelhiUniversityLogo';

export default function OfficialTitlePage() {
  return (
    <div className="relative max-w-3xl mx-auto my-4 sm:my-8 bg-[#F8F5EE] text-slate-900 p-4 sm:p-8 md:p-14 rounded-lg shadow-xl border-2 sm:border-4 border-[#C5A059]/40 overflow-hidden">
      {/* Decorative Classical Double Inset Border */}
      <div className="absolute inset-1.5 sm:inset-3 border border-amber-900/15 pointer-events-none rounded-sm" />
      <div className="absolute inset-2 sm:inset-4 border border-amber-900/10 pointer-events-none rounded-sm" />

      {/* Top Heritage Seal Accents */}
      <div className="flex items-center justify-between gap-2 px-1 sm:px-2 mb-6 sm:mb-8">
        <ShivajiCollegeLogo size={44} className="shrink-0 sm:w-[64px] sm:h-[64px]" />
        <span className="text-[9px] sm:text-[11px] font-mono tracking-wider sm:tracking-widest text-slate-600 font-semibold uppercase text-center px-1">
          Official Publication of Record
        </span>
        <DelhiUniversityLogo size={44} className="shrink-0 sm:w-[64px] sm:h-[64px]" />
      </div>

      {/* Main Journal Title */}
      <div className="text-center space-y-3 sm:space-y-4">
        <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#0F1D30] uppercase">
          SHIVRAJ 350
        </h2>

        {/* Official Classical Gold Diamond & Flourish Divider */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 text-[#C5A059] py-0.5 sm:py-1">
          <div className="w-8 sm:w-16 h-[1.5px] bg-[#C5A059]" />
          <span className="text-xs sm:text-sm">✦ ❖ ✦</span>
          <div className="w-8 sm:w-16 h-[1.5px] bg-[#C5A059]" />
        </div>

        {/* Subtitle in Rich Antique Gold */}
        <h3 className="font-serif text-xs sm:text-lg md:text-2xl font-bold tracking-wide text-[#A17A32] uppercase max-w-2xl mx-auto leading-snug">
          INTERNATIONAL PEER REVIEWED MULTIDISCIPLINARY JOURNAL
        </h3>
      </div>

      {/* Official Verbatim Scope Statement (Replicated exactly from Page 2) */}
      <div className="my-6 sm:my-10 max-w-2xl mx-auto text-center">
        <p className="font-sans text-xs sm:text-base md:text-lg text-slate-800 leading-relaxed text-justify sm:text-center">
          Shivraj 350: Multidisciplinary Journal is a peer-reviewed, academic platform dedicated to fostering interdisciplinary research and dialogue across the sciences, social sciences, humanities, and professional studies. The journal aims to promote original thinking, critical inquiry and innovative solutions to contemporary challenges with global relevance and local impact.
        </p>
      </div>

      {/* Classical Gold Flourish Divider */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 text-[#C5A059] my-6 sm:my-8">
        <div className="w-10 sm:w-24 h-[1.5px] bg-[#C5A059]" />
        <span className="text-xs sm:text-sm">❧ ❖ ☙</span>
        <div className="w-10 sm:w-24 h-[1.5px] bg-[#C5A059]" />
      </div>

      {/* Official Publisher Declaration Block (Page 2) */}
      <div className="text-center space-y-3 sm:space-y-4 pt-1 sm:pt-2 max-w-md mx-auto">
        <div className="text-[10px] sm:text-xs font-sans tracking-[0.2em] sm:tracking-[0.25em] font-bold text-[#A17A32] uppercase">
          PUBLISHED BY:
        </div>

        <div className="space-y-0.5 sm:space-y-1">
          <div className="font-serif text-xl sm:text-3xl font-extrabold tracking-wide text-[#0B192C] uppercase">
            SHIVAJI COLLEGE
          </div>
          <div className="font-serif text-base sm:text-xl font-bold tracking-wider text-[#C5A059] uppercase">
            UNIVERSITY OF DELHI
          </div>
        </div>

        {/* Institutional Contact Information Coordinates */}
        <div className="pt-2 sm:pt-3 space-y-2 sm:space-y-2.5 text-[11px] sm:text-sm text-slate-700 font-sans">
          <div className="flex items-start sm:items-center justify-center gap-1.5 sm:gap-2">
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#781D26] shrink-0 mt-0.5 sm:mt-0" />
            <span className="uppercase tracking-wide font-medium leading-tight">
              RING ROAD, RAJA GARDEN, NEW DELHI – 110027, INDIA
            </span>
          </div>

          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
            <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#781D26] shrink-0" />
            <a
              href="https://www.shivajicollege.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-800 hover:text-[#781D26] transition-colors break-all"
            >
              www.shivajicollege.ac.in
            </a>
          </div>

          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
            <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#781D26] shrink-0" />
            <a
              href="mailto:journal@shivaji.du.ac.in"
              className="text-slate-800 hover:text-[#781D26] font-mono transition-colors break-all"
            >
              journal@shivaji.du.ac.in
            </a>
          </div>

          <div className="pt-1.5 sm:pt-2 font-mono font-bold tracking-widest text-slate-800 text-xs sm:text-sm">
            ISSN XXXX-XXXX
          </div>
        </div>
      </div>

      {/* Bottom Heritage Ribbon */}
      <div className="mt-10 pt-4 border-t border-amber-900/20 text-center">
        <span className="text-[10px] sm:text-xs font-serif italic text-slate-500">
          Inaugural Issue • Volume 1, Issue 1 (Jan-June 2026) • Published under the aegis of Shivaji College, University of Delhi
        </span>
      </div>

      {/* Dark Navy & Gold Base Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#0B192C] border-t border-[#C5A059]" />
    </div>
  );
}
