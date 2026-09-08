import ShivajiCollegeLogo from './ShivajiCollegeLogo';

interface BookCoverProps {
  className?: string;
  onClick?: () => void;
}

export default function JournalBookCover({ className = '', onClick }: BookCoverProps) {
  return (
    <div
      onClick={onClick}
      className={`relative group cursor-pointer select-none transition-transform duration-300 hover:scale-[1.02] ${className}`}
      title="Shivraj 350 - Inaugural Issue (Vol. 1, Issue 1)"
    >
      {/* 3D Realistic Book Shadow */}
      <div className="absolute -inset-2 bg-black/25 rounded-2xl blur-xl transform translate-x-4 translate-y-4 group-hover:translate-x-5 group-hover:translate-y-5 transition-all" />

      {/* Book Container with Left Spine & Curved Page Edge */}
      <div className="relative flex rounded-r-xl rounded-l-xs overflow-hidden shadow-2xl border border-slate-300/80 bg-[#FDFBF7]">
        {/* Left Dark Navy Book Spine */}
        <div className="w-10 sm:w-12 bg-gradient-to-r from-[#071322] via-[#0E223D] to-[#152F53] flex flex-col justify-between items-center py-6 border-r border-black/30 shadow-[inset_-3px_0_6px_rgba(0,0,0,0.4)] shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80 shadow-xs" />
          
          {/* Vertical Spine Title */}
          <div className="transform -rotate-90 whitespace-nowrap text-amber-200/90 text-[10px] sm:text-xs font-serif tracking-widest uppercase font-semibold">
            Shivraj 350 • Vol 1 (1) • 2026
          </div>
          
          <div className="w-3 h-0.5 bg-amber-400/60" />
        </div>

        {/* Front Cover Face */}
        <div className="flex-1 p-6 sm:p-8 flex flex-col items-center justify-between text-center min-h-[420px] sm:min-h-[480px] bg-[#FAF8F3] relative overflow-hidden">
          {/* Subtle Vintage Parchment Border */}
          <div className="absolute inset-2 sm:inset-3 border border-amber-900/15 pointer-events-none rounded-sm" />
          <div className="absolute inset-3 sm:inset-4 border border-amber-900/10 pointer-events-none rounded-sm" />

          {/* Top Crest */}
          <div className="pt-2 z-10">
            <ShivajiCollegeLogo size={58} className="mx-auto" />
          </div>

          {/* Main Titles */}
          <div className="space-y-2 z-10 mt-1">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Shivraj 350
            </h3>
            <p className="font-serif italic text-xs sm:text-sm text-slate-700 max-w-[240px] mx-auto leading-snug">
              International Peer Reviewed Multidisciplinary Journal
            </p>
          </div>

          {/* Architectural Sketch Centerpiece */}
          <div className="w-full my-4 px-2 z-10 flex flex-col items-center">
            <div className="relative w-full max-w-[220px] aspect-[4/3] rounded-sm overflow-hidden border border-amber-900/20 shadow-xs bg-[#F5F2EB]">
              <img
                src="/src/assets/images/college_sketch_art_1788796607147.jpg"
                alt="Shivaji College Heritage Building Sketch"
                className="w-full h-full object-cover mix-blend-multiply opacity-90 contrast-125 filter sepia-[0.25]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#F5F2EB]/80 via-transparent to-transparent pointer-events-none" />
            </div>
            <span className="text-[9px] uppercase tracking-wider text-slate-500 mt-1 font-serif">
              Shivaji College • University of Delhi
            </span>
          </div>

          {/* Bottom Issue Metadata */}
          <div className="w-full border-t border-slate-300/80 pt-3 z-10">
            <div className="text-[11px] sm:text-xs font-serif font-semibold text-slate-800 tracking-wide">
              Volume 1 &nbsp;|&nbsp; Issue 1 &nbsp;|&nbsp; Jan-June 2026
            </div>
          </div>
        </div>

        {/* Right Edge Page Thickness Simulation */}
        <div className="w-2.5 sm:w-3 bg-gradient-to-r from-amber-50 via-slate-100 to-slate-200 border-l border-slate-300 shadow-[inset_1px_0_2px_rgba(0,0,0,0.15)] shrink-0" />
      </div>
    </div>
  );
}
