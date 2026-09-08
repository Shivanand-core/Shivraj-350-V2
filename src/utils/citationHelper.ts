import { JournalArticle } from '../types';
import { JOURNAL_INFO } from '../data/journalData';

// Helper to clean author prefix titles like "Dr.", "Prof.", etc.
export function cleanAuthorName(name: string): { firstName: string; lastName: string; fullName: string } {
  let cleaned = name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.|Mrs\.|Prof\. \(Dr\.\))\s+/i, '').trim();
  const parts = cleaned.split(' ');
  if (parts.length === 1) {
    return { firstName: '', lastName: parts[0], fullName: cleaned };
  }
  const lastName = parts[parts.length - 1];
  const firstName = parts.slice(0, parts.length - 1).join(' ');
  return { firstName, lastName, fullName: cleaned };
}

// Convert "Rajesh K. Sharma" to "Sharma, R. K."
export function formatApaAuthor(name: string): string {
  const { firstName, lastName } = cleanAuthorName(name);
  if (!firstName) return lastName;
  const initials = firstName
    .split(/[\s.-]+/)
    .filter(Boolean)
    .map(p => `${p[0].toUpperCase()}.`)
    .join(' ');
  return `${lastName}, ${initials}`;
}

export function generateApa7Citation(article: JournalArticle): string {
  const authors = article.authors.map(formatApaAuthor);
  let authorStr = '';
  if (authors.length === 1) {
    authorStr = authors[0];
  } else if (authors.length === 2) {
    authorStr = `${authors[0]}, & ${authors[1]}`;
  } else if (authors.length > 2) {
    authorStr = `${authors.slice(0, -1).join(', ')}, & ${authors[authors.length - 1]}`;
  }

  const year = article.publicationYear || 2026;
  const journal = JOURNAL_INFO.name;
  const vol = article.volume.replace(/[^0-9]/g, '') || '1';
  const issue = article.issue.replace(/[^0-9]/g, '') || '1';
  const pages = article.pageRange || article.pages;
  const doiPart = article.doi ? ` https://doi.org/${article.doi}` : '';

  return `${authorStr} (${year}). ${article.title}. ${journal}, ${vol}(${issue}), ${pages}.${doiPart}`;
}

export function generateMla9Citation(article: JournalArticle): string {
  const cleanedAuthors = article.authors.map(cleanAuthorName);
  let authorStr = '';
  if (cleanedAuthors.length === 1) {
    authorStr = `${cleanedAuthors[0].lastName}, ${cleanedAuthors[0].firstName}`;
  } else if (cleanedAuthors.length === 2) {
    authorStr = `${cleanedAuthors[0].lastName}, ${cleanedAuthors[0].firstName}, and ${cleanedAuthors[1].firstName} ${cleanedAuthors[1].lastName}`;
  } else if (cleanedAuthors.length > 2) {
    authorStr = `${cleanedAuthors[0].lastName}, ${cleanedAuthors[0].firstName}, et al`;
  }

  const journal = JOURNAL_INFO.name;
  const vol = article.volume.replace(/[^0-9]/g, '') || '1';
  const issue = article.issue.replace(/[^0-9]/g, '') || '1';
  const year = article.publicationYear || 2026;
  const pages = article.pageRange || article.pages;
  const doiPart = article.doi ? `, https://doi.org/${article.doi}` : '';

  return `${authorStr}. "${article.title}." ${journal}, vol. ${vol}, no. ${issue}, ${year}, pp. ${pages}${doiPart}.`;
}

export function generateChicagoCitation(article: JournalArticle): string {
  const cleanedAuthors = article.authors.map(cleanAuthorName);
  let authorStr = '';
  if (cleanedAuthors.length === 1) {
    authorStr = `${cleanedAuthors[0].lastName}, ${cleanedAuthors[0].firstName}`;
  } else if (cleanedAuthors.length === 2) {
    authorStr = `${cleanedAuthors[0].lastName}, ${cleanedAuthors[0].firstName}, and ${cleanedAuthors[1].firstName} ${cleanedAuthors[1].lastName}`;
  } else if (cleanedAuthors.length > 2) {
    const others = cleanedAuthors.slice(1).map(a => `${a.firstName} ${a.lastName}`).join(', ');
    authorStr = `${cleanedAuthors[0].lastName}, ${cleanedAuthors[0].firstName}, and ${others}`;
  }

  const year = article.publicationYear || 2026;
  const journal = JOURNAL_INFO.name;
  const vol = article.volume.replace(/[^0-9]/g, '') || '1';
  const issue = article.issue.replace(/[^0-9]/g, '') || '1';
  const pages = article.pageRange || article.pages;
  const doiPart = article.doi ? ` https://doi.org/${article.doi}` : '';

  return `${authorStr}. ${year}. "${article.title}." ${journal} ${vol} (${issue}): ${pages}.${doiPart}`;
}

export function generateBibtexCitation(article: JournalArticle): string {
  const bibAuthors = article.authors.map(a => {
    const { firstName, lastName } = cleanAuthorName(a);
    return firstName ? `${lastName}, ${firstName}` : lastName;
  }).join(' and ');

  const citeKey = `shivraj350_${article.publicationYear || 2026}_${article.id.replace(/[^a-zA-Z0-9]/g, '')}`;
  const vol = article.volume.replace(/[^0-9]/g, '') || '1';
  const issue = article.issue.replace(/[^0-9]/g, '') || '1';
  const pages = (article.pageRange || article.pages).replace(/–|-/g, '--');

  return `@article{${citeKey},
  author    = {${bibAuthors}},
  title     = {{${article.title}}},
  journal   = {${JOURNAL_INFO.name}},
  volume    = {${vol}},
  number    = {${issue}},
  year      = {${article.publicationYear || 2026}},
  pages     = {${pages}},
  publisher = {${JOURNAL_INFO.publisher}},
  doi       = {${article.doi || 'Not assigned'}}
}`;
}

export function downloadCitationFile(article: JournalArticle, format: 'bib' | 'ris') {
  let content = '';
  let filename = `${article.slug}.${format}`;
  let mime = 'text/plain';

  if (format === 'bib') {
    content = generateBibtexCitation(article);
  } else {
    const vol = article.volume.replace(/[^0-9]/g, '') || '1';
    const issue = article.issue.replace(/[^0-9]/g, '') || '1';
    const [spage, epage] = (article.pageRange || article.pages).split(/–|-/);
    content = [
      'TY  - JOUR',
      `TI  - ${article.title}`,
      ...article.authors.map(a => `AU  - ${cleanAuthorName(a).fullName}`),
      `T2  - ${JOURNAL_INFO.name}`,
      `VL  - ${vol}`,
      `IS  - ${issue}`,
      `SP  - ${spage || ''}`,
      `EP  - ${epage || ''}`,
      `PY  - ${article.publicationYear || 2026}`,
      `PB  - ${JOURNAL_INFO.publisher}`,
      article.doi ? `DO  - ${article.doi}` : '',
      `KW  - ${article.keywords.join('; ')}`,
      `AB  - ${article.abstract}`,
      'ER  - '
    ].filter(Boolean).join('\n');
  }

  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
