import { useState, FormEvent } from 'react';
import { MapPin, Mail, Globe, FileText, Send, CheckCircle2 } from 'lucide-react';
import { JOURNAL_INFO } from '../data/journalData';

interface ContactSectionProps {
  isStandalonePage?: boolean;
}

export default function ContactSection({ isStandalonePage = false }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 600);
  };

  return (
    <section id="contact" className="scroll-mt-24 sm:scroll-mt-28">
      {/* Top Campus Facade Banner (Matching page 4 of Image 3) */}
      {isStandalonePage && (
        <div className="relative bg-[#071322] text-white py-12 sm:py-16 overflow-hidden border-b border-slate-800">
          <div className="absolute inset-0 z-0">
            <img
              src="/src/assets/images/college_wide_banner_1788796660016.jpg"
              alt="Shivaji College Campus"
              className="w-full h-full object-cover opacity-30 filter contrast-125 brightness-75"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#071322] via-[#071322]/80 to-[#071322]/60" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2.5">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Contact Us
            </h1>
            <div className="w-16 h-0.5 bg-[#C5A059] mx-auto" />
            <p className="text-xs sm:text-sm font-sans tracking-[0.25em] uppercase text-[#E0C58A] font-medium pt-1">
              WE WOULD LOVE TO HEAR FROM YOU.
            </p>
          </div>
        </div>
      )}

      {/* Main Section Content with Compact Padding */}
      <div className="py-8 sm:py-10 lg:py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs if standalone */}
          {isStandalonePage && (
            <nav className="mb-5 sm:mb-6 text-xs font-sans text-slate-500 flex items-center gap-1.5">
              <span>Home</span>
              <span>&gt;</span>
              <span className="text-slate-800 font-semibold">Contact</span>
            </nav>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12">
            
            {/* Left Column: "Get in Touch" & Contact Metadata */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-left">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                  Get in Touch
                </h2>
                <p className="text-slate-600 text-xs sm:text-base mt-2 sm:mt-3 leading-relaxed font-sans">
                  For queries, submissions, or any other information, please feel free to reach out to us.
                </p>
              </div>

              {/* Contact Information List */}
              <div className="space-y-4 sm:space-y-5 text-slate-700 text-sm font-sans">
                {/* Location */}
                <div className="flex items-start gap-3.5 sm:gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#C5A059] bg-amber-50/50 flex items-center justify-center shrink-0 text-[#781D26]">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#A17A32]" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold text-sm sm:text-base font-serif">
                      Shivaji College, University of Delhi
                    </strong>
                    <span className="text-slate-600 text-xs sm:text-sm leading-relaxed block mt-0.5">
                      {JOURNAL_INFO.address}
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5 sm:gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#C5A059] bg-amber-50/50 flex items-center justify-center shrink-0 text-[#781D26]">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#A17A32]" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold text-xs sm:text-sm">
                      Editorial Desk Email
                    </strong>
                    <a
                      href={`mailto:${JOURNAL_INFO.email}`}
                      className="text-[#781D26] hover:underline font-mono text-xs sm:text-sm font-medium mt-0.5 block break-all"
                    >
                      {JOURNAL_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Website */}
                <div className="flex items-start gap-3.5 sm:gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#C5A059] bg-amber-50/50 flex items-center justify-center shrink-0 text-[#781D26]">
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-[#A17A32]" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold text-xs sm:text-sm">
                      Official College Portal
                    </strong>
                    <a
                      href={`https://${JOURNAL_INFO.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-700 hover:text-[#781D26] hover:underline text-xs sm:text-sm mt-0.5 block break-all"
                    >
                      {JOURNAL_INFO.website}
                    </a>
                  </div>
                </div>

                {/* ISSN */}
                <div className="flex items-start gap-3.5 sm:gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#C5A059] bg-amber-50/50 flex items-center justify-center shrink-0 text-[#781D26]">
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-[#A17A32]" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold text-xs sm:text-sm">
                      Registered Identifier
                    </strong>
                    <span className="font-mono text-slate-700 text-xs sm:text-sm font-medium mt-0.5 block">
                      ISSN: {JOURNAL_INFO.issn}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quote Card */}
              <div className="p-4 sm:p-6 rounded-lg bg-[#FAF8F5] border border-slate-200 text-center space-y-2">
                <p className="font-serif italic text-sm sm:text-lg text-slate-800">
                  &ldquo;Ideas connect people. Let&apos;s build a brighter academic future together.&rdquo;
                </p>
                <div className="w-16 h-0.5 bg-[#C5A059] mx-auto mt-2" />
              </div>
            </div>

            {/* Right Column: "Send a Message" Form Card */}
            <div className="lg:col-span-6">
              <div className="bg-[#FAF8F5] p-5 sm:p-8 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-serif text-lg sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 text-left">
                  Send a Message
                </h3>

                {submitted && (
                  <div className="mb-6 p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>
                      Thank you for contacting Shivraj 350. Your message has been received by the editorial desk.
                    </span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  {/* Your Name */}
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-slate-700 font-sans">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your name"
                      className="w-full min-h-[44px] px-4 py-2.5 bg-white border border-slate-200 rounded-md text-base sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#781D26] focus:border-[#781D26]"
                    />
                  </div>

                  {/* Your Email */}
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-slate-700 font-sans">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter your email"
                      className="w-full min-h-[44px] px-4 py-2.5 bg-white border border-slate-200 rounded-md text-base sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#781D26] focus:border-[#781D26]"
                    />
                  </div>

                  {/* Subject */}
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-slate-700 font-sans">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Enter subject"
                      className="w-full min-h-[44px] px-4 py-2.5 bg-white border border-slate-200 rounded-md text-base sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#781D26] focus:border-[#781D26]"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-slate-700 font-sans">
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Enter your message"
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-md text-base sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#781D26] focus:border-[#781D26] resize-y"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full min-h-[44px] py-3 px-6 rounded-full bg-[#781D26] hover:bg-[#8E222D] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md disabled:opacity-50"
                    >
                      <span>{loading ? 'Sending...' : 'Send Message'}</span>
                      <Send className="w-3.5 h-3.5 text-white" />
                    </button>
                  </div>
                </form>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
