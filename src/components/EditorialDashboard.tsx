import React, { useState, useEffect } from 'react';
import {
  FileText,
  BookOpen,
  Send,
  Upload,
  Users,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Plus,
  Edit3,
  Trash2,
  LogOut,
  ExternalLink,
  Shield,
  Layers,
  Sparkles,
  Save,
  Check,
  Filter,
  Download,
  AlertTriangle,
  Database,
  Copy,
  RefreshCw
} from 'lucide-react';
import ShivajiCollegeLogo from './ShivajiCollegeLogo';
import DelhiUniversityLogo from './DelhiUniversityLogo';
import { INAUGURAL_ARTICLES } from '../data/journalData';
import { JournalArticle } from '../types';
import {
  checkSupabaseConnection,
  fetchSubmissionsFromSupabase,
  updateSubmissionStatusInSupabase,
  updateArticleInSupabase,
  SUPABASE_PROJECT_ID,
  SUPABASE_URL,
  SUPABASE_SQL_SCHEMA
} from '../lib/supabase';

interface EditorialDashboardProps {
  editorEmail?: string;
  onSignOut: () => void;
  onNavigateHome: () => void;
  onPreviewArticle?: (article: JournalArticle) => void;
}

type DashboardTab = 'articles' | 'issues' | 'submissions' | 'uploads' | 'authors';

interface SubmissionItem {
  id: string;
  trackingCode: string;
  title: string;
  authorName: string;
  authorEmail: string;
  affiliation: string;
  discipline: string;
  submittedDate: string;
  status: 'Under Peer Review' | 'Revisions Requested' | 'Accepted' | 'Pending Initial Check';
  fileName: string;
  fileSize: string;
  reviewersCount: number;
}

