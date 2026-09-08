import { useState } from 'react';
import { MapPin, Mail, Globe, FileText, Check, Copy } from 'lucide-react';
import ShivajiCollegeLogo from './ShivajiCollegeLogo';
import DelhiUniversityLogo from './DelhiUniversityLogo';
import HeritageSkylineArt from './HeritageSkylineArt';
import { JOURNAL_INFO } from '../data/journalData';
import { NavTab } from './Header';

interface FooterProps {
  onSelectTab?: (tab: NavTab) => void;
}

export default function Footer({ onSelectTab }: FooterProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(JOURNAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleNav = (tab: NavTab) => {
    if (onSelectTab) {
      onSelectTab(tab);
    }
  };

  return (
    <footer className="relative bg-[#071526] text-slate-300 overflow-hidden border-t border-slate-800">
      
      {/* Upper Main Footer Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-8 sm:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 items-start md:items-center">
          
          {/* Column 1 (Left): Official Seals & College Affiliation */}
          <div className="md:col-span-4 flex items-center gap-3 sm:gap-3.5 text-left">
            <div className="flex items-center gap-2 p-1.5 sm:p-2 bg-white/5 rounded-xl sm:rounded-2xl border border-white/10 shadow-inner shrink-0">
              <ShivajiCollegeLogo size={56} className="shrink-0 sm:w-[66px] sm:h-[66px]" />
              <DelhiUniversityLogo size={56} className="shrink-0 sm:w-[66px] sm:h-[66px]" />
            </div>
            <div className="flex flex-col pl-2 border-l-2 border-amber-400/30">
              <span className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-white leading-tight">
                Shivaji College
              </span>
              <span className="text-xs sm:text-sm text-amber-300 font-sans tracking-wide mt-0.5 font-medium">
                University of Delhi
              </span>
              <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase mt-1">
                NAAC Grade &apos;A&apos;
              </span>
            </div>
          </div>

          {/* Column 2 (Center): Institutional Address, Email, Website & ISSN */}
          <div className="md:col-span-5 space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-left font-sans text-slate-300 border-t md:border-t-0 md:border-l border-slate-800/80 pt-6 md:pt-0 pl-0 md:pl-8">
            {/* Address */}
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
              <span className="leading-relaxed">{JOURNAL_INFO.address}</span>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#C5A059] shrink-0" />
              <div className="flex items-center gap-2 flex-wrap">
                <a
                  href={`mailto:${JOURNAL_INFO.email}`}
                  className="hover:text-amber-300 transition-colors font-mono break-all"
                >
                  {JOURNAL_INFO.email}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Copy email"
                >
                  {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>

            {/* Website */}
            <div className="flex items-center gap-3">
              <Globe className="w-4 h-4 text-[#C5A059] shrink-0" />
              <a
                href={`https://${JOURNAL_INFO.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-300 transition-colors break-all"
              >
                {JOURNAL_INFO.website}
              </a>
            </div>

            {/* ISSN */}
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 text-[#C5A059] shrink-0" />
              <span className="font-mono font-medium">ISSN: {JOURNAL_INFO.issn}</span>
            </div>
          </div>

          {/* Column 3 (Right): "Rooted in Values / Driven by Knowledge" */}
          <div className="md:col-span-3 text-left md:text-right space-y-1 border-t md:border-t-0 border-slate-800/80 pt-4 md:pt-0">
            <p className="font-serif italic text-base sm:text-xl text-slate-200">
              Rooted in Values
            </p>
            <p className="font-serif italic text-base sm:text-xl text-slate-200">
              Driven by Knowledge
            </p>
            <div className="w-16 sm:w-20 h-0.5 bg-[#C5A059] ml-0 md:ml-auto mt-2" />
          </div>

        </div>
      </div>

      {/* Delhi Heritage Skyline Background Artwork along bottom */}
      <div className="relative w-full h-14 sm:h-20 overflow-hidden">
        <HeritageSkylineArt className="absolute bottom-0 left-0 right-0 w-full" />
      </div>

      {/* Subfooter Row with Thin Divider */}
      <div className="relative z-10 border-t border-slate-800/80 bg-[#050e1a] py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-sans text-center sm:text-left">
          <div>
            &copy; 2026 Shivraj 350. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-1.5 text-slate-300">
            <button
              type="button"
              onClick={() => handleNav('home')}
              className="hover:text-amber-300 transition-colors cursor-pointer py-1"
            >
              Home
            </button>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <button
              type="button"
              onClick={() => handleNav('about')}
              className="hover:text-amber-300 transition-colors cursor-pointer py-1"
            >
              About
            </button>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <button
              type="button"
              onClick={() => handleNav('current-issue')}
              className="hover:text-amber-300 transition-colors cursor-pointer py-1"
            >
              Current Issue
            </button>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <button
              type="button"
              onClick={() => handleNav('repository')}
              className="hover:text-amber-300 transition-colors cursor-pointer py-1"
            >
              Repository
            </button>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <button
              type="button"
              onClick={() => handleNav('contact')}
              className="hover:text-amber-300 transition-colors cursor-pointer py-1"
            >
              Contact
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
}
