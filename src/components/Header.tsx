import { useState } from 'react';
import { Menu, X, BookOpen } from 'lucide-react';
import ShivajiCollegeLogo from './ShivajiCollegeLogo';
import DelhiUniversityLogo from './DelhiUniversityLogo';

export type NavTab = 'home' | 'about' | 'current-issue' | 'repository' | 'contact';

interface HeaderProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenReaderModal: () => void;
}

export default function Header({ activeTab, onSelectTab, onOpenReaderModal }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'current-issue', label: 'Current Issue' },
    { id: 'repository', label: 'Research Repository' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (tab: NavTab) => {
    setMobileMenuOpen(false);
    onSelectTab(tab);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0B192C] text-white border-b border-slate-800 shadow-lg">
      {/* 1. Institutional Top Bar */}
      <div className="bg-[#050D18] text-slate-300 border-b border-slate-800/80 text-[10px] sm:text-xs py-1.5 px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
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
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[4.5rem] sm:min-h-[6.25rem] py-2 sm:py-2.5">
          
          {/* Left: Dual Crests (Shivaji College + University of Delhi) & Institutional Identity */}
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 sm:gap-3.5 group text-left cursor-pointer focus:outline-none min-w-0"
          >
            <div className="flex items-center gap-1.5 sm:gap-2.5 p-1 sm:p-2 bg-white/10 rounded-xl sm:rounded-2xl border border-white/20 shadow-md group-hover:border-amber-400/50 transition-all shrink-0">
              <div className="block sm:hidden">
                <ShivajiCollegeLogo size={40} className="group-hover:scale-105 transition-transform" />
              </div>
              <div className="hidden sm:block">
                <ShivajiCollegeLogo size={74} className="group-hover:scale-105 transition-transform" />
              </div>

              <div className="block sm:hidden">
                <DelhiUniversityLogo size={40} className="group-hover:scale-105 transition-transform" />
              </div>
              <div className="hidden sm:block">
                <DelhiUniversityLogo size={74} className="group-hover:scale-105 transition-transform" />
              </div>
            </div>

            <div className="flex flex-col pl-2 sm:pl-3 border-l-2 border-amber-400/35 min-w-0">
              <span className="font-serif text-sm sm:text-xl md:text-[22px] font-bold tracking-tight text-white leading-tight truncate">
                Shivaji College
              </span>
              <span className="text-[11px] sm:text-xs md:text-sm text-amber-300 font-sans tracking-wide font-medium truncate">
                University of Delhi
              </span>
              <span className="text-[9px] sm:text-[10px] md:text-[11px] text-[#E0C58A] font-serif tracking-wider font-semibold uppercase mt-0.5 truncate">
                Shivraj 350 Journal
              </span>
            </div>
          </button>

          {/* Center: Primary Navigation Links (Desktop only) */}
          <nav className="hidden lg:flex items-center justify-center gap-1 xl:gap-2 text-sm font-medium">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`relative inline-flex items-center justify-center whitespace-nowrap py-2 px-3.5 xl:px-4 rounded-md transition-colors cursor-pointer text-sm font-medium ${
                    isActive ? 'text-amber-300 font-semibold' : 'text-slate-200 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-3.5 right-3.5 h-0.5 bg-[#C5A059] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Read Inaugural Issue Crimson Pill Button (Desktop only: 44px H x 165px W) */}
          <div className="hidden lg:flex items-center shrink-0">
            <button
              type="button"
              id="header-read-inaugural-btn"
              onClick={onOpenReaderModal}
              className="inline-flex items-center justify-center w-[165px] h-[44px] rounded-full bg-[#781D26] hover:bg-[#8E222D] text-white text-xs sm:text-[13px] font-semibold tracking-wide shadow-md transition-all transform hover:scale-[1.02] cursor-pointer whitespace-nowrap"
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
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`w-full min-h-[44px] text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-white/10 text-amber-300 font-semibold border-l-3 border-[#C5A059]'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
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
