import React from 'react';
import journalCoverImg from '../assets/images/journal_cover.jpg';

interface JournalCoverProps {
  className?: string;
  onClick?: () => void;
  showSpine?: boolean;
}

export default function OfficialJournalCover({
  className = '',
  onClick,
  showSpine = true,
}: JournalCoverProps) {
  return (
    <div
      onClick={onClick}
      className={`relative group cursor-pointer select-none transition-all duration-300 hover:scale-[1.015] ${className}`}
      title="Shivraj 350: International Peer Reviewed Multidisciplinary Journal (Inaugural Issue) - Click to Read"
    >
      {/* 3D Drop Shadow */}
      <div className="absolute -inset-1 sm:-inset-2 bg-black/40 rounded-2xl blur-xl transform translate-x-2 sm:translate-x-4 translate-y-2 sm:translate-y-4 group-hover:translate-x-3 group-hover:translate-y-3 sm:group-hover:translate-x-5 sm:group-hover:translate-y-5 transition-all" />

      {/* Book Construction: Hardcover Spine + Official Cover Page */}
      <div className="relative flex rounded-r-lg rounded-l-xs overflow-hidden shadow-2xl border border-amber-900/40 bg-[#0B192C]">
        {/* Dark Navy Spine on Left with Gold Hot-Stamped Lettering */}
        {showSpine && (
          <div className="w-7 sm:w-9 md:w-11 bg-gradient-to-r from-[#061220] via-[#0B1E36] to-[#153258] flex flex-col justify-between items-center py-4 sm:py-6 border-r border-black/40 shadow-[inset_-3px_0_6px_rgba(0,0,0,0.5)] shrink-0 z-10">
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-400 shadow-xs" />
            
            {/* Vertical Hot-Stamp Text */}
            <div className="transform -rotate-90 whitespace-nowrap text-[#E6C687] text-[9px] sm:text-[10px] md:text-xs font-serif tracking-[0.15em] sm:tracking-[0.2em] uppercase font-bold">
              SHIVRAJ 350 • VOL. 1 • 2026
            </div>

            <div className="w-2 sm:w-3 h-0.5 bg-amber-400/80" />
          </div>
        )}

        {/* Front Cover Canvas: Direct Official Cover Page Image with Exact 3819x4963 Aspect Ratio */}
        <div className="relative flex-1 min-w-0 bg-[#F5F1E9] overflow-hidden aspect-[3819/4963] flex items-center justify-center">
          <img
            src={journalCoverImg}
            alt="Shivraj 350: International Peer Reviewed Multidisciplinary Journal - Official Cover Page (Inaugural Issue, Volume 1, Issue 1, Jan-June 2026)"
            className="w-full h-full object-contain select-none"
            referrerPolicy="no-referrer"
          />

          {/* Interactive Hover Vignette & Quick Action Cue */}
          <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-[#781D26]/95 text-amber-200 border border-amber-400/50 px-4 py-2 rounded-md shadow-xl text-xs font-serif tracking-wider font-semibold flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
              <span>📖</span>
              <span>Click to Open Inaugural Issue</span>
            </div>
          </div>

          {/* Right Edge Page Thickness Simulation */}
          <div className="absolute top-0 right-0 bottom-0 w-2.5 bg-gradient-to-r from-transparent via-white/10 to-black/30 pointer-events-none" />
          {/* Subtle Top & Bottom Sheen for Hardbound Texture */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
