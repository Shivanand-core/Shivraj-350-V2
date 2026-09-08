import { useState, useEffect } from 'react';
import { 
  X, 
  BookOpen, 
  Download, 
  Printer, 
  Quote, 
  Calendar, 
  ExternalLink, 
  FileText, 
  Check, 
  Building2,
  ChevronRight,
  ChevronLeft,
  Share2,
  ArrowRight,
  ListOrdered,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { JOURNAL_INFO, CURRENT_ISSUE, INAUGURAL_ARTICLES } from '../data/journalData';
import { JournalArticle } from '../types';
import ShivajiCollegeLogo from './ShivajiCollegeLogo';
import DelhiUniversityLogo from './DelhiUniversityLogo';
import journalCoverImg from '../assets/images/journal_cover.jpg';

interface IssueReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialArticle?: JournalArticle | null;
  onOpenCitation: (article: JournalArticle) => void;
  onOpenDedicatedArticle?: (article: JournalArticle) => void;
}

export default function IssueReaderModal({
  isOpen,
  onClose,
  initialArticle,
  onOpenCitation,
  onOpenDedicatedArticle,
}: IssueReaderModalProps) {
  const [activeTab, setActiveTab] = useState<'cover' | 'preface' | 'articles'>('cover');
  const [selectedArticleId, setSelectedArticleId] = useState<string>(
    initialArticle ? initialArticle.id : INAUGURAL_ARTICLES[0].id
  );
  const [copiedDoi, setCopiedDoi] = useState(false);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  useEffect(() => {
    if (initialArticle) {
      setSelectedArticleId(initialArticle.id);
      setActiveTab('articles');
    }
  }, [initialArticle]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentArticle = INAUGURAL_ARTICLES.find(a => a.id === selectedArticleId) || INAUGURAL_ARTICLES[0];

  const handleCopyDoi = () => {
    navigator.clipboard.writeText(`https://doi.org/${currentArticle.doi}`);
    setCopiedDoi(true);
    setTimeout(() => setCopiedDoi(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 flex items-center justify-center p-2 sm:p-4 md:p-6">
      <div 
        className="relative bg-white w-full max-w-5xl rounded-xl sm:rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[96vh] sm:max-h-[92vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reader-modal-title"
      >
        {/* Modal Top Header Bar */}
        <div className="bg-[#0B192C] text-white px-3.5 sm:px-6 py-3 sm:py-4 flex items-center justify-between border-b border-amber-500/30 gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-[#781D26] flex items-center justify-center text-amber-300 font-cinzel font-bold text-xs border border-amber-400/40 shrink-0">
              S350
            </div>
            <div className="min-w-0">
              <h2 id="reader-modal-title" className="font-cinzel text-xs sm:text-base lg:text-lg font-bold text-white leading-tight truncate">
                Shivraj 350 • Digital Edition Reader
              </h2>
              <p className="text-[10px] sm:text-xs text-amber-300/90 font-serif truncate">
                Inaugural Issue, Vol. 1, Issue 1 (Jan-June 2026) • Shivaji College (DU)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-slate-200 transition-colors cursor-pointer"
              title="Print formatted paper"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center cursor-pointer"
              aria-label="Close reader"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Subnav Tabs */}
        <div className="bg-slate-100 px-3 sm:px-6 py-2 border-b border-slate-200 flex items-center justify-between text-xs overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('cover')}
              className={`min-h-[36px] px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'cover'
                  ? 'bg-white text-[#781D26] shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Official Cover (Page 1)
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('preface')}
              className={`min-h-[36px] px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'preface'
                  ? 'bg-white text-[#781D26] shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Volume Preface (Page 2)
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('articles')}
              className={`min-h-[36px] px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'articles'
                  ? 'bg-white text-[#781D26] shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Curated Articles ({INAUGURAL_ARTICLES.length})
            </button>
          </div>

          <span className="hidden md:inline font-mono text-slate-500 text-[11px] shrink-0 ml-3">
            ISSN: {JOURNAL_INFO.issn}
          </span>
        </div>

        {/* Modal Body: Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 flex-1 bg-slate-50/50">
          {activeTab === 'cover' ? (
            /* Full Official Cover Page View */
            <div className="max-w-2xl mx-auto flex flex-col items-center space-y-4">
              <div className="relative bg-white rounded-lg shadow-2xl border border-slate-300 overflow-hidden max-w-[620px] w-full aspect-[3819/4963]">
                <img
                  src={journalCoverImg}
                  alt="Shivraj 350 Official Cover Page (Page 1)"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('preface')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#781D26] text-white text-xs font-serif font-medium hover:bg-[#5E141C] transition-colors shadow-sm"
                >
                  <span>Proceed to Volume Preface & Editorial Message</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : activeTab === 'preface' ? (
            /* Volume 1 Issue 1 Preface View */
            <div className="max-w-3xl mx-auto space-y-6 bg-white p-8 sm:p-10 rounded-xl shadow-xs border border-slate-200/80">
              <div className="text-center pb-6 border-b border-slate-200">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <ShivajiCollegeLogo size={52} />
                  <div className="h-8 w-[1px] bg-slate-300" />
                  <DelhiUniversityLogo size={52} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#781D26]">
                  Inaugural Issue Editorial Foreword
                </span>
                <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#0B192C] mt-2">
                  Welcome to Shivraj 350
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-serif italic">
                  Published by Shivaji College, University of Delhi (Jan - June 2026)
                </p>
              </div>

              {/* Exact Verbatim Scope Display Inside Preface */}
              <div className="p-5 rounded-xl bg-amber-50/70 border border-amber-200 text-slate-800">
                <div className="text-xs font-bold text-[#781D26] uppercase tracking-wider mb-1">
                  Core Journal Scope:
                </div>
                <p className="font-serif italic text-sm sm:text-base leading-relaxed text-slate-900 font-medium">
                  &ldquo;{JOURNAL_INFO.verbatimScope}&rdquo;
                </p>
              </div>

              <div className="prose text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 font-sans">
                <p>
                  It is a moment of monumental institutional pride as Shivaji College, University of Delhi inaugurates <strong>Shivraj 350: International Peer Reviewed Multidisciplinary Journal</strong>. The journal draws its foundational inspiration from the 350th commemoration of the coronation of Chhatrapati Shivaji Maharaj—a visionary exemplar of sovereign justice, equitable land tenure, indigenous naval engineering, and decentralized governance.
                </p>
                <p>
                  In the contemporary 21st-century landscape, academic breakthroughs seldom occur within isolated disciplinary silos. Solutions to climatic degradation, health vulnerabilities, algorithmic governance, and economic inequality necessitate an organic, interdisciplinary dialogue between experimental physical sciences, computational analytics, policy economics, literary humanities, and corporate stewardship.
                </p>
                <p>
                  This Inaugural Volume 1, Issue 1 curates eight peer-reviewed papers that embody this vision—from 2D photovoltaic quantum materials and CRISPR agricultural stress tolerance to archival Modi-script statecraft and high-frequency market microstructure.
                </p>
              </div>

              {/* Signatures */}
              <div className="pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                <div>
                  <div className="font-cinzel font-bold text-[#0B192C] text-sm">
                    Prof. (Dr.) Virender Bhardwaj
                  </div>
                  <div className="text-slate-600 font-medium">Patron & Principal</div>
                  <div className="text-slate-500">Shivaji College, University of Delhi</div>
                </div>
                <div>
                  <div className="font-cinzel font-bold text-[#0B192C] text-sm">
                    Prof. S. K. Awasthi
                  </div>
                  <div className="text-slate-600 font-medium">Editor-in-Chief</div>
                  <div className="text-slate-500">Multidisciplinary Research Cell</div>
                </div>
              </div>

              <div className="pt-4 text-center">
                <button
                  type="button"
                  onClick={() => setActiveTab('articles')}
                  className="px-6 py-2.5 rounded-lg bg-[#781D26] hover:bg-[#551219] text-white font-semibold text-xs inline-flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <span>Explore Articles in this Issue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Articles View */
            <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-6 lg:items-start">
              
              {/* Mobile Collapsible Table of Contents Toggle (< lg) */}
              <div className="lg:hidden bg-white rounded-xl border border-slate-200 p-3 shadow-xs">
                <button
                  type="button"
                  onClick={() => setMobileTocOpen(!mobileTocOpen)}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-800 transition-colors cursor-pointer min-h-[44px]"
                  aria-expanded={mobileTocOpen}
                >
                  <div className="flex items-center gap-2">
                    <ListOrdered className="w-4 h-4 text-[#781D26] shrink-0" />
                    <span>Table of Contents ({INAUGURAL_ARTICLES.findIndex(a => a.id === selectedArticleId) + 1}/{INAUGURAL_ARTICLES.length})</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <span className="text-[11px] font-normal truncate max-w-[120px] sm:max-w-[200px]">
                      {currentArticle.title}
                    </span>
                    {mobileTocOpen ? <ChevronUp className="w-4 h-4 shrink-0" /> : <ChevronDown className="w-4 h-4 shrink-0" />}
                  </div>
                </button>

                {mobileTocOpen && (
                  <div className="mt-2 space-y-1.5 max-h-[50vh] overflow-y-auto pt-2 border-t border-slate-100 pr-1">
                    {INAUGURAL_ARTICLES.map((art, idx) => (
                      <button
                        key={art.id}
                        type="button"
                        onClick={() => {
                          setSelectedArticleId(art.id);
                          setMobileTocOpen(false);
                        }}
                        className={`w-full text-left p-3 rounded-lg text-xs transition-all cursor-pointer border min-h-[44px] ${
                          selectedArticleId === art.id
                            ? 'bg-amber-50/90 border-amber-300 text-[#0B192C] font-semibold'
                            : 'hover:bg-slate-50 border-transparent text-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                          <span>Paper #{idx + 1}</span>
                          <span className="font-medium text-[#781D26]">{art.category}</span>
                        </div>
                        <div className="line-clamp-2 leading-snug">
                          {art.title}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Desktop Left Column: Articles Index Sidebar (hidden on mobile, visible on lg) */}
              <div className="hidden lg:block lg:col-span-4 bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3 sticky top-4">
                <div className="text-xs font-bold uppercase tracking-wider text-[#0B192C] border-b border-slate-100 pb-2 flex items-center justify-between">
                  <span>Table of Contents</span>
                  <span className="font-normal text-slate-400 font-mono">Vol 1, Issue 1</span>
                </div>
                
                <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
                  {INAUGURAL_ARTICLES.map((art, idx) => (
                    <button
                      key={art.id}
                      type="button"
                      onClick={() => setSelectedArticleId(art.id)}
                      className={`w-full text-left p-2.5 rounded-lg text-xs transition-all cursor-pointer border ${
                        selectedArticleId === art.id
                          ? 'bg-amber-50/80 border-amber-300 text-[#0B192C] font-semibold'
                          : 'hover:bg-slate-50 border-transparent text-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                        <span>Paper #{idx + 1}</span>
                        <span className="font-medium text-[#781D26]">{art.category}</span>
                      </div>
                      <div className="line-clamp-2 leading-snug">
                        {art.title}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Full Article Display */}
              <div className="w-full lg:col-span-8 bg-white rounded-xl border border-slate-200 p-4 sm:p-6 md:p-8 shadow-xs space-y-5 sm:space-y-6">
                
                {/* Category, Navigation & DOI Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 border-b border-slate-100 pb-3 sm:pb-4 text-xs">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#781D26]/10 text-[#781D26] font-bold uppercase tracking-wider text-[11px]">
                      {currentArticle.category} • {currentArticle.articleNumber || `Paper #${INAUGURAL_ARTICLES.findIndex(a => a.id === selectedArticleId) + 1}`}
                    </span>
                    <span className="text-slate-400">|</span>
                    <span className="text-slate-500 font-mono">Pages: {currentArticle.pages}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopyDoi}
                      className="text-[#781D26] hover:underline font-mono inline-flex items-center gap-1 text-[11px] sm:text-xs break-all cursor-pointer"
                      title="Copy DOI"
                    >
                      <span>DOI: {currentArticle.doi}</span>
                      {copiedDoi ? <Check className="w-3 h-3 text-emerald-600 shrink-0" /> : null}
                    </button>
                  </div>
                </div>

                {/* Article Title & Dedicated Page CTA */}
                <div className="space-y-3">
                  <h3 className="font-serif text-lg sm:text-2xl md:text-3xl font-bold text-[#0B192C] leading-snug tracking-tight">
                    {currentArticle.title}
                  </h3>

                  {/* Read Full Article Button Prominently in Digital Reader */}
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        if (onOpenDedicatedArticle) {
                          onOpenDedicatedArticle(currentArticle);
                        }
                      }}
                      className="w-full sm:w-auto min-h-[42px] px-4 py-2 rounded-lg bg-[#781D26] hover:bg-[#8E222D] text-white text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer group text-center"
                      title="Open full dedicated article page"
                    >
                      <FileText className="w-4 h-4 text-amber-300 shrink-0" />
                      <span>Read Full Article</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </button>
                  </div>
                </div>

                {/* Authors & Affiliation */}
                <div className="space-y-1.5 pt-1">
                  <div className="font-semibold text-slate-900 text-sm sm:text-base leading-snug tracking-normal">
                    {currentArticle.authors.join(', ')}
                  </div>
                  <div className="text-slate-600 font-sans text-xs sm:text-sm leading-relaxed">
                    {currentArticle.affiliation}
                  </div>
                  <div className="text-slate-400 text-xs font-mono pt-0.5">
                    Published Online: {currentArticle.publishedDate}
                  </div>
                </div>

                {/* Abstract Callout */}
                <div className="p-4 sm:p-6 rounded-xl bg-slate-50 border-l-4 border-[#781D26] space-y-2.5 shadow-2xs">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#781D26]">
                    Abstract
                  </h4>
                  <p className="text-xs sm:text-[15px] text-slate-800 leading-relaxed font-sans font-normal antialiased">
                    {currentArticle.abstract}
                  </p>
                </div>

                {/* Keywords */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs">
                  <span className="font-bold text-slate-600 mr-1">Keywords:</span>
                  {currentArticle.keywords.map(kw => (
                    <span key={kw} className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200/80 font-medium text-[11px] sm:text-xs">
                      {kw}
                    </span>
                  ))}
                </div>

                {/* Body Text Preview */}
                {currentArticle.fullText && (
                  <div className="pt-4 sm:pt-5 border-t border-slate-200 space-y-3 font-sans">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Full Paper Excerpt (Open Access)
                    </div>
                    <div className="whitespace-pre-line bg-slate-50 p-4 sm:p-5 rounded-lg border border-slate-200/80 text-xs sm:text-sm text-slate-800 leading-relaxed font-sans font-normal">
                      {currentArticle.fullText}
                    </div>
                  </div>
                )}

                {/* Reader Action Buttons & Navigation */}
                <div className="space-y-4 pt-5 sm:pt-6 border-t border-slate-200">
                  {/* Action Buttons: Responsive grid on mobile */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-2.5 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          if (onOpenDedicatedArticle) {
                            onOpenDedicatedArticle(currentArticle);
                          }
                        }}
                        className="col-span-2 sm:col-auto min-h-[42px] px-4 py-2 rounded-lg bg-[#781D26] hover:bg-[#8E222D] text-white text-xs font-semibold inline-flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5 text-amber-300" />
                        <span>Read Full Article</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onOpenCitation(currentArticle)}
                        className="min-h-[42px] px-3.5 py-2 rounded-lg bg-[#0B192C] hover:bg-[#1E3E62] text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Quote className="w-3.5 h-3.5 text-amber-300" />
                        <span>Cite</span>
                      </button>

                      <button
                        type="button"
                        onClick={handlePrint}
                        className="min-h-[42px] px-3.5 py-2 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5 text-slate-500" />
                        <span>PDF / Print</span>
                      </button>
                    </div>

                    <div className="text-xs text-slate-400 font-mono text-center sm:text-right">
                      CC-BY-NC 4.0 Open Access
                    </div>
                  </div>

                  {/* Previous / Next Article Navigation Bar */}
                  {(() => {
                    const currIdx = INAUGURAL_ARTICLES.findIndex(a => a.id === selectedArticleId);
                    return (
                      <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs gap-2">
                        <button
                          type="button"
                          disabled={currIdx <= 0}
                          onClick={() => {
                            if (currIdx > 0) {
                              setSelectedArticleId(INAUGURAL_ARTICLES[currIdx - 1].id);
                            }
                          }}
                          className="min-h-[40px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer font-medium"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          <span className="hidden sm:inline">Previous Article</span>
                          <span className="sm:hidden">Prev</span>
                        </button>

                        <span className="text-slate-400 font-mono text-[11px] text-center">
                          {currIdx + 1} / {INAUGURAL_ARTICLES.length}
                        </span>

                        <button
                          type="button"
                          disabled={currIdx >= INAUGURAL_ARTICLES.length - 1}
                          onClick={() => {
                            if (currIdx < INAUGURAL_ARTICLES.length - 1) {
                              setSelectedArticleId(INAUGURAL_ARTICLES[currIdx + 1].id);
                            }
                          }}
                          className="min-h-[40px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer font-medium"
                        >
                          <span className="hidden sm:inline">Next Article</span>
                          <span className="sm:hidden">Next</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })()}
                </div>

              </div>

            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            <span>Shivaji College, University of Delhi • Official Journal Repository</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="font-medium text-slate-700 hover:text-black cursor-pointer"
          >
            Close Reader
          </button>
        </div>

      </div>
    </div>
  );
}
