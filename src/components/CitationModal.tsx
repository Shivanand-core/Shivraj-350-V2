import { useState, useEffect } from 'react';
import { X, Check, Copy, Quote, Download, ExternalLink } from 'lucide-react';
import { JournalArticle } from '../types';
import { 
  generateApa7Citation, 
  generateMla9Citation, 
  generateChicagoCitation, 
  generateBibtexCitation, 
  downloadCitationFile 
} from '../utils/citationHelper';

interface CitationModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: JournalArticle | null;
}

type CitationFormat = 'APA' | 'MLA' | 'Chicago' | 'BibTeX';

export default function CitationModal({ isOpen, onClose, article }: CitationModalProps) {
  const [activeFormat, setActiveFormat] = useState<CitationFormat>('APA');
  const [copied, setCopied] = useState(false);
  const [copiedDoi, setCopiedDoi] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !article) return null;

  const getCitation = (format: CitationFormat): string => {
    switch (format) {
      case 'APA':
        return generateApa7Citation(article);
      case 'MLA':
        return generateMla9Citation(article);
      case 'Chicago':
        return generateChicagoCitation(article);
      case 'BibTeX':
        return generateBibtexCitation(article);
      default:
        return '';
    }
  };

  const citationText = getCitation(activeFormat);

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(citationText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleCopyDoi = () => {
    if (!article.doi) return;
    navigator.clipboard.writeText(`https://doi.org/${article.doi}`);
    setCopiedDoi(true);
    setTimeout(() => setCopiedDoi(false), 2200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
      <div 
        className="bg-white rounded-xl sm:rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="citation-modal-title"
      >
        {/* Modal Top Bar */}
        <div className="bg-[#0B192C] text-white px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between border-b border-amber-500/20">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#781D26] flex items-center justify-center text-amber-300 border border-amber-400/30 shrink-0">
              <Quote className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 id="citation-modal-title" className="font-cinzel text-sm sm:text-base font-bold truncate">
                Cite this Article
              </h3>
              <p className="text-[11px] text-slate-300 font-sans truncate">
                International standard citation generator
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center transition-colors"
            aria-label="Close citation modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-4">
          {/* Article Info Header */}
          <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200">
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 mb-1">
              <span className="uppercase tracking-wider text-[#781D26] font-bold">
                {article.articleNumber || 'Article'}
              </span>
              <span>{article.category}</span>
            </div>
            <div className="text-xs sm:text-sm font-semibold text-[#0B192C] line-clamp-2">
              {article.title}
            </div>
            <div className="text-xs text-slate-600 mt-1">
              {article.authors.join(' • ')}
            </div>

            {/* DOI Row */}
            <div className="mt-2.5 pt-2 border-t border-slate-200/70 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-slate-600 font-mono text-[11px]">
                <span className="text-slate-400">DOI:</span>
                {article.doi ? (
                  <a
                    href={`https://doi.org/${article.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#781D26] hover:underline font-semibold inline-flex items-center gap-1"
                  >
                    <span>{article.doi}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-slate-400 italic">Not assigned</span>
                )}
              </div>
              {article.doi && (
                <button
                  type="button"
                  onClick={handleCopyDoi}
                  className="inline-flex items-center gap-1 text-[11px] text-[#781D26] hover:text-[#5E141C] font-semibold cursor-pointer py-0.5 px-2 rounded bg-amber-50 border border-amber-200"
                >
                  {copiedDoi ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span>DOI Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy DOI</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Citation Format Selector Tabs */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Citation Format
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                {activeFormat === 'APA' && 'APA 7th Edition'}
                {activeFormat === 'MLA' && 'MLA 9th Edition'}
                {activeFormat === 'Chicago' && 'Chicago 17th Edition'}
                {activeFormat === 'BibTeX' && 'LaTeX / BibTeX'}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-100 rounded-xl">
              {(['APA', 'MLA', 'Chicago', 'BibTeX'] as const).map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => {
                    setActiveFormat(fmt);
                    setCopied(false);
                  }}
                  className={`min-h-[38px] px-2 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all text-center ${
                    activeFormat === fmt
                      ? 'bg-white text-[#781D26] shadow-xs border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>

          {/* Citation Box */}
          <div className="relative p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 break-words whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto font-serif">
            {citationText}
          </div>

          {/* Download and Copy Controls */}
          <div className="pt-2 border-t border-slate-100 space-y-3">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
              {/* File Download Buttons for reference managers */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => downloadCitationFile(article, 'bib')}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer border border-slate-200 min-h-[36px]"
                  title="Download BibTeX (.bib) file"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .BIB</span>
                </button>
                <button
                  type="button"
                  onClick={() => downloadCitationFile(article, 'ris')}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer border border-slate-200 min-h-[36px]"
                  title="Download RIS file for Zotero, Mendeley, EndNote"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .RIS</span>
                </button>
              </div>

              {/* Copy Citation Button */}
              <button
                type="button"
                onClick={handleCopyCitation}
                className="min-h-[42px] inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-lg bg-[#0B192C] hover:bg-[#1E3E62] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Citation Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-amber-300" />
                    <span>Copy Citation</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-[11px] text-slate-500 text-center">
              Compatible with EndNote, Zotero, Mendeley, BibLaTeX, and all major academic reference managers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
