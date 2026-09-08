import { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Download, 
  Quote, 
  Share2, 
  Check, 
  Copy, 
  BookOpen, 
  Calendar, 
  FileText, 
  Building2, 
  ExternalLink,
  ChevronRight,
  Printer,
  Bookmark
} from 'lucide-react';
import { JournalArticle } from '../types';
import { INAUGURAL_ARTICLES, JOURNAL_INFO, CURRENT_ISSUE } from '../data/journalData';

interface DedicatedArticlePageProps {
  article: JournalArticle;
  onBackToRepository: () => void;
  onSelectArticle: (article: JournalArticle) => void;
  onOpenCitationModal: (article: JournalArticle) => void;
  onOpenDigitalReader: (article?: JournalArticle) => void;
}

export default function DedicatedArticlePage({
  article,
  onBackToRepository,
  onSelectArticle,
  onOpenCitationModal,
  onOpenDigitalReader,
}: DedicatedArticlePageProps) {
  const [copiedDoi, setCopiedDoi] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string>('abstract');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [article.id]);

  const handleCopyDoi = () => {
    navigator.clipboard.writeText(`https://doi.org/${article.doi}`);
    setCopiedDoi(true);
    setTimeout(() => setCopiedDoi(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleDownloadPdf = () => {
    setDownloadingPdf(true);
    setTimeout(() => {
      setDownloadingPdf(false);
      // Trigger browser print/save PDF formatted for manuscripts
      window.print();
    }, 400);
  };

  // Find index and adjacent articles for Next / Previous navigation
  const currentIndex = INAUGURAL_ARTICLES.findIndex(a => a.id === article.id);
  const prevArticle = currentIndex > 0 ? INAUGURAL_ARTICLES[currentIndex - 1] : null;
  const nextArticle = currentIndex < INAUGURAL_ARTICLES.length - 1 ? INAUGURAL_ARTICLES[currentIndex + 1] : null;

  // Discipline badge color
  const getDisciplineTheme = (category: string) => {
    switch (category) {
      case 'Sciences':
        return {
          bg: 'bg-emerald-50',
          text: 'text-emerald-800',
          border: 'border-emerald-200',
          accent: 'border-emerald-700'
        };
      case 'Social Sciences':
        return {
          bg: 'bg-sky-50',
          text: 'text-sky-800',
          border: 'border-sky-200',
          accent: 'border-sky-700'
        };
      case 'Humanities':
        return {
          bg: 'bg-amber-50',
          text: 'text-amber-800',
          border: 'border-amber-200',
          accent: 'border-amber-700'
        };
      case 'Professional Studies':
        return {
          bg: 'bg-purple-50',
          text: 'text-purple-800',
          border: 'border-purple-200',
          accent: 'border-purple-700'
        };
      default:
        return {
          bg: 'bg-slate-50',
          text: 'text-slate-800',
          border: 'border-slate-200',
          accent: 'border-[#781D26]'
        };
    }
  };

  const theme = getDisciplineTheme(article.category);

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-slate-900 pb-20">
      {/* 1. Breadcrumb Bar */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-slate-200/80 sticky top-[60px] sm:top-[73px] z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-2.5 text-xs">
          <ol className="flex items-center gap-1.5 sm:gap-2 text-slate-500 overflow-x-auto whitespace-nowrap no-scrollbar py-0.5">
            <li>
              <button
                type="button"
                onClick={onBackToRepository}
                className="hover:text-[#781D26] transition-colors cursor-pointer font-medium"
              >
                Home
              </button>
            </li>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <li>
              <button
                type="button"
                onClick={onBackToRepository}
                className="hover:text-[#781D26] transition-colors cursor-pointer font-medium"
              >
                Repository
              </button>
            </li>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <li className="text-slate-400 font-medium hidden sm:inline">{article.category}</li>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0 hidden sm:inline" />
            <li className="font-semibold text-slate-900 truncate max-w-[140px] sm:max-w-xs md:max-w-md">
              {article.articleNumber || `Paper #${currentIndex + 1}`}
            </li>
          </ol>

          <div className="flex items-center gap-2 shrink-0 ml-auto">
            <button
              type="button"
              onClick={onBackToRepository}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200 min-h-[36px]"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#781D26]" />
              <span className="hidden sm:inline">Back to Repository</span>
              <span className="sm:hidden">Back</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenDigitalReader(article)}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-semibold text-white bg-[#0B192C] hover:bg-[#1E3E62] transition-colors cursor-pointer shadow-2xs min-h-[36px]"
              title="View in Digital Edition Magazine Reader"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#E0C58A]" />
              <span className="hidden sm:inline">Open in Digital Reader</span>
              <span className="sm:hidden">Reader</span>
            </button>
          </div>
        </div>
      </nav>

      {/* 2. Article Header Header Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8 pb-4 sm:pb-6">
        <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 p-4 sm:p-8 lg:p-10 shadow-xs space-y-4 sm:space-y-6">
          
          {/* Top Meta Badges */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-slate-100 pb-4 sm:pb-5">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className={`px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider border ${theme.bg} ${theme.text} ${theme.border}`}>
                {article.category}
              </span>
              <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] sm:text-xs font-semibold border border-slate-200">
                {article.articleNumber || `Paper #${currentIndex + 1}`}
              </span>
              <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-amber-50 text-amber-900 text-[11px] sm:text-xs font-semibold border border-amber-200/80">
                Peer-Reviewed
              </span>
              <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] sm:text-xs font-semibold border border-emerald-200/80">
                Open Access
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
              <span>{CURRENT_ISSUE.volume}, {CURRENT_ISSUE.issue}</span>
              <span>•</span>
              <span>Pages: {article.pages}</span>
            </div>
          </div>

          {/* Full Article Title */}
          <h1 className="font-serif text-xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-[#0B192C] leading-tight tracking-tight">
            {article.title}
          </h1>

          {/* Authors and Department Affiliation */}
          <div className="space-y-2 sm:space-y-3 pt-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm sm:text-lg font-semibold text-slate-900">
              {article.authors.map((author, i) => (
                <span key={author} className="inline-flex items-center">
                  <span>{author}</span>
                  <sup className="text-xs text-[#781D26] font-bold ml-0.5">{i + 1}</sup>
                  {i < article.authors.length - 1 && <span className="text-slate-400 ml-2 sm:ml-3">,</span>}
                </span>
              ))}
            </div>

            <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
              <Building2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-medium text-slate-700">Affiliation: </span>
                {article.affiliation}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Published Online: <strong className="text-slate-700">{article.publishedDate}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-xs max-w-full">
                <span className="text-slate-400">DOI:</span>
                <a
                  href={`https://doi.org/${article.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#781D26] hover:underline font-semibold break-all"
                >
                  {article.doi}
                </a>
                <button
                  type="button"
                  onClick={handleCopyDoi}
                  className="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-slate-900 transition-colors cursor-pointer shrink-0"
                  title="Copy DOI Link"
                >
                  {copiedDoi ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <div className="text-slate-400">
                License: CC-BY-NC 4.0
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="pt-3 sm:pt-4 border-t border-slate-200/90 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-50/70 p-3 sm:p-4 rounded-xl">
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-2.5">
              {/* Download PDF Button */}
              <button
                type="button"
                onClick={handleDownloadPdf}
                className="col-span-2 sm:col-auto min-h-[42px] px-4 py-2 rounded-lg bg-[#781D26] hover:bg-[#8E222D] text-white text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                title="Download or Print PDF manuscript"
              >
                <Download className={`w-4 h-4 text-amber-300 ${downloadingPdf ? 'animate-bounce' : ''}`} />
                <span>{downloadingPdf ? 'Preparing PDF...' : 'Download PDF'}</span>
              </button>

              {/* Cite Article Button */}
              <button
                type="button"
                onClick={() => onOpenCitationModal(article)}
                className="min-h-[42px] px-3.5 py-2 rounded-lg bg-white border border-slate-300 hover:border-slate-400 text-slate-800 hover:text-slate-900 text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 shadow-2xs transition-colors cursor-pointer"
              >
                <Quote className="w-4 h-4 text-[#781D26]" />
                <span>Cite Article</span>
              </button>

              {/* Print Button */}
              <button
                type="button"
                onClick={() => window.print()}
                className="min-h-[42px] px-3 py-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-medium inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                title="Print article"
              >
                <Printer className="w-4 h-4 text-slate-500" />
                <span className="hidden sm:inline">Print</span>
                <span className="sm:hidden">Print</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              {/* Share / Copy Link */}
              <button
                type="button"
                onClick={handleCopyLink}
                className="flex-1 sm:flex-initial min-h-[42px] px-3 py-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-medium inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                title="Copy Article URL"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-slate-500" />}
                <span>{copiedLink ? 'Copied' : 'Share'}</span>
              </button>

              {/* Digital Reader shortcut */}
              <button
                type="button"
                onClick={() => onOpenDigitalReader(article)}
                className="flex-1 sm:flex-initial min-h-[42px] px-3 py-2 rounded-lg bg-[#0B192C] hover:bg-[#1E3E62] text-white text-xs font-medium inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                title="View inside digital edition flipbook"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#E0C58A]" />
                <span>Digital Edition</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Main Article Body & Academic Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Reading Column (8 Cols) - 100% Real HTML Text */}
          <main className="lg:col-span-8 space-y-8">
            
            {/* Abstract Callout */}
            <section 
              id="abstract" 
              className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs border-l-4 border-l-[#781D26] space-y-3"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#781D26]">
                  Abstract
                </h2>
                <span className="text-[11px] text-slate-400 font-mono">Original Research Article</span>
              </div>
              <p className="text-slate-800 text-base sm:text-[16px] leading-relaxed font-sans font-normal antialiased">
                {article.abstract}
              </p>

              {/* Keywords */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-600 mr-1">Keywords:</span>
                {article.keywords.map((kw) => (
                  <span
                    key={kw}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-1 rounded-md text-xs font-medium border border-slate-200 transition-colors"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </section>

            {/* Article Sections (Real HTML Text) */}
            <article className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-10 shadow-xs space-y-8">
              {article.sections && article.sections.length > 0 ? (
                article.sections.map((section, idx) => (
                  <section 
                    key={section.heading} 
                    id={`section-${idx}`}
                    className="space-y-3 scroll-mt-28"
                  >
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0B192C] pb-2 border-b border-slate-100 flex items-center gap-2">
                      <span className="text-[#781D26] text-lg font-mono">§</span>
                      <span>{section.heading}</span>
                    </h2>
                    <p className="text-slate-800 text-base sm:text-[16.5px] leading-relaxed font-sans font-normal whitespace-pre-line antialiased">
                      {section.content}
                    </p>
                  </section>
                ))
              ) : article.fullText ? (
                <div className="space-y-4">
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0B192C] pb-2 border-b border-slate-100">
                    Manuscript Full Text
                  </h2>
                  <div className="text-slate-800 text-base leading-relaxed whitespace-pre-line font-sans font-normal antialiased">
                    {article.fullText}
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-2">
                  <p className="text-sm text-slate-600">
                    Full open-access text available via digital edition reader and official PDF manuscript download.
                  </p>
                  <button
                    type="button"
                    onClick={() => onOpenDigitalReader(article)}
                    className="px-4 py-2 rounded-lg bg-[#781D26] text-white text-xs font-semibold cursor-pointer"
                  >
                    Read in Digital Edition
                  </button>
                </div>
              )}

              {/* References Section */}
              {article.references && article.references.length > 0 && (
                <section id="references" className="pt-8 border-t-2 border-slate-200 space-y-4 scroll-mt-28">
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0B192C] flex items-center gap-2">
                    <Bookmark className="w-5 h-5 text-[#781D26]" />
                    <span>References</span>
                  </h2>
                  <ol className="space-y-3 text-xs sm:text-sm text-slate-700 list-decimal list-inside pl-2 leading-relaxed">
                    {article.references.map((ref, idx) => (
                      <li key={idx} className="pl-1 text-slate-800 font-sans">
                        <span className="text-slate-900">{ref}</span>
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              {/* Academic Governance & Copyright Disclaimer */}
              <div className="pt-8 border-t border-slate-100 text-xs text-slate-500 space-y-2 bg-slate-50/70 p-5 rounded-xl">
                <div className="font-bold text-slate-700">Open Access Publishing Ethics</div>
                <p>
                  © 2026 The Authors. Published by <strong>Shivaji College, University of Delhi</strong> in <em>{JOURNAL_INFO.name}</em>. 
                  This is an open-access article distributed under the terms of the Creative Commons Attribution-NonCommercial 4.0 International License (CC-BY-NC 4.0).
                </p>
              </div>

            </article>

            {/* Next / Previous Article Navigation Bar */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 pb-2 border-b border-slate-100">
                Continue Reading in Volume 1, Issue 1
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {prevArticle ? (
                  <button
                    type="button"
                    onClick={() => onSelectArticle(prevArticle)}
                    className="p-4 rounded-xl border border-slate-200 hover:border-[#781D26] hover:bg-slate-50 transition-all text-left group cursor-pointer"
                  >
                    <div className="text-[11px] font-semibold text-[#781D26] flex items-center gap-1 mb-1">
                      <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
                      <span>Previous Article</span>
                    </div>
                    <div className="font-serif font-bold text-slate-900 text-sm line-clamp-2 leading-snug">
                      {prevArticle.title}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      {prevArticle.authors.join(', ')}
                    </div>
                  </button>
                ) : (
                  <div className="p-4 rounded-xl border border-dashed border-slate-200 text-slate-400 text-xs flex items-center justify-center">
                    First Article in Issue
                  </div>
                )}

                {nextArticle ? (
                  <button
                    type="button"
                    onClick={() => onSelectArticle(nextArticle)}
                    className="p-4 rounded-xl border border-slate-200 hover:border-[#781D26] hover:bg-slate-50 transition-all text-right group cursor-pointer"
                  >
                    <div className="text-[11px] font-semibold text-[#781D26] flex items-center justify-end gap-1 mb-1">
                      <span>Next Article</span>
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <div className="font-serif font-bold text-slate-900 text-sm line-clamp-2 leading-snug">
                      {nextArticle.title}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      {nextArticle.authors.join(', ')}
                    </div>
                  </button>
                ) : (
                  <div className="p-4 rounded-xl border border-dashed border-slate-200 text-slate-400 text-xs flex items-center justify-center">
                    Last Article in Issue
                  </div>
                )}
              </div>
            </div>

            {/* Back Button Action */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={onBackToRepository}
                className="px-6 py-2.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs sm:text-sm font-semibold inline-flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-[#781D26]" />
                <span>Back to Research Repository</span>
              </button>
            </div>

          </main>

          {/* Right Sidebar (4 Cols): Table of Contents, Journal Issue Card & Related Articles */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-[130px]">
            
            {/* Quick Article Sections Outline */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-[#0B192C] border-b border-slate-100 pb-2">
                Article Outline
              </div>
              <nav className="space-y-1 text-xs">
                <a
                  href="#abstract"
                  className="block py-1.5 px-2.5 rounded-md text-slate-700 hover:bg-slate-100 hover:text-[#781D26] font-medium transition-colors"
                >
                  Abstract & Keywords
                </a>
                {article.sections?.map((s, idx) => (
                  <a
                    key={s.heading}
                    href={`#section-${idx}`}
                    className="block py-1.5 px-2.5 rounded-md text-slate-600 hover:bg-slate-100 hover:text-[#781D26] transition-colors truncate"
                  >
                    {s.heading}
                  </a>
                ))}
                {article.references && article.references.length > 0 && (
                  <a
                    href="#references"
                    className="block py-1.5 px-2.5 rounded-md text-slate-700 hover:bg-slate-100 hover:text-[#781D26] font-medium transition-colors"
                  >
                    References ({article.references.length})
                  </a>
                )}
              </nav>
            </div>

            {/* Current Issue Card */}
            <div className="bg-[#0B192C] text-white rounded-2xl p-6 shadow-md space-y-4">
              <div className="flex items-center justify-between text-xs text-[#E0C58A]">
                <span className="font-semibold uppercase tracking-wider">{CURRENT_ISSUE.volume}, {CURRENT_ISSUE.issue}</span>
                <span className="font-mono">{CURRENT_ISSUE.period}</span>
              </div>

              <div>
                <h3 className="font-serif text-lg font-bold text-white leading-snug">
                  Shivraj 350 Multidisciplinary Journal
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Inaugural Issue Commemorating 350 Years of Chhatrapati Shivaji Maharaj Coronation
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onOpenDigitalReader(article)}
                  className="w-full py-2.5 px-4 rounded-lg bg-[#781D26] hover:bg-[#8E222D] text-white text-xs font-semibold inline-flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-amber-300" />
                  <span>Open Digital Edition Reader</span>
                </button>
              </div>
            </div>

            {/* Citation Quick Snippet */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-bold text-[#0B192C] uppercase tracking-wider">APA Citation</span>
                <button
                  type="button"
                  onClick={() => onOpenCitationModal(article)}
                  className="text-[#781D26] hover:underline font-semibold"
                >
                  More formats
                </button>
              </div>
              <p className="text-slate-600 font-sans leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200/70 text-[11.5px]">
                {article.authors.join(', ')} ({CURRENT_ISSUE.year}). {article.title}. <em>{JOURNAL_INFO.shortName}</em>, {CURRENT_ISSUE.volume.replace('Volume ', '')}({CURRENT_ISSUE.issue.replace('Issue ', '')}), {article.pages}. https://doi.org/{article.doi}
              </p>
            </div>

            {/* Other Articles in this Issue */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-[#0B192C] border-b border-slate-100 pb-2">
                More in Volume 1, Issue 1
              </div>
              <div className="space-y-2.5">
                {INAUGURAL_ARTICLES.filter(a => a.id !== article.id).slice(0, 4).map((other) => (
                  <button
                    key={other.id}
                    type="button"
                    onClick={() => onSelectArticle(other)}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-50 transition-colors group cursor-pointer block"
                  >
                    <div className="text-[10px] text-slate-400 font-medium">
                      {other.category}
                    </div>
                    <div className="text-xs font-serif font-bold text-slate-800 group-hover:text-[#781D26] line-clamp-2 leading-snug">
                      {other.title}
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </aside>

        </div>
      </div>
    </div>
  );
}
