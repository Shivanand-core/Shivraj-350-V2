/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Header, { NavTab } from './components/Header';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import CurrentIssueSection from './components/CurrentIssueSection';
import ResearchRepositorySection from './components/ResearchRepositorySection';
import ContactSection from './components/ContactSection';
import SubmissionSection from './components/SubmissionSection';
import Footer from './components/Footer';
import IssueReaderModal from './components/IssueReaderModal';
import CitationModal from './components/CitationModal';
import SubmitManuscriptModal from './components/SubmitManuscriptModal';
import DedicatedArticlePage from './components/DedicatedArticlePage';
import EditorialLoginPage from './components/EditorialLoginPage';
import EditorialDashboard from './components/EditorialDashboard';
import { JournalArticle } from './types';
import { INAUGURAL_ARTICLES, getArticleBySlug } from './data/journalData';

export type AppRoute = 'public' | 'editorial-login' | 'editorial-dashboard';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>('public');
  const [editorEmail, setEditorEmail] = useState<string>(() => {
    try {
      return localStorage.getItem('shivraj350_editor_email') || 'editor@shivaji.du.ac.in';
    } catch {
      return 'editor@shivaji.du.ac.in';
    }
  });
  const [isEditorAuthenticated, setIsEditorAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem('shivraj350_editor_auth') === 'true';
    } catch {
      return false;
    }
  });

  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [dedicatedArticle, setDedicatedArticle] = useState<JournalArticle | null>(null);
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('All');

  const [readerModalOpen, setReaderModalOpen] = useState(false);
  const [selectedArticleForReader, setSelectedArticleForReader] = useState<JournalArticle | null>(null);

  const [citationModalOpen, setCitationModalOpen] = useState(false);
  const [selectedArticleForCitation, setSelectedArticleForCitation] = useState<JournalArticle | null>(null);

  const [submissionModalOpen, setSubmissionModalOpen] = useState(false);

  // Smooth scroll to target section accounting for fixed/sticky header offset
  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      const header = document.querySelector('header');
      const headerHeight = header ? header.getBoundingClientRect().height : 95;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      // Section aligns naturally below fixed header with clear margin
      const offsetPosition = Math.max(0, elementPosition - headerHeight - 8);
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Sync URL for dedicated article routing and back/forward browser history
  useEffect(() => {
    const parseRouteFromLocation = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;

      // Check for Editorial Dashboard
      if (path.includes('/editorial-dashboard') || hash.startsWith('#/editorial-dashboard')) {
        setCurrentRoute('editorial-dashboard');
        setDedicatedArticle(null);
        setReaderModalOpen(false);
        return;
      }

      // Check for Editorial Login
      if (path.includes('/editorial-login') || hash.startsWith('#/editorial-login')) {
        setCurrentRoute('editorial-login');
        setDedicatedArticle(null);
        setReaderModalOpen(false);
        return;
      }

      // Check for Dedicated Article
      let slug: string | null = null;
      if (hash.startsWith('#/articles/')) {
        slug = hash.replace('#/articles/', '').split('/')[0].split('?')[0];
      } else if (path.includes('/articles/')) {
        const parts = path.split('/articles/');
        slug = parts[1]?.split('/')[0].split('?')[0] || null;
      }

      if (slug) {
        const found = getArticleBySlug(slug);
        if (found) {
          setDedicatedArticle(found);
          setCurrentRoute('public');
          setReaderModalOpen(false);
          return;
        }
      }

      // Public Home Route
      setCurrentRoute('public');
      setDedicatedArticle(null);
    };

    parseRouteFromLocation();

    window.addEventListener('popstate', parseRouteFromLocation);
    window.addEventListener('hashchange', parseRouteFromLocation);
    return () => {
      window.removeEventListener('popstate', parseRouteFromLocation);
      window.removeEventListener('hashchange', parseRouteFromLocation);
    };
  }, []);

  // Handle hash scrolling on direct load
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && !hash.startsWith('#/articles/') && !hash.startsWith('#/editorial')) {
      const targetId = hash.replace('#', '');
      const timer = setTimeout(() => {
        scrollToSection(targetId);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, []);

  // Track scroll position to update active navbar link gracefully
  useEffect(() => {
    if (dedicatedArticle || currentRoute !== 'public') return;

    const handleScroll = () => {
      if (window.scrollY < 200) {
        setActiveTab('home');
        return;
      }

      const sectionIds: NavTab[] = ['contact', 'submissions', 'repository', 'current-issue', 'about'];
      const header = document.querySelector('header');
      const headerHeight = header ? header.getBoundingClientRect().height : 95;
      const scrollPos = window.scrollY + headerHeight + 100;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.pageYOffset;
          if (scrollPos >= top) {
            setActiveTab(id);
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dedicatedArticle, currentRoute]);

  // Editorial Navigation Handlers
  const handleOpenEditorialLogin = () => {
    setDedicatedArticle(null);
    setCurrentRoute('editorial-login');
    window.history.pushState(null, '', '/editorial-login');
    window.location.hash = '#/editorial-login';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (email: string) => {
    setEditorEmail(email);
    setIsEditorAuthenticated(true);
    try {
      localStorage.setItem('shivraj350_editor_auth', 'true');
      localStorage.setItem('shivraj350_editor_email', email);
    } catch {
      // Ignore localStorage exceptions in sandboxes
    }
    setCurrentRoute('editorial-dashboard');
    window.history.pushState(null, '', '/editorial-dashboard');
    window.location.hash = '#/editorial-dashboard';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSignOut = () => {
    setIsEditorAuthenticated(false);
    try {
      localStorage.removeItem('shivraj350_editor_auth');
    } catch {
      // Ignore
    }
    setCurrentRoute('editorial-login');
    window.history.pushState(null, '', '/editorial-login');
    window.location.hash = '#/editorial-login';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setCurrentRoute('public');
    setDedicatedArticle(null);
    setActiveTab('home');
    window.history.pushState(null, '', '/');
    if (window.location.hash.startsWith('#/editorial') || window.location.hash.startsWith('#/articles')) {
      window.location.hash = '';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handlers
  const handleOpenInauguralIssue = () => {
    setSelectedArticleForReader(null); // Shows volume cover / preface
    setReaderModalOpen(true);
  };

  const handleOpenDigitalReaderForArticle = (article?: JournalArticle) => {
    if (article) {
      setSelectedArticleForReader(article);
    }
    setReaderModalOpen(true);
  };

  const handleOpenDedicatedArticle = (article: JournalArticle) => {
    setDedicatedArticle(article);
    setReaderModalOpen(false);
    setCurrentRoute('public');
    window.location.hash = `#/articles/${article.slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToRepository = () => {
    setDedicatedArticle(null);
    setCurrentRoute('public');
    setActiveTab('repository');
    if (window.location.hash.startsWith('#/articles')) {
      window.history.pushState(null, '', window.location.pathname + window.location.search);
    }
    setTimeout(() => {
      scrollToSection('repository');
    }, 60);
  };

  const handleSelectTab = (tab: NavTab) => {
    const wasOnDedicatedArticle = !!dedicatedArticle;
    setDedicatedArticle(null);
    setCurrentRoute('public');
    setActiveTab(tab);
    if (window.location.hash.startsWith('#/articles')) {
      window.history.pushState(null, '', window.location.pathname + window.location.search);
    }

    if (wasOnDedicatedArticle) {
      setTimeout(() => {
        scrollToSection(tab);
      }, 60);
    } else {
      scrollToSection(tab);
    }
  };

  const handleSelectDiscipline = (discipline: string) => {
    setSelectedDiscipline(discipline);
    scrollToSection('repository');
  };

  const handleOpenCitation = (article: JournalArticle) => {
    setSelectedArticleForCitation(article);
    setCitationModalOpen(true);
  };

  // ROUTE 1: Dedicated Editorial Login Page
  if (currentRoute === 'editorial-login') {
    return (
      <EditorialLoginPage
        onLoginSuccess={handleLoginSuccess}
        onNavigateHome={handleNavigateHome}
      />
    );
  }

  // ROUTE 2: Dedicated Editorial Dashboard
  if (currentRoute === 'editorial-dashboard') {
    return (
      <EditorialDashboard
        editorEmail={editorEmail}
        onSignOut={handleSignOut}
        onNavigateHome={handleNavigateHome}
        onPreviewArticle={(art) => {
          handleOpenDedicatedArticle(art);
        }}
      />
    );
  }

  // ROUTE 3: Public Journal Website
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 font-sans flex flex-col selection:bg-amber-100 selection:text-amber-900">
      {/* 1. Institutional Top Bar & 2. Main Navigation */}
      <Header
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenReaderModal={handleOpenInauguralIssue}
      />

      <main className="flex-1">
        {/* Dedicated Article Page (Rendered when an article is open) */}
        {dedicatedArticle ? (
          <DedicatedArticlePage
            article={dedicatedArticle}
            onBackToRepository={handleBackToRepository}
            onSelectArticle={handleOpenDedicatedArticle}
            onOpenCitationModal={handleOpenCitation}
            onOpenDigitalReader={handleOpenDigitalReaderForArticle}
          />
        ) : (
          /* Unified Single-Page Layout (Complete chronological sections without abrupt jumps) */
          <div className="space-y-0">
            {/* 3. Hero Section & 4. Academic Value / Features Section */}
            <Hero
              onReadInauguralClick={handleOpenInauguralIssue}
              onExploreIssueClick={() => scrollToSection('repository')}
            />

            {/* 5. About the Journal & 6. Key Focus Areas (Card-Based Grid) */}
            <AboutSection
              isStandalonePage={false}
              onSelectDiscipline={handleSelectDiscipline}
            />

            {/* 7. Current Issue (Inaugural Issue Vol. 1, Issue 1, Jan-June 2026) & 8. What to Expect */}
            <CurrentIssueSection
              isStandalonePage={false}
              onOpenVolumeReader={handleOpenInauguralIssue}
            />

            {/* 9. Curated Articles / Research Repository */}
            <ResearchRepositorySection
              onSelectArticle={handleOpenDedicatedArticle}
              onOpenCitationModal={handleOpenCitation}
              initialDiscipline={selectedDiscipline}
            />

            {/* Author Submissions / Call for Papers */}
            <SubmissionSection onOpenSubmitModal={() => setSubmissionModalOpen(true)} />

            {/* 10. Contact */}
            <ContactSection isStandalonePage={false} />
          </div>
        )}
      </main>

      {/* 11. Institutional Footer */}
      <Footer
        onSelectTab={handleSelectTab}
        onOpenEditorialLogin={handleOpenEditorialLogin}
      />

      {/* Interactive Modals */}
      <IssueReaderModal
        isOpen={readerModalOpen}
        onClose={() => setReaderModalOpen(false)}
        initialArticle={selectedArticleForReader}
        onOpenCitation={(article) => {
          setSelectedArticleForCitation(article);
          setCitationModalOpen(true);
        }}
        onOpenDedicatedArticle={handleOpenDedicatedArticle}
      />

      <CitationModal
        isOpen={citationModalOpen}
        onClose={() => setCitationModalOpen(false)}
        article={selectedArticleForCitation || INAUGURAL_ARTICLES[0]}
      />

      <SubmitManuscriptModal
        isOpen={submissionModalOpen}
        onClose={() => setSubmissionModalOpen(false)}
      />
    </div>
  );
}
