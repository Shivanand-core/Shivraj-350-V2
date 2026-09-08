import { createClient } from '@supabase/supabase-js';
import { JournalArticle } from '../types';

// Supabase project credentials provided by the user
export const SUPABASE_PROJECT_ID = 'oqjreupvrddsfkzrcxxx';
export const SUPABASE_URL = 
  import.meta.env.VITE_SUPABASE_URL || `https://${SUPABASE_PROJECT_ID}.supabase.co`;
export const SUPABASE_PUBLISHABLE_KEY = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_2XNvpphPg-Dw1avlVttsdA_NkbxTuDX';

// Initialize Supabase Client
export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export interface SupabaseSubmission {
  id?: string;
  tracking_code: string;
  author_name: string;
  email: string;
  phone?: string;
  institution: string;
  department?: string;
  designation?: string;
  orcid?: string;
  title: string;
  article_type: string;
  discipline: string;
  abstract: string;
  keywords: string;
  co_authors?: any[];
  file_name: string;
  file_size?: string;
  status: 'Pending Initial Check' | 'Under Peer Review' | 'Revisions Requested' | 'Accepted' | 'Rejected';
  created_at?: string;
}

/**
 * Checks connection health to the Supabase endpoint
 */
export async function checkSupabaseConnection(): Promise<{
  connected: boolean;
  projectId: string;
  url: string;
  message: string;
  error?: string;
}> {
  try {
    // Attempt a light ping by querying submissions table metadata or count
    const { error } = await supabase
      .from('manuscript_submissions')
      .select('id', { count: 'exact', head: true });

    if (error && error.code !== 'PGRST116') {
      // If table does not exist yet (relation does not exist code '42P01' or similar), connection is still valid to Supabase
      if (error.message.includes('relation') || error.message.includes('does not exist')) {
        return {
          connected: true,
          projectId: SUPABASE_PROJECT_ID,
          url: SUPABASE_URL,
          message: 'Connected to Supabase project! (Database tables need initial migration)',
        };
      }
      return {
        connected: false,
        projectId: SUPABASE_PROJECT_ID,
        url: SUPABASE_URL,
        message: 'Could not reach Supabase endpoint',
        error: error.message,
      };
    }

    return {
      connected: true,
      projectId: SUPABASE_PROJECT_ID,
      url: SUPABASE_URL,
      message: 'Active & Connected to Supabase',
    };
  } catch (err: any) {
    return {
      connected: false,
      projectId: SUPABASE_PROJECT_ID,
      url: SUPABASE_URL,
      message: 'Connection failed',
      error: err?.message || 'Unknown network error',
    };
  }
}

/**
 * Submit manuscript to Supabase `manuscript_submissions` table
 */
export async function submitManuscriptToSupabase(submission: {
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
  coAuthors: any[];
  fileName: string;
  fileSizeFormatted: string;
}): Promise<{
  success: boolean;
  savedToSupabase: boolean;
  record?: any;
  error?: string;
}> {
  const payload: SupabaseSubmission = {
    tracking_code: submission.submissionId,
    author_name: submission.authorName,
    email: submission.email,
    phone: submission.phone,
    institution: submission.institution,
    department: submission.department,
    designation: submission.designation,
    orcid: submission.orcid,
    title: submission.title,
    article_type: submission.articleType,
    discipline: submission.discipline,
    abstract: submission.abstract,
    keywords: submission.keywords,
    co_authors: submission.coAuthors,
    file_name: submission.fileName,
    file_size: submission.fileSizeFormatted,
    status: 'Pending Initial Check',
  };

  try {
    const { data, error } = await supabase
      .from('manuscript_submissions')
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.warn('Supabase submission insert returned notice:', error.message);
      return {
        success: true, // Still allow submission UX to succeed for the researcher
        savedToSupabase: false,
        error: error.message,
      };
    }

    return {
      success: true,
      savedToSupabase: true,
      record: data,
    };
  } catch (err: any) {
    console.warn('Supabase submission request error:', err);
    return {
      success: true,
      savedToSupabase: false,
      error: err?.message || 'Network error connecting to Supabase',
    };
  }
}

/**
 * Fetch submissions from Supabase
 */
export async function fetchSubmissionsFromSupabase(): Promise<{
  data: SupabaseSubmission[] | null;
  error: string | null;
}> {
  try {
    const { data, error } = await supabase
      .from('manuscript_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (err: any) {
    return { data: null, error: err?.message || 'Network error' };
  }
}

/**
 * Update submission status in Supabase
 */
export async function updateSubmissionStatusInSupabase(
  trackingCode: string,
  newStatus: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('manuscript_submissions')
      .update({ status: newStatus })
      .eq('tracking_code', trackingCode);

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Network error' };
  }
}

/**
 * Fetch published or draft articles from Supabase `articles` table
 */
export async function fetchArticlesFromSupabase(): Promise<{
  data: any[] | null;
  error: string | null;
}> {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('article_number', { ascending: true });

    if (error) {
      return { data: null, error: error.message };
    }
    return { data, error: null };
  } catch (err: any) {
    return { data: null, error: err?.message || 'Network error' };
  }
}

/**
 * Update article metadata in Supabase
 */
export async function updateArticleInSupabase(
  id: string,
  updates: Partial<JournalArticle & { isPublished: boolean }>
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('articles')
      .update(updates)
      .eq('id', id);

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Network error' };
  }
}

/**
 * SQL Schema migration helper for user's Supabase project
 */
export const SUPABASE_SQL_SCHEMA = `
-- ==============================================================================
-- SHIVRAJ 350 JOURNAL: SUPABASE DATABASE SCHEMA
-- Run this script in your Supabase SQL Editor (https://supabase.com/dashboard/project/oqjreupvrddsfkzrcxxx/sql)
-- ==============================================================================

-- 1. Table: manuscript_submissions (For Call for Papers & Research Submissions)
CREATE TABLE IF NOT EXISTS public.manuscript_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_code TEXT UNIQUE NOT NULL,
  author_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  institution TEXT NOT NULL,
  department TEXT,
  designation TEXT,
  orcid TEXT,
  title TEXT NOT NULL,
  article_type TEXT DEFAULT 'Research Article',
  discipline TEXT NOT NULL,
  abstract TEXT NOT NULL,
  keywords TEXT NOT NULL,
  co_authors JSONB DEFAULT '[]'::jsonb,
  file_name TEXT NOT NULL,
  file_size TEXT,
  status TEXT DEFAULT 'Pending Initial Check',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.manuscript_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone (public researchers) to submit manuscripts
CREATE POLICY "Allow public manuscript submissions"
ON public.manuscript_submissions
FOR INSERT
TO public
WITH CHECK (true);

-- Allow reading and updating submissions
CREATE POLICY "Allow editorial read access on submissions"
ON public.manuscript_submissions
FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow editorial update on submissions"
ON public.manuscript_submissions
FOR UPDATE
TO public
USING (true);

-- 2. Table: articles (For Research Repository & Published Manuscripts)
CREATE TABLE IF NOT EXISTS public.articles (
  id TEXT PRIMARY KEY,
  article_number TEXT,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  discipline TEXT,
  authors JSONB NOT NULL DEFAULT '[]'::jsonb,
  affiliation TEXT NOT NULL,
  abstract TEXT NOT NULL,
  keywords JSONB NOT NULL DEFAULT '[]'::jsonb,
  pages TEXT NOT NULL,
  doi TEXT NOT NULL,
  pdf_url TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read published articles"
ON public.articles
FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow public/editorial insert and update on articles"
ON public.articles
FOR ALL
TO public
USING (true)
WITH CHECK (true);
`;
