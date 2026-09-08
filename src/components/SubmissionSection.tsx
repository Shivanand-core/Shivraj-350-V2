import { useState } from 'react';
import { 
  Send, 
  FileCheck, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  Upload, 
  BookOpen, 
  Mail,
  HelpCircle 
} from 'lucide-react';
import { JOURNAL_INFO } from '../data/journalData';

interface SubmissionSectionProps {
  onOpenSubmitModal: () => void;
}

export default function SubmissionSection({ onOpenSubmitModal }: SubmissionSectionProps) {
  return (
    <section id="submissions" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <FileCheck className="w-3.5 h-3.5" />
            Author Instructions
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#0B192C]">
            Call for Papers & Submissions
          </h2>
          <div className="w-20 h-1 bg-[#781D26] mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-slate-600 text-base">
            Original, unpublished empirical and conceptual research manuscripts are invited from scholars, faculty, and research fellows worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Author Guidelines */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <h3 className="font-cinzel text-xl font-bold text-[#0B192C] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#781D26]" />
              <span>Manuscript Preparation Standards</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-semibold text-xs text-slate-900 uppercase tracking-wider mb-1">
                  1. Article Structure
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Manuscripts must contain: Title Page, Abstract (200–250 words), 4–6 Keywords, Introduction, Literature Review, Methodology, Empirical Results, Discussion, and References.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-semibold text-xs text-slate-900 uppercase tracking-wider mb-1">
                  2. Length & Typography
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Recommended word count: 4,000 to 8,000 words. Font: Times New Roman or Garamond 12pt, 1.5 line spacing, 1-inch margins throughout.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-semibold text-xs text-slate-900 uppercase tracking-wider mb-1">
                  3. Citation & Referencing
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Sciences/Tech: IEEE or Vancouver style. Social Sciences & Humanities: APA 7th Edition or MLA 9th Edition. Ensure valid DOIs are included where available.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-semibold text-xs text-slate-900 uppercase tracking-wider mb-1">
                  4. Originality & Plagiarism
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Strict anti-plagiarism verification is conducted. Manuscripts showing &gt;10% similarity index (excluding bibliography) are rejected at desk stage.
                </p>
              </div>
            </div>

            {/* Publication Timeline & APC Notice */}
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 flex items-start gap-3 text-xs text-amber-950">
              <AlertCircle className="w-5 h-5 text-[#781D26] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Zero Article Processing Charges (No APC):</span> As an institutional initiative of Shivaji College, University of Delhi to democratize open scholarly exchange, there are no submission or publication fees charged to authors.
              </div>
            </div>

            {/* Submission CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                id="btn-open-submit-modal"
                onClick={onOpenSubmitModal}
                className="px-6 py-3 rounded-lg bg-[#781D26] hover:bg-[#551219] text-white font-semibold text-sm inline-flex items-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Upload className="w-4 h-4 text-amber-300" />
                <span>Submit Manuscript Online</span>
              </button>

              <a
                href={`mailto:${JOURNAL_INFO.email}?subject=Manuscript%20Submission%20-%20Shivraj%20350`}
                className="px-5 py-3 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 font-medium text-sm inline-flex items-center gap-2 transition-colors"
              >
                <Mail className="w-4 h-4 text-slate-500" />
                <span>Email Editorial Desk</span>
              </a>
            </div>
          </div>

          {/* Right: Submission Deadlines & Desk Contacts */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Key Deadlines Box */}
            <div className="bg-[#0B192C] text-white rounded-2xl p-6 shadow-lg border border-white/10 space-y-4">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                <span>Editorial Timeline</span>
              </div>

              <h4 className="font-cinzel text-lg font-bold text-white">
                Upcoming Volume 1, Issue 2
              </h4>

              <div className="space-y-3 pt-2 text-xs">
                <div className="border-b border-white/10 pb-2">
                  <span className="text-slate-400 block">Submission Deadline:</span>
                  <span className="font-bold text-amber-300 text-sm">October 15, 2026</span>
                </div>
                <div className="border-b border-white/10 pb-2">
                  <span className="text-slate-400 block">Initial Desk Review:</span>
                  <span className="font-semibold text-white">Within 7 business days</span>
                </div>
                <div className="border-b border-white/10 pb-2">
                  <span className="text-slate-400 block">Peer Review Decision:</span>
                  <span className="font-semibold text-white">4 to 6 weeks</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Expected Publication:</span>
                  <span className="font-semibold text-emerald-400">November 2026</span>
                </div>
              </div>
            </div>

            {/* Direct Email Submission Box */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-[#781D26] text-xs font-bold uppercase tracking-wider">
                <HelpCircle className="w-4 h-4" />
                <span>Submission Queries</span>
              </div>
              <h4 className="text-sm font-bold text-slate-800">
                Manuscript Queries Desk
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                For questions regarding formatting, scope suitability, or special issues, contact our editorial team:
              </p>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 font-mono text-xs text-[#781D26] font-semibold select-all">
                {JOURNAL_INFO.email}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
