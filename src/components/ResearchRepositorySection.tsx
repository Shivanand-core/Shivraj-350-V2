import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Quote, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  Download, 
  Check,
  Copy,
  X
} from 'lucide-react';
import { INAUGURAL_ARTICLES, CURRENT_ISSUE } from '../data/journalData';
import { JournalArticle } from '../types';

interface ResearchRepositorySectionProps {
  onSelectArticle: (article: JournalArticle) => void;
  onOpenCitationModal: (article: JournalArticle) => void;
  initialDiscipline?: string;
}

export default function ResearchRepositorySection({
  onSelectArticle,
  onOpenCitationModal,
  initialDiscipline = 'All',
}: ResearchRepositorySectionProps) {
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>(initialDiscipline);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedAbstracts, setExpandedAbstracts] = useState<Record<string, boolean>>({});
  const [copiedDoi, setCopiedDoi] = useState<string | null>(null);
  const [downloadingPdf, setDownloadingPdf] = useState<string | null>(null);

  React.useEffect(() => {
    if (initialDiscipline) {
      setSelectedDiscipline(initialDiscipline);
    }
  }, [initialDiscipline]);

  const disciplines = ['All', 'Sciences', 'Social Sciences', 'Humanities', 'Professional Studies'];

  const toggleAbstract = (id: string) => {
    setExpandedAbstracts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopyDoi = (doi: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`https://doi.org/${doi}`);
    setCopiedDoi(doi);
    setTimeout(() => setCopiedDoi(null), 2000);
  };

  const handleDownloadPdf = (article: JournalArticle, e: React.MouseEvent) => {
    e.stopPropagation();
    setDownloadingPdf(article.id);
    
    setTimeout(() => {
      setDownloadingPdf(null);
      // Open independent printable academic manuscript window for direct PDF export
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8" />
              <title>${article.title} - Official Manuscript PDF</title>
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Georgia, serif; max-width: 800px; margin: 40px auto; line-height: 1.6; color: #111; padding: 20px; }
                .header { border-bottom: 2px solid #781D26; padding-bottom: 12px; margin-bottom: 20px; }
                .journal-title { font-size: 14px; font-weight: bold; color: #781D26; text-transform: uppercase; letter-spacing: 1px; }
                .meta { color: #555; font-size: 12px; margin-top: 4px; }
                h1 { font-size: 22px; color: #0B192C; margin-top: 15px; margin-bottom: 10px; line-height: 1.3; }
                .authors { font-weight: 600; font-size: 14px; margin-bottom: 4px; }
                .affiliation { color: #666; font-size: 12px; margin-bottom: 20px; font-style: italic; }
                .abstract-box { background: #fbf9f6; padding: 16px; border-left: 4px solid #781D26; margin-bottom: 24px; font-size: 13.5px; border-radius: 4px; }
                .abstract-box strong { color: #781D26; text-transform: uppercase; font-size: 11px; letter-spacing: 0.5px; }
                .section { margin-bottom: 20px; }
                .section h2 { font-size: 15px; color: #0B192C; border-bottom: 1px solid #eee; padding-bottom: 4px; margin-top: 20px; }
                .section p { font-size: 13.5px; text-align: justify; }
                .references { margin-top: 30px; border-top: 1px solid #ccc; padding-top: 15px; font-size: 12px; }
                @media print {
                  body { margin: 0; padding: 15mm; }
                }
              </style>
            </head>
            <body>
              <div class="header">
                <div class="journal-title">Shivraj 350: International Peer Reviewed Multidisciplinary Journal</div>
                <div class="meta">
                  Inaugural Issue • Volume 1, Issue 1 (Jan - June 2026) • ISSN: 2583-XXXX • Pages: ${article.pages}<br/>
                  Published by Shivaji College, University of Delhi | DOI: https://doi.org/${article.doi}
                </div>
              </div>
              <h1>${article.title}</h1>
              <div class="authors">${article.authors.join(', ')}</div>
              <div class="affiliation">${article.affiliation}</div>
              <div class="abstract-box">
                <div><strong>Abstract</strong></div>
                <p style="margin-top: 6px;">${article.abstract}</p>
                <div style="margin-top: 10px; font-size: 12px;"><strong>Keywords:</strong> ${article.keywords.join(', ')}</div>
              </div>
              ${article.sections ? article.sections.map(s => `
                <div class="section">
                  <h2>${s.heading}</h2>
                  <p>${s.content}</p>
                </div>
              `).join('') : `<p>${article.fullText || ''}</p>`}
              ${article.references && article.references.length > 0 ? `
                <div class="references">
                  <h2 style="font-size: 14px; font-weight: bold; margin-bottom: 8px;">References</h2>
                  <ol style="padding-left: 20px;">${article.references.map(r => `<li style="margin-bottom: 6px;">${r}</li>`).join('')}</ol>
                </div>
              ` : ''}
              <script>
                window.onload = function() { setTimeout(function() { window.print(); }, 250); };
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
      } else {
        window.print();
      }
    }, 350);
  };

  const filteredArticles = useMemo(() => {
    return INAUGURAL_ARTICLES.filter((article) => {
      const disciplineMatch =
        selectedDiscipline === 'All' ||
        article.category === selectedDiscipline ||
        article.discipline === selectedDiscipline;

      const q = searchQuery.trim().toLowerCase();
      if (!q) return disciplineMatch;

      const matchesSearch =
        article.title.toLowerCase().includes(q) ||
        article.authors.some((a) => a.toLowerCase().includes(q)) ||
        article.keywords.some((k) => k.toLowerCase().includes(q)) ||
        article.affiliation.toLowerCase().includes(q) ||
        (article.articleNumber && article.articleNumber.toLowerCase().includes(q)) ||
        article.doi.toLowerCase().includes(q) ||
        article.abstract.toLowerCase().includes(q);

      return disciplineMatch && matchesSearch;
    });
  }, [selectedDiscipline, searchQuery]);

  // Discipline paper counts
  const getDisciplineCount = (disc: string) => {
    if (disc === 'All') return INAUGURAL_ARTICLES.length;
    return INAUGURAL_ARTICLES.filter((a) => a.category === disc || a.discipline === disc).length;
  };

  return (
    <section id="repository" className="scroll-mt-24 sm:scroll-mt-28 py-8 sm:py-10 lg:py-12 bg-[#FAF8F5] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 space-y-2">
          <div className="flex items-center justify-center gap-3 mb-1">
            <div className="w-10 h-0.5 bg-[#C5A059]" />
            <span className="text-xs font-bold tracking-widest uppercase text-[#C5A059] font-sans">
              RESEARCH REPOSITORY
            </span>
            <div className="w-10 h-0.5 bg-[#C5A059]" />
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl lg:text-[38px] font-bold text-slate-900 leading-tight">
            Curated Articles & Research Papers
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 font-sans leading-relaxed">
            Peer-reviewed scholarship from <strong>Inaugural Issue (Vol. 1, Issue 1)</strong>. Search by title, author, keyword, or filter across academic disciplines.
          </p>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="bg-white rounded-xl border border-slate-200 p-3.5 sm:p-5 mb-6 shadow-xs space-y-3 sm:space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
            
            {/* Search Input: full width on mobile */}
            <div className="relative w-full md:max-w-xl">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, author, keyword, or affiliation..."
                className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#781D26] focus:border-[#781D26] transition-all min-h-[44px]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 min-h-[32px] min-w-[32px] flex items-center justify-center cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Results Count Badge */}
            <div className="text-xs text-slate-500 font-sans flex items-center gap-2 self-start md:self-auto">
              <span className="font-semibold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                {filteredArticles.length} {filteredArticles.length === 1 ? 'Article' : 'Articles'} found
              </span>
              <span className="text-slate-400">•</span>
              <span className="font-mono text-slate-500">ISSN {CURRENT_ISSUE.issn}</span>
            </div>
          </div>

          {/* Discipline Filter Chips: Horizontally scrollable on mobile, wrapping on sm+ */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-100 overflow-x-auto no-scrollbar pb-1 sm:flex-wrap">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider mr-1 shrink-0 hidden sm:inline">
              Discipline:
            </span>
            {disciplines.map((disc) => {
              const isActive = selectedDiscipline === disc;
              const count = getDisciplineCount(disc);
              return (
                <button
                  key={disc}
                  type="button"
                  onClick={() => setSelectedDiscipline(disc)}
                  className={`min-h-[38px] text-xs px-3.5 py-1.5 rounded-full font-medium transition-all cursor-pointer flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
                    isActive
                      ? 'bg-[#781D26] text-white shadow-xs font-semibold'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>{disc}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Article Cards Repository Listing */}
        {filteredArticles.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-8 sm:p-12 text-center max-w-lg mx-auto space-y-4 shadow-xs">
            <div className="w-14 h-14 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-[#781D26]">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900">
              No articles match your query
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans">
              We couldn&apos;t find any articles matching &ldquo;{searchQuery}&rdquo; in {selectedDiscipline}. Try adjusting your keywords or clearing the filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedDiscipline('All');
              }}
              className="min-h-[42px] px-4 py-2 rounded-lg bg-[#781D26] text-white text-xs font-semibold hover:bg-[#8E222D] transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredArticles.map((article, idx) => {
              const isExpanded = !!expandedAbstracts[article.id];
              const articleNum = article.articleNumber || `ARTICLE 0${idx + 1}`;
              const discipline = article.discipline || article.category;
              const pageRange = article.pageRange || article.pages;

              return (
                <article
                  key={article.id}
                  id={`article-${article.id}`}
                  className="bg-white rounded-xl border border-slate-200 hover:border-[#C5A059]/70 p-4 sm:p-6 md:p-7 shadow-xs hover:shadow-md transition-all space-y-3 sm:space-y-4 group"
                >
                  {/* Card Metadata Header: Article Number, Discipline, Page Range, DOI */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs border-b border-slate-100 pb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Article Number Badge */}
                      <span className="font-mono font-bold text-[11px] px-2.5 py-0.5 rounded bg-slate-900 text-amber-300 tracking-wider">
                        {articleNum}
                      </span>

                      {/* Discipline Badge */}
                      <span className="font-semibold text-[#781D26] bg-amber-50 border border-amber-200/80 px-2.5 py-0.5 rounded-full">
                        {discipline}
                      </span>

                      {/* Page Range */}
                      <span className="text-slate-500 font-mono">
                        Pages: {pageRange}
                      </span>
                    </div>

                    {/* DOI with Copy Helper: break-all to prevent overflow */}
                    <div className="flex items-center gap-2 text-slate-500 font-mono text-[11px] sm:text-xs">
                      <span className="break-all">DOI: {article.doi}</span>
                      <button
                        type="button"
                        onClick={(e) => handleCopyDoi(article.doi, e)}
                        className="p-1 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors shrink-0"
                        title="Copy DOI URL"
                      >
                        {copiedDoi === article.doi ? (
                          <Check className="w-3.5 h-3.5 text-green-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Article Title */}
                  <h3
                    onClick={() => onSelectArticle(article)}
                    className="font-serif text-lg sm:text-xl md:text-[22px] font-bold text-slate-900 group-hover:text-[#781D26] transition-colors cursor-pointer leading-snug"
                  >
                    {article.title}
                  </h3>

                  {/* Authors & Department/Affiliation */}
                  <div className="text-xs sm:text-sm text-slate-700 leading-relaxed flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-1 sm:gap-0">
                    <span className="font-semibold text-slate-900">
                      {article.authors.join(', ')}
                    </span>
                    <span className="text-slate-400 hidden sm:inline mx-2">•</span>
                    <span className="text-slate-600 italic">
                      {article.affiliation}
                    </span>
                  </div>

                  {/* Abstract Preview / Expandable */}
                  <div className="pt-1">
                    {isExpanded ? (
                      <div className="p-3.5 sm:p-4 rounded-lg bg-amber-50/40 border border-amber-200/60 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
                        <div>
                          <strong className="font-serif text-slate-900 block mb-1 text-sm">
                            Abstract:
                          </strong>
                          <p>{article.abstract}</p>
                        </div>

                        {/* Keywords */}
                        <div className="pt-2 border-t border-amber-200/50 flex flex-wrap items-center gap-1.5">
                          <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wide">
                            Keywords:
                          </span>
                          {article.keywords.map((k) => (
                            <span
                              key={k}
                              className="text-[11px] bg-white border border-slate-200 px-2.5 py-0.5 rounded-full text-slate-700 font-sans"
                            >
                              #{k}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                        <span className="font-serif font-bold text-slate-800 mr-1">Abstract:</span>
                        {article.abstract}
                      </p>
                    )}
                  </div>

                  {/* Bottom Action Toolbar: Toggle Abstract, Cite, PDF, Read Full Article */}
                  <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs border-t border-slate-100">
                    {/* View/Hide Abstract Toggle */}
                    <button
                      type="button"
                      onClick={() => toggleAbstract(article.id)}
                      className="text-slate-600 hover:text-slate-900 font-medium inline-flex items-center gap-1.5 cursor-pointer py-1 min-h-[36px]"
                    >
                      <span>{isExpanded ? 'Hide Abstract' : 'View Abstract'}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>

                    {/* Action Buttons: Responsive grid on mobile, inline on sm+ */}
                    <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
                      {/* Cite Button */}
                      <button
                        type="button"
                        onClick={() => onOpenCitationModal(article)}
                        className="min-h-[42px] px-3 py-2 rounded-md border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 font-medium inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer bg-white"
                        title="Generate citation (APA, MLA, Harvard, Chicago, BibTeX)"
                      >
                        <Quote className="w-3.5 h-3.5 text-[#781D26]" />
                        <span>Cite</span>
                      </button>

                      {/* PDF Button */}
                      <button
                        type="button"
                        onClick={(e) => handleDownloadPdf(article, e)}
                        className="min-h-[42px] px-3 py-2 rounded-md border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 font-medium inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer bg-white"
                        title="View or Download PDF manuscript"
                      >
                        <Download className={`w-3.5 h-3.5 text-[#781D26] ${downloadingPdf === article.id ? 'animate-bounce' : ''}`} />
                        <span>{downloadingPdf === article.id ? 'Loading...' : 'PDF'}</span>
                      </button>

                      {/* Read Full Article Crimson Button */}
                      <button
                        type="button"
                        onClick={() => onSelectArticle(article)}
                        className="col-span-2 sm:col-auto min-h-[42px] px-4 py-2 rounded-md bg-[#781D26] hover:bg-[#8E222D] text-white font-medium inline-flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5 text-amber-300" />
                        <span>Read Full Article</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
