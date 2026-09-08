import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  Quote, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  Download, 
  Check,
  Copy,
  X,
  SlidersHorizontal,
  RotateCcw,
  BookOpen,
  Calendar,
  Building2,
  ExternalLink,
  Layers
} from 'lucide-react';
import { INAUGURAL_ARTICLES, CURRENT_ISSUE } from '../data/journalData';
import { JournalArticle } from '../types';
import { highlightText } from '../utils/searchHighlight';

interface ResearchRepositorySectionProps {
  onSelectArticle: (article: JournalArticle) => void;
  onOpenCitationModal: (article: JournalArticle) => void;
  initialDiscipline?: string;
}

type SortOption = 'relevance' | 'newest' | 'oldest' | 'title-asc' | 'author-asc';

export default function ResearchRepositorySection({
  onSelectArticle,
  onOpenCitationModal,
  initialDiscipline = 'All',
}: ResearchRepositorySectionProps) {
  // Search & debounced query
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Primary Discipline Tab Filter
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>(initialDiscipline);

  // Secondary Filters
  const [selectedAuthor, setSelectedAuthor] = useState<string>('All');
  const [selectedIssue, setSelectedIssue] = useState<string>('All');
  const [selectedVolume, setSelectedVolume] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [selectedArticleType, setSelectedArticleType] = useState<string>('All');

  // Sorting
  const [sortBy, setSortBy] = useState<SortOption>('relevance');

  // UI state
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);
  const [expandedAbstracts, setExpandedAbstracts] = useState<Record<string, boolean>>({});
  const [copiedDoi, setCopiedDoi] = useState<string | null>(null);
  const [downloadingPdf, setDownloadingPdf] = useState<string | null>(null);

  // Synchronize initial discipline from props
  useEffect(() => {
    if (initialDiscipline) {
      // Map short keys to full disciplines if needed
      if (initialDiscipline === 'Sciences') setSelectedDiscipline('Sciences & Technology');
      else if (initialDiscipline === 'Humanities') setSelectedDiscipline('Humanities & Heritage');
      else setSelectedDiscipline(initialDiscipline);
    }
  }, [initialDiscipline]);

  // Debounce search input for performance (200ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchInput);
    }, 200);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Distinct disciplines list matching journal pillars
  const disciplineTabs = [
    'All',
    'Sciences & Technology',
    'Social Sciences',
    'Humanities & Heritage',
    'Professional Studies'
  ];

  // Derive unique options for filter dropdowns
  const allAuthors = useMemo(() => {
    const authorsSet = new Set<string>();
    INAUGURAL_ARTICLES.forEach((art) => {
      art.authors.forEach((author) => authorsSet.add(author));
    });
    return Array.from(authorsSet).sort();
  }, []);

  const allVolumes = useMemo(() => {
    const vols = new Set<string>();
    INAUGURAL_ARTICLES.forEach((art) => {
      if (art.volume) vols.add(art.volume);
    });
    return Array.from(vols).sort();
  }, []);

  const allIssues = useMemo(() => {
    const issues = new Set<string>();
    INAUGURAL_ARTICLES.forEach((art) => {
      if (art.issue) issues.add(art.issue);
    });
    return Array.from(issues).sort();
  }, []);

  const allYears = useMemo(() => {
    const years = new Set<string>();
    INAUGURAL_ARTICLES.forEach((art) => {
      if (art.publicationYear) years.add(art.publicationYear.toString());
    });
    return Array.from(years).sort().reverse();
  }, []);

  const allArticleTypes = useMemo(() => {
    const types = new Set<string>();
    INAUGURAL_ARTICLES.forEach((art) => {
      if (art.articleType) types.add(art.articleType);
    });
    return Array.from(types).sort();
  }, []);

  // Check how many filters are currently active beyond defaults
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedDiscipline !== 'All') count++;
    if (selectedAuthor !== 'All') count++;
    if (selectedIssue !== 'All') count++;
    if (selectedVolume !== 'All') count++;
    if (selectedYear !== 'All') count++;
    if (selectedArticleType !== 'All') count++;
    if (searchQuery.trim().length > 0) count++;
    return count;
  }, [
    selectedDiscipline,
    selectedAuthor,
    selectedIssue,
    selectedVolume,
    selectedYear,
    selectedArticleType,
    searchQuery,
  ]);

  // Clear all filters handler
  const handleClearAllFilters = () => {
    setSearchInput('');
    setSearchQuery('');
    setSelectedDiscipline('All');
    setSelectedAuthor('All');
    setSelectedIssue('All');
    setSelectedVolume('All');
    setSelectedYear('All');
    setSelectedArticleType('All');
    setSortBy('relevance');
  };

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
      // Open printable academic manuscript window for direct PDF export
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
                  Published by Shivaji College, University of Delhi | DOI: ${article.doi ? `https://doi.org/${article.doi}` : 'Not assigned'}
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

  // Filter & Search Logic
  const filteredAndSortedArticles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    // 1. Filter articles
    const matched = INAUGURAL_ARTICLES.filter((article) => {
      // Discipline filter
      const disciplineMatch =
        selectedDiscipline === 'All' ||
        article.discipline === selectedDiscipline ||
        article.category === selectedDiscipline ||
        (selectedDiscipline === 'Sciences & Technology' && article.category === 'Sciences') ||
        (selectedDiscipline === 'Humanities & Heritage' && article.category === 'Humanities');

      if (!disciplineMatch) return false;

      // Author filter
      if (selectedAuthor !== 'All') {
        const hasAuthor = article.authors.some((a) => a === selectedAuthor);
        if (!hasAuthor) return false;
      }

      // Volume filter
      if (selectedVolume !== 'All' && article.volume !== selectedVolume) {
        return false;
      }

      // Issue filter
      if (selectedIssue !== 'All' && article.issue !== selectedIssue) {
        return false;
      }

      // Year filter
      if (selectedYear !== 'All' && article.publicationYear?.toString() !== selectedYear) {
        return false;
      }

      // Article type filter
      if (selectedArticleType !== 'All' && article.articleType !== selectedArticleType) {
        return false;
      }

      // Search Query
      if (!q) return true;

      // Comprehensive search across: title, authors, keywords, abstract, DOI, department, discipline
      const titleMatch = article.title.toLowerCase().includes(q);
      const authorsMatch = article.authors.some((a) => a.toLowerCase().includes(q));
      const keywordsMatch = article.keywords.some((k) => k.toLowerCase().includes(q));
      const abstractMatch = article.abstract.toLowerCase().includes(q);
      const doiMatch = Boolean(article.doi && article.doi.toLowerCase().includes(q));
      const affiliationMatch = article.affiliation.toLowerCase().includes(q);
      const deptMatch = Boolean(article.department && article.department.toLowerCase().includes(q));
      const disciplineTextMatch = article.discipline.toLowerCase().includes(q) || article.category.toLowerCase().includes(q);
      const articleNumberMatch = Boolean(article.articleNumber && article.articleNumber.toLowerCase().includes(q));

      return (
        titleMatch ||
        authorsMatch ||
        keywordsMatch ||
        abstractMatch ||
        doiMatch ||
        affiliationMatch ||
        deptMatch ||
        disciplineTextMatch ||
        articleNumberMatch
      );
    });

    // 2. Score relevance if search query exists
    const scored = matched.map((article) => {
      let score = 0;
      if (q) {
        const titleLower = article.title.toLowerCase();
        if (titleLower === q) score += 100;
        else if (titleLower.includes(q)) score += 50;

        if (article.doi && article.doi.toLowerCase().includes(q)) score += 40;
        if (article.authors.some((a) => a.toLowerCase().includes(q))) score += 35;
        if (article.keywords.some((k) => k.toLowerCase().includes(q))) score += 30;
        if (article.abstract.toLowerCase().includes(q)) score += 15;
        if (article.affiliation.toLowerCase().includes(q)) score += 10;
      }
      return { article, score };
    });

    // 3. Sort articles
    scored.sort((a, b) => {
      if (sortBy === 'relevance') {
        if (q) {
          // Descending score
          if (b.score !== a.score) return b.score - a.score;
        }
        // Fall back to inaugural order
        return 0;
      }
      if (sortBy === 'newest') {
        const dateA = new Date(a.article.publishedDate || a.article.publicationDate || '').getTime() || 0;
        const dateB = new Date(b.article.publishedDate || b.article.publicationDate || '').getTime() || 0;
        return dateB - dateA;
      }
      if (sortBy === 'oldest') {
        const dateA = new Date(a.article.publishedDate || a.article.publicationDate || '').getTime() || 0;
        const dateB = new Date(b.article.publishedDate || b.article.publicationDate || '').getTime() || 0;
        return dateA - dateB;
      }
      if (sortBy === 'title-asc') {
        return a.article.title.localeCompare(b.article.title);
      }
      if (sortBy === 'author-asc') {
        const firstA = a.article.authors[0] || '';
        const firstB = b.article.authors[0] || '';
        return firstA.localeCompare(firstB);
      }
      return 0;
    });

    return scored.map((item) => item.article);
  }, [
    searchQuery,
    selectedDiscipline,
    selectedAuthor,
    selectedVolume,
    selectedIssue,
    selectedYear,
    selectedArticleType,
    sortBy,
  ]);

  // Discipline paper counts
  const getDisciplineCount = (disc: string) => {
    if (disc === 'All') return INAUGURAL_ARTICLES.length;
    return INAUGURAL_ARTICLES.filter((a) => {
      return (
        a.discipline === disc ||
        a.category === disc ||
        (disc === 'Sciences & Technology' && a.category === 'Sciences') ||
        (disc === 'Humanities & Heritage' && a.category === 'Humanities')
      );
    }).length;
  };

  // Distinct academic color styling for discipline badges
  const getDisciplineBadge = (discipline: string, category?: string) => {
    const d = discipline || category || '';
    if (d.includes('Science')) {
      return 'bg-emerald-50 text-emerald-800 border-emerald-200';
    }
    if (d.includes('Social')) {
      return 'bg-sky-50 text-sky-800 border-sky-200';
    }
    if (d.includes('Humanities')) {
      return 'bg-amber-50 text-amber-900 border-amber-200';
    }
    if (d.includes('Professional') || d.includes('Commerce')) {
      return 'bg-purple-50 text-purple-800 border-purple-200';
    }
    return 'bg-slate-100 text-slate-800 border-slate-200';
  };

  return (
    <section id="repository" className="scroll-mt-24 sm:scroll-mt-28 py-8 sm:py-12 lg:py-16 bg-[#FAF8F5] border-b border-slate-200">
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
            Peer-reviewed scholarship from <strong>Inaugural Issue (Vol. 1, Issue 1)</strong>. Search by title, author, keyword, DOI, or explore cross-disciplinary filters.
          </p>
        </div>

        {/* Filter & Search Hub Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-3.5 sm:p-5 mb-6 sm:mb-8 shadow-xs space-y-4">
          
          {/* Top Row: Search Input + Sorting + Filter Toggle */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search articles by title, author, keyword, DOI..."
                className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#781D26]/20 focus:border-[#781D26] transition-all min-h-[44px]"
                aria-label="Search articles"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchInput('');
                    setSearchQuery('');
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 min-h-[32px] min-w-[32px] flex items-center justify-center cursor-pointer"
                  title="Clear search"
                  aria-label="Clear search input"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sorting & Filter Controls */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Sort By Dropdown */}
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 min-h-[44px]">
                <span className="text-xs text-slate-500 font-medium whitespace-nowrap">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-transparent text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer py-1"
                  aria-label="Sort articles by"
                >
                  <option value="relevance">Relevance</option>
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="title-asc">Title (A–Z)</option>
                  <option value="author-asc">Author (A–Z)</option>
                </select>
              </div>

              {/* Advanced Filter Toggle Button */}
              <button
                type="button"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`min-h-[44px] px-3 py-2 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 border transition-colors cursor-pointer ${
                  showAdvancedFilters || activeFiltersCount > 0
                    ? 'bg-amber-50/80 border-amber-300 text-[#781D26]'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                }`}
                aria-expanded={showAdvancedFilters}
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#781D26]" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#781D26] text-white text-[10px] font-bold flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
                {showAdvancedFilters ? (
                  <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                )}
              </button>

              {/* Clear All Filters button (visible if any filter or search active) */}
              {activeFiltersCount > 0 && (
                <button
                  type="button"
                  onClick={handleClearAllFilters}
                  className="min-h-[44px] px-2.5 py-2 rounded-lg text-xs font-medium text-slate-600 hover:text-[#781D26] hover:bg-slate-100 inline-flex items-center gap-1 transition-colors cursor-pointer"
                  title="Reset all search queries and filters"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Discipline Filter Tabs (Horizontally scrollable on mobile) */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-100 overflow-x-auto no-scrollbar pb-1 sm:flex-wrap">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider mr-1 shrink-0 hidden sm:inline">
              Discipline:
            </span>
            {disciplineTabs.map((disc) => {
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
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                      isActive ? 'bg-white/20 text-white font-bold' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Secondary / Advanced Filters Drawer */}
          {showAdvancedFilters && (
            <div className="pt-3 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs bg-slate-50/70 p-3.5 rounded-xl border">
              {/* Author Dropdown */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">Author</label>
                <select
                  value={selectedAuthor}
                  onChange={(e) => setSelectedAuthor(e.target.value)}
                  className="w-full p-2 rounded-lg bg-white border border-slate-200 text-slate-800 text-xs focus:ring-1 focus:ring-[#781D26] focus:outline-none min-h-[38px]"
                >
                  <option value="All">All Authors</option>
                  {allAuthors.map((author) => (
                    <option key={author} value={author}>
                      {author}
                    </option>
                  ))}
                </select>
              </div>

              {/* Article Type Dropdown */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">Article Type</label>
                <select
                  value={selectedArticleType}
                  onChange={(e) => setSelectedArticleType(e.target.value)}
                  className="w-full p-2 rounded-lg bg-white border border-slate-200 text-slate-800 text-xs focus:ring-1 focus:ring-[#781D26] focus:outline-none min-h-[38px]"
                >
                  <option value="All">All Types</option>
                  {allArticleTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Volume & Issue */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">Volume & Issue</label>
                <select
                  value={selectedIssue}
                  onChange={(e) => setSelectedIssue(e.target.value)}
                  className="w-full p-2 rounded-lg bg-white border border-slate-200 text-slate-800 text-xs focus:ring-1 focus:ring-[#781D26] focus:outline-none min-h-[38px]"
                >
                  <option value="All">All Issues</option>
                  <option value="Issue 1">Inaugural Issue (Vol 1, Issue 1)</option>
                </select>
              </div>

              {/* Publication Year */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">Publication Year</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full p-2 rounded-lg bg-white border border-slate-200 text-slate-800 text-xs focus:ring-1 focus:ring-[#781D26] focus:outline-none min-h-[38px]"
                >
                  <option value="All">All Years</option>
                  {allYears.map((yr) => (
                    <option key={yr} value={yr}>
                      {yr}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Active Filter Badges and Count Indicator */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-900 bg-amber-50 text-[#781D26] px-2.5 py-1 rounded-md border border-amber-200">
                {filteredAndSortedArticles.length} {filteredAndSortedArticles.length === 1 ? 'article found' : 'articles found'}
              </span>
              {searchQuery && (
                <span className="text-slate-500">
                  matching &ldquo;<strong>{searchQuery}</strong>&rdquo;
                </span>
              )}
            </div>

            <div className="text-slate-400 font-mono text-[11px]">
              ISSN: {CURRENT_ISSUE.issn} • Open Access
            </div>
          </div>
        </div>

        {/* Article Listing or Empty State */}
        {filteredAndSortedArticles.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-8 sm:p-14 text-center max-w-lg mx-auto space-y-4 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-[#781D26]">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl font-bold text-slate-900">
              No articles found
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
              Try changing your search terms or removing some filters.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleClearAllFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#781D26] hover:bg-[#5E141C] text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs min-h-[42px]"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Clear All Filters</span>
              </button>
            </div>
          </div>
        ) : (
          /* Article Cards Grid / Stack */
          <div className="space-y-4 sm:space-y-5">
            {filteredAndSortedArticles.map((article) => {
              const isExpanded = !!expandedAbstracts[article.id];
              const isCopied = copiedDoi === article.doi;
              const isDownloading = downloadingPdf === article.id;
              const badgeClass = getDisciplineBadge(article.discipline, article.category);

              return (
                <article
                  key={article.id}
                  id={`article-card-${article.id}`}
                  className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 p-4 sm:p-6 shadow-2xs hover:shadow-md transition-shadow duration-200 space-y-3 sm:space-y-4"
                >
                  {/* Top Meta Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-bold font-mono border border-slate-200">
                        {article.articleNumber || 'ARTICLE'}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider border ${badgeClass}`}>
                        {article.discipline || article.category}
                      </span>
                      {article.articleType && (
                        <span className="px-2 py-0.5 rounded-full bg-slate-50 text-slate-600 text-[10px] font-medium border border-slate-200">
                          {article.articleType}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-500 font-sans">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{article.publishedDate || article.publicationDate}</span>
                      </span>
                      <span>•</span>
                      <span className="font-mono text-slate-600">
                        Pages: {article.pageRange || article.pages}
                      </span>
                    </div>
                  </div>

                  {/* Article Title */}
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 hover:text-[#781D26] transition-colors leading-snug">
                    <button
                      type="button"
                      onClick={() => onSelectArticle(article)}
                      className="text-left cursor-pointer focus:outline-none focus:underline"
                    >
                      {highlightText(article.title, searchQuery)}
                    </button>
                  </h3>

                  {/* Authors & Affiliation */}
                  <div className="space-y-1 text-xs">
                    <div className="font-semibold text-slate-800">
                      {article.authors.map((author, idx) => (
                        <span key={author}>
                          {highlightText(author, searchQuery)}
                          {idx < article.authors.length - 1 && ' • '}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">
                        {article.department ? `${article.department}, ` : ''}{article.affiliation}
                      </span>
                    </div>
                  </div>

                  {/* Abstract Preview */}
                  <div className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans bg-slate-50/70 p-3 sm:p-3.5 rounded-lg border border-slate-100">
                    <div className={isExpanded ? '' : 'line-clamp-2 sm:line-clamp-3'}>
                      {highlightText(article.abstract, searchQuery)}
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleAbstract(article.id)}
                      className="mt-1 text-xs font-semibold text-[#781D26] hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>{isExpanded ? 'Show less abstract' : 'Read full abstract'}</span>
                      {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                  </div>

                  {/* Keywords Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">
                      Keywords:
                    </span>
                    {article.keywords.map((kw) => (
                      <span
                        key={kw}
                        className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200/80"
                      >
                        {highlightText(kw, searchQuery)}
                      </span>
                    ))}
                  </div>

                  {/* Card Bottom Row: DOI + Action Buttons */}
                  <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    {/* DOI Display */}
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="text-slate-400">DOI:</span>
                      {article.doi ? (
                        <div className="flex items-center gap-1.5">
                          <a
                            href={`https://doi.org/${article.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#781D26] hover:underline font-semibold truncate max-w-[200px] sm:max-w-xs"
                          >
                            {highlightText(article.doi, searchQuery)}
                          </a>
                          <button
                            type="button"
                            onClick={(e) => handleCopyDoi(article.doi, e)}
                            className="p-1 rounded text-slate-400 hover:text-slate-700 transition-colors cursor-pointer min-h-[30px] min-w-[30px] flex items-center justify-center"
                            title="Copy DOI"
                            aria-label="Copy DOI"
                          >
                            {isCopied ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">Not assigned</span>
                      )}
                    </div>

                    {/* Action Buttons: [Read Full Article], [PDF], [Cite] */}
                    <div className="flex items-center gap-2 flex-wrap">
                      {/* Read Full Article Button */}
                      <button
                        type="button"
                        onClick={() => onSelectArticle(article)}
                        className="min-h-[38px] px-3.5 py-1.5 rounded-lg bg-[#0B192C] hover:bg-[#1E3E62] text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                        <span>Read Full Article</span>
                      </button>

                      {/* PDF Download / Open Button */}
                      <button
                        type="button"
                        onClick={(e) => handleDownloadPdf(article, e)}
                        className="min-h-[38px] px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200"
                        title="Download / Print PDF"
                      >
                        {isDownloading ? (
                          <>
                            <div className="w-3.5 h-3.5 border-2 border-slate-700 border-t-transparent rounded-full animate-spin" />
                            <span>Opening PDF...</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-3.5 h-3.5 text-[#781D26]" />
                            <span>PDF</span>
                          </>
                        )}
                      </button>

                      {/* Cite Button */}
                      <button
                        type="button"
                        onClick={() => onOpenCitationModal(article)}
                        className="min-h-[38px] px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-[#781D26] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer border border-amber-200"
                        title="Generate citation in APA, MLA, Chicago, BibTeX"
                      >
                        <Quote className="w-3.5 h-3.5" />
                        <span>Cite</span>
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
