import { EDITORIAL_BOARD } from '../data/journalData';
import { Award, UserCheck, GraduationCap, Building } from 'lucide-react';

export default function EditorialBoard() {
  return (
    <section id="editorial-board" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-[#781D26]" />
            Scholarly Governance
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#0B192C]">
            Editorial Board & Academic Council
          </h2>
          <div className="w-20 h-1 bg-[#781D26] mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-slate-600 text-base">
            Distinguished faculty leadership from Shivaji College, University of Delhi steering peer-review excellence.
          </p>
        </div>

        {/* Leadership Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EDITORIAL_BOARD.map((member, index) => {
            const isLeadership = index < 2;
            return (
              <div
                key={member.name}
                className={`rounded-xl p-6 transition-all border ${
                  isLeadership
                    ? 'bg-gradient-to-br from-amber-50/40 via-white to-slate-50 border-amber-300/80 shadow-md'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${
                    isLeadership ? 'bg-[#781D26] text-amber-300' : 'bg-slate-100 text-[#0B192C]'
                  }`}>
                    {isLeadership ? <Award className="w-6 h-6" /> : <UserCheck className="w-6 h-6" />}
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#781D26]">
                      {member.role}
                    </div>
                    <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#0B192C]">
                      {member.name}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium">
                      {member.department}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-1">
                      <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{member.institution}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Peer Review Commitment Statement */}
        <div className="mt-12 bg-slate-50 rounded-xl p-6 border border-slate-200 text-center max-w-3xl mx-auto">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            <strong className="text-slate-800">Peer Review Integrity:</strong> In alignment with international COPE benchmarks, all articles submitted to <em>Shivraj 350</em> are anonymized and appraised by at least two independent peer reviewers. Final publication approval rests with the Editorial Board.
          </p>
        </div>

      </div>
    </section>
  );
}
