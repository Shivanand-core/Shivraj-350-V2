export interface ArticleSection {
  heading: string;
  content: string;
}

export interface JournalArticle {
  id: string;
  slug: string;
  articleNumber: string;
  title: string;
  authors: string[];
  affiliation: string;
  affiliations?: string[];
  department?: string;
  category: 'Sciences' | 'Social Sciences' | 'Humanities' | 'Professional Studies';
  discipline: string;
  articleType: 'Research Article' | 'Review Article' | 'Short Communication' | 'Case Study' | string;
  abstract: string;
  keywords: string[];
  volume: string;
  issue: string;
  publicationDate: string;
  publishedDate: string;
  publicationYear: number;
  pages: string;
  pageRange?: string;
  doi: string;
  pdfUrl: string;
  content?: string;
  fullText?: string;
  sections?: ArticleSection[];
  references?: string[];
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