export default function EditorialDashboard({
  editorEmail = 'editor@shivaji.du.ac.in',
  onSignOut,
  onNavigateHome,
  onPreviewArticle,
}: EditorialDashboardProps) {
  const [activeTab, setActiveTab] = useState<DashboardTab>('articles');
  const [articlesList, setArticlesList] = useState<Array<JournalArticle & { isPublished: boolean }>>(
    INAUGURAL_ARTICLES.map((art) => ({
      ...art,
      isPublished: true,
    }))
  );

  // Search & filter for articles
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDisciplineFilter, setSelectedDisciplineFilter] = useState('All');

  // Metadata Edit Modal State
  const [editingArticle, setEditingArticle] = useState<(JournalArticle & { isPublished: boolean }) | null>(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    discipline: '',
    authors: '',
    affiliation: '',
    abstract: '',
    keywords: '',
    pages: '',
    doi: '',
  });

  // Success notifications
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  // Supabase Backend Integration State
  const [supabaseConnected, setSupabaseConnected] = useState<boolean>(true);
  const [supabaseMessage, setSupabaseMessage] = useState<string>('Connected to Supabase Project: ' + SUPABASE_PROJECT_ID);
  const [supabaseModalOpen, setSupabaseModalOpen] = useState<boolean>(false);
  const [sqlCopied, setSqlCopied] = useState<boolean>(false);
  const [isCheckingSupabase, setIsCheckingSupabase] = useState<boolean>(false);

  // Check Supabase and fetch live submissions on mount
  useEffect(() => {
    checkSupabaseConnection().then((res) => {
      setSupabaseConnected(res.connected);
      if (res.message) setSupabaseMessage(res.message);
    });

    fetchSubmissionsFromSupabase().then((res) => {
      if (res.data && res.data.length > 0) {
        const liveItems: SubmissionItem[] = res.data.map((d: any) => ({
          id: d.id || d.tracking_code,
          trackingCode: d.tracking_code,
          title: d.title,
          authorName: d.author_name,
          authorEmail: d.email,
          affiliation: `${d.department ? d.department + ', ' : ''}${d.institution}`,
          discipline: d.discipline,
          submittedDate: d.created_at
            ? new Date(d.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            : 'Recent',
          status: d.status || 'Pending Initial Check',
          fileName: d.file_name || 'Manuscript.pdf',
          fileSize: d.file_size || '2.5 MB',
          reviewersCount: 0,
        }));

        setSubmissionsList((prev) => {
          const liveCodes = new Set(liveItems.map((i) => i.trackingCode));
          const filteredPrev = prev.filter((p) => !liveCodes.has(p.trackingCode));
          return [...liveItems, ...filteredPrev];
        });
      }
    });
  }, []);

  const handleTestSupabaseConnection = async () => {
    setIsCheckingSupabase(true);
    const res = await checkSupabaseConnection();
    setIsCheckingSupabase(false);
    setSupabaseConnected(res.connected);
    setSupabaseMessage(res.message);
    showNotification(res.connected ? `Supabase Connected: ${res.message}` : `Supabase Notice: ${res.message}`);
  };

  const handleCopySqlSchema = () => {
    try {
      navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
      setSqlCopied(true);
      showNotification('Supabase SQL schema copied! Paste into Supabase SQL Editor.');
      setTimeout(() => setSqlCopied(false), 3000);
    } catch {
      showNotification('Please manually select and copy the SQL script from the dialog.');
    }
  };

  // Submissions State
  const [submissionsList, setSubmissionsList] = useState<SubmissionItem[]>([
    {
      id: 'sub-1',
      trackingCode: 'SHIVRAJ-2026-0842',
      title: 'Geospatial Assessment of Ground Water Depletion in NCR Semi-Arid Belts',
      authorName: 'Dr. Rameshwar Sharma & Anita Verma',
      authorEmail: 'r.sharma@earthsci.du.ac.in',
      affiliation: 'Department of Environmental Science, University of Delhi',
      discipline: 'Sciences',
      submittedDate: 'May 28, 2026',
      status: 'Under Peer Review',
      fileName: 'Groundwater_Depletion_NCR_Manuscript.pdf',
      fileSize: '3.4 MB',
      reviewersCount: 2,
    },
    {
      id: 'sub-2',
      trackingCode: 'SHIVRAJ-2026-0843',
      title: 'Post-Colonial Memory and Heritage Topography in 17th Century Maratha Naval Forts',
      authorName: 'Prof. Hemant Deshmukh',
      authorEmail: 'hdeshmukh@history.unipune.ac.in',
      affiliation: 'Department of History, Savitribai Phule Pune University',
      discipline: 'Humanities',
      submittedDate: 'June 02, 2026',
      status: 'Revisions Requested',
      fileName: 'Maratha_Naval_Topography_Draft.pdf',
      fileSize: '5.1 MB',
      reviewersCount: 3,
    },
    {
      id: 'sub-3',
      trackingCode: 'SHIVRAJ-2026-0844',
      title: 'Monetary Transmission Asymmetries in Post-Digital Banking: Empirical Evidence from India',
      authorName: 'Dr. Priya Raghavan & Sneha Kapoor',
      authorEmail: 'priya.raghavan@commerce.du.ac.in',
      affiliation: 'Department of Commerce, Shivaji College',
      discipline: 'Professional Studies',
      submittedDate: 'June 10, 2026',
      status: 'Pending Initial Check',
      fileName: 'Monetary_Transmission_Asymmetries.pdf',
      fileSize: '2.8 MB',
      reviewersCount: 0,
    },
  ]);

  // Uploaded PDFs State
  const [uploadedGalleys, setUploadedGalleys] = useState([
    {
      id: 'galley-1',
      articleTitle: 'Topological Quantum Materials for Scalable Clean Energy Heterostructures',
      fileName: 'quantum-materials-sustainable-energy.pdf',
      size: '1.4 MB',
      uploadedAt: 'January 12, 2026',
      verified: true,
    },
    {
      id: 'galley-2',
      articleTitle: 'Decentralized Agrarian Micro-Credit Architectures and Rural Resilience',
      fileName: 'agrarian-micro-credit-architectures.pdf',
      size: '2.1 MB',
      uploadedAt: 'February 01, 2026',
      verified: true,
    },
    {
      id: 'galley-3',
      articleTitle: 'Sovereign Resistance and Statecraft: Chhatrapati Shivaji’s Maritime Architecture',
      fileName: 'sovereign-resistance-shivaji-maritime.pdf',
      size: '3.8 MB',
      uploadedAt: 'March 08, 2026',
      verified: true,
    },
  ]);

  // PDF Upload simulated state
  const [selectedArticleForPdf, setSelectedArticleForPdf] = useState(articlesList[0]?.id || '');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Toggle Publish / Unpublish
  const handleTogglePublish = (articleId: string) => {
    setArticlesList((prev) =>
      prev.map((art) => {
        if (art.id === articleId) {
          const nextState = !art.isPublished;
          // Persist to Supabase
          updateArticleInSupabase(articleId, { isPublished: nextState });
          showNotification(
            `Article "${art.title.slice(0, 35)}..." has been ${nextState ? 'PUBLISHED' : 'UNPUBLISHED (Draft)'} (Synced to Supabase).`
          );
          return { ...art, isPublished: nextState };
        }
        return art;
      })
    );
  };

  // Open Edit Metadata Modal
  const handleOpenEditMetadata = (article: JournalArticle & { isPublished: boolean }) => {
    setEditingArticle(article);
    setEditFormData({
      title: article.title,
      discipline: article.discipline || article.category,
      authors: article.authors.join(', '),
      affiliation: article.affiliation,
      abstract: article.abstract,
      keywords: article.keywords.join(', '),
      pages: article.pages,
      doi: article.doi,
    });
  };

  // Save Metadata
  const handleSaveMetadata = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle) return;

    // Persist to Supabase
    updateArticleInSupabase(editingArticle.id, {
      title: editFormData.title,
      discipline: editFormData.discipline,
      affiliation: editFormData.affiliation,
      abstract: editFormData.abstract,
      pages: editFormData.pages,
      doi: editFormData.doi,
    });

    setArticlesList((prev) =>
      prev.map((art) => {
        if (art.id === editingArticle.id) {
          return {
            ...art,
            title: editFormData.title,
            discipline: editFormData.discipline,
            authors: editFormData.authors.split(',').map((s) => s.trim()).filter(Boolean),
            affiliation: editFormData.affiliation,
            abstract: editFormData.abstract,
            keywords: editFormData.keywords.split(',').map((s) => s.trim()).filter(Boolean),
            pages: editFormData.pages,
            doi: editFormData.doi,
          };
        }
        return art;
      })
    );

    showNotification(`Metadata updated and synchronized to Supabase for "${editFormData.title.slice(0, 35)}...".`);
    setEditingArticle(null);
  };

  // Simulated PDF Upload
  const handleSimulatedPdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(20);

    const interval = setInterval(() => {
      setUploadProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          const targetArticle = articlesList.find((a) => a.id === selectedArticleForPdf);
          setUploadedGalleys((prev) => [
            {
              id: `galley-${Date.now()}`,
              articleTitle: targetArticle?.title || 'Selected Manuscript',
              fileName: file.name,
              size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
              uploadedAt: 'Just now',
              verified: true,
            },
            ...prev,
          ]);
          showNotification(`PDF Galley Proof "${file.name}" uploaded and validated successfully!`);
          return 0;
        }
        return p + 25;
      });
    }, 180);
  };

  // Submissions status update
  const handleUpdateSubmissionStatus = (id: string, newStatus: SubmissionItem['status']) => {
    const targetSub = submissionsList.find((s) => s.id === id);
    if (targetSub) {
      updateSubmissionStatusInSupabase(targetSub.trackingCode, newStatus);
    }

    setSubmissionsList((prev) =>
      prev.map((sub) => {
        if (sub.id === id) {
          return { ...sub, status: newStatus };
        }
        return sub;
      })
    );
    showNotification(`Submission status updated to: ${newStatus} (Synchronized with Supabase).`);
  };

  // Filtered Articles
  const filteredArticles = articlesList.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.authors.some((a) => a.toLowerCase().includes(searchQuery.toLowerCase())) ||
      art.doi.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDiscipline =
      selectedDisciplineFilter === 'All' ||
      art.discipline === selectedDisciplineFilter ||
      art.category === selectedDisciplineFilter;
    return matchesSearch && matchesDiscipline;
  });

  // Extract Authors Directory
  const authorsDirectory = [
    {
      name: 'Dr. Arindam Sen',
      email: 'a.sen@materials.du.ac.in',
      department: 'Department of Physics & Nanoscience',
      institution: 'Shivaji College, University of Delhi',
      publishedArticles: 1,
      latestDoi: '10.5281/shivraj350.2026.0101',
    },
    {
      name: 'Dr. Vandana Malhotra',
      email: 'vandanamalhotra@shivaji.du.ac.in',
      department: 'Department of Economics',
      institution: 'Shivaji College, University of Delhi',
      publishedArticles: 1,
      latestDoi: '10.5281/shivraj350.2026.0102',
    },
    {
      name: 'Prof. Virender Bhardwaj',
      email: 'principal@shivaji.du.ac.in',
      department: 'Department of History',
      institution: 'Shivaji College, University of Delhi',
      publishedArticles: 1,
      latestDoi: '10.5281/shivraj350.2026.0103',
    },
    {
      name: 'Dr. Meenakshi Sharma',
      email: 'm.sharma@commerce.du.ac.in',
      department: 'Department of Commerce & Finance',
      institution: 'University of Delhi',
      publishedArticles: 1,
      latestDoi: '10.5281/shivraj350.2026.0104',
    },
    {
      name: 'Dr. Rajeshwari Sundaram',
      email: 'r.sundaram@botany.du.ac.in',
      department: 'Department of Botany & Genomics',
      institution: 'Shivaji College, University of Delhi',
      publishedArticles: 1,
      latestDoi: '10.5281/shivraj350.2026.0105',
    },
    {
      name: 'Dr. Abhinav Mukherjee',
      email: 'a.mukherjee@socio.du.ac.in',
      department: 'Department of Sociology & Political Science',
      institution: 'University of Delhi',
      publishedArticles: 1,
      latestDoi: '10.5281/shivraj350.2026.0106',
    },
  ];

  return (
    <div className="min-h-screen bg-[#071322] text-slate-100 flex flex-col selection:bg-amber-400 selection:text-slate-950 font-sans">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 p-4 rounded-xl bg-slate-900 border border-[#C5A059] shadow-2xl flex items-center gap-3 text-xs sm:text-sm text-white animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Bar: Editorial Administration Header */}
      <header className="sticky top-0 z-40 bg-[#0B192C]/95 backdrop-blur-md border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Left: Crest & Title */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 p-1 bg-white/10 rounded-xl border border-white/15 shadow-sm">
                <ShivajiCollegeLogo size={42} />
                <DelhiUniversityLogo size={42} />
              </div>

              <div className="flex flex-col pl-2 border-l-2 border-[#C5A059]/50">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-base sm:text-xl font-bold tracking-tight text-white leading-tight">
                    Editorial Management Suite
                  </span>
                  <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    <Shield className="w-3 h-3" />
                    Staff Clearance
                  </span>
                </div>
                <span className="text-xs text-amber-300/90 font-mono">
                  Shivraj 350: International Multidisciplinary Journal
                </span>
              </div>
            </div>

            {/* Right: User Identity & Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setSupabaseModalOpen(true)}
                className="inline-flex items-center gap-1.5 py-1.5 px-2.5 sm:px-3 rounded-lg text-xs font-medium text-emerald-300 hover:text-white bg-emerald-950/70 hover:bg-emerald-900/90 border border-emerald-700/60 transition-colors cursor-pointer"
                title="Inspect Supabase Cloud Database Status & Schema"
              >
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Supabase:</span>
                <span className="font-mono text-[11px] text-emerald-300 font-semibold">Active</span>
              </button>

              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-semibold text-slate-200">{editorEmail}</span>
                <span className="text-[11px] text-[#C5A059] font-mono">Managing Editor / Admin</span>
              </div>

              <button
                type="button"
                onClick={onNavigateHome}
                className="hidden lg:inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer"
                title="Preview Public Facing Journal"
              >
                <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
                <span>View Public Site</span>
              </button>

              <button
                type="button"
                onClick={onSignOut}
                className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold text-rose-300 hover:text-white bg-rose-950/40 hover:bg-rose-900 border border-rose-800/50 transition-colors cursor-pointer"
                title="Sign out of editorial session"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sub-Header: Supabase Live Status Bar */}
      <div className="bg-emerald-950/50 border-b border-emerald-800/40 py-2 px-4 flex flex-wrap items-center justify-between gap-2 text-xs text-emerald-200">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span>
            <strong className="text-emerald-300">Supabase Backend Connected:</strong> Project <code className="font-mono text-emerald-200 font-semibold">{SUPABASE_PROJECT_ID}</code> • Real-time synchronization active for Submissions and Article Records.
          </span>
        </div>
        <button
          type="button"
          onClick={() => setSupabaseModalOpen(true)}
          className="text-[11px] font-mono text-amber-300 hover:text-amber-100 underline underline-offset-2 cursor-pointer flex items-center gap-1"
        >
          <span>View Supabase Status &amp; SQL Schema</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        
        {/* KPI Overview Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
              <span>ARTICLES</span>
              <FileText className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-white font-serif">{articlesList.length}</div>
            <div className="text-[11px] text-emerald-400 mt-1">
              {articlesList.filter((a) => a.isPublished).length} Published • {articlesList.filter((a) => !a.isPublished).length} Draft
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
              <span>SUBMISSIONS</span>
              <Send className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-2xl font-bold text-white font-serif">{submissionsList.length}</div>
            <div className="text-[11px] text-amber-400 mt-1">3 Active in Peer-Review</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
              <span>CURRENT ISSUE</span>
              <Layers className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-lg font-bold text-white font-serif truncate">Vol. 1, Issue 1</div>
            <div className="text-[11px] text-slate-400 mt-1">Jan – June 2026 (Active)</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
              <span>AUTHORS</span>
              <Users className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-white font-serif">{authorsDirectory.length}</div>
            <div className="text-[11px] text-slate-400 mt-1">Institutional Faculty &amp; Fellows</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-slate-800 flex items-center gap-1 sm:gap-2 overflow-x-auto pb-0">
          <button
            type="button"
            onClick={() => setActiveTab('articles')}
            className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold rounded-t-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 border-b-2 ${
              activeTab === 'articles'
                ? 'bg-slate-900 text-amber-300 border-[#C5A059]'
                : 'text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-900/50'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Manage Articles &amp; Metadata</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300">
              {articlesList.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('submissions')}
            className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold rounded-t-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 border-b-2 ${
              activeTab === 'submissions'
                ? 'bg-slate-900 text-amber-300 border-[#C5A059]'
                : 'text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-900/50'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Review Submissions</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300">
              {submissionsList.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('issues')}
            className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold rounded-t-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 border-b-2 ${
              activeTab === 'issues'
                ? 'bg-slate-900 text-amber-300 border-[#C5A059]'
                : 'text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-900/50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Manage Issues</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('uploads')}
            className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold rounded-t-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 border-b-2 ${
              activeTab === 'uploads'
                ? 'bg-slate-900 text-amber-300 border-[#C5A059]'
                : 'text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-900/50'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Upload PDFs</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('authors')}
            className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold rounded-t-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 border-b-2 ${
              activeTab === 'authors'
                ? 'bg-slate-900 text-amber-300 border-[#C5A059]'
                : 'text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-900/50'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Manage Authors</span>
          </button>
        </div>

        {/* TAB 1: MANAGE ARTICLES & METADATA (Publish/Unpublish, Edit Metadata) */}
        {activeTab === 'articles' && (
          <div className="space-y-4">
            
            {/* Search, Filter & Quick Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/70 p-3 sm:p-4 rounded-xl border border-slate-800">
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles, authors, DOI..."
                    className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                  />
                </div>

                <div className="flex items-center gap-1 text-xs">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <select
                    value={selectedDisciplineFilter}
                    onChange={(e) => setSelectedDisciplineFilter(e.target.value)}
                    className="bg-slate-950 border border-slate-700 text-slate-300 text-xs rounded-lg py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                  >
                    <option value="All">All Disciplines</option>
                    <option value="Sciences">Sciences</option>
                    <option value="Social Sciences">Social Sciences</option>
                    <option value="Humanities">Humanities</option>
                    <option value="Professional Studies">Professional Studies</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>Showing <strong>{filteredArticles.length}</strong> of {articlesList.length} articles</span>
              </div>
            </div>

            {/* Articles Table */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-mono uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">#</th>
                      <th className="py-3 px-4">Title &amp; DOI</th>
                      <th className="py-3 px-4">Discipline</th>
                      <th className="py-3 px-4">Authors</th>
                      <th className="py-3 px-4">Pages</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Editorial Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {filteredArticles.map((art, idx) => (
                      <tr key={art.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3.5 px-4 font-mono text-slate-500 font-bold">
                          {art.articleNumber || `0${idx + 1}`}
                        </td>
                        <td className="py-3.5 px-4 max-w-xs sm:max-w-md">
                          <div className="font-serif text-sm font-semibold text-white leading-snug">
                            {art.title}
                          </div>
                          <div className="text-[11px] text-[#C5A059] font-mono mt-0.5">
                            https://doi.org/{art.doi}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
                            {art.discipline || art.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-300 max-w-[160px] truncate">
                          {art.authors.join(', ')}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-400 whitespace-nowrap">
                          pp. {art.pages}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          {art.isPublished ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                              <CheckCircle2 className="w-3 h-3" />
                              Published
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/30">
                              <Clock className="w-3 h-3" />
                              Draft / In Press
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-1.5">
                            {/* Publish / Unpublish Toggle */}
                            <button
                              type="button"
                              onClick={() => handleTogglePublish(art.id)}
                              className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer transition-colors ${
                                art.isPublished
                                  ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40'
                                  : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/40'
                              }`}
                              title={art.isPublished ? 'Unpublish article' : 'Publish article'}
                            >
                              {art.isPublished ? 'Unpublish' : 'Publish'}
                            </button>

                            {/* Edit Metadata */}
                            <button
                              type="button"
                              onClick={() => handleOpenEditMetadata(art)}
                              className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 cursor-pointer transition-colors"
                              title="Edit Article Metadata"
                            >
                              <Edit3 className="w-3.5 h-3.5 text-amber-300" />
                            </button>

                            {/* Public Reader Preview */}
                            {onPreviewArticle && (
                              <button
                                type="button"
                                onClick={() => onPreviewArticle(art)}
                                className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 cursor-pointer transition-colors"
                                title="Preview Manuscript"
                              >
                                <Eye className="w-3.5 h-3.5 text-sky-400" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: REVIEW SUBMISSIONS */}
        {activeTab === 'submissions' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-slate-900/70 p-4 rounded-xl border border-slate-800">
              <div>
                <h3 className="font-serif text-lg font-bold text-white">Manuscript Review Queue</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Incoming peer-review submissions for Volume 1, Issue 2 (July–December 2026 cycle)
                </p>
              </div>
              <span className="text-xs font-mono bg-sky-500/10 text-sky-300 border border-sky-500/30 px-3 py-1 rounded-full">
                Double-Blind Peer Review
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {submissionsList.map((sub) => (
                <div
                  key={sub.id}
                  className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-md space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[#781D26]/60 text-amber-200 text-xs font-mono font-bold">
                        {sub.trackingCode}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">Submitted: {sub.submittedDate}</span>
                      <span className="text-xs text-slate-500">•</span>
                      <span className="text-xs font-mono text-[#C5A059]">{sub.discipline}</span>
                    </div>

                    {/* Status Badge */}
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        sub.status === 'Accepted'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : sub.status === 'Revisions Requested'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : sub.status === 'Under Peer Review'
                          ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                          : 'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}
                    >
                      {sub.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-serif text-base font-bold text-white">{sub.title}</h4>
                    <p className="text-xs text-slate-300 mt-1">
                      <strong>Authors:</strong> {sub.authorName} ({sub.authorEmail})
                    </p>
                    <p className="text-xs text-slate-400">
                      <strong>Affiliation:</strong> {sub.affiliation}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                      <FileText className="w-3.5 h-3.5 text-amber-400" />
                      <span>{sub.fileName}</span>
                      <span>({sub.fileSize})</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleUpdateSubmissionStatus(sub.id, 'Under Peer Review')}
                        className="px-2.5 py-1 text-xs rounded bg-sky-950 hover:bg-sky-900 text-sky-200 border border-sky-700 cursor-pointer"
                      >
                        Assign Reviewers ({sub.reviewersCount})
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUpdateSubmissionStatus(sub.id, 'Revisions Requested')}
                        className="px-2.5 py-1 text-xs rounded bg-amber-950 hover:bg-amber-900 text-amber-200 border border-amber-700 cursor-pointer"
                      >
                        Request Revisions
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUpdateSubmissionStatus(sub.id, 'Accepted')}
                        className="px-2.5 py-1 text-xs rounded bg-emerald-950 hover:bg-emerald-900 text-emerald-200 border border-emerald-700 cursor-pointer font-semibold"
                      >
                        Accept Manuscript
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: MANAGE ISSUES */}
        {activeTab === 'issues' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-slate-900/70 p-4 rounded-xl border border-slate-800">
              <div>
                <h3 className="font-serif text-lg font-bold text-white">Journal Issues &amp; Volume Releases</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Biannual publication schedule under ISSN: 2583-XXXX
                </p>
              </div>
              <button
                type="button"
                onClick={() => showNotification('Issue scheduling dialog triggered (prototype).')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#781D26] hover:bg-[#8E222D] text-white text-xs font-semibold cursor-pointer shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Schedule New Issue</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Issue 1: Current Live Issue */}
              <div className="p-5 rounded-xl bg-slate-900/90 border-2 border-[#C5A059]/40 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Live Published Issue
                  </span>
                  <span className="text-xs font-mono text-slate-400">Vol. 1, Issue 1</span>
                </div>

                <div>
                  <h4 className="font-serif text-lg font-bold text-white">
                    Inaugural Issue (Jan – June 2026)
                  </h4>
                  <p className="text-xs text-amber-300/90 font-mono mt-0.5">
                    Commemorating 350 Years of Chhatrapati Shivaji Maharaj
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-slate-800 text-slate-300">
                  <div>Articles: <strong>8 Papers</strong></div>
                  <div>Pages: <strong>132 Pages</strong></div>
                  <div>Period: <strong>Biannual</strong></div>
                  <div>License: <strong>CC BY-NC 4.0</strong></div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                  <span className="text-xs text-slate-400">Full Open Access Active</span>
                  <button
                    type="button"
                    onClick={onNavigateHome}
                    className="text-xs text-[#C5A059] hover:underline cursor-pointer font-medium inline-flex items-center gap-1"
                  >
                    <span>View Public Issue Cover</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Issue 2: In Production / Upcoming */}
              <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 shadow-md space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-500/20 text-sky-300 border border-sky-500/30">
                    In Production / Peer-Review
                  </span>
                  <span className="text-xs font-mono text-slate-400">Vol. 1, Issue 2</span>
                </div>

                <div>
                  <h4 className="font-serif text-lg font-bold text-white">
                    Second Biannual Issue (July – Dec 2026)
                  </h4>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Multidisciplinary Frontiers in Sciences &amp; Humanities
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-slate-800 text-slate-300">
                  <div>Under Review: <strong>3 Papers</strong></div>
                  <div>Scheduled: <strong>Dec 2026</strong></div>
                  <div>Deadline: <strong>Sept 30, 2026</strong></div>
                  <div>Target Articles: <strong>10–12 Papers</strong></div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                  <span className="text-xs text-amber-400">Call for Papers Active</span>
                  <button
                    type="button"
                    onClick={() => setActiveTab('submissions')}
                    className="text-xs text-sky-400 hover:underline cursor-pointer font-medium"
                  >
                    Manage Submissions Queue →
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 4: UPLOAD PDFS & GALLEY PROOFS */}
        {activeTab === 'uploads' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-white">Upload Manuscript Galley PDF</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Attach official formatted publication proofs (.pdf) to indexed journal manuscripts.
                </p>
              </div>

              {/* Target Article Selection */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Select Target Indexed Article
                </label>
                <select
                  value={selectedArticleForPdf}
                  onChange={(e) => setSelectedArticleForPdf(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs sm:text-sm rounded-xl py-2.5 px-3 focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                >
                  {articlesList.map((art) => (
                    <option key={art.id} value={art.id}>
                      #{art.articleNumber || 'Art'} - {art.title.slice(0, 75)}... ({art.doi})
                    </option>
                  ))}
                </select>
              </div>

              {/* Drag and drop upload zone */}
              <div className="border-2 border-dashed border-slate-700 hover:border-[#C5A059] rounded-2xl p-6 sm:p-8 text-center bg-slate-950/60 transition-colors">
                <Upload className="w-10 h-10 text-[#C5A059] mx-auto mb-2" />
                <h4 className="text-sm font-semibold text-white">
                  Drop Official Manuscript PDF or Browse
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Supported format: High-resolution PDF with embedded fonts (Max file size: 25 MB)
                </p>

                <label className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#781D26] hover:bg-[#8E222D] text-white text-xs font-semibold cursor-pointer shadow-md transition-all">
                  <span>Browse Workstation PDF</span>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleSimulatedPdfUpload}
                    className="hidden"
                  />
                </label>

                {isUploading && (
                  <div className="mt-4 max-w-xs mx-auto space-y-1">
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 transition-all duration-200"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      Uploading &amp; checking DOI integrity: {uploadProgress}%
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* List of Uploaded Galley Proofs */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-lg space-y-3">
              <h4 className="font-serif text-base font-bold text-white">Repository PDF Galleys</h4>
              <div className="divide-y divide-slate-800">
                {uploadedGalleys.map((g) => (
                  <div key={g.id} className="py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div>
                      <div className="font-medium text-xs sm:text-sm text-white">{g.articleTitle}</div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono mt-0.5">
                        <FileText className="w-3.5 h-3.5 text-amber-400" />
                        <span>{g.fileName}</span>
                        <span>•</span>
                        <span>{g.size}</span>
                        <span>•</span>
                        <span>Uploaded: {g.uploadedAt}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                        Checksum Verified
                      </span>
                      <button
                        type="button"
                        onClick={() => showNotification(`Simulated download for ${g.fileName}`)}
                        className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                        title="Download PDF"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: MANAGE AUTHORS */}
        {activeTab === 'authors' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-slate-900/70 p-4 rounded-xl border border-slate-800">
              <div>
                <h3 className="font-serif text-lg font-bold text-white">Contributing Authors Directory</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Academic directory of published scholars, departmental affiliations and ORCID records
                </p>
              </div>
              <button
                type="button"
                onClick={() => showNotification('Author invitation email dispatched (prototype).')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#781D26] hover:bg-[#8E222D] text-white text-xs font-semibold cursor-pointer shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Invite New Author</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {authorsDirectory.map((author, aIdx) => (
                <div
                  key={aIdx}
                  className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 shadow-sm space-y-2 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-sm font-bold text-white">{author.name}</h4>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      {author.publishedArticles} Published Paper
                    </span>
                  </div>

                  <p className="text-xs text-[#C5A059] font-mono">{author.email}</p>
                  
                  <div className="text-xs text-slate-300 space-y-0.5 pt-1">
                    <div>{author.department}</div>
                    <div className="text-slate-400 text-[11px]">{author.institution}</div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-500 truncate">
                    Latest DOI: {author.latestDoi}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* EDIT ARTICLE METADATA MODAL */}
      {editingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0B192C] border border-slate-700 rounded-2xl max-w-2xl w-full p-6 text-left shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-[#C5A059]" />
                <span>Edit Article Metadata</span>
              </h3>
              <button
                type="button"
                onClick={() => setEditingArticle(null)}
                className="text-slate-400 hover:text-white cursor-pointer p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveMetadata} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block text-slate-300 mb-1 font-medium">Article Title</label>
                <input
                  type="text"
                  value={editFormData.title}
                  onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:ring-1 focus:ring-[#C5A059] focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Discipline</label>
                  <input
                    type="text"
                    value={editFormData.discipline}
                    onChange={(e) => setEditFormData({ ...editFormData, discipline: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:ring-1 focus:ring-[#C5A059] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Page Range (e.g., 1–14)</label>
                  <input
                    type="text"
                    value={editFormData.pages}
                    onChange={(e) => setEditFormData({ ...editFormData, pages: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:ring-1 focus:ring-[#C5A059] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Authors (Comma separated)</label>
                <input
                  type="text"
                  value={editFormData.authors}
                  onChange={(e) => setEditFormData({ ...editFormData, authors: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:ring-1 focus:ring-[#C5A059] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Author Institutional Affiliation</label>
                <input
                  type="text"
                  value={editFormData.affiliation}
                  onChange={(e) => setEditFormData({ ...editFormData, affiliation: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:ring-1 focus:ring-[#C5A059] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Digital Object Identifier (DOI)</label>
                <input
                  type="text"
                  value={editFormData.doi}
                  onChange={(e) => setEditFormData({ ...editFormData, doi: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:ring-1 focus:ring-[#C5A059] focus:outline-none font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Abstract</label>
                <textarea
                  rows={4}
                  value={editFormData.abstract}
                  onChange={(e) => setEditFormData({ ...editFormData, abstract: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:ring-1 focus:ring-[#C5A059] focus:outline-none leading-relaxed"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Keywords (Comma separated)</label>
                <input
                  type="text"
                  value={editFormData.keywords}
                  onChange={(e) => setEditFormData({ ...editFormData, keywords: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:ring-1 focus:ring-[#C5A059] focus:outline-none"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingArticle(null)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#781D26] hover:bg-[#8E222D] text-white font-semibold flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Metadata</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Supabase Backend Integration & SQL Schema Modal */}
      {supabaseModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-[#0B192C] border border-slate-700 rounded-2xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl text-left space-y-5 max-h-[92vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-white">
                    Supabase Backend Connection
                  </h3>
                  <p className="text-[11px] text-slate-400 font-mono">
                    Project: {SUPABASE_PROJECT_ID}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSupabaseModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto space-y-4 pr-1 text-xs">
              {/* Connection Status Card */}
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-mono uppercase text-[10px]">Cloud Infrastructure Status</span>
                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono font-medium ${
                    supabaseConnected ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/50' : 'bg-amber-950 text-amber-300 border border-amber-700/50'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${supabaseConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                    {supabaseConnected ? 'Active & Ready' : 'Standby / Verifying'}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
                  <div className="p-2 rounded bg-slate-950 border border-slate-800/80">
                    <span className="text-slate-500 block text-[10px]">PROJECT ID</span>
                    <span className="text-white select-all">{SUPABASE_PROJECT_ID}</span>
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-slate-800/80">
                    <span className="text-slate-500 block text-[10px]">SUPABASE ENDPOINT</span>
                    <span className="text-white truncate block select-all">{SUPABASE_URL}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-800/80">
                  <p className="text-[11px] text-slate-400">
                    {supabaseMessage}
                  </p>
                  <button
                    type="button"
                    onClick={handleTestSupabaseConnection}
                    disabled={isCheckingSupabase}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-medium flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3 h-3 ${isCheckingSupabase ? 'animate-spin' : ''}`} />
                    <span>{isCheckingSupabase ? 'Testing...' : 'Ping Supabase'}</span>
                  </button>
                </div>
              </div>

              {/* Database Tables & Schema Setup Instructions */}
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    <span>Database Tables &amp; SQL Schema</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopySqlSchema}
                      className="px-2.5 py-1 rounded bg-[#781D26] hover:bg-[#8E222D] text-white font-medium flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                    >
                      {sqlCopied ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3" />}
                      <span>{sqlCopied ? 'Copied!' : 'Copy SQL Schema'}</span>
                    </button>
                    <a
                      href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/sql`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 font-medium flex items-center gap-1"
                    >
                      <span>Open SQL Editor</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <p className="text-slate-400 text-[11.5px] leading-relaxed">
                  To initialize the live <code>manuscript_submissions</code> and <code>articles</code> tables in your Supabase project, copy the SQL migration script below and run it once in your Supabase SQL Editor.
                </p>

                <div className="relative rounded-lg bg-slate-950 border border-slate-800 p-3 max-h-44 overflow-y-auto font-mono text-[11px] text-slate-300">
                  <pre className="whitespace-pre-wrap selection:bg-amber-400 selection:text-slate-900">
                    {SUPABASE_SQL_SCHEMA}
                  </pre>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setSupabaseModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
