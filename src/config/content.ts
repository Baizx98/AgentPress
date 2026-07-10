export type CardStyle = 'article' | 'showcase' | 'compact';

export const archivePageSize = 30;

export const contentTypes = {
  paper: { label: 'Paper', cardStyle: 'article' as CardStyle, listLayout: 'stack' as const, showCover: true },
  'technical-report': { label: 'Report', cardStyle: 'article' as CardStyle, listLayout: 'stack' as const, showCover: true },
  blog: { label: 'Blog', cardStyle: 'article' as CardStyle, listLayout: 'stack' as const, showCover: true },
  note: { label: 'Note', cardStyle: 'compact' as CardStyle, listLayout: 'stack' as const, showCover: false },
} as const;
