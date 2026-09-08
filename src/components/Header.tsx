import { useState, useRef, useEffect } from 'react';
import { Menu, X, BookOpen, ChevronDown, Database, Send } from 'lucide-react';
import ShivajiCollegeLogo from './ShivajiCollegeLogo';
import DelhiUniversityLogo from './DelhiUniversityLogo';

export type NavTab = 'home' | 'about' | 'current-issue' | 'repository' | 'submissions' | 'contact';

interface HeaderProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenReaderModal: () => void;
}

export default function Header({ activeTab, onSelectTab, onOpenReaderModal }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [researchDropdownOpen, setResearchDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setResearchDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavClick = (tab: NavTab) => {
    setMobileMenuOpen(false);
    setResearchDropdownOpen(false);
    onSelectTab(tab);
  };

  const isResearchActive = activeTab === 'repository' || activeTab === 'submissions';

  return (
    <header className="sticky top-0 z-50 bg-[#0B192C] text-white border-b border-slate-800 shadow-lg">
      {/* 1. Institutional Top Bar */}
      <div className="bg-[#050D18] text-slate-300 border-b border-slate-800/80 text-[10px] sm:text-xs py-1.5 px-3 sm:px-6 lg:px-8">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2 tracking-wide font-sans font-medium text-slate-300">
            <span className="text-[#E0C58A] font-semibold">SHIVAJI COLLEGE, UNIVERSITY OF DELHI</span>
            <span className="text-slate-600 hidden md:inline">|</span>
            <span className="text-slate-400 hidden md:inline">NAAC ACCREDITED GRADE &apos;A&apos;</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 text-slate-400 text-[10px] sm:text-[11px] font-sans">
            <span className="font-mono text-slate-300">ISSN: 2583-XXXX</span>
            <span className="text-slate-600">•</span>
            <span>Biannual Peer-Reviewed Journal</span>
            <span className="text-slate-600 hidden lg:inline">•</span>
            <span className="text-[#E0C58A] hidden lg:inline font-medium">UGC-CARE Standards</span>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation */}
      <div className="w-full max-w-[1440px] mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between min-h-[4.25rem] sm:min-h-[5.5rem] py-2">
          
          {/* Left: Dual Crests (Shivaji College + University of Delhi) & Institutional Identity */}
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 sm:gap-3 group text-left cursor-pointer focus:outline-none shrink-0"
          >
            {/* CSS Selector 1: Crest container shifted and balanced */}
            <div className="flex items-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 bg-white/10 rounded-xl sm:rounded-2xl border border-white/20 shadow-md group-hover:border-amber-400/50 transition-all shrink-0">
              <div className="block sm:hidden">
                <ShivajiCollegeLogo size={36} className="group-hover:scale-105 transition-transform" />
              </div>
              <div className="hidden sm:block">
                <ShivajiCollegeLogo size={56} className="group-hover:scale-105 transition-transform" />
              </div>

              <div className="block sm:hidden">
                <DelhiUniversityLogo size={36} className="group-hover:scale-105 transition-transform" />
              </div>
              <div className="hidden sm:block">
                <DelhiUniversityLogo size={56} className="group-hover:scale-105 transition-transform" />
              </div>
            </div>

            {/* CSS Selector 4: Institutional typography wrapper */}
            <div className="flex flex-col pl-2 sm:pl-3.5 border-l-2 border-[#C5A059]/40 shrink-0 select-none">
              {/* CSS Selector 2: College Name clearly visible without truncation */}
              <span className="font-serif text-base sm:text-lg md:text-xl lg:text-[22px] font-bold tracking-tight text-white leading-tight whitespace-nowrap drop-shadow-xs">
                Shivaji College
              </span>
              {/* CSS Selector 3: University Name */}
              <span className="text-[11px] sm:text-xs md:text-sm text-amber-300 font-sans tracking-wide font-medium whitespace-nowrap leading-tight mt-0.5">
                University of Delhi
              </span>
              {/* CSS Selector 5: Shivraj 350 Journal title */}
              <span className="text-[9px] sm:text-[10px] md:text-[11px] text-[#E0C58A] font-serif tracking-wider font-semibold uppercase mt-0.5 whitespace-nowrap leading-tight">
                Shivraj 350 Journal
              </span>
            </div>
          </button>

          {/* Center: Primary Navigation Links (Desktop with Dropdown) */}
          <nav className="hidden lg:flex items-center justify-center gap-1 xl:gap-2 text-sm font-medium">
            {/* Home */}
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className={`relative inline-flex items-center justify-center whitespace-nowrap py-2 px-3 xl:px-4 rounded-md transition-colors cursor-pointer text-sm font-medium ${
                activeTab === 'home' ? 'text-amber-300 font-semibold' : 'text-slate-200 hover:text-white hover:bg-white/5'
              }`}
            >
              Home
              {activeTab === 'home' && (
                <span className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-[#C5A059] rounded-full" />
              )}
            </button>

            {/* About */}
            <button
              type="button"
              onClick={() => handleNavClick('about')}
              className={`relative inline-flex items-center justify-center whitespace-nowrap py-2 px-3 xl:px-4 rounded-md transition-colors cursor-pointer text-sm font-medium ${
                activeTab === 'about' ? 'text-amber-300 font-semibold' : 'text-slate-200 hover:text-white hover:bg-white/5'
              }`}
            >
              About
              {activeTab === 'about' && (
                <span className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-[#C5A059] rounded-full" />
              )}
            </button>

            {/* Current Issue */}
            <button
              type="button"
              onClick={() => handleNavClick('current-issue')}
              className={`relative inline-flex items-center justify-center whitespace-nowrap py-2 px-3 xl:px-4 rounded-md transition-colors cursor-pointer text-sm font-medium ${
                activeTab === 'current-issue' ? 'text-amber-300 font-semibold' : 'text-slate-200 hover:text-white hover:bg-white/5'
              }`}
            >
              Current Issue
              {activeTab === 'current-issue' && (
                <span className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-[#C5A059] rounded-full" />
              )}
            </button>

            {/* Research & Submissions Dropdown */}
            <div 
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setResearchDropdownOpen(true)}
              onMouseLeave={() => setResearchDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setResearchDropdownOpen(!researchDropdownOpen)}
                className={`relative inline-flex items-center justify-center gap-1.5 whitespace-nowrap py-2 px-3 xl:px-3.5 rounded-md transition-colors cursor-pointer text-sm font-medium ${
                  isResearchActive
                    ? 'text-amber-300 font-semibold bg-white/5'
                    : 'text-slate-200 hover:text-white hover:bg-white/5'
                }`}
                aria-expanded={researchDropdownOpen}
                aria-haspopup="true"
              >
                <span>Research &amp; Submissions</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${researchDropdownOpen ? 'rotate-180 text-amber-300' : 'text-slate-400'}`} />
                {isResearchActive && (
                  <span className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-[#C5A059] rounded-full" />
                )}
              </button>

              {/* Dropdown Menu Container */}
              {researchDropdownOpen && (
                <div 
                  className="absolute left-0 mt-1 w-72 rounded-xl bg-[#071322] border border-slate-700/90 shadow-2xl py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150 backdrop-blur-md"
                >
                  <button
                    type="button"
                    onClick={() => handleNavClick('repository')}
                    className={`w-full px-4 py-2.5 text-left flex items-start gap-3 transition-colors cursor-pointer ${
                      activeTab === 'repository' ? 'bg-white/10 text-amber-300' : 'text-slate-200 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="p-1.5 rounded-lg bg-amber-500/10 text-[#E0C58A] mt-0.5 shrink-0 border border-amber-500/20">
                      <Database className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold">Research Repository</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">Explore search filters, citations &amp; archive</div>
                    </div>
                  </button>

                  <div className="my-1 border-t border-slate-800" />

                  <button
                    type="button"
                    onClick={() => handleNavClick('submissions')}
                    className={`w-full px-4 py-2.5 text-left flex items-start gap-3 transition-colors cursor-pointer ${
                      activeTab === 'submissions' ? 'bg-white/10 text-amber-300' : 'text-slate-200 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 mt-0.5 shrink-0 border border-emerald-500/20">
                      <Send className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold">Call for Papers &amp; Submissions</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">Author guidelines &amp; manuscript submission</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Contact */}
            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className={`relative inline-flex items-center justify-center whitespace-nowrap py-2 px-3 xl:px-4 rounded-md transition-colors cursor-pointer text-sm font-medium ${
                activeTab === 'contact' ? 'text-amber-300 font-semibold' : 'text-slate-200 hover:text-white hover:bg-white/5'
              }`}
            >
              Contact
              {activeTab === 'contact' && (
                <span className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-[#C5A059] rounded-full" />
              )}
            </button>
          </nav>

          {/* Right: Read Inaugural Issue Crimson Pill Button (Desktop only: 44px H x 165px W) */}
          <div className="hidden lg:flex items-center shrink-0">
            <button
              type="button"
              id="header-read-inaugural-btn"
              onClick={onOpenReaderModal}
              className="inline-flex items-center justify-center w-[165px] h-[42px] rounded-full bg-[#781D26] hover:bg-[#8E222D] text-white text-xs sm:text-[13px] font-semibold tracking-wide shadow-md transition-all transform hover:scale-[1.02] cursor-pointer whitespace-nowrap"
            >
              <span>Read Inaugural Issue</span>
            </button>
          </div>

          {/* Mobile Hamburger Menu Button (44px min touch target) */}
          <div className="flex lg:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-h-[44px] min-w-[44px] p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none flex items-center justify-center cursor-pointer transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-amber-300" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#071322] border-t border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className={`w-full min-h-[44px] text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-white/10 text-amber-300 font-semibold border-l-3 border-[#C5A059]'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('about')}
              className={`w-full min-h-[44px] text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center cursor-pointer ${
                activeTab === 'about'
                  ? 'bg-white/10 text-amber-300 font-semibold border-l-3 border-[#C5A059]'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              About
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('current-issue')}
              className={`w-full min-h-[44px] text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center cursor-pointer ${
                activeTab === 'current-issue'
                  ? 'bg-white/10 text-amber-300 font-semibold border-l-3 border-[#C5A059]'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              Current Issue
            </button>

            {/* Sub-menu section for Research & Submissions in mobile */}
            <div className="pt-2 pb-1 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Research &amp; Publishing
            </div>
            <button
              type="button"
              onClick={() => handleNavClick('repository')}
              className={`w-full min-h-[44px] text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2.5 cursor-pointer ${
                activeTab === 'repository'
                  ? 'bg-white/10 text-amber-300 font-semibold border-l-3 border-[#C5A059]'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Database className="w-4 h-4 text-[#E0C58A]" />
              <span>Research Repository</span>
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('submissions')}
              className={`w-full min-h-[44px] text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2.5 cursor-pointer ${
                activeTab === 'submissions'
                  ? 'bg-white/10 text-amber-300 font-semibold border-l-3 border-[#C5A059]'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Send className="w-4 h-4 text-emerald-400" />
              <span>Call for Papers &amp; Submissions</span>
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className={`w-full min-h-[44px] text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center cursor-pointer ${
                activeTab === 'contact'
                  ? 'bg-white/10 text-amber-300 font-semibold border-l-3 border-[#C5A059]'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              Contact
            </button>
          </div>

          {/* Mobile CTA inside Hamburger Drawer */}
          <div className="pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReaderModal();
              }}
              className="w-full min-h-[46px] py-3 px-4 rounded-full bg-[#781D26] hover:bg-[#8E222D] text-white text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-md transition-colors"
            >
              <BookOpen className="w-4 h-4 text-amber-300" />
              <span>Read Inaugural Issue</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
