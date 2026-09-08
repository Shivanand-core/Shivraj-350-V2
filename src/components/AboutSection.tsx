import { JOURNAL_INFO } from '../data/journalData';
import aboutImage from '../assets/images/about_image.png';
import ResearchTopicCards from './ResearchTopicCards';

interface AboutSectionProps {
  isStandalonePage?: boolean;
  onSelectDiscipline?: (discipline: string) => void;
}

export default function AboutSection({
  isStandalonePage = false,
  onSelectDiscipline,
}: AboutSectionProps) {
  return (
    <section id="about" className="scroll-mt-24 sm:scroll-mt-28">
      {/* If viewing dedicated About Page: Dark Atmospheric Library Banner */}
      {isStandalonePage && (
        <div className="relative bg-[#071322] text-white py-12 sm:py-16 overflow-hidden border-b border-slate-800">
          <div className="absolute inset-0 z-0">
            <img
              src="/src/assets/images/academic_library_bg_1788796629847.jpg"
              alt="Academic Library Bookshelves"
              className="w-full h-full object-cover opacity-35 mix-blend-luminosity filter brightness-75"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#071322] via-[#071322]/80 to-[#071322]/60" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2.5">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              About the Journal
            </h1>
            <div className="w-16 h-0.5 bg-[#C5A059] mx-auto" />
            <p className="text-xs sm:text-sm font-sans tracking-[0.25em] uppercase text-[#E0C58A] font-medium pt-1">
              IDEAS FOR A BRIGHTER TOMORROW
            </p>
          </div>
        </div>
      )}

      {/* Main About Section Layout with Intelligently Compact Spacing */}
      <div className="py-8 sm:py-10 lg:py-12 bg-white border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-3 sm:space-y-4 text-left">
              {/* Gold Eyebrow */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold tracking-widest uppercase text-[#C5A059] font-sans">
                  ABOUT
                </span>
                <div className="w-14 h-0.5 bg-[#C5A059]" />
              </div>

              {/* Section Heading */}
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-[38px] font-bold text-slate-900 leading-tight">
                {isStandalonePage ? 'Shivraj 350: Multidisciplinary Journal' : 'About the Journal'}
              </h2>

              {/* Exact Verbatim Scope & Academic Platform Text */}
              <div className="space-y-2.5 sm:space-y-3 text-slate-700 text-sm sm:text-base leading-relaxed font-sans">
                <p>
                  Shivraj 350: Multidisciplinary Journal is a peer-reviewed, academic platform dedicated to fostering interdisciplinary research and dialogue across the sciences, social sciences, humanities, and professional studies. The journal aims to promote original thinking, critical inquiry and innovative solutions to contemporary challenges with global relevance and local impact.
                </p>
                <p className="text-xs sm:text-sm text-slate-600">
                  Published by Shivaji College, University of Delhi, the journal upholds the highest standards of double-blind peer review and academic ethics, offering open-access scholarship without publication fees to bridge scholars worldwide.
                </p>
              </div>

              {/* Accreditation & Institutional Footnote */}
              <div className="pt-1.5 sm:pt-2 flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-slate-500 font-sans">
                <span className="inline-flex items-center gap-1.5 font-medium text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-[#781D26]" />
                  Shivaji College, University of Delhi
                </span>
                <span>•</span>
                <span>NAAC Grade &apos;A&apos; Accredited</span>
                <span>•</span>
                <span className="font-mono">ISSN: {JOURNAL_INFO.issn}</span>
              </div>
            </div>

            {/* Right Column: Campus & Academic Heritage Image */}
            <div className="lg:col-span-6 mt-3 lg:mt-0">
              <div className="relative mx-auto max-w-md bg-[#FAF8F5] p-2.5 sm:p-3.5 rounded-lg border border-slate-200 shadow-xs">
                
                {/* Image Container matching 3:2 aspect ratio */}
                <div className="relative aspect-[3/2] rounded-sm overflow-hidden border border-amber-900/15 shadow-inner bg-[#F5F2EB]">
                  <img
                    src={aboutImage}
                    alt="Shivaji College Campus & Academic Heritage"
                    className="w-full h-full object-contain select-none"
                    referrerPolicy="no-referrer"
                  />
                </div>

              </div>
            </div>

          </div>

          {/* Key Focus Areas (Compact Card-Based Grid: 3 Desktop, 2 Tablet, 1 Mobile) */}
          <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-slate-200">
            <div className="text-left mb-4 sm:mb-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold tracking-widest uppercase text-[#C5A059] font-sans">
                  DISCIPLINES
                </span>
                <div className="w-10 h-0.5 bg-[#C5A059]" />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                Key Focus Areas
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-sans">
                Interdisciplinary publication streams advancing original scholarship across 4 core research pillars
              </p>
            </div>

            {/* Compact Card-based Grid */}
            <ResearchTopicCards onSelectTopic={onSelectDiscipline} />
          </div>

        </div>
      </div>
    </section>
  );
}
