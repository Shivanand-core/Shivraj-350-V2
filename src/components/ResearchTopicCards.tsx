import React from 'react';
import { ArrowRight } from 'lucide-react';

export interface ResearchTopic {
  id: string;
  title: string;
  filterKey: string;
  categoryLabel: string;
  description: string;
  papersCount: string;
  imageUrl: string;
  imageAlt: string;
}

export const RESEARCH_TOPICS: ResearchTopic[] = [
  {
    id: 'sciences',
    title: 'Sciences & Technology',
    filterKey: 'Sciences',
    categoryLabel: 'Sciences',
    description: 'Empirical investigations, natural and physical sciences, computational modeling, biotechnology, and sustainable environmental technologies.',
    papersCount: '2 Papers Available',
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&h=340&q=80',
    imageAlt: 'Scientific laboratory research glassware and instruments',
  },
  {
    id: 'social-sciences',
    title: 'Social Sciences',
    filterKey: 'Social Sciences',
    categoryLabel: 'Social Sciences',
    description: 'Economics, sociology, political discourse, public administration, gender studies, community studies, and contemporary human geography.',
    papersCount: '2 Papers Available',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=340&q=80',
    imageAlt: 'Social science data analysis and research documents',
  },
  {
    id: 'humanities',
    title: 'Humanities & Heritage',
    filterKey: 'Humanities',
    categoryLabel: 'Humanities',
    description: 'Literature, philosophy, history, Modi script archival preservation, Indian cultural heritage, ethics, and critical linguistic discourse.',
    papersCount: '2 Papers Available',
    imageUrl: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=600&h=340&q=80',
    imageAlt: 'Classical manuscripts and historical archival literature',
  },
  {
    id: 'professional-studies',
    title: 'Professional Studies',
    filterKey: 'Professional Studies',
    categoryLabel: 'Professional Studies',
    description: 'Commerce, business management, sustainable corporate governance (ESG), finance, legal studies, and organizational systems.',
    papersCount: '2 Papers Available',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&h=340&q=80',
    imageAlt: 'Modern corporate architecture and business leadership studies',
  },
];

interface ResearchTopicCardsProps {
  onSelectTopic?: (filterKey: string) => void;
  activeFilter?: string;
}

export default function ResearchTopicCards({
  onSelectTopic,
  activeFilter,
}: ResearchTopicCardsProps) {
  const handleCardClick = (filterKey: string) => {
    if (onSelectTopic) {
      onSelectTopic(filterKey);
    }
  };

  return (
    <div className="w-full">
      {/* 
        Responsive Requirement:
        - Desktop (lg, 1024px+): 3 cards per row
        - Tablet (md, 768px-1023px): 2 cards per row
        - Mobile (<768px): 1 card per row
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {RESEARCH_TOPICS.map((topic) => {
          const isSelected = activeFilter === topic.filterKey;

          return (
            <div
              key={topic.id}
              id={`topic-card-${topic.id}`}
              onClick={() => handleCardClick(topic.filterKey)}
              className={`bg-white rounded-xl border transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer text-left h-full ${
                isSelected
                  ? 'border-[#781D26] ring-2 ring-[#781D26]/20 shadow-md'
                  : 'border-slate-200/90 hover:border-[#C5A059] shadow-xs hover:shadow-md'
              }`}
            >
              {/* Card Image Header with Fixed Height 120-150px */}
              <div className="relative w-full h-[125px] sm:h-[135px] md:h-[145px] overflow-hidden bg-[#071322] shrink-0">
                <img
                  src={topic.imageUrl}
                  alt={topic.imageAlt}
                  className="w-full h-full object-cover select-none transition-transform duration-500 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                {/* Visual Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/80 via-[#0B192C]/20 to-transparent" />

                {/* Category Pill Tag */}
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#0B192C]/90 text-[#E0C58A] border border-[#C5A059]/40 backdrop-blur-xs font-sans shadow-xs">
                    {topic.categoryLabel}
                  </span>
                </div>

                {/* Sub-badge bottom right */}
                <div className="absolute bottom-2.5 right-3">
                  <span className="text-[10px] text-white/90 font-mono bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
                    {topic.papersCount}
                  </span>
                </div>
              </div>

              {/* Card Body with Clean Typography & Spacing */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#781D26] transition-colors leading-snug">
                    {topic.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed mt-1.5 line-clamp-3">
                    {topic.description}
                  </p>
                </div>

                {/* Card Action Link */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-mono text-slate-400">
                    Peer-Reviewed Track
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-semibold text-[#781D26] group-hover:text-[#8E222D] transition-colors">
                    <span>Explore Research</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
