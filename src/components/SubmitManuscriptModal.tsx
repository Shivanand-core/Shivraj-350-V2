import { useState, useEffect, FormEvent } from 'react';
import { X, Upload, CheckCircle2, AlertCircle, Send, FileCheck } from 'lucide-react';
import { JOURNAL_INFO } from '../data/journalData';

interface SubmitManuscriptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SubmitManuscriptModal({ isOpen, onClose }: SubmitManuscriptModalProps) {
  const [authorName, setAuthorName] = useState('');
  const [email, setEmail] = useState('');
  const [institution, setInstitution] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Sciences' | 'Social Sciences' | 'Humanities' | 'Professional Studies'>('Sciences');
  const [abstract, setAbstract] = useState('');
  const [fileName, setFileName] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

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

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!authorName || !email || !title || !abstract || !agreed) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedRef = `SHIVRAJ350-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedRef(generatedRef);
    }, 900);
  };

  const handleReset = () => {
    setAuthorName('');
    setEmail('');
    setInstitution('');
    setTitle('');
    setAbstract('');
    setFileName('');
    setAgreed(false);
    setSubmittedRef(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#0B192C] text-white px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between border-b border-amber-500/20">
          <div className="flex items-center gap-2.5">
            <Upload className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <h3 className="font-cinzel text-sm sm:text-lg font-bold">Submit Manuscript</h3>
              <p className="text-[11px] sm:text-xs text-slate-300 font-serif line-clamp-1">Shivraj 350 • Shivaji College, DU</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {submittedRef ? (
            <div className="text-center py-6 sm:py-8 space-y-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <h4 className="font-cinzel text-lg sm:text-xl font-bold text-[#0B192C]">
                Manuscript Received Successfully
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{authorName}</strong>. Your paper has been registered in the editorial management system of Shivaji College, University of Delhi.
              </p>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl max-w-sm mx-auto">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                  Manuscript Tracking ID
                </span>
                <span className="font-mono text-base sm:text-lg font-extrabold text-[#781D26] break-all">
                  {submittedRef}
                </span>
              </div>

              <p className="text-xs text-slate-500 max-w-md mx-auto">
                An acknowledgment has been dispatched to <strong>{email}</strong>. Our editorial desk will perform initial technical screening within 7 business days.
              </p>

              <div className="pt-3 sm:pt-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 rounded-lg bg-[#0B192C] text-white text-xs sm:text-sm font-semibold hover:bg-[#1E3E62] transition-colors cursor-pointer"
                >
                  Close & Return to Journal
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-[#781D26] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  <strong>Notice:</strong> Zero Article Processing Charges (No APC). Ensure author identifications are stripped from the main text for double-blind review.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Corresponding Author *
                  </label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="e.g. Dr. Priya Verma"
                    className="w-full min-h-[42px] text-base sm:text-sm px-3 py-2 rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#781D26] focus:ring-1 focus:ring-[#781D26]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Official Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@university.edu"
                    className="w-full min-h-[42px] text-base sm:text-sm px-3 py-2 rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#781D26] focus:ring-1 focus:ring-[#781D26]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Institution / Department
                  </label>
                  <input
                    type="text"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder="e.g. Shivaji College, DU"
                    className="w-full min-h-[42px] text-base sm:text-sm px-3 py-2 rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#781D26] focus:ring-1 focus:ring-[#781D26]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Research Discipline *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full min-h-[42px] text-base sm:text-sm px-3 py-2 rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#781D26] focus:ring-1 focus:ring-[#781D26] bg-white"
                  >
                    <option value="Sciences">Sciences & Applied Technology</option>
                    <option value="Social Sciences">Social Sciences & Public Policy</option>
                    <option value="Humanities">Humanities, Languages & Heritage</option>
                    <option value="Professional Studies">Professional Studies & Commerce</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Manuscript Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Full descriptive academic title"
                  className="w-full min-h-[42px] text-base sm:text-sm px-3 py-2 rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#781D26] focus:ring-1 focus:ring-[#781D26]"
                />
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Structured Abstract (200-250 words) *
                </label>
                <textarea
                  required
                  rows={3}
                  value={abstract}
                  onChange={(e) => setAbstract(e.target.value)}
                  placeholder="Outline objectives, methodology, key findings, and interdisciplinary implications..."
                  className="w-full text-base sm:text-sm px-3 py-2 rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#781D26] focus:ring-1 focus:ring-[#781D26]"
                />
              </div>

              {/* Upload Manuscript file box */}
              <div>
                <label className="block text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Attach Anonymized Manuscript (.docx or .pdf)
                </label>
                <div className="border-2 border-dashed border-slate-300 hover:border-[#781D26] rounded-xl p-3 sm:p-4 text-center cursor-pointer transition-colors bg-slate-50">
                  <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 mx-auto mb-1" />
                  <span className="text-xs text-slate-600 block">
                    {fileName ? (
                      <span className="font-semibold text-emerald-700 break-all">{fileName}</span>
                    ) : (
                      'Click to browse or drag and drop manuscript file'
                    )}
                  </span>
                  <input
                    type="file"
                    accept=".pdf,.docx,.doc"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setFileName(e.target.files[0].name);
                      }
                    }}
                    className="hidden"
                    id="manuscript-file-input"
                  />
                  <label
                    htmlFor="manuscript-file-input"
                    className="inline-block mt-2 px-3.5 py-1.5 bg-white border border-slate-300 rounded text-xs font-medium text-slate-700 hover:bg-slate-100 cursor-pointer min-h-[36px] leading-[22px]"
                  >
                    Select File
                  </label>
                </div>
              </div>

              {/* Declaration Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-[#781D26] focus:ring-[#781D26] w-4 h-4 shrink-0"
                  />
                  <span className="leading-relaxed">
                    I confirm that this manuscript represents original, unpublished research, has not been simultaneously submitted elsewhere, and complies with COPE ethical guidelines and Shivraj 350 authorship standards.
                  </span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2.5 sm:gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto min-h-[44px] px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 rounded-lg bg-[#781D26] hover:bg-[#551219] text-white text-xs sm:text-sm font-bold shadow-sm inline-flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>Registering...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit for Editorial Review</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
