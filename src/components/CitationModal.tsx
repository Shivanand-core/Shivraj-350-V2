import { useState, useEffect } from 'react';
import { X, Check, Copy, Quote, BookOpen } from 'lucide-react';
import { JournalArticle } from '../types';
import { JOURNAL_INFO } from '../data/journalData';

interface CitationModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: JournalArticle | null;
}

export default function CitationModal({ isOpen, onClose, article }: CitationModalProps) {
  const [activeFormat, setActiveFormat] = useState<'APA' | 'MLA' | 'Chicago' | 'BibTeX'>('APA');
  const [copied, setCopied] = useState(false);

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

  const getCitation = () => {
    const authorStr = article.authors.join(', ');
    const firstAuthor = article.authors[0];
    const year = "2026";
    const journalTitle = JOURNAL_INFO.name;
    const volIssue = "1(1)";
    const pages = article.pages;
    const doiUrl = `https://doi.org/${article.doi}`;

    switch (activeFormat) {
      case 'APA':
        return `${authorStr} (${year}). ${article.title}. ${journalTitle}, ${volIssue}, ${pages}. ${doiUrl}`;
      case 'MLA':
        return `${firstAuthor}, et al. "${article.title}." ${journalTitle}, vol. 1, no. 1, 2026, pp. ${pages}. DOI: ${article.doi}.`;
      case 'Chicago':
        return `${authorStr}. "${article.title}." ${journalTitle} 1, no. 1 (2026): ${pages}. ${doiUrl}.`;
      case 'BibTeX':
        return `@article{shivraj350_${article.id},
  author    = {${article.authors.join(' and ')}},
  title     = {${article.title}},
  journal   = {${journalTitle}},
  volume    = {1},
  number    = {1},
  year      = {2026},
  pages     = {${pages}},
  publisher = {Shivaji College, University of Delhi},
  doi       = {${article.doi}}
}`;
      default:
        return '';
    }
  };

  const citationText = getCitation();

  const handleCopy = () => {
    navigator.clipboard.writeText(citationText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-xl sm:rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-[#0B192C] text-white px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Quote className="w-5 h-5 text-amber-400" />
            <h3 className="font-cinzel text-sm sm:text-base font-bold">Cite this Article</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4">
          <div>
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">Selected Article</span>
            <div className="text-xs sm:text-sm font-semibold text-[#0B192C] line-clamp-2 mt-0.5">
              {article.title}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {article.authors.join(' • ')}
            </div>
          </div>

          {/* Format Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 border-b border-slate-200 pb-2 overflow-x-auto no-scrollbar">
            {(['APA', 'MLA', 'Chicago', 'BibTeX'] as const).map((fmt) => (
              <button
                key={fmt}
                type="button"
                onClick={() => {
                  setActiveFormat(fmt);
                  setCopied(false);
                }}
                className={`min-h-[38px] px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors whitespace-nowrap ${
                  activeFormat === fmt
                    ? 'bg-[#781D26] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>

          {/* Citation Box */}
          <div className="relative p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 break-words whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
            {citationText}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <span className="text-xs text-slate-500 text-center sm:text-left">
              {copied ? 'Citation copied to clipboard!' : 'Click copy to paste into your bibliography'}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="w-full sm:w-auto min-h-[42px] inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#0B192C] hover:bg-[#1E3E62] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Citation</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
