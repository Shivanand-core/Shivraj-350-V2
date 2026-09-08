import { useState } from 'react';
import { 
  BookOpen, 
  FileText, 
  ArrowRight,
  Compass,
  Network,
  Leaf,
  Users2,
  Globe2
} from 'lucide-react';
import { CURRENT_ISSUE } from '../data/journalData';
import OfficialJournalCover from './OfficialJournalCover';
import OfficialTitlePage from './OfficialTitlePage';

interface CurrentIssueSectionProps {
  isStandalonePage?: boolean;
  onOpenVolumeReader: () => void;
}

export default function CurrentIssueSection({
  isStandalonePage = false,
  onOpenVolumeReader,
}: CurrentIssueSectionProps) {
  const [viewMode, setViewMode] = useState<'cover' | 'title-page'>('cover');

  return (
    <section id="current-issue" className="scroll-mt-24 sm:scroll-mt-28">
      {/* If viewing dedicated Current Issue Page: Atmospheric Library Banner */}
      {isStandalonePage && (
        <div className="relative bg-[#071322] text-white py-12 sm:py-16 overflow-hidden border-b-4 border-[#C5A059]">
          <div className="absolute inset-0 z-0">
            <img
              src="/src/assets/images/academic_library_bg_1788796629847.jpg"
              alt="Academic Library"
              className="w-full h-full object-cover opacity-30 mix-blend-luminosity filter brightness-75"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#071322] via-[#071322]/85 to-[#071322]/70" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2.5">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Current Issue
            </h1>
            <div className="w-20 h-0.5 bg-[#C5A059] mx-auto" />
            <p className="text-xs sm:text-sm font-sans tracking-[0.25em] uppercase text-[#E0C58A] font-medium pt-1">
              LATEST RESEARCH. DEEPER INSIGHTS.
            </p>
          </div>
        </div>
      )}

      {/* Main Section Container with Refined Spacing */}
      <div className="py-8 sm:py-10 lg:py-12 bg-[#FAF8F5] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb if standalone page */}
          {isStandalonePage && (
            <nav className="mb-6 text-xs font-sans text-slate-500 flex items-center gap-1.5">
              <span>Home</span>
              <span>&gt;</span>
              <span className="text-slate-800 font-semibold">Current Issue</span>
            </nav>
          )}

          {/* Issue Header Center Block */}
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
            <div className="flex items-center justify-center gap-3 mb-1.5">
              <div className="w-10 h-0.5 bg-[#C5A059]" />
              <span className="text-xs font-bold tracking-widest uppercase text-[#C5A059] font-sans">
                CURRENT ISSUE
              </span>
              <div className="w-10 h-0.5 bg-[#C5A059]" />
            </div>
            
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-[38px] font-bold text-slate-900 leading-tight">
              Inaugural Issue
            </h2>
            <p className="font-serif text-base sm:text-lg text-slate-700 mt-1">
              Volume 1, Issue 1, Jan-June 2026
            </p>

            {/* Toggle between Official Cover (Page 1) and Official Title & Imprint (Page 2) */}
            <div className="inline-flex flex-col sm:flex-row items-stretch sm:items-center p-1 rounded-xl sm:rounded-full bg-slate-200/80 mt-3.5 text-xs font-medium w-full sm:w-auto gap-1">
              <button
                type="button"
                onClick={() => setViewMode('cover')}
                className={`min-h-[38px] px-4 py-1.5 rounded-lg sm:rounded-full transition-colors cursor-pointer text-center ${
                  viewMode === 'cover'
                    ? 'bg-[#781D26] text-white shadow-xs font-semibold'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                Official Cover (Page 1)
              </button>
              <button
                type="button"
                onClick={() => setViewMode('title-page')}
                className={`min-h-[38px] px-4 py-1.5 rounded-lg sm:rounded-full transition-colors cursor-pointer text-center ${
                  viewMode === 'title-page'
                    ? 'bg-[#781D26] text-white shadow-xs font-semibold'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                Title & Imprint Page (Page 2)
              </button>
            </div>
          </div>

          {/* Render Mode: Title Page or Standard Spotlight */}
          {viewMode === 'title-page' ? (
            <div className="mb-8 sm:mb-10">
              <OfficialTitlePage />
            </div>
          ) : (
            /* Spotlight Layout: Official Cover on Left, Badges & CTA on Right */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center mb-8 sm:mb-10">
              
              {/* Left: Official 3D Cover */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-[270px] sm:max-w-[330px] lg:max-w-[370px]">
                  <OfficialJournalCover onClick={onOpenVolumeReader} />
                </div>
              </div>

              {/* Right: Feature Badges & Action */}
              <div className="lg:col-span-7 space-y-4 sm:space-y-4.5 text-left">
                <div className="space-y-2">
                  <span className="text-xs font-bold tracking-wider uppercase text-[#781D26] bg-amber-50 border border-amber-200 px-3 py-1 rounded-full inline-block">
                    Shivaji College • University of Delhi
                  </span>
                  <p className="text-slate-700 text-xs sm:text-sm md:text-base leading-relaxed font-sans pt-0.5">
                    We are delighted to present the inaugural issue of <strong>Shivraj 350</strong>, marking the beginning of a journey towards interdisciplinary dialogue, critical inquiry, and meaningful academic contributions with global relevance and local impact.
                  </p>
                </div>

                {/* 3 Iconic Circular Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 py-1">
                  <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-1 group">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-[#C5A059] flex items-center justify-center bg-white shadow-xs group-hover:bg-[#C5A059]/10 transition-colors">
                      <BookOpen className="w-4 h-4 text-[#A17A32]" />
                    </div>
                    <h4 className="font-serif text-sm sm:text-base font-bold text-slate-900">
                      Original Research
                    </h4>
                    <p className="text-xs text-slate-600 font-sans">
                      Across diverse disciplines
                    </p>
                  </div>

                  <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-1 group">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-[#C5A059] flex items-center justify-center bg-white shadow-xs group-hover:bg-[#C5A059]/10 transition-colors">
                      <Users2 className="w-4 h-4 text-[#A17A32]" />
                    </div>
                    <h4 className="font-serif text-sm sm:text-base font-bold text-slate-900">
                      Interdisciplinary Dialogue
                    </h4>
                    <p className="text-xs text-slate-600 font-sans">
                      Bridging ideas and perspectives
                    </p>
                  </div>

                  <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-1 group">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-[#C5A059] flex items-center justify-center bg-white shadow-xs group-hover:bg-[#C5A059]/10 transition-colors">
                      <Globe2 className="w-4 h-4 text-[#A17A32]" />
                    </div>
                    <h4 className="font-serif text-sm sm:text-base font-bold text-slate-900">
                      Global Relevance
                    </h4>
                    <p className="text-xs text-slate-600 font-sans">
                      With local impact
                    </p>
                  </div>
                </div>

                {/* Crimson Pill Action Buttons: Mobile responsive flex stack */}
                <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5">
                  <button
                    type="button"
                    id="btn-read-inaugural-section"
                    onClick={onOpenVolumeReader}
                    className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#781D26] to-[#8E222D] hover:from-[#5A121A] hover:to-[#781D26] text-white text-xs sm:text-sm font-semibold shadow-md transition-all transform hover:scale-[1.02] cursor-pointer text-center"
                  >
                    <span>Read Inaugural Issue (Vol. 1, Issue 1)</span>
                    <ArrowRight className="w-4 h-4 text-white shrink-0" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setViewMode('title-page')}
                    className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full border border-slate-300 text-slate-700 hover:bg-white text-xs font-semibold transition-colors cursor-pointer text-center"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#781D26] shrink-0" />
                    <span>View Imprint Page</span>
                  </button>
                </div>

              </div>

            </div>
          )}

          {/* "What to Expect" Section */}
          <div className="pt-6 sm:pt-8 border-t border-slate-200">
            <div className="text-left mb-4 sm:mb-6">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                What to Expect
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-sans mt-0.5">
                Scholarly contributions curated for Volume 1, Issue 1
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-white p-4 sm:p-5 rounded-lg border border-slate-200/80 shadow-xs flex flex-col items-center text-center space-y-2">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#C5A059] flex items-center justify-center bg-amber-50/40 text-[#781D26]">
                  <Compass className="w-4 h-4 text-[#A17A32]" />
                </div>
                <h4 className="font-serif text-base sm:text-lg font-bold text-slate-900">
                  Original Research
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                  Thought-provoking articles grounded in rigorous qualitative and quantitative methodological frameworks.
                </p>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-lg border border-slate-200/80 shadow-xs flex flex-col items-center text-center space-y-2">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#C5A059] flex items-center justify-center bg-amber-50/40 text-[#781D26]">
                  <Network className="w-4 h-4 text-[#A17A32]" />
                </div>
                <h4 className="font-serif text-base sm:text-lg font-bold text-slate-900">
                  Diverse Perspectives
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                  Cross-cutting scholarly insights across Sciences, Social Sciences, Humanities, and Professional Studies.
                </p>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-lg border border-slate-200/80 shadow-xs flex flex-col items-center text-center space-y-2">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#C5A059] flex items-center justify-center bg-amber-50/40 text-[#781D26]">
                  <Leaf className="w-4 h-4 text-[#A17A32]" />
                </div>
                <h4 className="font-serif text-base sm:text-lg font-bold text-slate-900">
                  Real-World Impact
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                  Addressing contemporary societal, economic, ecological, and policy challenges with actionable solutions.
                </p>
              </div>
            </div>

            {/* Direct Jump to Curated Articles / Research Repository */}
            <div className="mt-6 text-center">
              <a
                href="#repository"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#781D26] hover:text-[#8E222D] hover:underline"
              >
                <span>Browse Curated Articles in Research Repository</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
