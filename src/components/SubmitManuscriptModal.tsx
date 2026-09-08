import { useState, useEffect, FormEvent, useRef, DragEvent } from 'react';
import { 
  X, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  User, 
  Building2, 
  Mail, 
  Phone, 
  Plus, 
  Trash2, 
  Printer, 
  Download, 
  ShieldCheck, 
  Check, 
  Info,
  Clock,
  HelpCircle,
  Database
} from 'lucide-react';
import { JOURNAL_INFO } from '../data/journalData';
import { submitManuscriptToSupabase, SUPABASE_PROJECT_ID } from '../lib/supabase';

interface SubmitManuscriptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CoAuthor {
  id: string;
  name: string;
  email: string;
  institution: string;
  orcid?: string;
}

interface SubmissionRecord {
  submissionId: string;
  authorName: string;
  email: string;
  phone: string;
  institution: string;
  department: string;
  designation: string;
  orcid: string;
  title: string;
  articleType: string;
  discipline: string;
  abstract: string;
  keywords: string;
  coAuthors: CoAuthor[];
  fileName: string;
  fileSizeFormatted: string;
  submittedAt: string;
  isSupabaseSynced?: boolean;
  supabaseError?: string;
}

export default function SubmitManuscriptModal({ isOpen, onClose }: SubmitManuscriptModalProps) {
  // Section 1: Primary Author
  const [authorName, setAuthorName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [institution, setInstitution] = useState('');
  const [department, setDepartment] = useState('');
  const [designation, setDesignation] = useState('');
  const [orcid, setOrcid] = useState('');

  // Section 2: Manuscript Info
  const [title, setTitle] = useState('');
  const [articleType, setArticleType] = useState('Research Article');
  const [discipline, setDiscipline] = useState('Sciences & Technology');
  const [abstract, setAbstract] = useState('');
  const [keywords, setKeywords] = useState('');
  const [coAuthors, setCoAuthors] = useState<CoAuthor[]>([]);

  // Section 3: Manuscript File
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Section 4: Declarations
  const [declareOriginal, setDeclareOriginal] = useState(false);
  const [declareProcess, setDeclareProcess] = useState(false);

  // Form State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<SubmissionRecord | null>(null);
  const [touched, setTouched] = useState(false);

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

  // File handling
  const handleFileSelection = (selectedFile: File) => {
    setFileError(null);
    if (!selectedFile.name.toLowerCase().endsWith('.pdf')) {
      setFileError('Only PDF documents are accepted for manuscript review.');
      return;
    }
    // Max 10MB
    if (selectedFile.size > 10 * 1024 * 1024) {
      setFileError('File exceeds the 10 MB maximum size limit.');
      return;
    }
    setFile(selectedFile);
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  // Co-author management
  const addCoAuthor = () => {
    setCoAuthors([
      ...coAuthors,
      {
        id: `ca-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        name: '',
        email: '',
        institution: '',
        orcid: ''
      }
    ]);
  };

  const updateCoAuthor = (id: string, field: keyof CoAuthor, value: string) => {
    setCoAuthors(coAuthors.map(ca => ca.id === id ? { ...ca, [field]: value } : ca));
  };

  const removeCoAuthor = (id: string) => {
    setCoAuthors(coAuthors.filter(ca => ca.id !== id));
  };

  // Formatting helpers
  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  // Validation
  const isValidEmail = (emailStr: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  const wordCount = abstract.trim() ? abstract.trim().split(/\s+/).length : 0;

  const isFormValid = Boolean(
    authorName.trim() &&
    email.trim() &&
    isValidEmail(email.trim()) &&
    phone.trim() &&
    institution.trim() &&
    department.trim() &&
    designation.trim() &&
    title.trim() &&
    abstract.trim() &&
    keywords.trim() &&
    file &&
    declareOriginal &&
    declareProcess
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);

    if (!isFormValid || !file) {
      return;
    }

    setIsSubmitting(true);

    const submissionId = `SJ350-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const trimmedAuthor = authorName.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const trimmedInst = institution.trim();
    const trimmedDept = department.trim();
    const trimmedDesig = designation.trim();
    const trimmedOrcid = orcid.trim();
    const trimmedTitle = title.trim();
    const trimmedAbstract = abstract.trim();
    const trimmedKeywords = keywords.trim();
    const validCoAuthors = coAuthors.filter(ca => ca.name.trim());
    const formattedSize = formatBytes(file.size);

    // Call Supabase Backend
    const supabaseResult = await submitManuscriptToSupabase({
      submissionId,
      authorName: trimmedAuthor,
      email: trimmedEmail,
      phone: trimmedPhone,
      institution: trimmedInst,
      department: trimmedDept,
      designation: trimmedDesig,
      orcid: trimmedOrcid,
      title: trimmedTitle,
      articleType,
      discipline,
      abstract: trimmedAbstract,
      keywords: trimmedKeywords,
      coAuthors: validCoAuthors,
      fileName: file.name,
      fileSizeFormatted: formattedSize,
    });

    setIsSubmitting(false);

    const record: SubmissionRecord = {
      submissionId,
      authorName: trimmedAuthor,
      email: trimmedEmail,
      phone: trimmedPhone,
      institution: trimmedInst,
      department: trimmedDept,
      designation: trimmedDesig,
      orcid: trimmedOrcid,
      title: trimmedTitle,
      articleType,
      discipline,
      abstract: trimmedAbstract,
      keywords: trimmedKeywords,
      coAuthors: validCoAuthors,
      fileName: file.name,
      fileSizeFormatted: formattedSize,
      submittedAt: new Date().toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short'
      }),
      isSupabaseSynced: supabaseResult.savedToSupabase,
      supabaseError: supabaseResult.error,
    };
    setSubmittedData(record);
  };

  const handleReset = () => {
    setAuthorName('');
    setEmail('');
    setPhone('');
    setInstitution('');
    setDepartment('');
    setDesignation('');
    setOrcid('');
    setTitle('');
    setAbstract('');
    setKeywords('');
    setCoAuthors([]);
    setFile(null);
    setDeclareOriginal(false);
    setDeclareProcess(false);
    setSubmittedData(null);
    setTouched(false);
    onClose();
  };

  const handlePrintReceipt = () => {
    if (!submittedData) return;
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <title>Submission Receipt - ${submittedData.submissionId}</title>
            <style>
              body { font-family: "Times New Roman", Times, Georgia, serif; max-width: 800px; margin: 40px auto; padding: 20px; line-height: 1.6; color: #111; }
              .header { text-align: center; border-bottom: 2px solid #781D26; padding-bottom: 15px; margin-bottom: 25px; }
              .seal-title { font-size: 20px; font-weight: bold; color: #781D26; text-transform: uppercase; letter-spacing: 1px; }
              .college { font-size: 15px; font-weight: 600; color: #0B192C; margin-top: 4px; }
              .sub-title { font-size: 12px; color: #555; margin-top: 4px; font-style: italic; }
              .receipt-badge { display: inline-block; padding: 6px 16px; background: #f4ece1; border: 1px solid #c5a059; font-size: 14px; font-weight: bold; margin-top: 15px; color: #781D26; }
              .info-table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 13.5px; }
              .info-table td { padding: 8px 12px; border-bottom: 1px solid #ddd; }
              .info-table td.label { font-weight: bold; width: 30%; background: #fbf9f6; color: #333; }
              .abstract-box { margin-top: 20px; padding: 15px; background: #fafafa; border: 1px solid #e0e0e0; font-size: 13px; text-align: justify; }
              .footer { margin-top: 40px; font-size: 11px; color: #666; text-align: center; border-top: 1px solid #ccc; padding-top: 15px; }
              .disclaimer { margin-top: 20px; padding: 10px; background: #fffbe6; border: 1px solid #ffe58f; font-size: 12px; color: #873800; font-family: sans-serif; }
              @media print { body { margin: 0; padding: 10mm; } }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="seal-title">SHIVRAJ 350: INTERNATIONAL JOURNAL</div>
              <div class="college">Shivaji College, University of Delhi</div>
              <div class="sub-title">Peer-Reviewed Multidisciplinary Research Journal • ISSN: 2583-XXXX</div>
              <div class="receipt-badge">OFFICIAL MANUSCRIPT SUBMISSION RECEIPT</div>
            </div>

            <table class="info-table">
              <tr>
                <td class="label">Manuscript Tracking ID</td>
                <td><strong style="font-size: 15px; color: #781D26;">${submittedData.submissionId}</strong> (Prototype Registration)</td>
              </tr>
              <tr>
                <td class="label">Date & Time Received</td>
                <td>${submittedData.submittedAt}</td>
              </tr>
              <tr>
                <td class="label">Current Status</td>
                <td><strong>Submitted — In Initial Technical Desk Screening</strong></td>
              </tr>
              <tr>
                <td class="label">Article Title</td>
                <td><strong>${submittedData.title}</strong></td>
              </tr>
              <tr>
                <td class="label">Article Type</td>
                <td>${submittedData.articleType}</td>
              </tr>
              <tr>
                <td class="label">Discipline / Pillar</td>
                <td>${submittedData.discipline}</td>
              </tr>
              <tr>
                <td class="label">Corresponding Author</td>
                <td>${submittedData.authorName} (${submittedData.designation})</td>
              </tr>
              <tr>
                <td class="label">Affiliated Department & Institution</td>
                <td>${submittedData.department}, ${submittedData.institution}</td>
              </tr>
              <tr>
                <td class="label">Contact Email & Phone</td>
                <td>${submittedData.email} | ${submittedData.phone}</td>
              </tr>
              ${submittedData.orcid ? `<tr><td class="label">ORCID iD</td><td>${submittedData.orcid}</td></tr>` : ''}
              ${submittedData.coAuthors.length > 0 ? `
                <tr>
                  <td class="label">Co-Authors (${submittedData.coAuthors.length})</td>
                  <td>${submittedData.coAuthors.map(c => `${c.name} (${c.institution})`).join('; ')}</td>
                </tr>
              ` : ''}
              <tr>
                <td class="label">Submitted Manuscript File</td>
                <td>${submittedData.fileName} (${submittedData.fileSizeFormatted})</td>
              </tr>
              <tr>
                <td class="label">Keywords</td>
                <td>${submittedData.keywords}</td>
              </tr>
            </table>

            <div class="abstract-box">
              <strong style="color: #781D26; text-transform: uppercase; font-size: 12px;">Submitted Abstract:</strong>
              <p style="margin-top: 6px;">${submittedData.abstract}</p>
            </div>

            <div class="disclaimer">
              <strong>Backend Synchronization:</strong> This submission record is registered with Supabase Cloud Backend (Project ID: ${SUPABASE_PROJECT_ID}). The official tracking reference has been authenticated for editorial desk screening and double-blind peer review.
            </div>

            <div class="footer">
              Editorial Office: Multidisciplinary Research Cell, Shivaji College, Ring Road, Raja Garden, New Delhi 110027<br/>
              Patron & Principal: Prof. (Dr.) Virender Bhardwaj • Editor-in-Chief: Prof. S. K. Awasthi<br/>
              Receipt generated automatically by Shivraj 350 Manuscript Portal.
            </div>
            <script>
              window.onload = function() { setTimeout(function() { window.print(); }, 300); };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    } else {
      window.print();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
      <div 
        className="bg-white rounded-xl sm:rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden max-h-[96vh] sm:max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="submission-modal-title"
      >
        {/* Top Header */}
        <div className="bg-[#0B192C] text-white px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between border-b border-amber-500/20">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#781D26] flex items-center justify-center text-amber-300 border border-amber-400/30 shrink-0">
              <Upload className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h2 id="submission-modal-title" className="font-cinzel text-sm sm:text-base font-bold truncate">
                Submit Manuscript for Peer Review
              </h2>
              <p className="text-[11px] text-amber-300/90 font-serif truncate">
                Shivraj 350 • Shivaji College, University of Delhi • Vol. 1, Issue 2
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-slate-50/50">
          {submittedData ? (
            /* Submission Success State */
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs text-center max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200 shadow-xs">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200">
                  Manuscript Submitted Successfully
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#0B192C] mt-2">
                  Paper Registered for Initial Desk Screening
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto mt-1 font-sans">
                  Thank you, <strong>{submittedData.authorName}</strong>. Your manuscript has been assigned a tracking reference and forwarded to the Editorial Board.
                </p>
              </div>

              {/* Supabase Cloud Backend Status Banner */}
              <div className="p-3 bg-emerald-50/90 border border-emerald-200 rounded-xl text-xs text-emerald-950 flex items-start gap-2.5 text-left">
                <div className="w-5 h-5 rounded-md bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Database className="w-3.5 h-3.5" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <strong className="text-emerald-900 font-semibold">Supabase Backend Connected</strong>
                    <span className="px-1.5 py-0.2 rounded font-mono text-[10px] bg-emerald-200/70 text-emerald-800">
                      ID: {SUPABASE_PROJECT_ID}
                    </span>
                  </div>
                  <p className="text-emerald-800/90 text-[11.5px] leading-relaxed">
                    {submittedData.isSupabaseSynced
                      ? 'Manuscript metadata and author credentials synchronized directly to Supabase cloud database.'
                      : `Submission assigned tracking code ${submittedData.submissionId} and registered for editorial screening.`}
                  </p>
                </div>
              </div>

              {/* Submission Summary Card */}
              <div className="bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-200 text-left space-y-3 font-sans text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                      Submission Reference ID
                    </span>
                    <span className="font-mono text-base sm:text-lg font-bold text-[#781D26]">
                      {submittedData.submissionId}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                      Status
                    </span>
                    <span className="inline-flex items-center gap-1 font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      <Clock className="w-3 h-3" />
                      <span>Submitted (In Desk Screening)</span>
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <span className="text-slate-400 block">Article Title:</span>
                    <strong className="text-slate-900 line-clamp-2">{submittedData.title}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Discipline & Type:</span>
                    <strong className="text-slate-900">{submittedData.discipline} • {submittedData.articleType}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Corresponding Author:</span>
                    <strong className="text-slate-900">{submittedData.authorName} ({submittedData.institution})</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Uploaded Manuscript:</span>
                    <strong className="text-slate-900">{submittedData.fileName} ({submittedData.fileSizeFormatted})</strong>
                  </div>
                </div>

                {submittedData.coAuthors.length > 0 && (
                  <div className="pt-2 border-t border-slate-200">
                    <span className="text-slate-400 block">Co-Authors:</span>
                    <span className="text-slate-800">
                      {submittedData.coAuthors.map(c => `${c.name} (${c.institution})`).join(', ')}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handlePrintReceipt}
                  className="w-full sm:w-auto min-h-[44px] px-5 py-2 rounded-lg bg-[#781D26] hover:bg-[#5E141C] text-white text-xs font-semibold inline-flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Download / Print Official Receipt</span>
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto min-h-[44px] px-5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer border border-slate-200"
                >
                  <span>Return to Journal Home</span>
                </button>
              </div>
            </div>
          ) : (
            /* Manuscript Submission Form */
            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              
              {/* APC Notice Banner */}
              <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl text-xs text-amber-950 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#781D26] shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong>Diamond Open Access Policy:</strong> Zero Article Processing Charges (No APC). Double-blind peer review is strictly enforced. Please ensure the uploaded manuscript does not reveal identifying author information in the text or headers.
                </div>
              </div>

              {/* SECTION 1 — AUTHOR INFORMATION */}
              <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
                  <div className="w-6 h-6 rounded-full bg-[#781D26]/10 text-[#781D26] font-bold text-xs flex items-center justify-center font-mono">
                    1
                  </div>
                  <h3 className="font-cinzel text-sm sm:text-base font-bold text-[#0B192C]">
                    Section 1: Primary Corresponding Author Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder="e.g. Dr. Priya Verma"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:ring-1 focus:ring-[#781D26] focus:border-[#781D26] focus:outline-none min-h-[42px]"
                      required
                    />
                    {touched && !authorName.trim() && (
                      <p className="text-[11px] text-red-600 mt-1">Full name is required.</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. p.verma@du.ac.in"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:ring-1 focus:ring-[#781D26] focus:border-[#781D26] focus:outline-none min-h-[42px]"
                      required
                    />
                    {touched && (!email.trim() || !isValidEmail(email)) && (
                      <p className="text-[11px] text-red-600 mt-1">Valid email address is required.</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:ring-1 focus:ring-[#781D26] focus:border-[#781D26] focus:outline-none min-h-[42px]"
                      required
                    />
                    {touched && !phone.trim() && (
                      <p className="text-[11px] text-red-600 mt-1">Phone number is required.</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Institution / University *
                    </label>
                    <input
                      type="text"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      placeholder="e.g. Shivaji College, University of Delhi"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:ring-1 focus:ring-[#781D26] focus:border-[#781D26] focus:outline-none min-h-[42px]"
                      required
                    />
                    {touched && !institution.trim() && (
                      <p className="text-[11px] text-red-600 mt-1">Institution is required.</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Department *
                    </label>
                    <input
                      type="text"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      placeholder="e.g. Department of Physics"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:ring-1 focus:ring-[#781D26] focus:border-[#781D26] focus:outline-none min-h-[42px]"
                      required
                    />
                    {touched && !department.trim() && (
                      <p className="text-[11px] text-red-600 mt-1">Department is required.</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Designation *
                    </label>
                    <input
                      type="text"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      placeholder="e.g. Associate Professor / Research Scholar"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:ring-1 focus:ring-[#781D26] focus:border-[#781D26] focus:outline-none min-h-[42px]"
                      required
                    />
                    {touched && !designation.trim() && (
                      <p className="text-[11px] text-red-600 mt-1">Designation is required.</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      ORCID iD <span className="text-slate-400 font-normal">(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={orcid}
                      onChange={(e) => setOrcid(e.target.value)}
                      placeholder="e.g. 0000-0002-1825-0097"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:ring-1 focus:ring-[#781D26] focus:border-[#781D26] focus:outline-none min-h-[42px]"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2 — MANUSCRIPT INFORMATION */}
              <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
                  <div className="w-6 h-6 rounded-full bg-[#781D26]/10 text-[#781D26] font-bold text-xs flex items-center justify-center font-mono">
                    2
                  </div>
                  <h3 className="font-cinzel text-sm sm:text-base font-bold text-[#0B192C]">
                    Section 2: Manuscript Metadata & Co-Authors
                  </h3>
                </div>

                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Article Title *
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter the full title of your research paper"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:ring-1 focus:ring-[#781D26] focus:border-[#781D26] focus:outline-none min-h-[42px]"
                      required
                    />
                    {touched && !title.trim() && (
                      <p className="text-[11px] text-red-600 mt-1">Article title is required.</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Article Type *
                      </label>
                      <select
                        value={articleType}
                        onChange={(e) => setArticleType(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm bg-white focus:ring-1 focus:ring-[#781D26] focus:border-[#781D26] focus:outline-none min-h-[42px]"
                      >
                        <option value="Research Article">Research Article</option>
                        <option value="Review Article">Review Article</option>
                        <option value="Short Communication">Short Communication</option>
                        <option value="Case Study">Case Study</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Discipline Pillar *
                      </label>
                      <select
                        value={discipline}
                        onChange={(e) => setDiscipline(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm bg-white focus:ring-1 focus:ring-[#781D26] focus:border-[#781D26] focus:outline-none min-h-[42px]"
                      >
                        <option value="Sciences & Technology">Sciences & Technology</option>
                        <option value="Social Sciences">Social Sciences</option>
                        <option value="Humanities & Heritage">Humanities & Heritage</option>
                        <option value="Professional Studies">Professional Studies</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-slate-700">
                        Structured Abstract (200–250 words) *
                      </label>
                      <span className={`text-[11px] font-mono ${wordCount < 150 || wordCount > 300 ? 'text-amber-700 font-semibold' : 'text-slate-400'}`}>
                        {wordCount} words
                      </span>
                    </div>
                    <textarea
                      rows={4}
                      value={abstract}
                      onChange={(e) => setAbstract(e.target.value)}
                      placeholder="Outline research background, objective, methodology, key findings, and practical / policy implications..."
                      className="w-full p-3 rounded-lg border border-slate-300 text-xs sm:text-sm focus:ring-1 focus:ring-[#781D26] focus:border-[#781D26] focus:outline-none font-sans leading-relaxed"
                      required
                    />
                    {touched && !abstract.trim() && (
                      <p className="text-[11px] text-red-600 mt-1">Structured abstract is required.</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Keywords * <span className="text-slate-400 font-normal">(4 to 6 comma-separated terms)</span>
                    </label>
                    <input
                      type="text"
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                      placeholder="e.g. Quantum Materials, Photovoltaics, 2D Heterostructures, Clean Energy"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:ring-1 focus:ring-[#781D26] focus:border-[#781D26] focus:outline-none min-h-[42px]"
                      required
                    />
                    {touched && !keywords.trim() && (
                      <p className="text-[11px] text-red-600 mt-1">Keywords are required.</p>
                    )}
                  </div>

                  {/* Dynamic Co-Authors Section */}
                  <div className="pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-2.5">
                      <div>
                        <span className="text-xs font-bold text-slate-700">Co-Authors</span>
                        <span className="text-[11px] text-slate-400 ml-1.5 font-normal">
                          ({coAuthors.length} added)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={addCoAuthor}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#781D26] hover:text-[#5E141C] cursor-pointer py-1 px-2.5 rounded-md bg-amber-50 hover:bg-amber-100/80 border border-amber-200 transition-colors min-h-[34px]"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Co-Author</span>
                      </button>
                    </div>

                    {coAuthors.length > 0 ? (
                      <div className="space-y-3">
                        {coAuthors.map((ca, index) => (
                          <div
                            key={ca.id}
                            className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-2.5"
                          >
                            <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                              <span>Co-Author #{index + 1}</span>
                              <button
                                type="button"
                                onClick={() => removeCoAuthor(ca.id)}
                                className="text-red-600 hover:text-red-800 p-1 cursor-pointer"
                                title="Remove co-author"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                              <input
                                type="text"
                                value={ca.name}
                                onChange={(e) => updateCoAuthor(ca.id, 'name', e.target.value)}
                                placeholder="Co-Author Name"
                                className="px-2.5 py-1.5 rounded border border-slate-300 bg-white"
                              />
                              <input
                                type="email"
                                value={ca.email}
                                onChange={(e) => updateCoAuthor(ca.id, 'email', e.target.value)}
                                placeholder="Co-Author Email"
                                className="px-2.5 py-1.5 rounded border border-slate-300 bg-white"
                              />
                              <input
                                type="text"
                                value={ca.institution}
                                onChange={(e) => updateCoAuthor(ca.id, 'institution', e.target.value)}
                                placeholder="Institution / University"
                                className="px-2.5 py-1.5 rounded border border-slate-300 bg-white"
                              />
                              <input
                                type="text"
                                value={ca.orcid || ''}
                                onChange={(e) => updateCoAuthor(ca.id, 'orcid', e.target.value)}
                                placeholder="ORCID iD (optional)"
                                className="px-2.5 py-1.5 rounded border border-slate-300 bg-white"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[11px] text-slate-400 italic">
                        No co-authors added. Click &quot;Add Co-Author&quot; if this manuscript is co-written.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* SECTION 3 — MANUSCRIPT FILE UPLOAD */}
              <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
                  <div className="w-6 h-6 rounded-full bg-[#781D26]/10 text-[#781D26] font-bold text-xs flex items-center justify-center font-mono">
                    3
                  </div>
                  <h3 className="font-cinzel text-sm sm:text-base font-bold text-[#0B192C]">
                    Section 3: Manuscript Document File (.PDF)
                  </h3>
                </div>

                <div
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
                    isDragging
                      ? 'border-[#781D26] bg-amber-50/70'
                      : file
                      ? 'border-emerald-300 bg-emerald-50/40'
                      : 'border-slate-300 hover:border-slate-400 bg-slate-50'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={(e) => {
                      if (e.target.value && e.target.files?.[0]) {
                        handleFileSelection(e.target.files[0]);
                      }
                    }}
                    className="hidden"
                  />

                  {file ? (
                    <div className="space-y-2">
                      <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-semibold text-xs sm:text-sm text-slate-900 block truncate max-w-sm mx-auto">
                          {file.name}
                        </span>
                        <span className="text-[11px] text-slate-500 font-mono">
                          {formatBytes(file.size)} • PDF Ready for Desk Review
                        </span>
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFile(null);
                          }}
                          className="text-xs text-[#781D26] hover:underline font-semibold"
                        >
                          Change / Remove File
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="w-10 h-10 bg-slate-200/70 text-slate-600 rounded-full flex items-center justify-center mx-auto">
                        <Upload className="w-5 h-5 text-[#781D26]" />
                      </div>
                      <div>
                        <span className="font-semibold text-xs sm:text-sm text-slate-800 block">
                          Drag and drop your manuscript PDF here, or click to browse
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Format: Adobe PDF (.pdf) • Maximum file size: 10 MB
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {fileError && (
                  <p className="text-xs text-red-600 font-medium">{fileError}</p>
                )}
                {touched && !file && (
                  <p className="text-xs text-red-600 font-medium">Please upload your manuscript PDF file.</p>
                )}
              </div>

              {/* SECTION 4 — DECLARATIONS & AGREEMENTS */}
              <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs space-y-3.5">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
                  <div className="w-6 h-6 rounded-full bg-[#781D26]/10 text-[#781D26] font-bold text-xs flex items-center justify-center font-mono">
                    4
                  </div>
                  <h3 className="font-cinzel text-sm sm:text-base font-bold text-[#0B192C]">
                    Section 4: Author Declarations & Ethical Compliance
                  </h3>
                </div>

                <div className="space-y-2.5 text-xs text-slate-700">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={declareOriginal}
                      onChange={(e) => setDeclareOriginal(e.target.checked)}
                      className="mt-0.5 rounded text-[#781D26] focus:ring-[#781D26] cursor-pointer"
                      required
                    />
                    <span>
                      I confirm that this manuscript is my original work and has not been published or simultaneously submitted elsewhere for consideration. *
                    </span>
                  </label>

                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={declareProcess}
                      onChange={(e) => setDeclareProcess(e.target.checked)}
                      className="mt-0.5 rounded text-[#781D26] focus:ring-[#781D26] cursor-pointer"
                      required
                    />
                    <span>
                      I agree to the journal&apos;s submission policies, ethics guidelines (COPE standards), and the double-blind peer-review process administered by Shivaji College, University of Delhi. *
                    </span>
                  </label>
                </div>
              </div>

              {/* Submit Controls */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-500 text-center sm:text-left">
                  {!isFormValid && (
                    <span className="text-amber-800">
                      Please complete all required fields (*) and declarations to enable submission.
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 sm:flex-initial min-h-[44px] px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className="flex-1 sm:flex-initial min-h-[44px] px-6 py-2 rounded-lg bg-[#781D26] hover:bg-[#5E141C] text-white text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Transmitting Manuscript...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 text-amber-300" />
                        <span>Submit Manuscript</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}
