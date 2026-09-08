export interface ArticleSection {
  heading: string;
  content: string;
}

export interface JournalArticle {
  id: string;
  slug: string;
  articleNumber?: string;
  title: string;
  authors: string[];
  affiliation: string;
  category: 'Sciences' | 'Social Sciences' | 'Humanities' | 'Professional Studies';
  discipline?: string;
  abstract: string;
  keywords: string[];
  doi: string;
  pages: string;
  pageRange?: string;
  pdfUrl?: string;
  fullText?: string;
  sections?: ArticleSection[];
  references?: string[];
  publishedDate: string;
}

export interface EditorialMember {
  name: string;
  role: string;
  department: string;
  institution: string;
  image?: string;
}

export interface IssueMetadata {
  title: string;
  volume: string;
  issue: string;
  period: string;
  year: number;
  issn: string;
  totalArticles: number;
  editorNote: string;
}
